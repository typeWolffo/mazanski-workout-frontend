import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppInitialProps, AppProps } from "next/app";
import { wrapper } from "../redux/store";
import "../styles/globals.css";
import { AuthProvider } from "../context/authContext";

const colors = {
  brand: {
    dark: "#0F0E11",
    pastel: "#23252D",
    gray: "#2B2D35",
    light: "#3A3C44",
    accent: "#46484F",
  },
};

const fonts = {
  heading: `'Montserrat', sans-serif`,
  body: `'Hind', sans-serif`,
};

const theme = extendTheme({ colors, fonts });

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

App.getInitialProps = async (ctx: AppInitialProps) => {
  return {
    pageProps: {},
  };
};

export default wrapper.withRedux(App);
