import { Grid } from "@mui/material";
import { Book } from "../services/api";
import { BookCard } from "./BookCard";

interface Props {
  books: Book[];
}

export const BookList = ({ books }: Props) => {
  return (
    <Grid container spacing={3}>
      {books.map((book) => (
        <Grid key={book.id} item xs={12} sm={6} md={4} lg={3}>
          <BookCard book={book} />
        </Grid>
      ))}
    </Grid>
  );
};