import { useRouter } from "next/router";
import React, { useContext } from "react";
import { IndexContext } from "../context/context";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

function BottomBar({ evening, journee, redGender, eveningNumber, bouquet }) {
  const [state, setState] = useContext(IndexContext);
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <>
      {evening && (
        <div
          className={`flex md:hidden bg-white border-2 w-full z-30 fixed left-0 bottom-10 space-x-4 mt-2  md:ml-1 
          items-center ${i18n.language === "ar" ? "rtl" : ""}`}
        >
          <div className="text-center w-full text-sm">
            <h1
              onClick={async () => {
                router.push(`/soiree/${redGender}/1`, undefined, {
                  shallow: true,
                });
              }}
              className={`cursor-pointer tracking-tight roboto font-bold  ${
                evening && eveningNumber === 1
                  ? "bg-color-blue text-white p-2"
                  : "ml-2"
              }`}
            >
              {t("part1P")}
            </h1>
          </div>
          <h1 className="">|</h1>
          <div className="text-center w-full text-sm">
            <h1
              onClick={() => {
                // setBouquet(false);
                // setDetails(false);
                // sethasMore(true);
                // setpage(2);

                // getParams(2);
                router.push(`/soiree/${redGender}/2`, undefined, {
                  shallow: true,
                });
              }}
              className={`cursor-pointer tracking-tight roboto font-bold  ${
                evening && eveningNumber === 2
                  ? "bg-color-blue text-white p-2"
                  : "ml-2"
              }`}
            >
              {t("part2P")}
            </h1>
          </div>
          <h1 className="">|</h1>
          <div className="text-center w-full text-sm">
            <h1
              onClick={async () => {
                // setBouquet(false);
                // setDetails(false);
                // sethasMore(true);
                // setpage(2);
                // getParams(3);
                router.push(`/soiree/${redGender}/3`, undefined, {
                  shallow: true,
                });
              }}
              className={`cursor-pointer tracking-tight roboto font-bold  ${
                evening && eveningNumber === 3
                  ? "bg-color-blue text-white p-2"
                  : "ml-2"
              }`}
            >
              {t("part3P")}
            </h1>
          </div>
        </div>
      )}
      <div>
        <div
          className={`flex md:hidden ${
            i18n.language === "ar" ? "rtl" : ""
          } bg-white border-2 w-full z-30 fixed left-0 bottom-0 space-x-2 mt-2  md:ml-1 
        items-center`}
        >
          <div className="text-center w-full text-sm">
            {" "}
            <h1
              onClick={() => {
                window.scrollTo(0, 0);

                router.push(`/actuellement/${redGender}`);
              }}
              className={`cursor-pointer ${
                !evening && !journee && !bouquet
                  ? "bg-color-blue text-white p-2"
                  : "ml-2 p-2"
              }   font-semibold `}
            >
              {t("en_ce_moment")}
            </h1>
          </div>
          <h1>|</h1>
          <div className="text-center w-full text-sm">
            {" "}
            <h1
              onClick={() => {
                window.scrollTo(0, 0);
                setState({ ...state, title: t("day") });

                router.push("/journee");
              }}
              className={`cursor-pointer ${
                !evening && !bouquet && journee
                  ? "bg-color-blue text-white p-2"
                  : ""
              }   font-semibold `}
            >
              {t("day")}
            </h1>
          </div>
          <h1>|</h1>
          <div className="text-center w-full text-sm">
            {" "}
            <h1
              onClick={() => {
                router.push(`/soiree/${redGender}/1`, undefined, {
                  shallow: true,
                });
              }}
              className={`cursor-pointer ${
                evening && !journee && !bouquet
                  ? "bg-color-blue text-white p-2"
                  : ""
              }   font-semibold `}
            >
              {t("evening")}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default BottomBar;
