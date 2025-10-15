import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SortField = 'title' | 'author' | 'publishedDate' | 'rating' | 'createdAt'
export type SortOrder = 'asc' | 'desc'

export interface FilteringState {
  query: string
  genre: string | null
  author: string | null
  publishedFrom: string | null
  publishedTo: string | null
  sortBy: SortField
  sortOrder: SortOrder
  page: number
  pageSize: number
}

const initialState: FilteringState = {
  query: '',
  genre: null,
  author: null,
  publishedFrom: null,
  publishedTo: null,
  sortBy: 'createdAt',
  sortOrder: 'desc',
  page: 1,
  pageSize: 12
}

const filteringSlice = createSlice({
  name: 'filtering',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) { state.query = action.payload; state.page = 1 },
    setGenre(state, action: PayloadAction<string | null>) { state.genre = action.payload; state.page = 1 },
    setAuthor(state, action: PayloadAction<string | null>) { state.author = action.payload; state.page = 1 },
    setPublishedFrom(state, action: PayloadAction<string | null>) { state.publishedFrom = action.payload; state.page = 1 },
    setPublishedTo(state, action: PayloadAction<string | null>) { state.publishedTo = action.payload; state.page = 1 },
    setSort(state, action: PayloadAction<{ sortBy: SortField, sortOrder: SortOrder }>) {
      state.sortBy = action.payload.sortBy
      state.sortOrder = action.payload.sortOrder
    },
    setPage(state, action: PayloadAction<number>) { state.page = action.payload },
    setPageSize(state, action: PayloadAction<number>) { state.pageSize = action.payload; state.page = 1 },
    resetFilters() { return initialState }
  }
})

export const {
  setQuery,
  setGenre,
  setAuthor,
  setPublishedFrom,
  setPublishedTo,
  setSort,
  setPage,
  setPageSize,
  resetFilters
} = filteringSlice.actions

export default filteringSlice.reducer


