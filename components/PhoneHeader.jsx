import { useTranslation } from "react-i18next";
import React, { useContext, useEffect, useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { IndexContext } from "../context/context";
import Cookies from "js-cookie";
import { signIn, signOut } from "next-auth/react";
import axios from "axios";
import i18n from "i18next";

function PhoneHeader({
  genders,
  setRedGender,
  getGenderProgram,
  eveningNumber,
  sethasMore,
  setpage,
  redGender,
  handleTous,
  setGenderProgram,
  evening,
  journee,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [state, setState] = useContext(IndexContext);
  const [searchValue, setSearchValue] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const [title, seTitle] = useState("");

  const router = useRouter();
  const token = Cookies.get("token");
  const { t } = useTranslation();

  let { id } = router.query;

  const change_lang = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchValue) {
      return;
    }
    try {
      const { data } = await axios.get(
        token
          ? `/favorite/search/${searchValue}`
          : `/public/search/${searchValue}`
      );
      setGenderProgram(data.data);
      setSearchOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {(menuOpen || genderOpen || searchOpen || langOpen) && (
        <div
          onClick={() => {
            setMenuOpen(false);
            setGenderOpen(false);
            setSearchOpen(false);
            setLangOpen(false);
          }}
          className="bg-black opacity-25 w-screen h-screen fixed z-50"
        ></div>
      )}
      {searchOpen && (
        <div className="fixed top-10   md:hidden shadow-md bg-white z-50 w-full text-center py-4  items-center space-x-1 mb-2 ">
          <form className="flex space-x-1 items-center ml-20">
            <input
              type="text"
              value={searchValue}
              placeholder={t("search_placeholder")}
              onChange={(e) => setSearchValue(e.target.value)}
              className="p-2 border-b-2 h-5  "
              required={"required"}
            />
            <div
              onClick={(e) => handleSearch(e)}
              className="bg-color-blue p-1 rounded-md "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4   cursor-pointer   "
                fill="none"
                viewBox="0 0 20 20"
                stroke="#FFFFFF"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </form>
        </div>
      )}
      {genderOpen && (
        <div className="md:flex top-12 fixed shadow-md bg-white z-50 w-full text-center py-2 mb-2 items-center space-x-1">
          <h1
            onClick={() => {
              setGenderOpen(false);
              setRedGender("TOUS");
              handleTous();
              sethasMore(true);
              setpage(2);
            }}
            className={`text-sm mt-1 cursor-pointer ${
              redGender === "TOUS"
                ? "bg-red-600 text-white p-0.5"
                : " text-blue-300"
            }`}
          >
            {i18n.language === "fr"
              ? "TOUS"
              : i18n.language === "ar"
              ? "الكل"
              : "ALL"}
          </h1>
          {genders?.map((gender) => (
            <h1
              onClick={() => {
                setGenderOpen(false);
                setRedGender(gender.gender_fr);
                getGenderProgram(gender.gender_fr, eveningNumber);
                sethasMore(true);
                setpage(2);
              }}
              className={`text-sm mt-1 cursor-pointer
            
            ${
              redGender === gender.gender_fr
                ? "bg-red-600 text-white p-0.5"
                : "hover:bg-slate-400 hover:text-white hover:p-1 text-blue-300"
            }`}
              key={gender.id}
            >
              {i18n.language === "fr"
                ? gender.gender_fr.trim()
                : i18n.language === "ar"
                ? gender.gender_ar.trim()
                : gender.gender_en.trim()}
            </h1>
          ))}
        </div>
      )}
      {menuOpen && (
        <div
          className="flex z-50 flex-col m-auto justify-self-start w-screen top-12
         fixed text-center px-10 py-2 bg-white border-b-2 
           border-blue-100 shadow-md "
        >
          <h1
            onClick={() => {
              setState({ ...state, title: "BOUQUET" });
              menuOpen ? setMenuOpen(false) : setMenuOpen(true);
              router.push("/bouquets");
            }}
            className="cursor-pointer tracking-tight  font-bold bg-color-blue text-white p-1"
          >
            {t("mon_tv_guide")}
          </h1>
          {token && (
            <div
              onClick={() => {
                setState({ ...state, title: t("update_profile") });
                setMenuOpen(false);
                router.push("/profile");
              }}
              className="cursor-pointer tracking-tight mt-2 font-bold bg-color-blue text-white p-1"
            >
              <h1>{t("mon_profil")}</h1>
            </div>
          )}
          <div
            onClick={() => {
              signOut({ redirect: false, callbackUrl: "/" });
              Cookies.set("token", "");
              router.push("/login");
            }}
            className="cursor-pointer tracking-tight mt-2 font-bold bg-color-blue text-white p-1"
          >
            <h1 className="">{token ? t("se_deconnecter") : t("connect")}</h1>
          </div>
        </div>
      )}
      {langOpen && (
        <div className="md:flex  top-12 fixed shadow-md bg-white z-50 w-full py-2 mb-2 items-center space-x-1">
          <div
            onClick={() => {
              change_lang("en");
              setLangOpen(false);
            }}
            className="flex justify-center items-center space-x-1"
          >
            {" "}
            <img
              src="https://cdn-icons-png.flaticon.com/128/555/555417.png"
              alt=""
              height="20px"
              width="20px"
            />
            <h1>{t("en")}</h1>
          </div>

          <div
            onClick={() => {
              change_lang("fr");
              setLangOpen(false);
            }}
            className="flex my-2 justify-center items-center space-x-1"
          >
            {" "}
            <img
              src="https://cdn-icons-png.flaticon.com/128/206/206657.png"
              alt=""
              height="20px"
              width="20px"
            />
            <h1>{t("fr")}</h1>
          </div>
          <div
            onClick={() => {
              change_lang("ar");
              setLangOpen(false);
            }}
            className="flex   justify-center items-center space-x-1"
          >
            {" "}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Flag_of_the_Arab_League.svg/1024px-Flag_of_the_Arab_League.svg.png"
              alt=""
              height="20px"
              width="20px"
            />
            <h1>{t("ar")}</h1>
          </div>
        </div>
      )}

      <div
        className={`sticky top-0 z-50 flex bg-white
        items-center py-2 lg:px-5 justify-between md:hidden shadow-sm border-b-2 px-2 ${
          i18n.language === "ar" ? "rtl" : ""
        }`}
      >
        {menuOpen ? (
          <XIcon
            onClick={() => {
              menuOpen ? setMenuOpen(false) : setMenuOpen(true);
            }}
            className="h-7 w-7 md:hidden  cursor-pointer "
          />
        ) : (
          <MenuIcon
            onClick={() => {
              menuOpen ? setMenuOpen(false) : setMenuOpen(true);
              setGenderOpen(false);
            }}
            className="h-7 w-7 md:hidden  cursor-pointer "
          />
        )}
        <div className="text-center">
          {id?.length > 0 && id[0] != "profile" && (
            <h1 className="font-semibold">
              {evening ? t("evening") : journee ? t("day") : t("en_ce_moment")}
            </h1>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <svg
            onClick={() => {
              genderOpen ? setGenderOpen(false) : setGenderOpen(true);
              setMenuOpen(false);
              setSearchOpen(false);
              setLangOpen(false);
            }}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${i18n.language === "ar" ? "ml-3" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <svg
            onClick={() => {
              searchOpen ? setSearchOpen(false) : setSearchOpen(true);
              setMenuOpen(false);
              setGenderOpen(false);

              setLangOpen(false);
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <svg
            onClick={() => {
              langOpen ? setLangOpen(false) : setLangOpen(true);
              setMenuOpen(false);
              setGenderOpen(false);
              setSearchOpen(false);
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

export default PhoneHeader;
