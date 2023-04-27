import React from "react";
import { GetServerSidePropsContext, NextPage } from "next";
import client from "../../../services/apollo-client";
import { gql } from "@apollo/client";
import ProductDetails from "../../../components/productDetails";
import { SProduct } from "../../../lib/types/products";
const index: NextPage<{ product: SProduct }> = ({ product }) => {
  return (
    <div>
      {/* <h1>Inside Specific Card {id}</h1> */}
      <ProductDetails product={product} />
    </div>
  );
};

export default index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const PRODUCT_QUERY = gql`
    query ($id: String!) {
      getProduct(id: $id) {
        _id
        name
        description
        price
        ingredients {
          grain_id
          proportion
        }
        imgUrl
      }
    }
  `;
  try {
    const { id } = context.params;
    const { data, error } = await client.query({
      query: PRODUCT_QUERY,
      variables: { id: `products/${id}` },
    });
    if (error || !data) {
      return { notFound: true };
    }
    console.log(data);
    return {
      props: {
        product: data.getProduct,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    return { notFound: true };
  }
}
