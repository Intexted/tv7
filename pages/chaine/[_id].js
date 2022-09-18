import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { heureDebut, print_Time } from "../../components/progressbar";
import { withRouter } from "next/router";
import i18n from "i18next";
import Image from "next/image";

function Program() {
  const [programAll, setProgramAll] = useState([]);
  const router = useRouter();
  const { _id } = router.query;

  useEffect(() => {
    if (_id != undefined) {
      const time = moment(new Date()).format("yyyy/MM/DD");
      try {
        axios.get(`/public/programs/channel/${_id}/${time}`).then((data) => {
          setProgramAll(data.data.data);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [_id]);
  if (programAll == undefined) {
    return (
      <div
        className="h-40 absolute top-1/2 left-1/2 "
        style={{ transform: " translate(-50% , -50%)" }}
      >
        <img
          src="/static/loading.svg"
          alt="logo chaine"
          width="100px"
          height="100px"
        />
      </div>
    );
  }
  return (
    <div>
      <div
        onClick={() => router.back()}
        className="h-12 sticky top-0 w-full  bg-slate-50 flex items-center shadow-sm px-4"
      >
        {" "}
        <img
          src="/static/arrowLeft.svg"
          alt="banner"
          width="30px"
          height="30px"
        />
      </div>
      {programAll.map((chaine) => {
        let title = "";
        if (i18n.language === "fr") {
          title = chaine.title_fr ? chaine.title_fr : chaine.title_ar;
        }
        if (i18n.language === "ar") {
          title = chaine.title_ar ? chaine.title_ar : chaine.title_fr;
        }
        if (i18n.language === "en") {
          title = chaine.title_en ? chaine.title_en : chaine.title_fr;
        }
        return (
          <div
            onClick={() => {
              router.push(`/details/${chaine.id}/${chaine.channel_id}`);
            }}
            className={`h-20 flex ${
              i18n.language === "ar" ? "rtl" : ""
            } items-center border-b-2 `}
            key={chaine.id}
          >
            <h1 className=" font-semibold text-center w-[70px] text-xs">
              {heureDebut(chaine.date_start)}
            </h1>
            <div className="w-0.5 bg-gray-200 h-16"></div>
            <div className="w-2/4  px-4 flex flex-col space-y-5">
              <h1 className="font-bold text-xs ">{title}</h1>
              <h1 className="text-xs  text-gray-500">
                {chaine.gender}
                <span>{` | ${print_Time(chaine.duration)}`}</span>
              </h1>
            </div>
            <div className="flex-1"></div>
            {chaine.thumbnail && (
              <div className="ml-auto  relative">
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
                    chaine.thumbnail
                      ? chaine.thumbnail
                      : "/static/tvShowNo.jfif"
                  }
                  alt="logo chaine"
                  width="110px"
                  height="70px"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default withRouter(Program);
