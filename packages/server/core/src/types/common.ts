// Common types shared across all server packages

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
