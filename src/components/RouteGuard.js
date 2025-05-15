import { taskAtom } from "@/store";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/lib/authenticate";
import { getTasks } from "@/lib/userData";

const PUBLIC_PATH = ["/login", "/register", "/_error"];

export default function RouteGuard({ children }) {
  const [tasks, setTasks] = useAtom(taskAtom);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  async function loadData() {
    setTasks(await getTasks());
  }

  useEffect(() => {
    loadData();

    authCheck(router.pathname);

    router.events.on("routeChangeComplete", authCheck);

    return () => router.events.off("routeChangeComplete", authCheck);
  }, []);

  function authCheck(path) {
    if (!isAuthenticated() && !PUBLIC_PATH.includes(path)) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }

  return <>{authorized && children}</>;
}
