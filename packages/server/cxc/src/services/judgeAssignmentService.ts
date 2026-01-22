import { ApiError } from "@uwdsc/server/core/utils/errors";
import {
  JudgeAssignmentRepository,
  CreateJudgeAssignmentData,
  JudgeAssignmentWithProject,
  JudgeAssignmentWithJudge,
} from "../repository/judgeAssignmentRepository";
import { ProjectRepository } from "../repository/projectRepository";
import { JudgeRepository } from "../repository/judgeRepository";
import { randomUUID } from "crypto";

export interface AssignJudgesConfig {
  judgesPerGroup: number;
  timesJudged: number; // Number of times each project should be judged
  startDate: Date;
  timeslotDurationMinutes: number;
}

export class JudgeAssignmentService {
  private readonly repository: JudgeAssignmentRepository;
  private readonly projectRepository: ProjectRepository;
  private readonly judgeRepository: JudgeRepository;

  constructor() {
    this.repository = new JudgeAssignmentRepository();
    this.projectRepository = new ProjectRepository();
    this.judgeRepository = new JudgeRepository();
  }

  /**
   * Assign judges to projects randomly until each project is judged n times
   */
  async assignJudgesToProjects(
    config: AssignJudgesConfig,
  ): Promise<void> {
    try {
      // Get all projects and judges
      const projects = await this.projectRepository.getAllProjects();
      const judges = await this.judgeRepository.getAllJudges();

      if (projects.length === 0) {
        throw new ApiError("No projects found", 400);
      }

      if (judges.length === 0) {
        throw new ApiError("No judges found", 400);
      }

      if (judges.length < config.judgesPerGroup) {
        throw new ApiError(
          `Not enough judges. Need at least ${config.judgesPerGroup} judges, but only ${judges.length} found.`,
          400,
        );
      }

      // Calculate timeslot duration in milliseconds
      const timeslotDurationMs =
        config.timeslotDurationMinutes * 60 * 1000;

      // Track how many times each project has been assigned
      const projectAssignmentCounts = new Map<string, number>();
      for (const project of projects) {
        projectAssignmentCounts.set(project.id, 0);
      }

      // Shuffle judges array
      const shuffledJudges = [...judges].sort(() => Math.random() - 0.5);

      // Create judge groups - include groups of any size (even if smaller than judgesPerGroup)
      const judgeGroups: string[][] = [];
      for (let i = 0; i < shuffledJudges.length; i += config.judgesPerGroup) {
        const group = shuffledJudges
          .slice(i, i + config.judgesPerGroup)
          .map((j) => j.id);
        // Include all groups, even if they're smaller than judgesPerGroup
        if (group.length > 0) {
          judgeGroups.push(group);
        }
      }

      if (judgeGroups.length === 0) {
        throw new ApiError(
          `Cannot form any judge groups. Need at least 1 judge.`,
          400,
        );
      }

      // Shuffle projects
      const shuffledProjects = [...projects].sort(() => Math.random() - 0.5);

      const assignments: CreateJudgeAssignmentData[] = [];
      let currentTime = new Date(config.startDate);
      let projectIndex = 0;

      // Track which projects are assigned at each timeslot
      const projectTimeslotAssignments = new Map<string, Set<string>>(); // project_id -> Set of start_time strings
      // Track which judges are assigned at each timeslot
      const judgeTimeslotAssignments = new Map<string, Set<string>>(); // judge_id -> Set of start_time strings
      
      // Create stable group IDs based on judge composition (sorted judge IDs)
      // This ensures the same group of judges always gets the same group_id
      const groupIdMap = new Map<string, string>(); // sorted judge IDs -> group_id
      judgeGroups.forEach((judgeGroup) => {
        const sortedJudgeIds = [...judgeGroup].sort().join(',');
        if (!groupIdMap.has(sortedJudgeIds)) {
          groupIdMap.set(sortedJudgeIds, randomUUID());
        }
      });

      // Keep assigning until all projects are judged the required number of times
      while (true) {
        // Check if all projects have been judged enough times
        const allProjectsJudged = Array.from(projectAssignmentCounts.values()).every(
          (count) => count >= config.timesJudged,
        );

        if (allProjectsJudged) {
          break;
        }

        const currentTimeStr = currentTime.toISOString();

        // Assign projects to each judge group at this timeslot
        for (const judgeGroup of judgeGroups) {
          // Find a project that:
          // 1. Hasn't been judged enough times
          // 2. Isn't already assigned at this timeslot
          let project = shuffledProjects[projectIndex % shuffledProjects.length]!;
          let attempts = 0;
          
          while (
            (projectAssignmentCounts.get(project.id)! >= config.timesJudged ||
             (projectTimeslotAssignments.get(project.id)?.has(currentTimeStr) ?? false)) &&
            attempts < shuffledProjects.length * 2
          ) {
            projectIndex++;
            project = shuffledProjects[projectIndex % shuffledProjects.length]!;
            attempts++;
          }

          // If we couldn't find a project that needs more judging and isn't assigned, skip this group
          if (
            projectAssignmentCounts.get(project.id)! >= config.timesJudged ||
            (projectTimeslotAssignments.get(project.id)?.has(currentTimeStr) ?? false)
          ) {
            continue;
          }

          // Check if any judge in this group is already assigned at this timeslot
          const judgesAlreadyAssigned = judgeGroup.some(
            (judgeId) => judgeTimeslotAssignments.get(judgeId)?.has(currentTimeStr) ?? false,
          );

          if (judgesAlreadyAssigned) {
            // Skip this group if any judge is already assigned
            continue;
          }

          // Get stable group ID for this set of judges
          const sortedJudgeIds = [...judgeGroup].sort().join(',');
          const groupId = groupIdMap.get(sortedJudgeIds)!;

          // Mark project as assigned at this timeslot
          if (!projectTimeslotAssignments.has(project.id)) {
            projectTimeslotAssignments.set(project.id, new Set());
          }
          projectTimeslotAssignments.get(project.id)!.add(currentTimeStr);

          // Increment assignment count for this project
          projectAssignmentCounts.set(
            project.id,
            projectAssignmentCounts.get(project.id)! + 1,
          );

          // Create assignments for each judge in the group
          for (const judgeId of judgeGroup) {
            // Mark judge as assigned at this timeslot
            if (!judgeTimeslotAssignments.has(judgeId)) {
              judgeTimeslotAssignments.set(judgeId, new Set());
            }
            judgeTimeslotAssignments.get(judgeId)!.add(currentTimeStr);

            assignments.push({
              project_id: project.id,
              judge_id: judgeId,
              group_id: groupId,
              start_time: new Date(currentTime),
            });
          }

          projectIndex++;
        }

        // Move to next timeslot
        currentTime = new Date(currentTime.getTime() + timeslotDurationMs);
      }

      // Delete existing assignments
      await this.repository.deleteAllAssignments();

      // Create new assignments
      await this.repository.createAssignments(assignments);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        `Failed to assign judges: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get assignments for a judge
   */
  async getAssignmentsByJudgeId(
    judgeId: string,
  ): Promise<JudgeAssignmentWithProject[]> {
    try {
      return await this.repository.getAssignmentsByJudgeId(judgeId);
    } catch (error) {
      throw new ApiError(
        `Failed to get judge assignments: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get assignments for a project
   */
  async getAssignmentsByProjectId(
    projectId: string,
  ): Promise<JudgeAssignmentWithJudge[]> {
    try {
      return await this.repository.getAssignmentsByProjectId(projectId);
    } catch (error) {
      throw new ApiError(
        `Failed to get project assignments: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get all assignments grouped by group_id
   */
  async getAllAssignmentsGrouped(): Promise<
    Record<string, JudgeAssignmentWithProject[]>
  > {
    try {
      return await this.repository.getAllAssignmentsGrouped();
    } catch (error) {
      throw new ApiError(
        `Failed to get grouped assignments: ${(error as Error).message}`,
        500,
      );
    }
  }
}
