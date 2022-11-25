import { data } from "autoprefixer";
import { useRouter } from "next/router";
import LoginForm from "../components/LoginForm";
import { useUserContext } from "../context/UserContext";
import BaseLayout from "../layouts/BaseLayout";

export default function Login() {
  const { state, dispatch } = useUserContext()
  const router = useRouter()

  const handleLogin = (data) => {
    dispatch({ type: "login", value: data.token })
    router.push("/")
  }
  return (
    <BaseLayout>
      <LoginForm handleLogin={handleLogin} />
    </BaseLayout>
  )
}