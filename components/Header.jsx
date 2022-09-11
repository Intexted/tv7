import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { IndexContext } from "../context/context";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

import logo from "../public/static/logo.png";
import { te } from "date-fns/locale";

function Header({ details }) {
  const [value, setValue] = useState("FR");
  const [dropDown, setDropDown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState(false);
  const [state, setState] = useContext(IndexContext);
  const { data: session, status } = useSession();
  const { t } = useTranslation();

  const router = useRouter();
  useEffect(() => {
    setToken(Cookies.get("token") ? Cookies.get("token") : "");
  }, [token]);

  const change_lang = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
  };

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
            <h1 className="font-bold">{i18n.language.toUpperCase()}</h1>
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
            {i18n.language != "fr" && (
              <h1
                onClick={() => {
                  change_lang("fr");
                }}
                className="cursor-pointer hover:bg-slate-400 border-t-2 hover:text-white w-full font-bold"
              >
                FR
              </h1>
            )}
            {i18n.language != "en" && (
              <h1
                onClick={() => {
                  change_lang("en");
                }}
                className="cursor-pointer hover:bg-slate-400 border-t-2 hover:text-white w-full font-bold"
              >
                EN
              </h1>
            )}
            {i18n.language != "ar" && (
              <h1
                onClick={() => {
                  change_lang("ar");
                }}
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
              setState({ ...state, title: "Mettre a jour profile" });
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
            <h1>{t("mon_profil")}</h1>
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
                  router.push("/");
                }}
                className="text-right pr-20 cursor-pointer"
              >
                <h1 className=" hover:font-bold ">
                  {/* Se Deconnecter */}
                  {t("se_deconnecter")}
                </h1>
              </div>
            ) : (
              <Link href="/login">
                <a>
                  <div className="text-right pr-20 cursor-pointer">
                    <h1 className="font-semibold hover:font-bold ">
                      {t("connect")}
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
