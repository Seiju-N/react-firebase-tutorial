import { Button, Stack, Typography, Paper, Alert } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/useAuth";

export const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      setMessage("Failed to log out");
      console.log(err);
    }
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: "1rem", maxWidth: "600px", margin: "auto" }}
    >
      <Stack spacing={2}>
        <Typography variant="h4" component="div">
          Dashboard:
        </Typography>
        {message && <Alert severity="error">{message}</Alert>}
        <Typography variant="body1" component="div">
          <Typography component="span" variant="body1" fontWeight="bold" mr={1}>
            Email :
          </Typography>
          {currentUser?.email}
        </Typography>
        <Typography variant="body1" component="div">
          <Typography component="span" variant="body1" fontWeight="bold">
            名前 :
          </Typography>
          {currentUser?.displayName}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
      <Link to="/updateProfile">Update Profile</Link>
    </Paper>
  );
};
