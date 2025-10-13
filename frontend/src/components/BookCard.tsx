import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Book } from "../services/api";

interface Props {
  book: Book;
}

export const BookCard = ({ book }: Props) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/books/${book.id}`)}>
        <CardMedia
          component="img"
          height="220"
          image={book.cover_url}
          alt={book.title}
        />
        <CardContent>
          <Typography variant="h6" fontWeight={700} noWrap>
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {book.author}
          </Typography>
          <Chip size="small" label={book.genre} sx={{ mt: 1 }} />
          <Rating
            size="small"
            value={book.rating}
            precision={0.5}
            readOnly
            sx={{ mt: 1 }}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};