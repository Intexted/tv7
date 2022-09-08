import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

import moment from "moment";
import "moment/locale/fr"; // without this line it didn't work
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
  const router = useRouter();

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
      <div className=" mt-5 ">
        <div className="flex space-x-5 items-center px-5">
          <div>
            <Image
              src={programAll[0].logo_chaine}
              alt="logo chaine"
              width="90px"
              height="90px"
            />
          </div>
          <div>
            <h1 className="font-semibold capitalize">
              {moment(programDetails.date_start).format("dddd Do MMMM ")}
            </h1>
            <h1 className="font-semibold ">
              {/* {moment(chaine.date_start).format("HH:mm")} */}
              {heureDebut(programDetails.date_start)}{" "}
              <span>{`| ${print_Time(programDetails.duration)}`}</span>
            </h1>
          </div>
        </div>

        <div
          className="w-11/12 m-auto flex flex-col md:flex-row  space-x-5 
        md:space-x-20 mt-2 "
        >
          <div className="w-full md:w-2/3">
            {programDetails?.video ? (
              <video controls style={{ width: "800px" }}>
                <source src={programDetails?.video} />
              </video>
            ) : (
              <img
                src={
                  programDetails?.cover
                    ? programDetails?.cover
                    : "/static/tvShowNo.jfif"
                }
                alt="logo chaine"
                width="800px"
                height="400px"
              />
            )}
            <h1 className="mt-2 font-bold">{programDetails.title_fr}</h1>

            <h1 className="mt-2 font-semibold">
              {programDetails.description_fr
                ? programDetails.description_fr
                : programDetails.description_ar}
            </h1>

            <h1 className="mt-2 capitalize font-semibold">
              {programDetails.gender}{" "}
            </h1>
            <h1 className="mt-2 mb-5 font-bold underline">
              A suivre sur cette chaine
            </h1>

            <Swiper
              slidesPerView={width > 600 ? 3.5 : 2.5}
              className="mb-5"
              spaceBetween={2}
              initialSlide={index + 1}
            >
              {programAll.map((chaine) => (
                <SwiperSlide key={chaine.id}>
                  <div
                    onClick={() => {
                      router.push(`/details/${chaine.id}/${chaine.channel_id}`);
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
                      />
                      <div className="mt-2">
                        <h1 className="font-semibold text-xs">
                          {heureDebut(chaine.date_start)}
                        </h1>
                      </div>
                      <div className="mt-2">
                        <h1 className="font-semibold text-xs ">
                          {chaine.title_fr ? chaine.title_fr : chaine.title_ar}
                        </h1>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="w-11/12 m-auto mb-20 md:m-0  md:w-1/3">
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
