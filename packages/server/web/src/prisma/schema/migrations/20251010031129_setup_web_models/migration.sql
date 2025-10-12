-- CreateEnum
CREATE TYPE "public"."user_status" AS ENUM ('member', 'admin', 'exec');

-- CreateEnum
CREATE TYPE "public"."faculty" AS ENUM ('math', 'engineering', 'science', 'arts', 'health', 'environment', 'other_non_waterloo');

-- CreateEnum
CREATE TYPE "public"."payment_method" AS ENUM ('cash', 'online', 'math_soc');

-- CreateEnum
CREATE TYPE "public"."application_status" AS ENUM ('draft', 'submitted', 'under_review', 'accepted', 'rejected', 'waitlisted');

-- CreateEnum
CREATE TYPE "public"."role" AS ENUM ('events_exec', 'events_co_vp', 'design_exec', 'education_exec', 'internal_exec', 'outreach_exec', 'outreach_co_vp', 'development_exec', 'development_co_vp', 'social_media_exec', 'social_media_vp', 'project_lead', 'workshop_lead', 'cxc_co_vp', 'cxc_exec', 'general', 'supplementary');

-- CreateEnum
CREATE TYPE "public"."question_type" AS ENUM ('text', 'textarea', 'multiple_choice', 'file_upload', 'checkbox', 'date', 'number');

-- CreateTable
CREATE TABLE "public"."application" (
    "id" BIGSERIAL NOT NULL,
    "profile_id" UUID NOT NULL,
    "term_id" BIGINT NOT NULL,
    "roles_applying_for" "public"."role"[] DEFAULT ARRAY[]::"public"."role"[],
    "resume_path" VARCHAR(500),
    "status" "public"."application_status" NOT NULL DEFAULT 'draft',
    "comments" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submitted_at" TIMESTAMPTZ(6),

    CONSTRAINT "application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."application_answer" (
    "id" BIGSERIAL NOT NULL,
    "application_id" BIGINT NOT NULL,
    "question_id" BIGINT NOT NULL,
    "answer_text" TEXT,
    "answer_option" TEXT,
    "answer_options" TEXT[],
    "answer_file" VARCHAR(500),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "application_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."event" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "registration_required" BOOLEAN NOT NULL,
    "description" TEXT,
    "location" VARCHAR(255),
    "start_time" TIMESTAMPTZ(6) NOT NULL,
    "buffered_start_time" TIMESTAMPTZ(6) NOT NULL,
    "end_time" TIMESTAMPTZ(6) NOT NULL,
    "buffered_end_time" TIMESTAMPTZ(6) NOT NULL,
    "payment_required" BOOLEAN NOT NULL DEFAULT true,
    "image_id" BIGINT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."event_attendance" (
    "id" BIGSERIAL NOT NULL,
    "event_id" BIGINT NOT NULL,
    "profile_id" UUID NOT NULL,
    "checked_in" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."question" (
    "id" BIGSERIAL NOT NULL,
    "term_id" BIGINT NOT NULL,
    "question_id" VARCHAR(255) NOT NULL,
    "role" "public"."role" NOT NULL,
    "type" "public"."question_type" NOT NULL,
    "question" TEXT NOT NULL,
    "is_required" BOOLEAN NOT NULL DEFAULT false,
    "order_num" INTEGER NOT NULL,
    "max_length" INTEGER,
    "placeholder" VARCHAR(255),
    "help_text" TEXT,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."term" (
    "id" BIGSERIAL NOT NULL,
    "term_name" VARCHAR(255) NOT NULL,
    "app_release_date" TIMESTAMPTZ(6) NOT NULL,
    "app_soft_deadline" TIMESTAMPTZ(6) NOT NULL,
    "app_hard_deadline" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "term_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."profile" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "user_status" "public"."user_status" NOT NULL DEFAULT 'member',
    "has_paid" BOOLEAN NOT NULL DEFAULT false,
    "wat_iam" VARCHAR(255),
    "faculty" "public"."faculty" NOT NULL,
    "term" VARCHAR(100) NOT NULL,
    "heard_from_where" TEXT NOT NULL DEFAULT '',
    "payment_method" "public"."payment_method" NOT NULL,
    "payment_location" VARCHAR(255),
    "verifier" VARCHAR(255),
    "member_ideas" TEXT,
    "is_math_soc_member" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "application_profile_id_term_id_key" ON "public"."application"("profile_id", "term_id");

-- CreateIndex
CREATE UNIQUE INDEX "application_answer_application_id_question_id_key" ON "public"."application_answer"("application_id", "question_id");

-- CreateIndex
CREATE UNIQUE INDEX "event_attendance_event_id_profile_id_key" ON "public"."event_attendance"("event_id", "profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "question_term_id_question_id_key" ON "public"."question"("term_id", "question_id");

-- CreateIndex
CREATE UNIQUE INDEX "term_term_name_key" ON "public"."term"("term_name");

-- AddForeignKey
ALTER TABLE "public"."application" ADD CONSTRAINT "application_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."application" ADD CONSTRAINT "application_term_id_fkey" FOREIGN KEY ("term_id") REFERENCES "public"."term"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."application_answer" ADD CONSTRAINT "application_answer_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "public"."application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."application_answer" ADD CONSTRAINT "application_answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."event_attendance" ADD CONSTRAINT "event_attendance_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."event_attendance" ADD CONSTRAINT "event_attendance_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."question" ADD CONSTRAINT "question_term_id_fkey" FOREIGN KEY ("term_id") REFERENCES "public"."term"("id") ON DELETE CASCADE ON UPDATE CASCADE;
