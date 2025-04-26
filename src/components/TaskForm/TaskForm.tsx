import s from "./TaskForm.module.css";

export const TaskForm = () => {
  return (
    <form className={s.TaskForm}>
      {/* 제목 */}
      <input className={s.input} type="text" />
      {/* 설명 */}
      <input className={s.input} type="text" />

      <button className={s.button}>등록하기</button>
    </form>
  );
};
