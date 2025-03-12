export interface Response<T> {
    statusCode: number;
    message: string;
    data: T;
  }

export interface PaginationResponseResult<T> {
    statusCode: number;
    message: string;
    data: PaginationResponse<T>;
  }


  
  export interface PaginationResponse<T> {
    data: {
        results: T;
        pagination: Pagination;
    }
  }
  
  export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasMore: boolean;
  }