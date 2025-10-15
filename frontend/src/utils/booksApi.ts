import axios from 'axios'
import { PaginatedBooks, Book } from '../types/book'

export interface BooksQuery {
  query?: string
  genre?: string | null
  author?: string | null
  publishedFrom?: string | null
  publishedTo?: string | null
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  pageSize?: number
}

export const booksApi = {
  async list(params: BooksQuery): Promise<PaginatedBooks> {
    const { data } = await axios.get('/api/books', { params })
    return data
  },
  async get(id: number): Promise<Book> {
    const { data } = await axios.get(`/api/books/${id}`)
    return data
  }
}


