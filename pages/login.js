import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Head from "next/head";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

function Login() {
  const [isLoadingFacebook, setIsLoadingFacebook] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingTwitter, setIsLoadingTwitter] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();
  console.log(router.query.page);

  const token = Cookies.get("token");

  // if (token) {
  //   router.push("/");
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Email required §!");
      return;
    }
    if (!password) {
      alert("Password required §!");
      return;
    }

    try {
      setLoading(true);

      const data = axios({
        method: "post",
        url: "/login",
        data: {
          email,
          password,
        },
      })
        .then((res) => {
          if (!res.data.token) {
            setEmail("");
            setPassword("");
            toast.error(data.message);
            setLoading(false);
          } else {
            setEmail("");
            setPassword("");
            setLoading(false);
            Cookies.set("token", res.data.token, { expires: 7 });
            router.query.page === "guide"
              ? router.push("/bouquet")
              : router.push("/");
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <Head>
        <title>TV7</title>

        <meta name="csrf-token" content="{{ csrf_token() }}" />
      </Head>
      <Header />
      <Navbar login={true} />
      <div className="w-full md:w-1/3 py-5 px-10 md:px-0 md:m-auto">
        <form>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold roboto mb-2">Login</h1>
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border-2 mb-2"
              required={"required"}
            />

            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border-2 mb-2"
              required={"required"}
            />
            <button
              onClick={(e) => handleSubmit(e)}
              className="bg-blue-700 mb-2 hover:bg-blue-800 rounded-sm text-center font-bold w-2/3 m-auto text-white p-2 cursor-pointer"
            >
              {loading ? (
                <SyncOutlined spin className="py-1  " />
              ) : (
                "Se Connecter"
              )}
            </button>
          </div>
        </form>
        <h1 className="text-sm mb-5 text-center">
          Vous n&apos;avez pas encore de compte ?
          <span
            onClick={() => router.push("/register")}
            className="text-blue-600 cursor-pointer font-semibold"
          >
            {" "}
            S&apos;inscrire
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
            <Image
              src="https://www.svgrepo.com/show/138943/facebook.svg"
              height="40px"
              width="40px"
              alt="facebook logo"
            />
            <h1>
              {isLoadingFacebook ? (
                <SyncOutlined spin className="py-1 h-8 ml-20 " />
              ) : (
                "Continuer avec Facebook"
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
            <Image
              src="https://www.svgrepo.com/show/355037/google.svg"
              height="40px"
              width="40px"
              alt="google logo"
            />
            <h1>
              {isLoadingGoogle ? (
                <SyncOutlined spin className="py-1 h-8 ml-20" />
              ) : (
                "Continuer avec Gmail"
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
            <Image
              src="https://www.svgrepo.com/show/157844/twitter.svg"
              height="40px"
              width="40px"
              alt="twitter logo"
            />
            <h1>
              {isLoadingTwitter ? (
                <SyncOutlined spin className="py-1 h-8 ml-20" />
              ) : (
                "Continuer avec Twitter"
              )}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
