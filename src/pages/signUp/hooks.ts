import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { useAuth } from "@/contexts/useAuth";

type Inputs = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export const useHooks = () => {
  const errorMessages: { [key: string]: string } = {
    "auth/network-request-failed":
      "通信がエラーになったのか、またはタイムアウトになりました。通信環境がいい所で再度やり直してください。",
    "auth/weak-password":
      "パスワードが短すぎます。6文字以上を入力してください。",
    "auth/invalid-email": "メールアドレスが正しくありません",
    "auth/email-already-in-use":
      "メールアドレスがすでに使用されています。ログインするか別のメールアドレスで作成してください",
    "auth/user-disabled":
      "入力されたメールアドレスは無効（BAN）になっています。",
    default:
      "アカウントの作成に失敗しました。通信環境がいい所で再度やり直してください。",
  };

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
    register,
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
      setMessage("アカウント作成のメールを送信しました。");
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e);
        const errorCode = e.code as string;
        setMessage(errorMessages[errorCode] || errorMessages.default);
      } else {
        // eがErrorオブジェクトでない場合の処理
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
    register,
  };
};
