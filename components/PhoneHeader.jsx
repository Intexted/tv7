import React, { useContext, useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { IndexContext } from "../context/context";

function PhoneHeader({
  setBouquet,
  setEvening,
  setBouquetChoisi,
  bf,
  genders,
  setRedGender,
  getGenderProgram,
  eveningNumber,
  sethasMore,
  setpage,
  redGender,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [state, setState] = useContext(IndexContext);
  const router = useRouter();
  return (
    <>
      {(menuOpen || genderOpen) && (
        <div
          onClick={() => {
            setMenuOpen(false);
            setGenderOpen(false);
          }}
          className="bg-black opacity-25 w-screen h-screen fixed z-50"
        ></div>
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
            TOUS
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
              {gender.gender_fr}
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
              menuOpen ? setMenuOpen(false) : setMenuOpen(true);
              setBouquet(true);
              setEvening(false);
              setBouquetChoisi(bf);
            }}
            className="cursor-pointer tracking-tight  font-bold bg-color-blue text-white p-1"
          >
            MON TV7 GUIDE
          </h1>
        </div>
      )}

      <div
        className="sticky top-0 z-50 flex bg-white
    items-center py-2 lg:px-5 justify-between md:hidden shadow-sm border-b-2 px-2"
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
        <div>
          <h1 className="font-semibold">{state.title}</h1>
        </div>
        <div className="flex items-center space-x-1">
          <svg
            onClick={() => {
              genderOpen ? setGenderOpen(false) : setGenderOpen(true);
              setMenuOpen(false);
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
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <svg
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
