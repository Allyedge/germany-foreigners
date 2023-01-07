import { Inter } from "@next/font/google";
import type { AppProps } from "next/app";
import { Provider as StyletronProvider } from "styletron-react";
import { DarkTheme, BaseProvider } from "baseui";
import { styletron } from "../lib/styletron";

const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={inter.className}>
      <StyletronProvider value={styletron}>
        <BaseProvider theme={DarkTheme}>
          <Component {...pageProps} />
        </BaseProvider>
      </StyletronProvider>
    </main>
  );
};

export default App;
