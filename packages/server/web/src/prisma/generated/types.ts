import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const UserStatus = {
    member: "member",
    admin: "admin",
    exec: "exec"
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export const Faculty = {
    math: "math",
    engineering: "engineering",
    science: "science",
    arts: "arts",
    health: "health",
    environment: "environment",
    other_non_waterloo: "other_non_waterloo"
} as const;
export type Faculty = (typeof Faculty)[keyof typeof Faculty];
export const PaymentMethod = {
    cash: "cash",
    online: "online",
    math_soc: "math_soc"
} as const;
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
export const ApplicationStatus = {
    draft: "draft",
    submitted: "submitted",
    under_review: "under_review",
    accepted: "accepted",
    rejected: "rejected",
    waitlisted: "waitlisted"
} as const;
export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus];
export const Role = {
    events_exec: "events_exec",
    events_co_vp: "events_co_vp",
    design_exec: "design_exec",
    education_exec: "education_exec",
    internal_exec: "internal_exec",
    outreach_exec: "outreach_exec",
    outreach_co_vp: "outreach_co_vp",
    development_exec: "development_exec",
    development_co_vp: "development_co_vp",
    social_media_exec: "social_media_exec",
    social_media_vp: "social_media_vp",
    project_lead: "project_lead",
    workshop_lead: "workshop_lead",
    cxc_co_vp: "cxc_co_vp",
    cxc_exec: "cxc_exec",
    general: "general",
    supplementary: "supplementary"
} as const;
export type Role = (typeof Role)[keyof typeof Role];
export const QuestionType = {
    text: "text",
    textarea: "textarea",
    multiple_choice: "multiple_choice",
    file_upload: "file_upload",
    checkbox: "checkbox",
    date: "date",
    number: "number"
} as const;
export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];
export type Application = {
    id: Generated<string>;
    profile_id: string;
    term_id: string;
    roles_applying_for: Generated<Role[]>;
    resume_path: string | null;
    status: Generated<ApplicationStatus>;
    comments: string | null;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
    submitted_at: Timestamp | null;
};
export type ApplicationAnswer = {
    id: Generated<string>;
    application_id: string;
    question_id: string;
    answer_text: string | null;
    answer_option: string | null;
    answer_options: string[];
    answer_file: string | null;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type Event = {
    id: Generated<string>;
    name: string;
    registration_required: boolean;
    description: string | null;
    location: string | null;
    start_time: Timestamp;
    buffered_start_time: Timestamp;
    end_time: Timestamp;
    buffered_end_time: Timestamp;
    payment_required: Generated<boolean>;
    image_id: string | null;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type EventAttendance = {
    id: Generated<string>;
    event_id: string;
    profile_id: string;
    checked_in: Generated<boolean>;
    created_at: Generated<Timestamp>;
};
export type Profile = {
    id: string;
    first_name: string;
    last_name: string;
    user_status: Generated<UserStatus>;
    has_paid: Generated<boolean>;
    wat_iam: string | null;
    faculty: Faculty;
    term: string;
    heard_from_where: Generated<string>;
    payment_method: PaymentMethod;
    payment_location: string | null;
    verifier: string | null;
    member_ideas: string | null;
    is_math_soc_member: Generated<boolean>;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type Question = {
    id: Generated<string>;
    term_id: string;
    question_id: string;
    role: Role;
    type: QuestionType;
    question: string;
    is_required: Generated<boolean>;
    order_num: number;
    max_length: number | null;
    placeholder: string | null;
    help_text: string | null;
};
export type Term = {
    id: Generated<string>;
    term_name: string;
    app_release_date: Timestamp;
    app_soft_deadline: Timestamp;
    app_hard_deadline: Timestamp;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type DB = {
    application: Application;
    application_answer: ApplicationAnswer;
    event: Event;
    event_attendance: EventAttendance;
    profile: Profile;
    question: Question;
    term: Term;
};
