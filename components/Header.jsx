import React, { useState, useContext } from "react";
import Image from "next/image";
import { IndexContext } from "../context/context";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

function Header({ details }) {
  const [value, setValue] = useState("FR");
  const [dropDown, setDropDown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useContext(IndexContext);
  const { data: session } = useSession();

  const router = useRouter();

  return (
    <>
      <div className="p-5 px-10 flex justify-between items-center ">
        <div onClick={() => router.push("/")} className="cursor-pointer">
          <Image
            src="/static/logo.png"
            alt="banner"
            width="150px"
            height="100px"
          />
        </div>
        <div className="cursor-pointer">
          <Image
            src="/static/banner.png"
            alt="banner"
            width="600px"
            height="70px"
          />
        </div>
        <div
          className="relative mb-10"
          onClick={() => (dropDown ? setDropDown(false) : setDropDown(true))}
        >
          <div
            className={`cursor-pointer flex border-2   items-center space-x-2 px-0.5`}
          >
            <h1 className="font-bold">{value}</h1>
            <Image
              src="/static/arrow_drop_down.svg"
              alt="banner"
              width="30px"
              height="30px"
            />
          </div>
          <div
            className={`absolute w-full  bg-slate-50 border-2 ${
              !dropDown ? "hidden" : ""
            }`}
          >
            {value != "FR" && (
              <h1
                onClick={() => setValue("FR")}
                className="cursor-pointer hover:bg-slate-400 border-t-2 hover:text-white w-full font-bold"
              >
                FR
              </h1>
            )}
            {value != "EN" && (
              <h1
                onClick={() => setValue("EN")}
                className="cursor-pointer hover:bg-slate-400 border-t-2 hover:text-white w-full font-bold"
              >
                EN
              </h1>
            )}
            {value != "AR" && (
              <h1
                onClick={() => setValue("AR")}
                className="cursor-pointer hover:bg-slate-400 border-t-2 hover:text-white w-full font-bold"
              >
                AR
              </h1>
            )}
          </div>
        </div>
      </div>
      {details && (
        <div>
          {session ? (
            <div
              onClick={() => signOut({ redirect: false, callbackUrl: "/" })}
              className="text-right mb-2 pr-20 cursor-pointer"
            >
              <h1 className="font-semibold hover:font-bold text-sm">
                Se Deconnecter
              </h1>
            </div>
          ) : (
            <Link href="/login">
              <a>
                <div className="text-right mb-2 pr-20 cursor-pointer">
                  <h1 className="font-semibold hover:font-bold text-sm">
                    S&apos;IDENTIFIER
                  </h1>
                </div>
              </a>
            </Link>
          )}
        </div>
      )}
    </>
  );
}

export default Header;
