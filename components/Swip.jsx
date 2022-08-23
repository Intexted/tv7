import React, { useEffect, useRef } from "react";
import ProgrammeGrille from "./ProgrammeGrille";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
function Swip({ chaine, genderProgram }) {
  let swiperRef = useRef(null);

  const swipe_to = (i) => {
    swiperRef.current.swiper.slideTo(i);
  };

  return (
    <Swiper slidesPerView={1} ref={swiperRef} className="w-full ">
      <SwiperSlide key={chaine.id}>
        <ProgrammeGrille
          index={1}
          chaine={chaine}
          genderProgram={genderProgram}
          swipe_to={swipe_to}
        />
      </SwiperSlide>
      {chaine.nextPrograms?.map((chaine, i) => (
        <SwiperSlide key={chaine.id}>
          <ProgrammeGrille
            index={i + 2}
            chaine={chaine}
            genderProgram={genderProgram}
            swipe_to={swipe_to}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Swip;
