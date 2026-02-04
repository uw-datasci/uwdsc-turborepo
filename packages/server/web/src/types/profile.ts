// Enums matching Prisma schema
export type UserRole = "member" | "admin" | "exec";

export type Faculty =
  | "math"
  | "engineering"
  | "science"
  | "arts"
  | "health"
  | "environment"
  | "other_non_waterloo";

export type PaymentMethod = "cash" | "online" | "math_soc";

// Profile type matching the database schema
export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  user_role: UserRole;
  has_paid: boolean;
  wat_iam: string | null;
  faculty: Faculty | null;
  term: string | null;
  heard_from_where: string | null;
  payment_method: PaymentMethod | null;
  payment_location: string | null;
  verifier: string | null;
  member_ideas: string | null;
  is_math_soc_member: boolean;
}

// Profile with email (joined with auth.users) - used by getAllProfiles
export interface ProfileWithEmail {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  user_role: UserRole;
  has_paid: boolean;
  is_math_soc_member: boolean;
  faculty: Faculty | null;
  term: string | null;
  wat_iam: string | null;
}
