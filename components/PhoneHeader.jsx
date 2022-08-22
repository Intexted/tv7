import React, { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

function PhoneHeader({ setBouquet, setEvening }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      {menuOpen && (
        <div
          className="flex z-50 flex-col m-auto justify-self-start w-screen top-16
         fixed text-center px-10 py-2 bg-white border-b-2 
           border-blue-100 shadow-md "
        >
          <h1
            onClick={() => {
              menuOpen ? setMenuOpen(false) : setMenuOpen(true);
              setBouquet(true);
              setEvening(false);
            }}
            className="cursor-pointer tracking-tight  font-bold bg-color-blue text-white p-1"
          >
            MON TV7 GUIDE
          </h1>

          <Link href="/#portfolio" passHref>
            <h3
              onClick={() => {
                menuOpen ? setMenuOpen(false) : setMenuOpen(true);
              }}
              className="cursor-pointer font-semibold border-b-2 max-w-full border-gray-200 hover:bg-gray-100 p-2 rounded-smssssssssssssssss"
            >
              Portfolio
            </h3>
          </Link>
          <Link href="/#contact" passHref>
            <h3
              onClick={() => {
                menuOpen ? setMenuOpen(false) : setMenuOpen(true);
              }}
              className="cursor-pointer font-semibold  max-w-full border-gray-200 hover:bg-gray-100 p-2 rounded-smssssssssssssssss"
            >
              Contact
            </h3>
          </Link>
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
