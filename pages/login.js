import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cookies from "js-cookie";
import Head from "next/head";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { IndexContext } from "../context/context";
import { useTranslation } from "react-i18next";
import { te } from "date-fns/locale";
import Password from "../components/Password";

function Login() {
  const [isLoadingFacebook, setIsLoadingFacebook] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingTwitter, setIsLoadingTwitter] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(IndexContext);

  const router = useRouter();
  const { data: session } = useSession();
  const { t } = useTranslation();

  const token = Cookies.get("token");

  if ((token || session) && router.query.page === "guide") {
    router.push("/bouquets");
    return;
  } else if (token) {
    router.push("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email required !");
      return;
    }
    if (!password) {
      toast.error("Password required !");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post("/login", {
        email,
        password,
      });
      // console.log(data);
      // setState([...state, { user: data.user, token: data.token }]);
      if (data?.token) {
        toast.success("Login Succesful");
        setEmail("");
        setPassword("");
        setLoading(false);
        Cookies.set("token", data.token, { expires: 7 });
        Cookies.set("auth", JSON.stringify(data.user), { expires: 7 });
        router.query.page === "guide"
          ? router.push("/bouquets")
          : router.push("/");
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      setEmail("");
      setPassword("");
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="">
      <Head>
        <title>TV7 Guide</title>
        <link rel="icon" href="/static/icon.png" />
      </Head>
      <Header />
      <Navbar login={true} />
      <ToastContainer />
      <div className="w-full md:w-1/3 py-5 px-10 md:px-0 md:m-auto">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-center roboto mb-2">
              {t("connect")}
            </h1>
            <input
              type="text"
              value={email}
              placeholder={t("email_placeholder")}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border-2 mb-2"
              required={"required"}
            />

            {/* <input
              type="password"
             
             
              className="p-2 border-2 mb-2"
              required={"required"}
            /> */}
            <Password setPassword={setPassword} password={password} t={t} />
            <button
              // onClick={(e) => handleSubmit(e)}
              className="bg-blue-700 mb-2 hover:bg-blue-800 rounded-sm text-center font-bold w-2/3 m-auto text-white p-2 cursor-pointer"
            >
              {loading ? (
                <SyncOutlined spin className="py-1  " />
              ) : (
                t("connect")
              )}
            </button>
          </div>
        </form>
        <h1 className="text-sm mb-5 text-center ">
          {t("no_inscrit")}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-600 mx-1 cursor-pointer font-semibold"
          >
            {t("register_now")}
          </span>
        </h1>
        <div className="mt-10 w-full md:w-4/5 md:m-auto">
          <div
            onClick={() => {
              Cookies.set("loggedin", "true");
              signIn("facebook", { callbackUrl: "/" });
              setIsLoadingFacebook(true);
            }}
            className="border-2 cursor-pointer hover:bg-slate-200 flex space-x-2 items-center p-2 rounded-2xl font-bold mb-2"
          >
            <img
              src="https://www.svgrepo.com/show/138943/facebook.svg"
              height="40px"
              width="40px"
              alt="facebook logo"
            />
            <h1>
              {isLoadingFacebook ? (
                <SyncOutlined spin className="py-1 h-8 ml-20 " />
              ) : (
                t("continue_facebook")
              )}{" "}
            </h1>
          </div>

          <div
            onClick={() => {
              Cookies.set("loggedin", "true");
              signIn("google", { callbackUrl: "/" });
              setIsLoadingGoogle(true);
            }}
            className="border-2 cursor-pointer hover:bg-slate-200 flex space-x-2 items-center p-2 rounded-2xl font-bold mb-2"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              height="40px"
              width="40px"
              alt="google logo"
            />
            <h1>
              {isLoadingGoogle ? (
                <SyncOutlined spin className="py-1 h-8 ml-20" />
              ) : (
                t("continue_gmail")
              )}{" "}
            </h1>
          </div>

          <div
            onClick={() => {
              Cookies.set("loggedin", "true");
              signIn("twitter", { callbackUrl: "/" });
              setIsLoadingTwitter;
            }}
            className="border-2 cursor-pointer hover:bg-slate-200 flex space-x-2 items-center p-2 rounded-2xl font-bold mb-2"
          >
            <img
              src="https://www.svgrepo.com/show/157844/twitter.svg"
              height="40px"
              width="40px"
              alt="twitter logo"
            />
            <h1>
              {isLoadingTwitter ? (
                <SyncOutlined spin className="py-1 h-8 ml-20" />
              ) : (
                t("continue_twitter")
              )}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
