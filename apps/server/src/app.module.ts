import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { ProductModule } from "./product/product.module";
import { StoreModule } from "./store/store.module";
import { MailModule } from "src/mail/mail.module";
import { IDPModule } from "src/idp/idp.module";
import constants from "./idp/constants";
import { GrainsModule } from "./grains/grains.module";
import { PaymentModule } from "./payment/payment.module";
@Module({
  imports: [
    ConfigModule.forRoot(),
    // LoggerModule.forRoot({
    //   pinoHttp: {
    //     transport: {
    //       target: 'pino-pretty',
    //     },
    //   },
    // }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      playground: true,
      definitions: {
        path: join(process.cwd(), "src/graphql.ts"),
        outputAs: "class",
      },
      cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
    }),

    AuthModule,
    UserModule,
    ProductModule,
    StoreModule,
    GrainsModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
