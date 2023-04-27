import axios from "axios";
import type { NextPage } from "next";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import jsCookie from "js-cookie";
import EnteringBox from "../components/entering/EnteringBox";
import { IUser, IUserInfoRootState } from "../lib/types/user";
import { userInfoActions } from "../store/user-slice";
import { getError } from "../utilities/error";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth, signInWithEmailAndPassword } from "../services/firebase";
const Login: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const userInfo = useSelector((state: IUserInfoRootState) => {
    return state.userInfo.userInformation;
  });
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [userInfo, router, dispatch]);
  async function LoginHandler(user: IUser) {
    const { email, password } = user;
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password as string
      );
      const token = (await result.user?.accessToken!) ?? "";
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "post",
        headers: {
          authorization: token,
        },
        credentials: "include",
      }).then((data) => data.json());
      dispatch(userInfoActions.userLogin(res));
    } catch (err: any) {
      setErrorMessage(getError(err));
      console.log(getError(err));
    }
  }
  return (
    <EnteringBox
      title="login"
      submitHandler={LoginHandler}
      errorMessage={errorMessage}
    />
  );
};

export default Login;
