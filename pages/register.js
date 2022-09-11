import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { SyncOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import axios from "axios";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

function Register() {
  const [isLoadingFacebook, setIsLoadingFacebook] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingTwitter, setIsLoadingTwitter] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();
  const { t } = useTranslation();

  const token = Cookies.get("token");
  if (token) {
    router.push("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      alert("Name is required !");
      return;
    }

    if (!email) {
      alert("Email required !");
      return;
    }
    if (!password) {
      alert("Password required §!");
      return;
    }
    if (!confirmPassword) {
      alert("Password required !");
      return;
    }

    try {
      setLoading(true);

      const data = axios({
        method: "post",
        url: "/register",
        data: {
          name,
          email,
          password,
          password_confirmation: confirmPassword,
        },
      })
        .then((res) => {
          console.log(res);
          if (!res.data.token) {
            setName("");
            setEmail("");
            setConfirmPassword("");
            setPassword("");
            alert(data.message);
            setLoading(false);
          } else {
            setName("");
            setEmail("");
            setConfirmPassword("");
            setPassword("");
            setLoading(false);
            Cookies.set("token", res.data.token, { expires: 7 });
            // router.push("/");
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <Header />
      <Navbar login={true} />
      <div className="w-full md:w-1/3 py-5 px-10 md:px-0 md:m-auto">
        <form>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-center roboto mb-2">
              {t("register_now")}
            </h1>
            <input
              type="text"
              name="name"
              placeholder={t("fullname_placeholder")}
              className="p-2 border-2 mb-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              name="name"
              placeholder={t("email_placeholder")}
              className="p-2 border-2 mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              name="name"
              placeholder={t("password_placeholder")}
              className="p-2 border-2 mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              name="name"
              placeholder={t("confirm_password_placeholder")}
              className="p-2 border-2 mb-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              onClick={(e) => handleSubmit(e)}
              className="bg-blue-700 mb-2 hover:bg-blue-800 rounded-sm text-center font-bold w-2/3 m-auto text-white p-2 cursor-pointer"
            >
              {loading ? (
                <SyncOutlined spin className="py-1 " />
              ) : (
                <h1>{t("register_now")}</h1>
              )}
            </button>
          </div>
        </form>
        <h1 className="text-sm mb-5 text-center">
          {t("you_have_an_account")}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 cursor-pointer mx-1 font-semibold"
          >
            {t("connect")}
          </span>
        </h1>
        <div className="mt-10 w-full md:w-4/5 md:m-auto">
          <div
            onClick={() => {
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
                <SyncOutlined spin className="py-1" />
              ) : (
                "Continuer avec Gmail"
              )}
            </h1>
          </div>

          <div
            onClick={() => {
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
                <SyncOutlined spin className="py-1" />
              ) : (
                "Continuer avec Twitter "
              )}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
