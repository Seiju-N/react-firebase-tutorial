import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { useAuth } from "@/contexts/useAuth";

type Inputs = {
  email: string;
};

export const useHooks = () => {
  const errorMessages: { [key: string]: string } = {
    "auth/network-request-failed":
      "通信がエラーになったのか、またはタイムアウトになりました。通信環境がいい所で再度やり直してください。",
    "auth/user-disabled":
      "入力されたメールアドレスは無効（BAN）になっています。",
    "auth/invalid-email": "入力されたメールアドレスが不正です。",
    "auth/user-not-found":
      "入力されたメールアドレスは登録されていません。メールアドレスを確認してください。",
    default: "通信環境がいい所で再度やり直してください。",
  };

  const auth = useAuth();
  const [message, setMessage] = useState<string>("");

  if (!auth) {
    throw new Error(
      "The auth object was null. Make sure you use the SignUp component inside the AuthProvider component."
    );
  }
  const { resetPassword } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setMessage("");
    try {
      await resetPassword(data.email);
      setMessage("パスワードを初期化しました。");
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e);
        const errorCode = e.code as string;
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
