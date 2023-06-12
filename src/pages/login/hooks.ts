import { useAuth } from "@/contexts/useAuth";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export const useHooks = () => {
  const errorMessages: { [key: string]: string } = {
    "auth/network-request-failed":
      "通信がエラーになったのか、またはタイムアウトになりました。通信環境がいい所で再度やり直してください。",
    "auth/weak-password":
      "パスワードが短すぎます。6文字以上を入力してください。",
    "auth/invalid-email": "メールアドレスが正しくありません",
    "auth/user-disabled":
      "入力されたメールアドレスは無効（BAN）になっています。",
    default:
      "ログインに失敗しました。通信環境がいい所で再度やり直してください。",
  };

  const auth = useAuth();
  const [message, setMessage] = useState<string>("");

  if (!auth) {
    throw new Error(
      "The auth object was null. Make sure you use the SignUp component inside the AuthProvider component."
    );
  }
  const { login } = auth;

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setMessage("");
    try {
      await login(data.email, data.password);
      setMessage("ログインに成功しました");
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        const errorCode = e.message as string;
        setMessage(errorMessages[errorCode] || errorMessages.default);
      } else {
        console.error("An unknown error occurred:", e);
      }
    }
  };

  return {
    message,
    onSubmit,
    handleSubmit,
    control,
    errors,
    isValid,
  };
};
