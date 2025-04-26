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
        </>
      ) : (
        <LoginForm />
      )}
    </main>
  );
}

export default App;
