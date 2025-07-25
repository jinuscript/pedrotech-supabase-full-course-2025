import { useState, useEffect } from "react";
import { supabaseClient } from "@/services";
import { TaskButton } from "@/components";
import s from "./TaskBoard.module.css";

interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
  image_url: string;
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

  useEffect(() => {
    const channel = supabaseClient.channel("tasks-channel");
    channel
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "tasks" },
        (payload) => {
          const newTask = payload.new as Task;
          setTasks((prev) => [...prev, newTask]);
        }
      )
      .subscribe((status) => {
        console.log("Subscription: ", status);
      });
  }, []);

  return (
    <ol className={s.TaskBoard}>
      {tasks.map((task) => {
        return (
          <li key={task.id}>
            <p>{task.title}</p>
            <p>{task.description}</p>
            <img
              src={task.image_url}
              alt={task.image_url}
              style={{ height: "70px" }}
            />
            <div>
              <TaskButton type="수정" id={task.id} />
              <TaskButton type="삭제" id={task.id} />
            </div>
          </li>
        );
      })}
    </ol>
  );
};
