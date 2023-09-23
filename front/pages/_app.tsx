import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import wrapper from "../store/configureStore";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App: React.FC = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>포트폴리오</title>
      </Head>
      <div>공통메뉴</div>
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(App);
