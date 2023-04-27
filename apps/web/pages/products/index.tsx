import type { GetServerSideProps, NextPage } from "next";
import { GetStaticProps, GetStaticPaths } from "next";
// import { client } from "../../lib/client";
import { IProduct, SProduct } from "../../lib/types/products";
import ProductList from "../../components/productList/ProductList";
import { ICategoryPathsParams } from "../../lib/types/pagePathsParams";
import client from "../../services/apollo-client";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { filterOption } from "../../lib/types/filter";
const PRODUCT_QUERY = gql`
  query ($options: ProductOption!) {
    getProducts(options: $options) {
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
const index: NextPage<{
  products: SProduct[];
}> = ({ products }) => {
  const [productsData, setProductData] = useState(products);
  const filterState = useSelector((state: any) => state.filter);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await client.query({
        query: PRODUCT_QUERY,
        variables: { options: filterState },
      });
      setProductData(data.getProducts);
      console.log(data);
    };
    fetchData();
  }, [filterState]);
  console.log(filterState);
  console.log(products);
  return (
    <div>
      <ProductList productList={productsData} />{" "}
    </div>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const PRODUCT_QUERY = gql`
    query {
      getProducts(options: {}) {
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
    const { loading, data, error } = await client.query({
      query: PRODUCT_QUERY,
    });
    console.log(error)
    if (error || !data) {
      return { notFound: true };
    }
    return {
      props: {
        products: data.getProducts,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};
