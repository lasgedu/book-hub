import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setSearch } from "../store/filtersSlice";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.filters.search);

  return (
    <TextField
      fullWidth
      label="Search by title or author"
      value={search}
      onChange={(event) => dispatch(setSearch(event.target.value))}
    />
  );
};