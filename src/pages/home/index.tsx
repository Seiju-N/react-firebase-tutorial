import { ListItem, Stack } from "@mui/material";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <Stack>
      Home：
      <ListItem component={Link} to="/login">
        login
      </ListItem>
      <ListItem component={Link} to="/signup">
        signup
      </ListItem>
    </Stack>
  );
};
