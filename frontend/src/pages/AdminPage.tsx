import {
  Alert,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createBook, Book } from "../services/api";

export const AdminPage = () => {
  const { token } = useAuth();
  const [form, setForm] = useState<Partial<Book>>({
    title: "",
    author: "",
    genre: "",
    description: "",
    publication_year: new Date().getFullYear(),
    rating: 4
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!token) return;
    try {
      await createBook(form, token);
      setSuccess("Book added successfully");
      setForm((prev) => ({ ...prev, title: "", author: "", description: "" }));
    } catch (err) {
      setError("Unable to add book");
    }
  };

  return (
    <Box py={4}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Add New Book</Typography>
        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Title"
                value={form.title ?? ""}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, title: event.target.value }))
                }
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Author"
                value={form.author ?? ""}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, author: event.target.value }))
                }
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Genre"
                value={form.genre ?? ""}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, genre: event.target.value }))
                }
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                label="Year"
                type="number"
                value={form.publication_year ?? ""}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    publication_year: Number(event.target.value)
                  }))
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                label="Rating"
                type="number"
                inputProps={{ step: 0.1, min: 0, max: 5 }}
                value={form.rating ?? 0}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    rating: Number(event.target.value)
                  }))
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={form.description ?? ""}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    description: event.target.value
                  }))
                }
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>
    </Box>
  );
};