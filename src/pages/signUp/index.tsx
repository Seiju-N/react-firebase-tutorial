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
import { Link } from "react-router-dom";

export const SignUp = () => {
  const {
    message,
    onSubmit,
    handleSubmit,
    control,
    errors,
    isValid,
    register,
  } = useHooks();

  return (
    <Container maxWidth={"sm"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ marginTop: 14 }}>
          <CardHeader
            sx={{ textAlign: "center", background: "#212121", color: "#fff" }}
            title="Sign Up"
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
                  {...register("email", {
                    required: true,
                    pattern:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  })}
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
            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.passwordConfirm}
                  fullWidth
                  id="password-confirm"
                  type="password"
                  label="Password-confirm"
                  placeholder="Password-confirm"
                  margin="normal"
                />
              )}
            />
            もしアカウントがあるなら<Link to="/login">ログイン</Link>
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
              Sign Up
            </Button>
          </CardActions>
        </Card>
      </form>
    </Container>
  );
};
