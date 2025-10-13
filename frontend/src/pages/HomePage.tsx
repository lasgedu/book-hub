import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BookList } from "../components/BookList";
import { FiltersPanel } from "../components/FiltersPanel";
import { SearchBar } from "../components/SearchBar";
import { useBooks } from "../hooks/useBooks";
import { RootState } from "../store";
import { setPage } from "../store/filtersSlice";

export const HomePage = () => {
  const dispatch = useDispatch();
  const { page } = useSelector((state: RootState) => state.filters);
  const { items, total, loading } = useBooks();
  const totalPages = Math.ceil(total / 8);

  return (
    <Box mt={4}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Discover Your Next Favorite Book
      </Typography>
      <SearchBar />
      <Box mt={2} mb={3}>
        <FiltersPanel />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <BookList books={items} />
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_event, value) => dispatch(setPage(value))}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};