import { useState, useEffect } from "react";
import { LoginForm, TaskBoard, TaskForm } from "@/components";
import { supabaseClient } from "./services";

function App() {
  // 세션 추적에 사용될 상태
  const [session, setSession] = useState<any>(null);

  const fetchSession = async () => {
    const currentSession = await supabaseClient.auth.getSession();

    console.log(currentSession);

    setSession(currentSession.data.session);
  };

  const logout = async () => {
    await supabaseClient.auth.signOut();
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <main>
      {session ? (
        <>
          <TaskForm />
          <TaskBoard />
          <button onClick={logout}>로그아웃</button>
        </>
      ) : (
        <LoginForm />
      )}
    </main>
  );
}

export default App;
