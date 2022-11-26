import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";

export default function Logout() {
  const { dispatch } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    dispatch({ type: "login" });
    router.push("/login");
  }, []);
}
