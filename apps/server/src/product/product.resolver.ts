import { Mutation, Query, Resolver, Args } from "@nestjs/graphql";
import {
  CreateProductInput,
  UpdateProductInput,
} from "./dto/gql/createProduct.input";
import { Product } from "./dto/gql/product.dto";
import { ProductOption } from "./dto/productOption.dto";
import { ProductService } from "./product.service";

@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(@Args("create") args: CreateProductInput) {
    return this.productService.createProduct(args);
  }

  @Mutation(() => Product)
  updateProduct(@Args("update") args: UpdateProductInput) {
    return this.productService.updateProduct(args._id, args.body);
  }

  @Mutation(() => String)
  deleteProduct(@Args("_id") _id: string) {
    console.log("executed");
    return this.productService.deleteProduct(_id);
  }

  @Query(() => [Product])
  getProducts(@Args("options") options: ProductOption) {
    console.log("Query Hit!");
    return this.productService.getAllProducts(options);
  }

  @Query(() => Product)
  getProduct(@Args("id") id: string) {
    return this.productService.getProduct(id);
  }
}
