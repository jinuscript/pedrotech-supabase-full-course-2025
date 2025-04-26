import { supabaseClient } from "@/services";
import s from "./TaskButton.module.css";

interface TaskButton {
  type: "수정" | "삭제";
  id: number;
}

export const TaskButton = ({ type, id }: TaskButton) => {
  // DELETE 기능 수행
  const deleteTask = async (id: number) => {
    const { error } = await supabaseClient.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("삭제 중 에러 발생: ", error.message);
      return;
    }
  };

  if (type === "수정") {
    return <button className={s.TaskButton}>수정</button>;
  }

  if (type === "삭제") {
    return (
      <button className={s.TaskButton} onClick={() => deleteTask(id)}>
        삭제
      </button>
    );
  }
};
