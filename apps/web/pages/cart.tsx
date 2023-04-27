import type { NextPage } from "next";
import CartList from "../components/cart/CartList";
import Breadcrumb from "../components/UI/Breadcrumb";
import OrderSummaryBox from "../components/cart/OrderSummaryBox";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const cart: NextPage = () => {
  return (
    <div>
      <Breadcrumb />
      <div className="flex justify-center flex-col md:flex-row items-start relative max-w-[2100px] mx-auto">
        <CartList />
        <Elements stripe={stripePromise}>
          <OrderSummaryBox />
        </Elements>
      </div>
    </div>
  );
};

export default cart;
