import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { IndexProvider } from "../context/context";

import { Transtlation } from "../components/Translation";
import { useEffect } from "react";
import useOneSignal from "../utils/useOneSignal";
Transtlation();

function App({ Component, pageProps: { session, ...pageProps } }) {
  useOneSignal();
  return (
    <SessionProvider session={session}>
      <IndexProvider>
        <Component {...pageProps} />
      </IndexProvider>
    </SessionProvider>
  );
}

export default App;
