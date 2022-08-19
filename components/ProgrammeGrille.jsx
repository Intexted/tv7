import Image from "next/image";
import React from "react";
import MyProgressBar from "./MyProgressBar";
import { heureDebut, print_Time } from "./progressbar";

function ProgrammeGrille({ chaine, genderProgram }) {
  return (
    <div className="flex flex-col  h-[85px] pt-1 ">
      <div className="  py-1 text-center  flex  space-x-4 " key={chaine.id}>
        <div className="">
          <Image
            src={chaine.logo_chaine}
            alt="logo chaine"
            width="40px"
            height="40px"
          />
        </div>
        <div className="flex space-x-2 text-left ">
          <div className="w-2/3">
            <h1 className="font-semibold text-xs">
              {/* {moment(chaine.date_start).format("HH:mm")} */}
              {heureDebut(chaine.date_start)}
            </h1>
            <h1 className="font-semibold text-xs dot w-40 text-blue-600">
              {chaine.title_fr ? chaine.title_fr : chaine.title_ar}
            </h1>
            <h1 className="text-xs text-gray-500">
              {chaine.gender}
              <span>{` (${print_Time(chaine.duration)})`}</span>
            </h1>
          </div>
          <div className="w-fit">
            <Image
              src={
                chaine.thumbnail ? chaine.thumbnail : "/static/tvShowNo.jfif"
              }
              alt="logo chaine"
              width="60px"
              height="55px"
            />
          </div>
        </div>
      </div>
      <MyProgressBar
        date_start={chaine.date_start}
        duration={chaine.duration}
        genderProgram={genderProgram}
      />
    </div>
  );
}

export default ProgrammeGrille;
