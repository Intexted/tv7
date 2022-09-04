import Image from "next/image";
import moment from "moment";
import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
import { IndexContext } from "../context/context";
import useWindowDimensions from "./hooks/useWindowDimensions";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import Cookies from "js-cookie";
import loading from "../public/static/loading.svg";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import PhoneHeader from "./PhoneHeader";
import BottomBar from "./BottomBar";
import Swip from "./Swip";
import Navbar from "./Navbar";
import Bouquet from "./Bouquet";
import DetailsPage from "./DetailsPage";

function Grille({ genders, program, bf, bm, bmo }) {
  const { width } = useWindowDimensions();
  const [state, setState] = useContext(IndexContext);
  const [genderProgram, setGenderProgram] = useState([]);
  const [redGender, setRedGender] = useState("TOUS");
  const [evening, setEvening] = useState(false);
  const [eveningNumber, setEveningNumber] = useState(1);
  const [journee, setJournee] = useState(false);
  const [bouquetChoisi, setBouquetChoisi] = useState(bf);
  const [bouquet, setBouquet] = useState(false);
  const [page, setpage] = useState(2);
  const [hasMore, sethasMore] = useState(true);
  const [bouquetChoisiNumero, setBouquetChoisiNumero] = useState(1);
  const [details, setDetails] = useState(false);
  const [chaineId, setChaineId] = useState();
  const [channelId, setChannelId] = useState();

  const router = useRouter();
  let { id } = router.query;
  const token = Cookies.get("token");

  useEffect(() => {
    if (id?.length > 0 && id[0] === "actuellement") {
      sethasMore(true);
      setpage(2);
      setDetails(false);
      setBouquet(false);
      setEvening(false);
      setJournee(false);
      if (!id[1]) {
        setGenderProgram(program);
      } else {
        setRedGender(id[1]);
        getGenderProgram(id[1], null, false);
        console.log(eveningNumber);
      }
    } else if (id?.length > 0 && id[0] === "bouquet") {
      if (token) {
        setDetails(false);
        setBouquet(true);
        setEvening(false);

        if (id[1] === "2") {
          setBouquetChoisi(bm);
          setBouquetChoisiNumero(2);
        } else if (id[1] === "3") {
          setBouquetChoisi(bmo);
          setBouquetChoisiNumero(3);
        } else {
          setBouquetChoisi(bf);
          setBouquetChoisiNumero(1);
        }
      } else {
        router.push("/login");
      }
    } else if (id[0] === "journee") {
      setJournee(true);
      setEvening(false);
      setDetails(false);
      setBouquet(false);
    } else if (id?.length > 0 && id[0] === "soiree") {
      window.scrollTo(0, 0);
      setState({ ...state, title: "SOIREE" });
      setDetails(false);
      setBouquet(false);
      sethasMore(true);
      setpage(2);

      if (id[2] === "2") {
        setRedGender(id[1]);
        setEveningNumber(2);
        getParams(id[1], 2);
        // setDetails(false);
        // setBouquet(false);
        // getParams(2);
        // sethasMore(true);
        // setpage(2);
      } else if (id[2] === "3") {
        setRedGender(id[1]);
        setEveningNumber(3);
        getParams(id[1], 3);
        // setDetails(false);
        // setBouquet(false);
        // getParams(3);
        // sethasMore(true);
        // setpage(2);
      } else if (id[2] === "1") {
        setRedGender(id[1]);
        setEveningNumber(1);
        getParams(id[1], 1);

        // setDetails(false);
        // setBouquet(false);
        // getParams(1);
        // sethasMore(true);
        // setpage(2);
      }
    } else if (id?.length > 0 && id[0] === "details") {
      setChaineId(id[1]);
      setChannelId(id[2]);
      setEvening(false);
      setDetails(true);
      setBouquet(false);
      setJournee(false);
    } else {
      return;
    }
  }, [id, bf, bm, bmo, token, eveningNumber, evening]);

  useEffect(() => {
    setGenderProgram(program);
  }, []);

  const fetchMoreData = async () => {
    const time = moment(new Date()).format("yyyy/MM/DD");

    try {
      const { data } = await axios.get(
        evening
          ? `/public/programs/evening/pt${eveningNumber}/${time} ? 
              ${`gender=${redGender}&`}
            page=${page} `
          : `/public/programs/atthemoment/${time} ? 
          ${`gender=${redGender}&`}
            page=${page}`
      );

      setGenderProgram([...genderProgram, ...data.data]);
      if (data.data.length === 0) {
        sethasMore(false);
        setpage(2);
      }
      setpage(page + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTous = () => {
    evening
      ? getGenderProgram("TOUS", eveningNumber)
      : setGenderProgram(program);
  };

  const getParams = (gender, num) => {
    setEvening(true);
    setJournee(false);
    setEveningNumber(num);
    getNightProgram(num, gender);
  };

  const getNightProgram = async (num, redGender) => {
    console.log(num);
    try {
      const time = moment(new Date()).format("yyyy/MM/DD");
      const { data } = await axios.get(
        `/public/programs/evening/pt${num}/${time}?gender=${redGender}
         `
      );
      setGenderProgram(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGenderProgram = async (gender, num, evening = evening) => {
    const genderTrim = gender.trim();
    try {
      const time = moment(new Date()).format("yyyy/MM/DD");
      const { data } = await axios.get(
        evening
          ? `/public/programs/evening/pt${num}/${time} ?gender=${genderTrim} `
          : `/public/programs/atthemoment/${time} ?gender=${genderTrim}`
      );
      setGenderProgram(data.data);

      // setEvening(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (!bm) {
    return (
      <div
        className="h-40 absolute top-1/2 left-1/2 "
        style={{ transform: " translate(-50% , -50%)" }}
      >
        <Image src={loading} alt="logo chaine" width="100px" height="100px" />
      </div>
    );
  }

  return (
    <>
      <PhoneHeader
        setBouquet={setBouquet}
        setEvening={setEvening}
        setBouquetChoisi={setBouquetChoisi}
        bf={bf}
        genders={genders}
        setRedGender={setRedGender}
        getGenderProgram={getGenderProgram}
        eveningNumber={eveningNumber}
        sethasMore={sethasMore}
        setpage={setpage}
        redGender={redGender}
        handleTous={handleTous}
      />
      <BottomBar
        setGenderProgram={setGenderProgram}
        setRedGender={setRedGender}
        sethasMore={sethasMore}
        setpage={setpage}
        setEvening={setEvening}
        setJournee={setJournee}
        evening={evening}
        journee={journee}
        setBouquet={setBouquet}
        getParams={getParams}
        program={program}
        setBouquetChoisi={setBouquetChoisi}
        bf={bf}
        eveningNumber={eveningNumber}
        bouquet={bouquet}
        setDetails={setDetails}
        redGender={redGender}
      />

      <div className="md:mt-5">
        <Navbar
          setDetails={setDetails}
          program={program}
          setGenderProgram={setGenderProgram}
          sethasMore={sethasMore}
          setpage={setpage}
          setBouquet={setBouquet}
          setEvening={setEvening}
          setJournee={setJournee}
          getParams={getParams}
          setBouquetChoisi={setBouquetChoisi}
          bf={bf}
          evening={evening}
          journee={journee}
          bouquet={bouquet}
          setRedGender={setRedGender}
          eveningNumber={eveningNumber}
          redGender={redGender}
          details={details}
        />
        {bouquet && (
          <Bouquet
            setBouquetChoisiNumero={setBouquetChoisiNumero}
            setBouquetChoisi={setBouquetChoisi}
            bf={bf}
            bm={bm}
            bmo={bmo}
            bouquetChoisiNumero={bouquetChoisiNumero}
            bouquetChoisi={bouquetChoisi}
          />
        )}

        {journee && !bouquet && (
          <div className="mt-5  border-2 border-slate-100 px-5">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              slidesPerView={width / 160}
              className=""
            >
              {bm?.map((chaine) => {
                let index = chaine.programDay.findIndex(
                  (item) => new Date(item.date_start).getTime() > Date.now()
                );
                let numHeight = chaine.programDay.filter(
                  (item) => new Date(item.date_start).getTime() > Date.now()
                ).length;
                let string = numHeight === 0 ? 150 * 4 : 150 * numHeight;
                return (
                  <SwiperSlide key={chaine.id}>
                    <div
                      className=" w-20  m-auto flex mb-4 text-center items-center justify-center"
                      key={chaine.id}
                    >
                      <Image
                        src={chaine.logo_chaine}
                        alt="logo chaine"
                        width="40px"
                        height="40px"
                      />
                    </div>

                    <div
                      className={` overflow-y-auto  `}
                      style={{ height: `${string.toString()}px` }}
                    >
                      <Swiper
                        className="mySwiper2 w-24 swiper-v h-2/3"
                        direction={"vertical"}
                        slidesPerView={"auto"}
                        draggable={true}
                        initialSlide={index}
                        spaceBetween={0}
                        navigation={true}
                        modules={[Navigation]}
                      >
                        <div className="">
                          {chaine?.programDay.map((item) => {
                            return (
                              <SwiperSlide
                                onClick={() =>
                                  router.push(
                                    `/details/${item.id}/${item.channel_id}`
                                  )
                                }
                                className="cursor-pointer"
                                key={item.id}
                              >
                                <div
                                  className="border-2 h-fit  border-slate-100 p-2"
                                  key={item.id}
                                >
                                  <h1 className="font-bold text-xs">
                                    {moment(item.date_start).format("HH:mm")}
                                  </h1>
                                  <h1 className="text-xs font-medium text-blue-700">
                                    {item.title_ar}
                                  </h1>
                                  <h1 className="text-xs text-gray-500">
                                    {item.gender}
                                  </h1>
                                </div>
                              </SwiperSlide>
                            );
                          })}
                        </div>
                      </Swiper>
                    </div>
                  </SwiperSlide>
                );
              })}
              {bmo?.map((chaine) => {
                let index = chaine.programDay.findIndex(
                  (item) => new Date(item.date_start).getTime() > Date.now()
                );
                let numHeight = chaine.programDay.filter(
                  (item) => new Date(item.date_start).getTime() > Date.now()
                ).length;
                let string = numHeight === 0 ? 150 * 4 : 150 * numHeight;
                return (
                  <SwiperSlide key={chaine.id}>
                    <div
                      className=" w-20 m-auto mb-4  flex text-center items-center justify-center"
                      key={chaine.id}
                    >
                      <Image
                        src={chaine.logo_chaine}
                        alt="logo chaine"
                        width="40px"
                        height="40px"
                      />
                    </div>

                    <div
                      className={` overflow-y-auto  `}
                      style={{ height: `${string.toString()}px` }}
                    >
                      <Swiper
                        className="mySwiper2 w-24 swiper-v h-2/3"
                        direction={"vertical"}
                        slidesPerView={"auto"}
                        draggable={true}
                        initialSlide={index}
                        spaceBetween={0}
                      >
                        <div className="">
                          {chaine?.programDay.map((item) => {
                            return (
                              <SwiperSlide
                                onClick={() =>
                                  router.push(
                                    `/details/${item.id}/${item.channel_id}`
                                  )
                                }
                                className="cursor-pointer"
                                key={item.id}
                              >
                                <div
                                  className="border-2 h-fit border-slate-100 p-2"
                                  key={item.id}
                                >
                                  <h1 className="font-bold text-xs">
                                    {moment(item.date_start).format("HH:mm")}
                                  </h1>
                                  <h1 className="text-xs font-medium text-blue-700">
                                    {item.title_ar}
                                  </h1>
                                  <h1 className="text-xs text-gray-500">
                                    {item.gender}
                                  </h1>
                                </div>
                              </SwiperSlide>
                            );
                          })}
                        </div>
                      </Swiper>
                    </div>
                  </SwiperSlide>
                );
              })}
              {bf?.map((chaine) => {
                let index = chaine.programDay.findIndex(
                  (item) => new Date(item.date_start).getTime() > Date.now()
                );
                let numHeight = chaine.programDay.filter(
                  (item) => new Date(item.date_start).getTime() > Date.now()
                ).length;
                let string = numHeight === 0 ? 150 * 4 : 150 * numHeight;
                return (
                  <SwiperSlide key={chaine.id}>
                    <div
                      className=" w-20 m-auto mb-4  flex text-center items-center justify-center"
                      key={chaine.id}
                    >
                      <Image
                        src={chaine.logo_chaine}
                        alt="logo chaine"
                        width="40px"
                        height="40px"
                      />
                    </div>

                    <div
                      className={` overflow-y-auto  `}
                      style={{ height: `${string.toString()}px` }}
                    >
                      <Swiper
                        className="mySwiper2 w-24 swiper-v h-2/3"
                        direction={"vertical"}
                        slidesPerView={"auto"}
                        draggable={true}
                        initialSlide={index}
                        spaceBetween={0}
                      >
                        <div className="">
                          {chaine?.programDay.map((item) => {
                            return (
                              <SwiperSlide
                                onClick={() =>
                                  router.push(
                                    `/details/${item.id}/${item.channel_id}`
                                  )
                                }
                                className="cursor-pointer"
                                key={item.id}
                              >
                                <div
                                  className="border-2 h-fit  border-slate-100 p-2"
                                  key={item.id}
                                >
                                  <h1 className="font-bold text-xs">
                                    {moment(item.date_start).format("HH:mm")}
                                  </h1>
                                  <h1 className="text-xs font-medium text-blue-700">
                                    {item.title_fr}
                                  </h1>
                                  <h1 className="text-xs text-gray-500">
                                    {item.gender}
                                  </h1>
                                </div>
                              </SwiperSlide>
                            );
                          })}
                        </div>
                      </Swiper>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
        {!journee && !details && !bouquet && (
          <div className="flex content-center  justify-center md:w-11/12 md:py-5 w-full md:m-auto">
            <div className="w-full">
              <div className="md:flex hidden mb-2 items-center space-x-1">
                <h1
                  onClick={() => {
                    // setRedGender("TOUS");
                    // handleTous();
                    // sethasMore(true);
                    // setpage(2);

                    evening
                      ? router.push(
                          `/soiree/TOUS/${eveningNumber}`,
                          undefined,
                          {
                            shallow: true,
                          }
                        )
                      : router.push(`/actuellement/TOUS`, undefined, {
                          shallow: true,
                        });
                  }}
                  className={`text-xs cursor-pointer ${
                    redGender === "TOUS"
                      ? "bg-color-blue text-white p-0.5"
                      : "hover:bg-slate-400 hover:text-white hover:p-1 text-blue-300"
                  }`}
                >
                  TOUS
                </h1>
                {genders?.map((gender) => (
                  <>
                    <h1 className="text-slate-200 mx-1">|</h1>
                    <h1
                      onClick={() => {
                        // setRedGender(gender.gender_fr);
                        console.log(gender.gender_fr.trim());
                        // getGenderProgram(gender.gender_fr, eveningNumber);
                        // sethasMore(true);
                        // setpage(2);
                        evening
                          ? router.push(
                              `/soiree/${gender.gender_fr.trim()}/${eveningNumber}`,
                              undefined,
                              {
                                shallow: true,
                              }
                            )
                          : router.push(
                              `/actuellement/${gender.gender_fr.trim()}`,
                              undefined,
                              {
                                shallow: true,
                              }
                            );
                      }}
                      className={`text-xs cursor-pointer
                 
                 ${
                   redGender === gender.gender_fr.trim()
                     ? "bg-color-blue text-white p-0.5"
                     : "hover:bg-slate-400 hover:text-white hover:p-1 text-blue-300"
                 }`}
                      key={gender.id}
                    >
                      {gender.gender_fr.trim()}
                    </h1>
                  </>
                ))}
              </div>
              <div>
                <InfiniteScroll
                  dataLength={genderProgram.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
                  loader={<h4 className="md:p-2 text-gray-500"></h4>}
                  className="grid pt-2 sm:grid-cols-1 gap-1 md:gap-5  md:grid-cols-3 content-center
                 xl:grid-cols-4  m-auto mb-10 border-t-2 w-full"
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b></b>
                    </p>
                  }
                >
                  {genderProgram.map((chaine, index) => {
                    let items = 4;

                    if (width < 640) {
                      items = 4;
                    } else if (width < 1280) {
                      items = 12;
                    } else {
                      items = 16;
                    }

                    return (
                      <>
                        {index != 0 && index % items === 0 ? (
                          <>
                            <div className=" md:grid-3 xl:grid-4  m-auto my-5  ">
                              <Image
                                src="/static/banner3.png"
                                alt="banner"
                                width="800px"
                                height="70px"
                              />
                            </div>
                            <Swip
                              chaine={chaine}
                              genderProgram={genderProgram}
                              setDetails={setDetails}
                              setJournee={setJournee}
                              setEvening={setEvening}
                              setBouquet={setBouquet}
                              setChaineId={setChaineId}
                              setChannelId={setChannelId}
                            />
                          </>
                        ) : (
                          <Swip
                            chaine={chaine}
                            genderProgram={genderProgram}
                            setDetails={setDetails}
                            setJournee={setJournee}
                            setEvening={setEvening}
                            setBouquet={setBouquet}
                            setChaineId={setChaineId}
                            setChannelId={setChannelId}
                          />
                        )}
                      </>
                    );
                  })}
                </InfiniteScroll>
                <div className="h-10"></div>
              </div>
            </div>
          </div>
        )}
        {details && (
          <DetailsPage
            chaineId={chaineId}
            channelId={channelId}
            setChaineId={setChaineId}
            setChannelId={setChannelId}
          />
        )}
      </div>
    </>
  );
}

export default Grille;
