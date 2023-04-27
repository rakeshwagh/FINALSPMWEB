import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { useLanguage } from "../../hooks/useLanguage";
import { ICartRootState } from "../../lib/types/cart";
import ProductPrice from "../UI/ProductPrice";
import {
  CardElement,
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { changeNumbersFormatEnToFa } from "../../utilities/changeNumbersFormatEnToFa";

const CARD_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      // iconColor: "#c4f0ff",
      color: "black",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        // color: "#87bbfd",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const OrderSummaryBox = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { t, locale } = useLanguage();
  const totalAmount = useSelector(
    (state: ICartRootState) => state.cart.totalAmount
  );
  const totalQuantity = useSelector(
    (state: ICartRootState) => state.cart.totalQuantity
  );

  const handleOrder = async () => {
    if (!stripe || !elements) {
      return;
    }
    const billingDetails = {
      name: "Chetan Gamne",
      email: "chetangamne12@gmail.com",
      address: {
        city: "Nashik",
        line1: "Address 1",
        state: "my state",
        postal_code: "2200",
      },
    };
    try {
      const cardElement = elements.getElement(CardElement);
      const res = await fetch("http://localhost:3001/stripe/payment-intent", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ amount: 9, name: "Chetan Gamne" }),
      });
      const data = await res.json();
      console.log(data);
      const paymentMethod = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
      console.log(paymentMethod);
      const result = await stripe.confirmCardPayment(
        data.clientSecret.client_secret,
        {
          payment_method: paymentMethod.paymentMethod.id,
        }
      );
      console.log(result);
      const response = await fetch(
        "http://localhost:3001/stripe/verify-payment",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({ id: result.paymentIntent.id }),
        }
      );
      const op = await response.json();
      console.log(op);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {totalQuantity > 0 ? (
        <div className="flex-grow sticky bottom-0 left-0 right-0 md:top-36 shadow-lg bg-palette-card border-2 rounded-lg py-4 xl:py-12 px-4 xl:px-8 -mx-[1rem] md:mx-4 xl:mx-8 mt-2 w-[100vw] md:w-auto  md:min-w-[300px] md:max-w-[400px]">
          <h3 className="text-md sm:text-lg md:text-xl">{t.orderSummary}</h3>
          <div className="flex flex-col my-1 sm:my-2">
            <div className="flex items-center justify-between md:my-4">
              <p className="text-sm sm:text-base text-palette-mute md:text-palette-base">
                {t.totalQuantity}
              </p>
              <p className="rtl:ml-1 ltr:mr-1 font-bold">
                {locale === "en"
                  ? totalQuantity
                  : changeNumbersFormatEnToFa(totalQuantity)}
              </p>
            </div>
            <div className="flex flex-wrap items-baseline justify-between flex-grow md:my-4">
              <p className="text-sm sm:text-base text-palette-mute md:text-palette-base">
                {t.totalAmount}
              </p>
              <ProductPrice price={totalAmount} />
            </div>
          </div>
          <CardElement options={CARD_OPTIONS} />
          <p onClick={handleOrder}>
            <a className="block bg-palette-primary md:mt-8 py-3 rounded-lg text-palette-side text-center cursor-pointer  shadow-lg">
              {t.order}
            </a>
          </p>
        </div>
      ) : (
        <p className="text-palette-mute text-lg mx-auto mt-12">
          {t.cartIsEmpty}
        </p>
      )}
    </>
  );
};

export default OrderSummaryBox;
