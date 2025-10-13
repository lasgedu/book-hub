import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <AppBar position="sticky" color="default" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            Book Hub
          </Typography>
          {isAuthenticated ? (
            <Button onClick={handleLogout} color="secondary">
              Logout
            </Button>
          ) : (
            <Button component={RouterLink} to="/login" color="primary">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box>
        <Container>{children}</Container>
      </Box>
    </>
  );
};