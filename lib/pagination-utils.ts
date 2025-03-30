export interface PaginationResult<T> {
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    pages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export function getPaginationParams(searchParams: URLSearchParams): { page: number; limit: number } {
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  return {
    page: isNaN(page) || page < 1 ? 1 : page,
    limit: isNaN(limit) || limit < 1 || limit > 100 ? 10 : limit,
  }
}

export function createPaginationResult<T>(data: T[], total: number, page: number, limit: number): PaginationResult<T> {
  const pages = Math.ceil(total / limit)

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      pages,
      hasNext: page < pages,
      hasPrev: page > 1,
    },
  }
}

