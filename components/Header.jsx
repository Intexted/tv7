import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { IndexContext } from "../context/context";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import logo from "../public/static/logo.png";

function Header({ details }) {
  const [value, setValue] = useState("FR");
  const [dropDown, setDropDown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState(false);
  const [data, setData] = useContext(IndexContext);
  const { data: session, status } = useSession();

  const router = useRouter();
  useEffect(() => {
    setToken(Cookies.get("token") ? Cookies.get("token") : "");
  }, [token]);

  return (
    <>
      <div className="p-5 px-10 hidden md:flex justify-between items-center ">
        <div onClick={() => router.push("/")} className="cursor-pointer">
          <img
            src="/static/logo.png"
            alt="banner"
            width="150px"
            height="90px"
          />
        </div>
        <div className="cursor-pointer">
          <img
            src="/static/banner.png"
            alt="banner"
            width="600px"
            height="70px"
          />
        </div>
        <div
          className="relative mb-10"
          onClick={() => (dropDown ? setDropDown(false) : setDropDown(true))}
        >
          <div
            className={`cursor-pointer flex border-2   items-center space-x-2 px-0.5`}
          >
            <h1 className="font-bold">{value}</h1>
            <img
              src="/static/arrow_drop_down.svg"
              alt="banner"
              width="30px"
              height="30px"
            />
          </div>
          <div
            className={`absolute w-full  bg-slate-50 border-2 ${
              !dropDown ? "hidden" : ""
            }`}
          >
            {value != "FR" && (
              <h1
                onClick={() => setValue("FR")}
                className="cursor-pointer hover:bg-slate-400 border-t-2 hover:text-white w-full font-bold"
              >
                FR
              </h1>
            )}
            {value != "EN" && (
              <h1
                onClick={() => setValue("EN")}
                className="cursor-pointer hover:bg-slate-400 border-t-2 hover:text-white w-full font-bold"
              >
                EN
              </h1>
            )}
            {value != "AR" && (
              <h1
                onClick={() => setValue("AR")}
                className="cursor-pointer hover:bg-slate-400 border-t-2 hover:text-white w-full font-bold"
              >
                AR
              </h1>
            )}
          </div>
        </div>
      </div>
      <div className="hidden mb-2 md:flex justify-end space-x-5 items-center">
        {token && (
          <div
            onClick={() => {
              router.push("/profile");
            }}
            className="hidden  hover:font-bold  md:flex items-center cursor-pointer"
          >
            <img
              src="/static/user.svg"
              alt="banner"
              width="20px"
              height="20px"
            />
            <h1>Mon profil</h1>
          </div>
        )}
        {details && (
          <div className="hidden md:flex">
            {token ? (
              <div
                onClick={() => {
                  signOut({ redirect: false, callbackUrl: "/" });
                  Cookies.remove("token");
                  Cookies.remove("auth");
                  router.push("/login");
                }}
                className="text-right pr-20 cursor-pointer"
              >
                <h1 className="font-semibold hover:font-bold ">
                  Se Deconnecter
                </h1>
              </div>
            ) : (
              <Link href="/login">
                <a>
                  <div className="text-right pr-20 cursor-pointer">
                    <h1 className="font-semibold hover:font-bold ">
                      S&apos;IDENTIFIER
                    </h1>
                  </div>
                </a>
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
