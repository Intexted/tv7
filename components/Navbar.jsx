import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function Navbar({
  program,
  setGenderProgram,
  sethasMore,
  setRedGender,
  setpage,
  setBouquet,
  setEvening,
  setJournee,
  getParams,
  setBouquetChoisi,
  bf,
  evening,
  journee,
  bouquet,
  eveningNumber,
  setDetails,
}) {
  const router = useRouter();
  const token = Cookies.get("token");

  return (
    <div>
      <div className=" md:flex hidden items-center space-x-8 justify-center  border-y-4  md:px-5 ">
        <h1
          onClick={() => {
            setGenderProgram(program);
            setRedGender("TOUS");
            sethasMore(true);
            setpage(2);
            setDetails(false);
            setBouquet(false);
            setEvening(false);
            setJournee(false);
          }}
          className={`cursor-pointer tracking-tight roboto font-bold hover:bg-slate-400 hover:p-1 hover:text-white ${
            !evening && !journee && !bouquet
              ? "bg-slate-400 p-1 text-white"
              : ""
          }`}
        >
          ACTUELLEMENT
        </h1>
        <h1
          onClick={() => {
            setJournee(true);
            setEvening(false);
            setDetails(false);
          }}
          className={`cursor-pointer tracking-tight roboto font-bold hover:bg-slate-400 hover:p-1 hover:text-white ${
            !evening && !bouquet && journee ? "bg-slate-400 p-1 text-white" : ""
          }   `}
        >
          JOURNEE
        </h1>
        <h1
          onClick={() => {
            setDetails(false);
            setBouquet(false);
            getParams(1);
            sethasMore(true);
            setpage(2);
          }}
          className={`cursor-pointer tracking-tight roboto font-bold hover:bg-slate-400 hover:p-1 hover:text-white ${
            evening && eveningNumber === 1 ? "bg-slate-400 p-1 text-white" : ""
          }`}
        >
          DEBUT DE SOIREE
        </h1>
        <h1
          onClick={() => {
            setDetails(false);
            setBouquet(false);
            getParams(2);
            sethasMore(true);
            setpage(2);
          }}
          className={`cursor-pointer tracking-tight roboto font-bold hover:bg-slate-400 hover:p-1 hover:text-white ${
            evening && eveningNumber === 2 ? "bg-slate-400 p-1 text-white" : ""
          }`}
        >
          MILIEU DE SOIREE
        </h1>
        <h1
          onClick={() => {
            setDetails(false);
            setBouquet(false);
            getParams(3);
            sethasMore(true);
            setpage(2);
          }}
          className={`cursor-pointer tracking-tight roboto font-bold hover:bg-slate-400 hover:p-1 hover:text-white ${
            evening && eveningNumber === 3 ? "bg-slate-400 p-1 text-white" : ""
          }`}
        >
          FIN DE SOIREE
        </h1>

        <h1
          onClick={() => {
            if (token) {
              // setState({ ...state, title: "BOUQUET" });
              setDetails(false);
              setBouquet(true);
              setEvening(false);
              setBouquetChoisi(bf);
            } else {
              router.push("/login");
            }
          }}
          className="cursor-pointer tracking-tight  font-bold bg-color-blue text-white p-1"
        >
          MON TV7 GUIDE
        </h1>
      </div>
    </div>
  );
}

export default Navbar;
