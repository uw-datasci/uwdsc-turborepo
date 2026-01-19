-- Add judge and superadmin to role_enum
ALTER TYPE "public"."role_enum" ADD VALUE IF NOT EXISTS 'judge';
ALTER TYPE "public"."role_enum" ADD VALUE IF NOT EXISTS 'superadmin';

-- CreateTable
CREATE TABLE IF NOT EXISTS "public"."projects" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "team_id" UUID NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "devpost_url" TEXT,
    "github_url" TEXT,
    "demo_url" TEXT,
    "video_url" TEXT,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- If table already exists, alter team_id to be nullable
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'projects') THEN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'team_id' AND is_nullable = 'NO') THEN
            ALTER TABLE "public"."projects" ALTER COLUMN "team_id" DROP NOT NULL;
        END IF;
    END IF;
END $$;

-- CreateTable
CREATE TABLE IF NOT EXISTS "public"."judge_assignments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "project_id" UUID NOT NULL,
    "judge_id" UUID NOT NULL,
    "group_id" UUID NOT NULL,
    "start_time" TIMESTAMP WITH TIME ZONE NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT "judge_assignments_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "judge_assignments_project_id_judge_id_start_time_key" UNIQUE ("project_id", "judge_id", "start_time")
);

-- If table already exists, alter it to remove timeslot and end_time
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'judge_assignments') THEN
        -- Drop old unique constraint if it exists
        IF EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'judge_assignments_project_id_judge_id_key' AND table_name = 'judge_assignments') THEN
            ALTER TABLE "public"."judge_assignments" DROP CONSTRAINT IF EXISTS "judge_assignments_project_id_judge_id_key";
        END IF;
        
        -- Add new unique constraint if it doesn't exist
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'judge_assignments_project_id_judge_id_start_time_key' AND table_name = 'judge_assignments') THEN
            ALTER TABLE "public"."judge_assignments" ADD CONSTRAINT "judge_assignments_project_id_judge_id_start_time_key" UNIQUE ("project_id", "judge_id", "start_time");
        END IF;
        
        -- Drop columns if they exist
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'judge_assignments' AND column_name = 'timeslot') THEN
            ALTER TABLE "public"."judge_assignments" DROP COLUMN "timeslot";
        END IF;
        
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'judge_assignments' AND column_name = 'end_time') THEN
            ALTER TABLE "public"."judge_assignments" DROP COLUMN "end_time";
        END IF;
    END IF;
END $$;

-- CreateTable
CREATE TABLE IF NOT EXISTS "public"."project_scores" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "project_id" UUID NOT NULL,
    "judge_id" UUID NOT NULL,
    "criterion_1_score" DOUBLE PRECISION NOT NULL,
    "criterion_2_score" DOUBLE PRECISION NOT NULL,
    "criterion_3_score" DOUBLE PRECISION NOT NULL,
    "criterion_4_score" DOUBLE PRECISION NOT NULL,
    "comments" TEXT,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT "project_scores_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "project_scores_project_id_judge_id_key" UNIQUE ("project_id", "judge_id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "judge_assignments_judge_id_idx" ON "public"."judge_assignments"("judge_id");
CREATE INDEX IF NOT EXISTS "judge_assignments_project_id_idx" ON "public"."judge_assignments"("project_id");
CREATE INDEX IF NOT EXISTS "judge_assignments_group_id_idx" ON "public"."judge_assignments"("group_id");
CREATE INDEX IF NOT EXISTS "project_scores_judge_id_idx" ON "public"."project_scores"("judge_id");
CREATE INDEX IF NOT EXISTS "project_scores_project_id_idx" ON "public"."project_scores"("project_id");

-- AddForeignKey
ALTER TABLE "public"."judge_assignments" ADD CONSTRAINT "judge_assignments_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE;
ALTER TABLE "public"."judge_assignments" ADD CONSTRAINT "judge_assignments_judge_id_fkey" FOREIGN KEY ("judge_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project_scores" ADD CONSTRAINT "project_scores_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE;
ALTER TABLE "public"."project_scores" ADD CONSTRAINT "project_scores_judge_id_fkey" FOREIGN KEY ("judge_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;
