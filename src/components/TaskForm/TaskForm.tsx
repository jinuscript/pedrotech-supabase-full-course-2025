import { useState } from "react";
import s from "./TaskForm.module.css";

export const TaskForm = () => {
  const [task, setTask] = useState({ title: "", description: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className={s.TaskForm}>
      {/* 제목 */}
      <input
        className={s.input}
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
      />
      {/* 설명 */}
      <input
        className={s.input}
        type="text"
        name="description"
        value={task.description}
        onChange={handleChange}
      />

      <button className={s.button}>등록하기</button>
    </form>
  );
};
