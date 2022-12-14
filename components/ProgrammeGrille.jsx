import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import MyProgressBar from "./MyProgressBar";
import { heureDebut, print_Time } from "./progressbar";
import { useRouter } from "next/router";
import i18n from "i18next";
import { IndexContext } from "../context/context";

function ProgrammeGrille({ chaine, genderProgram, swipe_to, index }) {
  const [state, setState] = useContext(IndexContext);
  const router = useRouter();

  let title = "";
  if (i18n.language === "fr" || i18n.language === "fr-FR") {
    title = chaine.title_fr
      ? chaine.title_fr
      : chaine.title_en
      ? chaine.title_en
      : chaine.title_ar;
  }
  if (i18n.language === "ar") {
    title = chaine.title_ar;
  }
  if (
    i18n.language === "en" ||
    i18n.language === "en-US" ||
    i18n.language === "en-GB"
  ) {
    title = chaine.title_en ? chaine.title_en : chaine.title_ar;
  }

  useEffect(() => {
    if (state.active) {
      window.scrollTo(0, state.position);
      setState({
        ...state,
        active: false,
      });
    }

    router.beforePopState(() => {
      setState({
        ...state,
        active: true,
      });
      return true;
    });
  }, [state, state.active]);

  return (
    <div
      onClick={() => {
        setState({
          ...state,
          position: window.pageYOffset,
        });
        router.push(`/details/${chaine.id}/${chaine.channel_id}`, undefined, {
          shallow: true,
        });
      }}
      className="flex flex-col  cursor-pointer h-[90px]
      "
    >
      <div className="flex w-full h-2/3" key={chaine.id}>
        <div
          className={`w-1/5 ${
            i18n.language === "ar" ? "ml-2" : "mr-2"
          }  text-center`}
        >
          <Image
            src={chaine.logo_chaine}
            alt="logo chaine"
            width="60px"
            height="50px"
            objectFit="contain"
          />
        </div>
        <div className=" flex flex-col w-3/5  ">
          <div className=" w-full">
            <h1 className="font-semibold text-xs">
              {/* {moment(chaine.date_start).format("dddd MMMM Do")} */}
              {heureDebut(chaine.date_start)}
            </h1>
          </div>
          <div className="  my-0.5 w-full">
            <h1 className="font-semibold text-sm text-blue-600">{title}</h1>
          </div>
          <div className=" w-full">
            <h1 className="text-xs text-gray-500">
              {chaine.gender}
              <span>{` (${print_Time(chaine.duration)})`}</span>
            </h1>
          </div>
        </div>
        {chaine.thumbnail && (
          <div className="w-1/5 relative">
            {chaine.video && (
              <div className="absolute top-1 left-1 text-center rounded-full z-10">
                <img
                  src="/static/play.svg"
                  alt="banner"
                  width="20px"
                  height="20px"
                />
              </div>
            )}
            <Image
              src={
                chaine.thumbnail ? chaine.thumbnail : "/static/tvShowNo.jfif"
              }
              alt="logo chaine"
              width="110px"
              height="80px"
            />
          </div>
        )}
      </div>
      <div className=" h-1/3 mt-2">
        <MyProgressBar
          date_start={chaine.date_start}
          duration={chaine.duration}
          genderProgram={genderProgram}
          index={index}
          swipe_to={swipe_to}
        />
      </div>
    </div>
  );
}

export default ProgrammeGrille;
