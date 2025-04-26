import { supabaseClient } from "@/services/supabase-client";
import { useState } from "react";
import s from "./TaskForm.module.css";

export const TaskForm = () => {
  const [task, setTask] = useState({ title: "", description: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // supabase로 POST 기능 수행
    const { error } = await supabaseClient.from("tasks").insert(task).single();

    // 에러 핸들링
    if (error) {
      console.error("할일추가 중 에러 발생!: ", error.message);
    }

    // 상태 초기화
    setTask({ title: "", description: "" });
  };

  return (
    <form className={s.TaskForm} onSubmit={handleSubmit}>
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
