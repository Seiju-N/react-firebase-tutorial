import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useHooks } from "./hooks";

export const Login = () => {
  const { message, onSubmit, handleSubmit, control, errors, isValid } =
    useHooks();

  return (
    <Container maxWidth={"sm"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ marginTop: 14 }}>
          <CardHeader
            sx={{ textAlign: "center", background: "#212121", color: "#fff" }}
            title="Login"
          />
          <CardContent>
            {message && <>{message}</>}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.email}
                  fullWidth
                  id="email"
                  type="email"
                  label="Email"
                  placeholder="Email"
                  margin="normal"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.password}
                  fullWidth
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  margin="normal"
                />
              )}
            />
            アカウントが無い場合はこちら
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              sx={{ backgroundColor: "red", marginTop: 2, flexGrow: 1 }}
              type="submit"
              disabled={!isValid}
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </form>
    </Container>
  );
};
