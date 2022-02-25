import Router from "next/router";
import { useEffect } from "react";
const Auth = () => {
  useEffect(() => {
    Router.push("/auth/login/");
  });
  return <></>;
};

export default Auth;
