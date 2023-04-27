import { Controller, Post, Body, Inject } from "@nestjs/common";
import { PaymentService } from "./payment.service";

@Controller("stripe")
export class PaymentController {
  constructor(
    @Inject(PaymentService)
    private readonly PaymentService: PaymentService,
  ) {}

  @Post("payment-intent")
  async createPaymentIntent(
    @Body("amount") amount: number,
    @Body("name") name: string,
  ) {
    const clientSecret = await this.PaymentService.createPaymentIntent(
      amount,
      name,
    );
    return { clientSecret };
  }

  @Post("verify-payment")
  async verifyPayment(@Body("id") id: string) {
    const data = await this.PaymentService.verifyPaymentIntent(id);
    console.log(data);
    return "Worked >";
  }
}
