import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { HomePage } from "./pages/HomePage";
import { BookDetailPage } from "./pages/BookDetailPage";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminPage } from "./pages/AdminPage";
import { Layout } from "./components/Layout/Layout";

const theme = createTheme({
  palette: {
    primary: { main: "#556cd6" },
    secondary: { main: "#19857b" }
  }
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  </ThemeProvider>
);

export default App;