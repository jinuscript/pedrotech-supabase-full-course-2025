import s from "./LoginForm.module.css";

export const LoginForm = () => {
  return (
    <form className={s.LoginForm}>
      <input type="text" />
      <input type="text" />

      <button>로그인</button>
      <button>회원가입</button>
    </form>
  );
};
