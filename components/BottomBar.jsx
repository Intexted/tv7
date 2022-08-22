import React from "react";

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
}) {
  return (
    <div>
      <div
        className="flex md:hidden bg-white border-2 w-full z-50 fixed left-0 bottom-0 space-x-2 mt-2  md:ml-1 
        items-center "
      >
        <div className="text-center w-full text-sm">
          {" "}
          <h1
            onClick={() => {
              setGenderProgram(program);
              setRedGender("TOUS");
              sethasMore(true);
              setpage(2);
              setEvening(false);
              setJournee(false);
              setBouquet(false);
            }}
            className={`cursor-pointer ${
              !evening && !journee ? "bg-color-blue text-white p-2" : "ml-2"
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
  );
}

export default BottomBar;
