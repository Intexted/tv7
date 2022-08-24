import React, { useContext } from "react";
import { IndexContext } from "../context/context";

function BottomBar({
  setGenderProgram,
  setRedGender,
  sethasMore,
  setpage,
  setEvening,
  setJournee,
  evening,
  journee,
  setBouquet,
  getParams,
  program,
  eveningNumber,
  bouquet,
}) {
  const [state, setState] = useContext(IndexContext);
  return (
    <>
      {evening && (
        <div
          className="flex md:hidden bg-white border-2 w-full z-30 fixed left-0 bottom-10 space-x-4 mt-2  md:ml-1 
        items-center "
        >
          <div className="text-center w-full text-sm">
            <h1
              onClick={async () => {
                setBouquet(false);
                sethasMore(true);
                setpage(2);
                getParams(1);
              }}
              className={`cursor-pointer tracking-tight roboto font-bold  ${
                evening && eveningNumber === 1
                  ? "bg-color-blue text-white p-2"
                  : "ml-2"
              }`}
            >
              DEBUT
            </h1>
          </div>
          <h1 className="">|</h1>
          <div className="text-center w-full text-sm">
            <h1
              onClick={() => {
                setBouquet(false);
                sethasMore(true);
                setpage(2);

                getParams(2);
              }}
              className={`cursor-pointer tracking-tight roboto font-bold  ${
                evening && eveningNumber === 2
                  ? "bg-color-blue text-white p-2"
                  : "ml-2"
              }`}
            >
              MILIEU
            </h1>
          </div>
          <h1 className="">|</h1>
          <div className="text-center w-full text-sm">
            <h1
              onClick={async () => {
                setBouquet(false);
                sethasMore(true);
                setpage(2);
                getParams(3);
              }}
              className={`cursor-pointer tracking-tight roboto font-bold  ${
                evening && eveningNumber === 3
                  ? "bg-color-blue text-white p-2"
                  : "ml-2"
              }`}
            >
              FIN
            </h1>
          </div>
        </div>
      )}
      <div>
        <div
          className="flex md:hidden bg-white border-2 w-full z-30 fixed left-0 bottom-0 space-x-2 mt-2  md:ml-1 
        items-center "
        >
          <div className="text-center w-full text-sm">
            {" "}
            <h1
              onClick={() => {
                window.scrollTo(0, 0);
                setState({ ...state, title: "ACTUELLEMENT" });
                setGenderProgram(program);
                setRedGender("TOUS");
                sethasMore(true);
                setpage(2);
                setEvening(false);
                setJournee(false);
                setBouquet(false);
              }}
              className={`cursor-pointer ${
                !evening && !journee && !bouquet
                  ? "bg-color-blue text-white p-2"
                  : "ml-2 p-2"
              }   font-semibold `}
            >
              ACTUELLEMENT
            </h1>
          </div>
          <h1>|</h1>
          <div className="text-center w-full text-sm">
            {" "}
            <h1
              onClick={() => {
                window.scrollTo(0, 0);
                setState({ ...state, title: "JOURNEE" });
                setJournee(true);
                setEvening(false);
                setBouquet(false);
              }}
              className={`cursor-pointer ${
                !evening && journee ? "bg-color-blue text-white p-2" : ""
              }   font-semibold `}
            >
              JOURNEE
            </h1>
          </div>
          <h1>|</h1>
          <div className="text-center w-full text-sm">
            {" "}
            <h1
              onClick={() => {
                window.scrollTo(0, 0);
                setState({ ...state, title: "SOIREE" });
                setBouquet(false);
                sethasMore(true);
                setpage(2);
                getParams(1);
              }}
              className={`cursor-pointer ${
                evening && !journee ? "bg-color-blue text-white p-2" : ""
              }   font-semibold `}
            >
              SOIREE
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default BottomBar;
