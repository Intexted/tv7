import React, { useEffect, useState } from "react";
import { getPercentage } from "./progressbar";

function MyProgressBar({ date_start, duration, genderProgram }) {
  const [percentage, setPercentage] = useState("0%");
  const [progressLabel, setProgressLabel] = useState("");
  const [labelPosition, setLabelPosition] = useState("0%");
  let [time_step, setTime_step] = useState(0);
  const updateProgressBar = () => {
    let progress = getPercentage(date_start, duration);
    setPercentage(progress.percentage + "%");
    setProgressLabel(progress.progressLabel);
    setLabelPosition(progress.labelPosition + "%");
  };

  useEffect(() => {
    updateProgressBar();
    console.log(time_step);
    // return clearInterval(progressInterval);
  }, [genderProgram, time_step]);

  useEffect(() => {
    let progressInterval = window.setInterval(() => {
      let ti = time_step;
      setTime_step(ti + 1);
    }, 30000);
  }, []);

  return (
    <div className="w-full  rounded-md   h-4 relative">
      <div
        className=" h-1 text-xxs  bg-slate-200 w-full"
        style={{ position: "absolute", bottom: 0 }}
      ></div>
      <div
        className=" h-3 text-xxs   text-blue-600 text-right relative"
        style={{
          width: labelPosition,
        }}
      >
        <span>{progressLabel}</span>
      </div>
      <div
        className=" bg-blue-400 h-1 z-50 relative"
        style={{
          width: percentage,
        }}
      ></div>
    </div>
  );
}

export default MyProgressBar;
