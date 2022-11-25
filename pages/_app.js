import { UserWrapper } from "../context/UserContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserWrapper>
      <Component {...pageProps} />
    </UserWrapper>
  );
}

export default MyApp;
