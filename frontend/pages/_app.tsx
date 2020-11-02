import PrivateLayout from "@/components/Layout/PrivateLayout";
import Head from "next/head";
import stylesheet from "antd/dist/antd.min.css";
import nprogress from "nprogress/nprogress.css";
import { SWRConfig } from "swr";
import Router from "next/router";
import NProgress from "nprogress";
import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { createWrapper } from "next-redux-wrapper";
import { Provider } from "react-redux";
import Cookie from "js-cookie";
import store from "@/store/store";
import axios from "axios";
import Alert from "@/components/UI/Alert";
import App, { AppContext, AppProps } from "next/app";
import cookies from "next-cookies";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 300,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

interface IMyApp extends AppProps {
  isAuth: boolean;
}

const MyApp = ({ Component, pageProps, isAuth }: IMyApp) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <style dangerouslySetInnerHTML={{ __html: nprogress }} />
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <>
        <GlobalStyle />
        <SWRConfig
          value={{
            revalidateOnMount: true,
            dedupingInterval: 1000,
            fetcher: (url) =>
              axios({
                url: url,
                baseURL: "http://localhost:8000",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${Cookie.get("token")}`,
                },
              }).then((r) => r.data),
          }}
        >
          <Provider store={store}>
            <Alert />
            <PrivateLayout isAuth={isAuth}>
              <Component {...pageProps} />
            </PrivateLayout>
          </Provider>
        </SWRConfig>
      </>
    </>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const token = cookies(appContext.ctx)?.token;
  const isAuth = token ? true : false;

  return { ...appProps, isAuth };
};

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);

const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    text-decoration: none;
  }
  #__next {
    height: 100% !important; 
    width: 100%;
  }
  p {
    margin: 0;
  }
  html {
    box-sizing: border-box;
  }
  body {
    overscroll-behavior: none;
    overflow-x: hidden;
    overflow-y: scroll;
    &.no-scroll {
      overflow-y: hidden;
    }
    &::-webkit-scrollbar {
        width: 5px;
        background-color: #f5f5f5;
        @media (max-width: 575.98px) {
            width: 0px;
        }
    }
    &::-webkit-scrollbar-track {
        height: 90%;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #000;
    }
  }
  #nprogress .bar {
    background: #000 !important;
  }
`;
