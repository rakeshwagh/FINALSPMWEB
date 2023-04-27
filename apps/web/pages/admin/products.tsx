import type { GetServerSideProps, NextPage } from "next";
import { SProduct } from "../../lib/types/products";
import client from "../../services/apollo-client";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from 'next/link';

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
const hello: NextPage<{
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
    <div>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 my-2 border border-blue-500 hover:border-transparent rounded  float-right" ><Link href="/admin/addProduct">
              <a>Add Product</a>
            </Link>
</button>
</div>
    < div >
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productsData.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <img
                        src={product.imgUrl}
                        alt={product.name}
                        className="h-8 w-8 rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${product.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div >
  </div>
  );
};

export default hello;

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
