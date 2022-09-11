import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { te } from "date-fns/locale";
import i18n from "i18next";
function Navbar({
  evening,
  journee,
  bouquet,
  eveningNumber,
  redGender = "TOUS",
  details,
  login,
}) {
  const router = useRouter();
  const token = Cookies.get("token");
  const { t } = useTranslation();

  return (
    <div>
      <div
        className={`md:flex hidden  items-center space-x-8 
      justify-center  border-y-4  md:px-5 ${
        i18n.language === "ar" ? "rtl" : ""
      }`}
      >
        <h1
          onClick={() => {
            router.push(`/actuellement/${redGender}`);
          }}
          className={`cursor-pointer tracking-tight ${
            i18n.language === "ar" ? "ml-10" : ""
          } font-bold hover:bg-blue-500 hover:p-1 hover:text-white ${
            !evening && !journee && !bouquet && !details && !login
              ? "bg-color-blue p-1 text-white"
              : ""
          }`}
        >
          {t("en_ce_moment")}
        </h1>
        <h1
          onClick={() => {
            router.push("/journee", undefined, {
              shallow: true,
            });
          }}
          className={`cursor-pointer tracking-tight  font-bold hover:bg-blue-500 hover:p-1 hover:text-white ${
            !evening && !bouquet && journee
              ? "bg-color-blue p-1 text-white"
              : ""
          }   `}
        >
          {t("day")}
        </h1>
        <h1
          onClick={() => {
            router.push(`/soiree/${redGender}/1`, undefined, {
              shallow: true,
            });
          }}
          className={`cursor-pointer tracking-tight  font-bold hover:bg-blue-500 hover:p-1 hover:text-white ${
            evening && eveningNumber === 1 ? "bg-color-blue p-1 text-white" : ""
          }`}
        >
          {t("part1")}
        </h1>
        <h1
          onClick={() => {
            router.push(`/soiree/${redGender}/2`, undefined, {
              shallow: true,
            });
          }}
          className={`cursor-pointer tracking-tight  font-bold hover:bg-blue-500 hover:p-1 hover:text-white ${
            evening && eveningNumber === 2 ? "bg-color-blue p-1 text-white" : ""
          }`}
        >
          {t("part2")}
        </h1>
        <h1
          onClick={() => {
            router.push(`/soiree/${redGender}/3`, undefined, {
              shallow: true,
            });
          }}
          className={`cursor-pointer tracking-tight  font-bold hover:bg-blue-500 hover:p-1 hover:text-white ${
            evening && eveningNumber === 3 ? "bg-color-blue p-1 text-white" : ""
          }`}
        >
          {t("part3")}
        </h1>

        <h1
          onClick={() => {
            router.push("/bouquets");
          }}
          className="cursor-pointer tracking-tight 
           font-bold bg-color-blue text-white p-1"
        >
          {t("mon_tv_guide")}
        </h1>
      </div>
    </div>
  );
}

export default Navbar;
