import { data } from "autoprefixer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { useUserContext } from "../context/UserContext";
import BaseLayout from "../layouts/BaseLayout";

export default function Login() {
  const { state, dispatch } = useUserContext()
  const router = useRouter()

  useEffect(() => {
    // redirect to home if already logged in
    if (state.token) {
      router.push("/")
    }
  })

  const handleLogin = (data) => {
    dispatch({ type: "login", value: data.token })

    const returnUrl = router.query.returnUrl || "/"
    router.push(returnUrl)
  }
  return (
    <BaseLayout>
      <LoginForm handleLogin={handleLogin} />
    </BaseLayout>
  )
}