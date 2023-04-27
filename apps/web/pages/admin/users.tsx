import type { GetServerSideProps, NextPage } from "next";
// import { client } from "../../lib/client";
import { IUser } from "../../lib/types/products";
import client from "../../services/apollo-client";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const USER_QUERY = gql`
  query ($options: ProductOption!) {
    getUsers(options: $options) {
      name
      email
      phone
      roll
    }
  }
`;
const hello: NextPage<{
  grains: IUser[];
}> = ({ grains }) => {
  const [grainsData, setGrainData] = useState(grains);
  const filterState = useSelector((state: any) => state.filter);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await client.query({
        query: USER_QUERY,
        variables: { options: filterState },
      });
      setGrainData(data.getUsers);
      console.log(data);
    };
    fetchData();
  }, [filterState]);
  console.log(filterState);
  console.log(grains);
  return (
    <div>
      {/* <ProductList productList={grainsData} />{" "} */}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          {grainsData.map((item) => (
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.name}
              </th>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default hello;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const USER_QUERY = gql`
  query ($options: ProductOption!) {
    getUsers(options: $options) {
      name
      email
      phone
      roll
    }
  }
  `;
  try {
    const { loading, data, error } = await client.query({
      query: USER_QUERY,
    });
    console.log(error)
    if (error || !data) {
      return { notFound: true };
    }
    return {
      props: {
        grains: data.getgrains,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

