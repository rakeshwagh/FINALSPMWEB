import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import Header from "../header";
import store from "../../store/index";
import Footer from "../footer";
import { ToastContainer } from "react-toastify";
import { useLanguage } from "../../hooks/useLanguage";
import NextNProgress from "nextjs-progressbar";
import { cartActions } from "../../store/cart-slice";

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { locale } = useLanguage();
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const totalAmount = JSON.parse(localStorage.getItem("totalAmount")) || 0;
      const totalQuantity =
        JSON.parse(localStorage.getItem("totalQuantity")) || 0;

      dispatch(
        cartActions.setItemsFromLocalStorage({
          items: cartItems,
          totalAmount,
          totalQuantity,
        })
      );
    }
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider enableSystem={true} attribute="class">
        <Head>
          <title>ZiShop</title>
        </Head>
        <div className="flex flex-col min-h-[100vh]">
          <NextNProgress height={7} />
          <Header />
          <main className="flex-grow  md:mt-40">{children}</main>
          <Footer />
        </div>
        <ToastContainer
          autoClose={2000}
          hideProgressBar={true}
          rtl={locale === "en" ? false : true}
          position={locale === "en" ? "top-right" : "top-left"}
        />
      </ThemeProvider>
    </Provider>
  );
};

export default Layout;
