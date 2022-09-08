import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function Navbar({
  evening,
  journee,
  bouquet,
  eveningNumber,
  redGender = "TOUS",
  details,
  login,
}) {
  const router = useRouter();
  const token = Cookies.get("token");

  return (
    <div>
      <div className=" md:flex hidden items-center space-x-8 justify-center  border-y-4  md:px-5 ">
        <h1
          onClick={() => {
            // setGenderProgram(program);
            // setRedGender("TOUS");
            // sethasMore(true);
            // setpage(2);
            // setDetails(false);
            // setBouquet(false);
            // setEvening(false);
            // setJournee(false);
            router.push(`/actuellement/${redGender}`);
          }}
          className={`cursor-pointer tracking-tight  font-bold hover:bg-blue-500 hover:p-1 hover:text-white ${
            !evening && !journee && !bouquet && !details && !login
              ? "bg-color-blue p-1 text-white"
              : ""
          }`}
        >
          ACTUELLEMENT
        </h1>
        <h1
          onClick={() => {
            // setJournee(true);
            // setEvening(false);
            // setDetails(false);
            // setBouquet(false);
            router.push("/journee");
          }}
          className={`cursor-pointer tracking-tight  font-bold hover:bg-blue-500 hover:p-1 hover:text-white ${
            !evening && !bouquet && journee
              ? "bg-color-blue p-1 text-white"
              : ""
          }   `}
        >
          JOURNEE
        </h1>
        <h1
          onClick={() => {
            // setDetails(false);
            // setBouquet(false);
            // getParams(1);
            // sethasMore(true);
            // setpage(2);
            router.push(`/soiree/${redGender}/1`, undefined, {
              shallow: true,
            });
          }}
          className={`cursor-pointer tracking-tight  font-bold hover:bg-blue-500 hover:p-1 hover:text-white ${
            evening && eveningNumber === 1 ? "bg-color-blue p-1 text-white" : ""
          }`}
        >
          DEBUT DE SOIREE
        </h1>
        <h1
          onClick={() => {
            // setDetails(false);
            // setBouquet(false);
            // getParams(2);
            // sethasMore(true);
            // setpage(2);
            router.push(`/soiree/${redGender}/2`, undefined, {
              shallow: true,
            });
          }}
          className={`cursor-pointer tracking-tight  font-bold hover:bg-blue-500 hover:p-1 hover:text-white ${
            evening && eveningNumber === 2 ? "bg-color-blue p-1 text-white" : ""
          }`}
        >
          MILIEU DE SOIREE
        </h1>
        <h1
          onClick={() => {
            // setDetails(false);
            // setBouquet(false);
            // getParams(3);
            // sethasMore(true);
            // setpage(2);
            router.push(`/soiree/${redGender}/3`, undefined, {
              shallow: true,
            });
          }}
          className={`cursor-pointer tracking-tight  font-bold hover:bg-blue-500 hover:p-1 hover:text-white ${
            evening && eveningNumber === 3 ? "bg-color-blue p-1 text-white" : ""
          }`}
        >
          FIN DE SOIREE
        </h1>

        <h1
          onClick={() => {
            router.push("/bouquets");
          }}
          className="cursor-pointer tracking-tight 
           font-bold bg-color-blue text-white p-1"
        >
          MON TV GUIDE
        </h1>
      </div>
    </div>
  );
}

export default Navbar;
