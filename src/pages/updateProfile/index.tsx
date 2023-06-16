import {
  Typography,
  Paper,
  Button,
  TextField,
  Box,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/useAuth";

export const UpdateProfile = () => {
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [email, setEmail] = useState(currentUser?.email);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(false);

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (password.trim() !== passwordConfirm.trim()) {
      setIsButtonDisabled(true);
    } else if (email?.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
    if (email !== currentUser?.email && password) {
      setIsButtonDisabled(true);
    }
  }, [email, password, passwordConfirm, currentUser?.email]);

  const handleUpdateProfile: SubmitHandler<FieldValues> = async (data) => {
    setEmail(data.email);
    setPassword(data.password);
    setOpen(true);

    //処理の初期化
    const promises = [];

    //更新処理をセット
    if (data.password) {
      console.log("updatePassword");
      promises.push(updatePassword(data.password));
    }
    if (data.email !== currentUser?.email && data.email) {
      console.log("updateEmail");
      promises.push(updateEmail(data.email));
    }

    Promise.all(promises)
      .then(() => {
        setIsError(false);
        setIsButtonDisabled(false);
        setTimeout(function () {
          console.log("リダレクト処理");
          navigate("/dashboard");
        }, 2000);
      })
      .catch((e) => {
        console.log(e);
        setIsError(true);
        setIsButtonDisabled(false);
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  const handlePasswordConfirmChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    setPasswordConfirm(event.target.value);
  };

  const handleClose = (
    _event: React.SyntheticEvent<Element, Event> | Event,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box
      sx={{
        padding: 16,
        margin: "auto",
        maxWidth: 480,
      }}
    >
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        プロフィールの更新
      </Typography>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleUpdateProfile)}
      >
        <Paper sx={{ padding: 16 }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} />
          <TextField
            error={isError}
            fullWidth
            id="email"
            type="email"
            label="Email"
            margin="normal"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
            })}
          />
          <TextField
            error={isError}
            fullWidth
            id="password"
            type="password"
            label="Password"
            placeholder="Password"
            margin="normal"
            {...register("password", { minLength: 6 })}
          />
          <TextField
            error={isError}
            fullWidth
            id="password-confirm"
            name="password-confirm"
            type="password"
            label="Password-confirm"
            placeholder="Password-confirm"
            margin="normal"
            onChange={handlePasswordConfirmChange}
          />
          <Button
            variant="contained"
            size="large"
            fullWidth
            color="primary"
            sx={{
              marginTop: 2,
              flexGrow: 1,
            }}
            onClick={handleSubmit(handleUpdateProfile)}
            disabled={isButtonDisabled}
          >
            プロフィールを更新
          </Button>
        </Paper>
        <Typography paragraph>
          ※表示名とアバター以外は公表される事はありません
        </Typography>
        <Typography paragraph>
          <Link to="/dashboard">dashboard</Link>に戻る
        </Typography>
      </form>
    </Box>
  );
};
