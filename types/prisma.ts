// API response types for client components
export interface ApiResponse<T> {
   data: T;
   success: boolean;
   message?: string;
   error?: string;
}

export interface PaginatedResponse<T> {
   data: T[];
   total: number;
   page: number;
   pageSize: number;
   totalPages: number;
   hasMore: boolean;
}

export interface ApiError {
   message: string;
   code?: string;
   status?: number;
}

// Search and filter types
export interface ToolsFilterParams {
   search?: string;
   categories?: string[];
   tags?: string[];
   pricing?: string[];
   rating?: number;
   sort?: 'newest' | 'popular' | 'rating' | 'name';
   page?: number;
   pageSize?: number;
}

export interface BlogsFilterParams {
   search?: string;
   categories?: string[];
   tags?: string[];
   sort?: 'newest' | 'popular' | 'name';
   page?: number;
   pageSize?: number;
}
