export interface Book {
  id: number
  title: string
  author: string
  genre: string
  description: string
  coverUrl: string | null
  publishedDate: string // ISO date
  rating: number // 0..5
  createdAt: string // ISO date
}

export interface PaginatedBooks {
  items: Book[]
  page: number
  pageSize: number
  total: number
}


