import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Chip,
  Container,
  Rating,
  Typography,
  Avatar,
  Stack
} from "@mui/material";
import { Book, fetchBook } from "../services/api";

export const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchBook(id).then(setBook);
  }, [id]);

  if (!book) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography>Loading book...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
        <Avatar
          variant="rounded"
          src={book.cover_url}
          sx={{ width: 240, height: 320 }}
        />
        <Box>
          <Typography variant="h3" fontWeight={700}>
            {book.title}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {book.author}
          </Typography>
          <Chip label={book.genre} color="primary" sx={{ mt: 2 }} />
          <Box mt={3}>
            <Rating value={book.rating} precision={0.5} readOnly />
          </Box>
          <Typography mt={3} lineHeight={1.8}>
            {book.description}
          </Typography>
          <Typography mt={2} color="text.secondary">
            Published: {book.publication_year ?? "Unknown"}
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};