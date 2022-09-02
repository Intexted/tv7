import Image from "next/image";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import moment from "moment";

function GrilleJournee({ bouquet }) {
  return (
    <>
      {bouquet.map((chaine) => {
        let index = chaine.programDay.findIndex(
          (item) => new Date(item.date_start).getTime() > Date.now()
        );
        let numHeight = chaine.programDay.filter(
          (item) => new Date(item.date_start).getTime() > Date.now()
        ).length;
        let string = numHeight === 0 ? 150 * 4 : 150 * numHeight;
        return (
          <SwiperSlide key={chaine.id}>
            <div
              className=" w-20 ml-2 flex text-center items-center justify-center"
              key={chaine.id}
            >
              <Image
                src={chaine.logo_chaine}
                alt="logo chaine"
                width="70px"
                height="80px"
              />
            </div>

            <div
              className={` overflow-y-auto  `}
              style={{ height: `${string.toString()}px` }}
            >
              <Swiper
                className="mySwiper2 swiper-v h-2/3"
                direction={"vertical"}
                slidesPerView={"auto"}
                draggable={true}
                initialSlide={index}
                spaceBetween={0}
              >
                <div className="">
                  {chaine?.programDay.map((item) => {
                    return (
                      <SwiperSlide className="" key={item.id}>
                        <div
                          className="border-2 h-fit border-l-0 border-slate-100 p-2"
                          key={item.id}
                        >
                          <h1 className="font-bold text-xs">
                            {moment(item.date_start).format("HH:mm")}
                          </h1>
                          <h1 className="text-xs font-medium text-blue-700">
                            {item.title_fr}
                          </h1>
                          <h1 className="text-xs text-gray-500">
                            {item.gender}
                          </h1>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </div>
              </Swiper>
            </div>
          </SwiperSlide>
        );
      })}
    </>
  );
}

export default GrilleJournee;
