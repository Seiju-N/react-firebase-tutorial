import { ListItem, Stack } from "@mui/material";
import { Link } from "react-router-dom";
export const Dashboard = () => {
  return (
    <Stack>
      Dashboard：
      <ListItem component={Link} to="/login">
        Login
      </ListItem>
      <ListItem component={Link} to="/signup">
        SignUp
      </ListItem>
    </Stack>
  );
};
