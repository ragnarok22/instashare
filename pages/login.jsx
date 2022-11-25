import LoginForm from "../components/LoginForm";
import { useUserContext } from "../context/UserContext";
import BaseLayout from "../layouts/BaseLayout";

export default function Login() {
  const { state, dispatch } = useUserContext()

  const handleLogin = (e) => {
    // request login
    // dispatch({ type: "login", value: "John Doe" })
  }
  return (
    <BaseLayout>
      <LoginForm handleLogin={handleLogin} />
    </BaseLayout>
  )
}