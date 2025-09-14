export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// You can extend this interface based on your actual database schema
// For example:
// export interface Database {
//   public: {
//     Tables: {
//       users: {
//         Row: {
//           id: string
//           email: string
//           created_at: string
//         }
//         Insert: {
//           id?: string
//           email: string
//           created_at?: string
//         }
//         Update: {
//           id?: string
//           email?: string
//           created_at?: string
//         }
//       }
//     }
//   }
// }
