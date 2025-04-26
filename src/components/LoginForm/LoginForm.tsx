import { useState } from "react";
import { supabaseClient } from "@/services";
import s from "./LoginForm.module.css";

export const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // 로그인
      const { error: signInError } =
        await supabaseClient.auth.signInWithPassword({
          email,
          password,
        });
      if (signInError) {
        console.error("로그인 에러: ", signInError.message);
        return;
      }
    } else {
      // 회원가입
      const { error: signUpError } = await supabaseClient.auth.signUp({
        email,
        password,
      });
      if (signUpError) {
        console.error("회원가입 에러: ", signUpError.message);
        return;
      }
    }
  };

  return (
    <form className={s.LoginForm} onSubmit={handleFormSubmit}>
      <p>{isLogin ? "로그인" : "회원가입"}</p>
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <input type="text" onChange={(e) => setPassword(e.target.value)} />

      <button>{isLogin ? "로그인" : "회원가입"}</button>
      <button onClick={() => setIsLogin(!isLogin)}>바꾸기</button>
    </form>
  );
};
