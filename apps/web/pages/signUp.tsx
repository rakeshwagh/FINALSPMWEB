import type { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { userInfoActions } from "../store/user-slice";
import jsCookie from "js-cookie";
import EnteringBox from "../components/entering/EnteringBox";
import { IUser } from "../lib/types/user";
import axios from "axios";
import { getError } from "../utilities/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IUserInfoRootState } from "../lib/types/user";
import { gql, useMutation } from "@apollo/client";

const REGISTER_USER_MUTATION = gql`
  mutation register($createUser: CreateUserInput!) {
    register(createUser: $createUser) {
      id
      email
      role
    }
  }
`;

const SignUp: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const { redirect } = router.query;
  const userInfo = useSelector(
    (state: IUserInfoRootState) => state.userInfo.userInformation
  );
  const [registerUser, { data, loading, error }] = useMutation(
    REGISTER_USER_MUTATION
  );
  useEffect(() => {
    if (userInfo) {
      router.push((redirect as string) || "/");
    }
  }, [userInfo, redirect, router]);
  async function signUpHandler(user: IUser) {
    // const { name, email, password } = user;
    console.log("User : ", user);
    try {
      const { data } = await registerUser({ variables: { createUser: user } });
      router.push("/login");
    } catch (err: any) {
      /* sanity.io is boycott for the people from Iran so I set cookies for whom don't use VPN in Iran*/
      setErrorMessage(getError(err));
      // console.log(getError(err));
      console.log(err);
    }
  }
  return (
    <EnteringBox
      title="signUp"
      submitHandler={signUpHandler}
      errorMessage={errorMessage}
    />
  );
};

export default SignUp;
