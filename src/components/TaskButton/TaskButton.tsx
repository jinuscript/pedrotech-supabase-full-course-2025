import s from "./TaskButton.module.css";

interface TaskButton {
  type: "수정" | "삭제";
}

export const TaskButton = ({ type }: TaskButton) => {
  if (type === "수정") {
    return <button className={s.TaskButton}>수정</button>;
  }

  if (type === "삭제") {
    return <button className={s.TaskButton}>삭제</button>;
  }
};
