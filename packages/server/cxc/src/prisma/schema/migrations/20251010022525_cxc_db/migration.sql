-- CreateEnum
CREATE TYPE "public"."role_enum" AS ENUM ('hacker', 'volunteer', 'admin', 'default');

-- CreateEnum
CREATE TYPE "public"."application_status_enum" AS ENUM ('draft', 'submitted', 'offered', 'accepted', 'rejected', 'waitlisted');

-- CreateTable
CREATE TABLE "public"."applications" (
    "id" BIGSERIAL NOT NULL,
    "profile_id" UUID NOT NULL,
    "status" "public"."application_status_enum" NOT NULL DEFAULT 'draft',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submitted_at" TIMESTAMP(3),

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."event_attendance" (
    "id" BIGSERIAL NOT NULL,
    "event_id" BIGINT NOT NULL,
    "profile_id" UUID NOT NULL,
    "checked_in" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."events" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "registration_required" BOOLEAN NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "start_time" TIMESTAMP(3) NOT NULL,
    "buffered_start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "buffered_end_time" TIMESTAMP(3) NOT NULL,
    "payment_required" BOOLEAN NOT NULL DEFAULT true,
    "image_id" BIGINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."profiles" (
    "id" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "role" "public"."role_enum" NOT NULL DEFAULT 'default',
    "nfc_id" BIGINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);


-- CreateIndex
CREATE UNIQUE INDEX "applications_profile_id_key" ON "public"."applications"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "event_attendance_event_id_profile_id_key" ON "public"."event_attendance"("event_id", "profile_id");

-- AddForeignKey
ALTER TABLE "public"."applications" ADD CONSTRAINT "applications_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."event_attendance" ADD CONSTRAINT "event_attendance_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."event_attendance" ADD CONSTRAINT "event_attendance_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
