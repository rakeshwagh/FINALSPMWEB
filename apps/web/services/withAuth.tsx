import { useEffect, useState } from "react";
import Router from "next/router";
import { gql, useQuery } from "@apollo/client";

const withAuth = (WrappedComponent: any) => {
  const WithAuth = (props: any) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const meQuery = gql`
      query {
        me {
          email
          uid
          email_verified
          phone_number
        }
      }
    `;
    const { error, data } = useQuery(meQuery);

    useEffect(() => {
      // Fetch user data here and set it using setUser
      // For example:
      // setUser(fetchUserData());
      console.log(data);
      if (data) {
        setUser(data);
      }
      setLoading(false);
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      Router.push("/login");
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuth.getInitialProps = async (ctx: any) => {
    const wrappedComponentInitialProps = WrappedComponent.getInitialProps
      ? await WrappedComponent.getInitialProps(ctx)
      : {};

    return { ...wrappedComponentInitialProps };
  };

  return WithAuth;
};

export default withAuth;
