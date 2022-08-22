import React, { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

function PhoneHeader({ setBouquet, setEvening, setBouquetChoisi, bf }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  return (
    <>
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
    items-center p-1 lg:px-5 justify-between md:hidden shadow-sm border-b-2 px-2"
      >
        {menuOpen ? (
          <XIcon
            onClick={() => {
              menuOpen ? setMenuOpen(false) : setMenuOpen(true);
            }}
            className="h-10 w-10 md:hidden  cursor-pointer text-blue-500"
          />
        ) : (
          <MenuIcon
            onClick={() => {
              menuOpen ? setMenuOpen(false) : setMenuOpen(true);
            }}
            className="h-10 w-10 md:hidden  cursor-pointer text-blue-500"
          />
        )}
      </div>
    </>
  );
}

export default PhoneHeader;
