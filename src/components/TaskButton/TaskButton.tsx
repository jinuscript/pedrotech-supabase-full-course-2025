import { useState } from "react";
import { supabaseClient } from "@/services";
import s from "./TaskButton.module.css";

interface TaskButton {
  type: "수정" | "삭제";
  id: number;
}

export const TaskButton = ({ type, id }: TaskButton) => {
  const [newDescription, setNewDescription] = useState("");

  // DELETE 기능 수행
  const deleteTask = async (id: number) => {
    const { error } = await supabaseClient.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("삭제 중 에러 발생: ", error.message);
      return;
    }
  };

  const updateTask = async (id: number) => {
    const { error } = await supabaseClient
      .from("tasks")
      .update({ description: newDescription })
      .eq("id", id);

    if (error) {
      console.error("업데이트 중 에러 발생: ", error.message);
      return;
    }

    setNewDescription("");
  };

  if (type === "수정") {
    return (
      <div>
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button className={s.TaskButton} onClick={() => updateTask(id)}>
          수정
        </button>
      </div>
    );
  }

  if (type === "삭제") {
    return (
      <button className={s.TaskButton} onClick={() => deleteTask(id)}>
        삭제
      </button>
    );
  }
};
