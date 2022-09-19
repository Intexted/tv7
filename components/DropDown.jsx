import moment from "moment";
import React, { useState } from "react";
import "moment/locale/fr"; // without this line it didn't work
import "moment/locale/ar"; // without this line it didn't work
moment.locale("fr");

function DropDown({ setDropDown, setDate, date }) {
  const [Selected, setSelected] = useState(
    Math.floor((date - Date.now()) / (24 * 3600 * 1000)) + 2
  );

  const addDays = function (days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  };

  return (
    <>
      <div
        onClick={() => setDropDown(false)}
        className="h-full w-full absolute top-0 left-0 bg-black opacity-25 z-10"
      ></div>
      <div
        className="h-40 w-[300px]  absolute top-1/2 left-1/2 z-50 "
        style={{ transform: " translate(-50% , -50%)" }}
      >
        <div className="bg-white  border-2 rounded-md  ">
          <div className="bg-slate-100 text-sm font-bold flex justify-between cursor-pointer h-10 w-full p-2 ">
            <h1>Filtrer par la date</h1>
            <svg
              onClick={() => setDropDown(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="p-2 m-auto w-4/5">
            {[1, 2, 3, 4, 5, 6, 7].map((i, index) => (
              <div
                onClick={() => {
                  setSelected(i);
                }}
                className="flex cursor-pointer space-x-2 items-center "
                key={i}
              >
                <div
                  className={`rounded-full flex justify-center align-middle border-2 ${
                    i === Selected ? "bg-blue-500" : "bg-blue-100"
                  } border-blue-500 h-5 w-5`}
                >
                  {i === Selected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={4}
                      stroke="white"
                      className="w-3 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                </div>
                <h1>{moment(addDays(index)).format("dddd Do MMMM ")}</h1>
              </div>
            ))}
          </div>
          <div className="bg-slate-100 border-t-2 py-1">
            <div
              onClick={() => {
                setDate(addDays(Selected - 1));
                setDropDown(false);
              }}
              className="cursor-pointer text-xs bg-color-blue w-1/2 m-auto
             rounded-sm text-center"
            >
              <h1 className="font-bold  text-white p-1">Appliquer le filtre</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DropDown;
