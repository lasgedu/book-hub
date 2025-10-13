import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setGenre, setSort } from "../store/filtersSlice";

const GENRES = ["All", "Science Fiction", "Fantasy", "Mystery", "Romance", "Non-fiction"];

export const FiltersPanel = () => {
  const dispatch = useDispatch();
  const { genre, sort } = useSelector((state: RootState) => state.filters);

  const handleGenre = (event: SelectChangeEvent<string>) => {
    dispatch(setGenre(event.target.value));
  };

  const handleSort = (
    _event: React.MouseEvent<HTMLElement>,
    newSort: "title" | "rating" | "year" | null
  ) => {
    if (newSort) dispatch(setSort(newSort));
  };

  return (
    <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="genre-select">Genre</InputLabel>
        <Select
          labelId="genre-select"
          label="Genre"
          value={genre}
          onChange={handleGenre}
        >
          {GENRES.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ToggleButtonGroup
        exclusive
        value={sort}
        onChange={handleSort}
        aria-label="sort order"
      >
        <ToggleButton value="title">Title</ToggleButton>
        <ToggleButton value="rating">Rating</ToggleButton>
        <ToggleButton value="year">Newest</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};