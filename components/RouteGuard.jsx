import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUserContext } from "../context/UserContext";

const RouteGuard = ({ children }) => {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const { state } = useUserContext()

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath)

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false)
    router.events.on('routeChangeStart', hideContent)

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent)
      router.events.off('routeChangeComplete', authCheck)
    }
  }, [])

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ['/login', '/register']
    const path = url.split('?')[0]
    const state = JSON.parse(localStorage.getItem("state"))

    if (!state.token && !publicPaths.includes(path)) {
      setAuthorized(false)
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath }
      })
    } else {
      setAuthorized(true)
    }
  }

  return (authorized && children)
}



export { RouteGuard }