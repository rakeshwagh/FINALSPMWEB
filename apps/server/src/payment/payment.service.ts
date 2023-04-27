import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private readonly stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async createPaymentIntent(amount: number, name: string) {
    amount *= 100;
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency: "INR",
      metadata: { name }
    });

    return paymentIntent;
  }

  async verifyPaymentIntent(id:string) {
    console.log(id);
    const paymentIntent = await this.stripe.paymentIntents.retrieve(id);
    // console.log(paymentIntent);
    // if (paymentIntent && paymentIntent.status === 'succeeded') {
    //   // Handle successful payment here
    // } else {
    //   // Handle unsuccessful, processing, or canceled payments and API errors here
    // }

    return "hello";
  }
}
