import Image from "next/image";
import React from "react";
import MyProgressBar from "./MyProgressBar";
import { heureDebut, print_Time } from "./progressbar";
import { useRouter } from "next/router";

function ProgrammeGrille({ chaine, genderProgram }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/details/${chaine.id}`)}
      className="flex flex-col cursor-pointer "
    >
      <div className="flex w-full h-2/3" key={chaine.id}>
        <div className="w-1/5">
          <Image
            src={chaine.logo_chaine}
            alt="logo chaine"
            width="40px"
            height="40px"
          />
        </div>
        <div className=" flex flex-col w-3/5 ">
          <div className=" w-full">
            <h1 className="font-semibold text-xs">
              {/* {moment(chaine.date_start).format("HH:mm")} */}
              {heureDebut(chaine.date_start)}
            </h1>
          </div>
          <div className="  my-0.5 w-full">
            <h1 className="font-semibold text-xs text-blue-600">
              {chaine.title_fr ? chaine.title_fr : chaine.title_ar}
            </h1>
          </div>
          <div className=" w-full">
            <h1 className="text-xs text-gray-500">
              {chaine.gender}
              <span>{` (${print_Time(chaine.duration)})`}</span>
            </h1>
          </div>
        </div>
        <div className="w-1/5">
          <Image
            src={chaine.thumbnail ? chaine.thumbnail : "/static/tvShowNo.jfif"}
            alt="logo chaine"
            width="60px"
            height="55px"
          />
        </div>
      </div>
      <div className=" h-1/3 mt-2">
        <MyProgressBar
          date_start={chaine.date_start}
          duration={chaine.duration}
          genderProgram={genderProgram}
        />
      </div>
    </div>
  );
}

export default ProgrammeGrille;
