import { RouteGuard } from "../components/RouteGuard";
import { UserWrapper } from "../context/UserContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserWrapper>
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </UserWrapper>
  );
}

export default MyApp;
