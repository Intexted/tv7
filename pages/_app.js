import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { IndexProvider } from "../context/context";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <IndexProvider>
        <Component {...pageProps} />
      </IndexProvider>
    </SessionProvider>
  );
}

export default App;
