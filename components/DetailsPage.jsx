import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import i18n from "i18next";

import moment from "moment";

import "moment/locale/fr"; // without this line it didn't work
import "moment/locale/ar"; // without this line it didn't work
moment.locale("fr");

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { heureDebut, print_Time } from "./progressbar";

import useWindowDimensions from "./hooks/useWindowDimensions";

function DetailsPage({ chaineId, channelId, setChaineId, setChannelId }) {
  const { width } = useWindowDimensions();
  const [programDetails, setProgramDetails] = useState();
  const [programAll, setProgramAll] = useState();
  const [playButton, setPlayButton] = useState(true);
  const router = useRouter();

  const vidRef = useRef(null);
  const handlePlayVideo = () => {
    vidRef.current.play();
  };

  const getRealisateurAndActeursInfo = (
    listOfPersonne,
    anneeRealisation,
    nationaliteRealisateur
  ) => {
    let realisation,
      realisateur,
      acteurs = "";

    if (listOfPersonne && listOfPersonne.length > 0) {
      listOfPersonne = JSON.parse(listOfPersonne);
      realisateur = listOfPersonne?.filter(
        (item) => item.libelle === "Réalisateur"
      )[0]?.personne;
      acteurs = listOfPersonne
        .filter((item) => item.libelle === "Acteur")
        .map((p) => p.personne)
        .join(", ");

      realisation = realisateur
        ? `${realisateur} (${anneeRealisation}) - ${nationaliteRealisateur}`
        : "";
    }
    return { realisation, realisateur, acteurs };
  };

  let programPersonne = getRealisateurAndActeursInfo(
    programDetails?.acteurSerieOrMovie,
    programDetails?.anneeRealisationSerieOrMovie,
    programDetails?.nationaliteSerieOrMovie
  );

  let programPersonneAr = getRealisateurAndActeursInfo(
    programDetails?.acteurSerieOrMovieAr,
    programDetails?.anneeRealisationSerieOrMovie,
    programDetails?.nationaliteSerieOrMovie
  );

  var event = new Date(Date.now());
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let title = "";
  if (i18n.language === "fr" || i18n.language === "fr-FR") {
    title = programDetails?.title_fr
      ? programDetails?.title_fr
      : programDetails?.title_en
      ? programDetails?.title_en
      : programDetails?.title_ar;
  }
  if (i18n.language === "ar") {
    title = programDetails?.title_ar;
  }
  if (i18n.language === "en" || i18n.language === "en-US") {
    title = programDetails?.title_en
      ? programDetails?.title_en
      : programDetails?.title_ar;
  }

  let index =
    programAll &&
    programAll.findIndex((item) => item.id === programDetails?.id);

  useEffect(() => {
    if (channelId != undefined) {
      const time = moment(new Date()).format("yyyy/MM/DD");
      try {
        axios
          .get(`/public/programs/channel/${channelId}/${time}`)
          .then((data) => {
            setProgramAll(data.data.data);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [channelId]);

  useEffect(() => {
    if (chaineId != undefined) {
      try {
        axios.get(`/public/programs/${chaineId}`).then((data) => {
          setProgramDetails(data.data.data[0]);
          console.log(data.data.data[0]);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [chaineId]);

  console.log(programDetails);

  if (programDetails == undefined || programAll == undefined) {
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
    <>
      <div className=" mt-2 mb-20">
        <div
          className={`flex  space-x-5 items-center px-5 ${
            i18n.language === "ar" ? "rtl" : ""
          }`}
        >
          <div className="mx-2 ">
            <Image
              src={programAll[0].logo_chaine}
              alt="logo chaine"
              width="90px"
              height="90px"
              objectFit="contain"
            />
          </div>
          <div>
            <h1 className="font-semibold capitalize">
              {i18n.language === "ar"
                ? event.toLocaleDateString("ar-EG-u-nu-latn", options)
                : i18n.language === "fr"
                ? moment(programDetails.date_start).format("dddd Do MMMM ")
                : event.toLocaleDateString("en-EN", options)}
            </h1>
            <h1 className="font-semibold ">
              {/* {moment(chaine.date_start).format("HH:mm")} */}
              {heureDebut(programDetails.date_start)}{" "}
              <span>{`| ${print_Time(programDetails.duration)}`}</span>
            </h1>
          </div>
          {/* <div className="flex-grow"></div>
          <div onClick={() => router.back()} className="cursor-pointer w-10">
            <img
              src="/static/back.svg"
              alt="banner"
              width="30px"
              height="30px"
            />
          </div> */}
        </div>

        <div
          className={`w-11/12 m-auto ${
            i18n.language === "ar" ? "rtl" : ""
          } flex flex-col md:flex-row  space-x-5 
           mt-2 gap-10 `}
        >
          <div className="w-full  md:w-2/3">
            {programDetails?.video ? (
              <div className="relative">
                <video
                  poster={programDetails?.cover}
                  onPlay={() => setPlayButton(false)}
                  onPause={() => setPlayButton(true)}
                  ref={vidRef}
                  controls
                  style={{ width: "800px" }}
                >
                  <source src={programDetails?.video} />
                </video>
                {playButton && (
                  <div
                    style={{ transform: " translate(-50% , -50%)" }}
                    className="hidden md:flex absolute top-1/2 left-1/2  text-center rounded-full z-50"
                  >
                    <svg
                      onClick={() => handlePlayVideo()}
                      className="cursor-pointer"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      width="40px"
                      height="40px"
                      viewBox="0 0 27.8 27.8"
                      style={{ enableBackground: "new 0 0 27.8 27.8" }}
                      xmlSpace="preserve"
                    >
                      <path
                        fill="#FFF"
                        d="M23.8,4.1c-2.5-2.5-6-4.1-9.8-4.1S6.6,1.6,4.1,4.1C1.6,6.6,0,10.1,0,13.9c0,7.7,6.2,13.9,13.9,13.9c3.8,0,7.3-1.6,9.8-4.1
	c2.5-2.5,4.1-6,4.1-9.8C27.8,10.1,26.3,6.6,23.8,4.1z M11.4,18.8V7.9l8.1,5.9L11.4,18.8z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ) : (
              programDetails?.cover && (
                <img
                  src={programDetails?.cover}
                  alt="logo chaine"
                  width="800px"
                  height="400px"
                />
              )
            )}
            <h1 className="mt-2 font-bold">{title}</h1>
            <h1 className="mt-2 capitalize font-semibold">
              {programDetails.gender}{" "}
            </h1>
            {programPersonne.realisation && i18n.language != "ar" && (
              <div className="flex space-x-2">
                <h1>
                  <span className="font-semibold">Realisations: </span>
                  {programPersonne.realisation}
                </h1>
                {/* <h1>{programPersonne.realisation}</h1> */}
              </div>
            )}

            {programDetails.saisonSerieOrMovie && i18n.language != "ar" && (
              <div className="flex space-x-2">
                <h1>
                  <span className="font-semibold"> Saison: </span>
                  {programDetails.saisonSerieOrMovie}
                </h1>
              </div>
            )}
            {programDetails.episodeSerie && i18n.language != "ar" && (
              <div className="flex space-x-2">
                <h1>
                  <span className="font-semibold"> Episode: </span>
                  {programDetails.episodeSerie}
                </h1>
              </div>
            )}
            {programDetails.duration && i18n.language != "ar" && (
              <div className="flex space-x-2">
                <h1>
                  <span className="font-semibold"> Duree: </span>
                  {print_Time(programDetails.duration)}{" "}
                </h1>
              </div>
            )}
            {/* {programDetails.duration && i18n.language === "ar" && (
              <div className="flex space-x-2">
                <h1>
                  <span className="font-semibold"> المدة الزمنية: </span>
                  {print_Time(programDetails.duration)}{" "}
                </h1>
              </div>
            )} */}

            <h1 className=" my-2">
              {i18n.language === "fr"
                ? programDetails.description_fr
                  ? programDetails.description_fr
                  : programDetails.description_en
                  ? programDetails.description_en
                  : programDetails.description_ar
                : i18n.language === "ar"
                ? programDetails.description_ar
                : programDetails.description_en
                ? programDetails.description_en
                : programDetails.description_ar}
            </h1>

            {programPersonne.realisateur && i18n.language != "ar" && (
              <div className="flex space-x-2">
                <h1>
                  <span className="font-semibold">Réalisateur: </span>
                  {programPersonne.realisateur}
                </h1>
              </div>
            )}

            {programPersonne.acteurs && i18n.language != "ar" && (
              <div className="flex space-x-2">
                <h1>
                  <span className="font-semibold">Acteurs: </span>
                  {programPersonne.acteurs}
                </h1>
              </div>
            )}
            {programPersonneAr.acteurs && i18n.language === "ar" && (
              <div className="flex space-x-2">
                <h1>
                  <span className="font-semibold">ممثلين: </span>
                  {programPersonneAr.acteurs}
                </h1>
              </div>
            )}
            {programPersonneAr.realisateur && i18n.language === "ar" && (
              <div className="flex space-x-2">
                <h1>
                  <span className="font-semibold">اخراج: </span>
                  {programPersonneAr.realisateur}
                </h1>
              </div>
            )}
            <h1
              onClick={() => {
                router.push(`/chaine/${channelId}`);
              }}
              className="mt-2 mb-5 font-bold underline"
            >
              {i18n.language === "fr"
                ? " Programme de la journée pour cette chaine"
                : i18n.language === "ar"
                ? "تابع في هذه القناة"
                : "Follow on this channel"}
            </h1>

            <Swiper
              slidesPerView={width > 600 ? 4.5 : 2.5}
              className="mb-5 ltr"
              spaceBetween={2}
              initialSlide={index + 1}
            >
              {programAll.map((chaine) => {
                let title = "";
                if (i18n.language === "fr") {
                  title = chaine.title_fr
                    ? chaine.title_fr
                    : chaine.title_en
                    ? chaine.title_en
                    : chaine.title_ar;
                }
                if (i18n.language === "ar") {
                  title = chaine.title_ar;
                }
                if (i18n.language === "en") {
                  title = chaine.title_en ? chaine.title_en : chaine.title_ar;
                }
                return (
                  <SwiperSlide key={chaine.id}>
                    <div
                      onClick={() => {
                        router.push(
                          `/details/${chaine.id}/${chaine.channel_id}`
                        );
                      }}
                      className="cursor-pointer border-2 p-2 text-center  h-[195px]"
                    >
                      <div className="">
                        <img
                          src={
                            chaine.thumbnail
                              ? chaine.thumbnail
                              : "/static/tvShowNo.jfif"
                          }
                          alt="logo chaine"
                          width="200px"
                          height="150px"
                          objectFit=""
                        />
                        <div className="mt-2">
                          <h1 className="font-semibold text-xs">
                            {heureDebut(chaine.date_start)}
                          </h1>
                        </div>
                        <div className="mt-2">
                          <h1 className="font-semibold text-xs ">{title}</h1>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div
            className={`w-11/12 m-0  md:w-1/3 ${
              i18n.language === "ar" ? "justify-left" : ""
            }`}
          >
            {/* add pub here */}
            <img
              src="/static/banner2.png"
              alt="logo chaine"
              width="300px"
              height="300px"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsPage;
