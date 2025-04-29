import { supabaseClient } from "@/services/supabase-client";
import { ChangeEvent, useState } from "react";
import s from "./TaskForm.module.css";
import { Session } from "@supabase/supabase-js";

export const TaskForm = ({ session }: { session: Session }) => {
  const [task, setTask] = useState({ title: "", description: "" });
  const [taskImage, setTaskImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUrl: string | null = null;

    if (taskImage) {
      // 수파베이스한테 storage에 저장시키고 url을 받아오는 함수
      imageUrl = await uploadImage(taskImage);
    }

    // supabase로 POST 기능 수행
    const { error } = await supabaseClient
      .from("tasks")
      .insert({ ...task, email: session.user.email, image_url: imageUrl })
      .single();

    // 에러 핸들링
    if (error) {
      console.error("할일추가 중 에러 발생!: ", error.message);
      return;
    }

    // 상태 초기화
    setTask({ title: "", description: "" });
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const filePath = `${file.name}-${Date.now()}`;

    const { error } = await supabaseClient.storage
      .from("tasks-images")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading image: ", error.message);
      return null;
    }

    const { data } = await supabaseClient.storage
      .from("tasks-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setTaskImage(e.target.files[0]);
    }
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

      <input type="file" accept="image/*" onChange={handleFileChange} />

      <button className={s.button}>등록하기</button>
    </form>
  );
};
