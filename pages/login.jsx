import jwt from "jwt-decode";
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
    const dataJwt = jwt(data.token)
    const user = {
      email: dataJwt.email,
      first_name: dataJwt.first_name,
      last_name: dataJwt.last_name,
      username: dataJwt.username,
      token: data.token
    }
    dispatch({ type: "login", value: user })


    const returnUrl = router.query.returnUrl || "/"
    // router.push(returnUrl)
  }
  return (
    <BaseLayout>
      <LoginForm handleLogin={handleLogin} />
    </BaseLayout>
  )
}