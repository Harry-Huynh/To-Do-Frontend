import { taskAtom } from "@/store";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated, getToken, removeToken } from "@/lib/authenticate";
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

  useEffect(() => {
    const token = getToken();
    let timer;

    if (token) {
      try {
        const { exp } = JSON.parse(atob(token.split(".")[1]));
        const timeout = exp * 1000 - Date.now();

        if (timeout > 0) {
          timer = setTimeout(() => {
            removeToken();
            router.push("/login");
          }, timeout);
        } else {
          removeToken();
          router.push("/login");
        }
      } catch {
        removeToken();
        router.push("/login");
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
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
