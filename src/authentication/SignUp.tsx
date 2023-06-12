import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  TextField,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useAuth } from "../contexts/useAuth";
import { useState } from "react";

type Inputs = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const errorMessages: { [key: string]: string } = {
  "auth/network-request-failed":
    "通信がエラーになったのか、またはタイムアウトになりました。通信環境がいい所で再度やり直してください。",
  "auth/weak-password": "パスワードが短すぎます。6文字以上を入力してください。",
  "auth/invalid-email": "メールアドレスが正しくありません",
  "auth/email-already-in-use":
    "メールアドレスがすでに使用されています。ログインするか別のメールアドレスで作成してください",
  "auth/user-disabled": "入力されたメールアドレスは無効（BAN）になっています。",
  default:
    "アカウントの作成に失敗しました。通信環境がいい所で再度やり直してください。",
};

export const SignUp = () => {
  const auth = useAuth();
  const [message, setMessage] = useState<string>("");

  if (!auth) {
    throw new Error(
      "The auth object was null. Make sure you use the SignUp component inside the AuthProvider component."
    );
  }
  const { signUp } = auth;

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setMessage("");
    try {
      await signUp(data.email, data.passwordConfirm);
      setMessage("アカウントの作成に成功しました");
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        const errorCode = e.message as string;
        setMessage(errorMessages[errorCode] || errorMessages.default);
      } else {
        // eがErrorオブジェクトでない場合の処理
        console.error("An unknown error occurred:", e);
      }
    }
  };

  return (
    <Container maxWidth={"sm"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ marginTop: 14 }}>
          <CardHeader
            sx={{ textAlign: "center", background: "#212121", color: "#fff" }}
            title="Sign UP "
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
            もしアカウントがあるなら Log In
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
              Sign UP
            </Button>
          </CardActions>
        </Card>
      </form>
    </Container>
  );
};
