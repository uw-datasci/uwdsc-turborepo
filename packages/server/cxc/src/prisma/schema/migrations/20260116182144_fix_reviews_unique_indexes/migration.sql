-- Drop incorrect unique indexes that prevent multiple reviews
-- These indexes incorrectly prevent:
-- 1. Multiple reviewers from reviewing the same application (idx_reviews_application_id)
-- 2. A reviewer from reviewing multiple applications (idx_reviews_reviewer_id)
--
-- The correct constraint is already in place:
-- CONSTRAINT "reviews_application_id_reviewer_id_key" UNIQUE ("application_id", "reviewer_id")
-- This correctly prevents a reviewer from reviewing the same application twice,
-- but allows reviewers to review multiple different applications.

DROP INDEX IF EXISTS "public"."idx_reviews_application_id";
DROP INDEX IF EXISTS "public"."idx_reviews_reviewer_id";

-- Remove all RLS policies from the reviews table
-- These policies restrict access based on admin role and reviewer_id
-- Removing them allows unrestricted access (access control handled at application level)

DROP POLICY IF EXISTS "Admins can insert reviews" ON "public"."reviews";
DROP POLICY IF EXISTS "Admins can update their own reviews" ON "public"."reviews";
DROP POLICY IF EXISTS "Admins can view all reviews" ON "public"."reviews";
DROP POLICY IF EXISTS "Reviewers can view their own reviews" ON "public"."reviews";

-- Disable RLS on the reviews table
ALTER TABLE "public"."reviews" DISABLE ROW LEVEL SECURITY;
