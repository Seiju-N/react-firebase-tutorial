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
import validation, { resolver } from "@/utils/validation";

const schema = validation.object().shape({
  email: validation
    .string()
    .required("Email is required")
    .email("Email is not valid"),
  password: validation
    .string()
    .min(6, "Password must be at least 6 characters"),
  passwordConfirm: validation
    .string()
    .oneOf([validation.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
});

export const UpdateProfile = () => {
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [email, setEmail] = useState(currentUser?.email);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [emailValified, setEmailValified] = useState<boolean | undefined>(
    false
  );

  const { register, handleSubmit, setValue } = useForm({
    resolver: resolver(schema),
  });
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
    setValue("email", email);
    setEmailValified(currentUser?.emailVerified);
  }, [
    email,
    password,
    passwordConfirm,
    currentUser?.email,
    setValue,
    currentUser?.emailVerified,
  ]);

  const handleUpdateProfile: SubmitHandler<FieldValues> = async (data) => {
    setEmail(data.email);
    setPassword(data.password);

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
        setIsButtonDisabled(false);
        setOpen(true);
        setMessage("プロフィールを更新しました");
        setTimeout(function () {
          console.log("リダレクト処理");
          navigate("/dashboard");
        }, 2000);
      })
      .catch((e) => {
        console.log(e);
        setIsButtonDisabled(false);
        setOpen(true);
        setMessage("プロフィールの更新に失敗しました");
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
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
          />
          <TextField
            fullWidth
            id="email"
            type="email"
            label="Email"
            margin="normal"
            disabled={!emailValified}
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
            })}
          />
          <TextField
            fullWidth
            id="password"
            type="password"
            label="Password"
            placeholder="Password"
            margin="normal"
            {...register("password", { minLength: 6 })}
          />
          <TextField
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
