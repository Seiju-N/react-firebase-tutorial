import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <Stack>
      Dashboard：
      {message && <div>{message}</div>}
      <div>
        <strong>Email:</strong> {currentUser?.email}
      </div>
      <div>
        <strong>ハンドル名:</strong> {currentUser?.displayName}
      </div>
      <Button color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </Stack>
  );
};
