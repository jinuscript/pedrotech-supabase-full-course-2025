import { useState, useEffect } from "react";
import { supabaseClient } from "@/services";
import { TaskButton } from "@/components";
import s from "./TaskBoard.module.css";

interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

export const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    // supabase로 GET 통신
    const { error, data } = await supabaseClient
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });

    // 에러핸들링
    if (error) {
      console.error("할일호출 중 에러: ", error.message);
      return;
    }

    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ol className={s.TaskBoard}>
      {tasks.map((task) => {
        return (
          <li key={task.id}>
            <p>{task.title}</p>
            <p>{task.description}</p>
            <div>
              <TaskButton type="수정" />
              <TaskButton type="삭제" />
            </div>
          </li>
        );
      })}
    </ol>
  );
};
