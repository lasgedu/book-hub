import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  search: string;
  genre: string;
  sort: "title" | "rating" | "year";
  page: number;
}

const initialState: FiltersState = {
  search: "",
  genre: "All",
  sort: "title",
  page: 1
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
    },
    setGenre(state, action: PayloadAction<string>) {
      state.genre = action.payload;
      state.page = 1;
    },
    setSort(state, action: PayloadAction<FiltersState["sort"]>) {
      state.sort = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    resetFilters() {
      return initialState;
    }
  }
});

export const { setSearch, setGenre, setSort, setPage, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;