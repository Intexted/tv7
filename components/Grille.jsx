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
import i18n from "i18next";
import { getSession, useSession } from "next-auth/react";
import "moment/locale/fr"; // without this line it didn't work
import "moment/locale/ar"; // without this line it didn't work
moment.locale("fr");
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { useTranslation } from "react-i18next";

import PhoneHeader from "./PhoneHeader";
import BottomBar from "./BottomBar";
import Swip from "./Swip";
import Navbar from "./Navbar";
import Bouquet from "./Bouquet";
import DetailsPage from "./DetailsPage";
import { te } from "date-fns/locale";
import DropDown from "./DropDown";

function Grille({
  genders,
  program,
  bouquetApi,
  setBouquetApi,
  bouquetFavoris,
  setBouquetFavoris,
}) {
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
  const [searchValue, setSearchValue] = useState("");
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [date, setDate] = useState(Date.now());
  const [bf, setBf] = useState();
  const [bm, setBm] = useState();
  const [bmo, setBmo] = useState();

  const { t } = useTranslation();

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

      setState({ ...state, title: t("en_ce_moment") });

      if (!id[1]) {
        setGenderProgram(program);
      } else {
        setRedGender(id[1]);
        if (token) {
          getGenderProgramWithToken(id[1], null, false);
        } else {
          getGenderProgram(id[1], null, false);
        }
      }
    } else if (id?.length > 0 && id[0] === "bouquets") {
      if (token || session) {
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
        router.push("/login?page=guide");
      }
    } else if (id?.length > 0 && id[0] === "journee") {
      setJournee(true);
      setEvening(false);
      setDetails(false);
      setBouquet(false);
    } else if (id?.length > 0 && id[0] === "soiree") {
      window.scrollTo(0, 0);
      setState({ ...state, title: t("evening") });
      setDetails(false);
      setBouquet(false);
      sethasMore(true);
      setpage(2);

      if (id[2] === "2") {
        setRedGender(id[1]);
        setEveningNumber(2);
        getParams(id[1], 2);
      } else if (id[2] === "3") {
        setRedGender(id[1]);
        setEveningNumber(3);
        getParams(id[1], 3);
      } else if (id[2] === "1") {
        setRedGender(id[1]);
        setEveningNumber(1);
        getParams(id[1], 1);
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
  }, [id, bf, bm, bmo, token, eveningNumber, evening, date]);

  useEffect(() => {
    setGenderProgram(program);
  }, []);

  useEffect(() => {
    console.log("object");

    if (token) {
      getBouquetWithToken(3);
      getBouquetWithToken(2);
      getBouquetWithToken(1);
    } else {
      getBouquet(3);
      getBouquet(2);
      getBouquet(1);
    }
  }, [bouquetApi, bouquetFavoris]);

  const getBouquetWithToken = async (num) => {
    const time = moment(new Date()).format("yyyy/MM/DD");
    // try {
    axios
      .get(`https://api.tv7guide.com/api/packages/channels/${num}/${time}`)
      .then((data) => {
        switch (num) {
          case 1:
            setBf(data.data.data);
            break;
          case 2:
            setBm(data.data.data);
            break;
          case 3:
            setBmo(data.data.data);
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getBouquet = async (num) => {
    const time = moment(new Date()).format("yyyy/MM/DD");
    try {
      const res = await fetch(
        token
          ? `https://api.tv7guide.com/api/packages/channels/${num}/${time}`
          : `https://api.tv7guide.com/api/public/packages/channels/${num}/${time}`
      );
      const data = await res.json();
      switch (num) {
        case 1:
          setBf(data.data);
          break;
        case 2:
          setBm(data.data);
          break;
        case 3:
          setBmo(data.data);
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMoreDataWithToken = async () => {
    const time = moment(date).format("yyyy/MM/DD");

    try {
      const { data } = await axios.post(
        evening
          ? `/favorite/channels/programs/evening/pt${eveningNumber}/${time} ? 
          ${redGender === "TOUS" ? "" : `gender=${redGender}&`}
            page=${page} `
          : `/favorite/channels/programs/atthemoment/${time} ? 
           ${redGender === "TOUS" ? "" : `gender=${redGender}&`}
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

  const fetchMoreData = async () => {
    const time = evening
      ? moment(date).format("yyyy/MM/DD")
      : moment(Date.now()).format("yyyy/MM/DD");

    try {
      const { data } = await axios.get(
        evening
          ? `/public/programs/evening/pt${eveningNumber}/${time} ? 
             ${redGender === "TOUS" ? "" : `gender=${redGender}&`}
            page=${page} `
          : `/public/programs/atthemoment/${time} ? 
         ${redGender === "TOUS" ? "" : `gender=${redGender}&`}
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
    token
      ? getNightProgramWithToken(num, gender)
      : getNightProgram(num, gender);
  };

  const getNightProgramWithToken = async (num, redGender = redGender) => {
    setLoading(true);
    try {
      const time = moment(date).format("yyyy/MM/DD");
      const { data } = await axios.post(
        `/favorite/channels/programs/evening/pt${num}/${time}${
          redGender === "TOUS" ? "" : `?gender=${redGender}`
        }`
      );

      setGenderProgram(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getNightProgram = async (num, redGender = redGender) => {
    setLoading(true);
    try {
      const time = moment(date).format("yyyy/MM/DD");
      const { data } = await axios.get(
        `/public/programs/evening/pt${num}/${time}${
          redGender === "TOUS" ? "" : `?gender=${redGender}`
        }`
      );

      setGenderProgram(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getGenderProgramWithToken = async (gender, num, evening = evening) => {
    setLoading(true);
    try {
      const time = moment(Date.now()).format("yyyy/MM/DD");
      const { data } = await axios.post(
        evening
          ? `/favorite/channels/programs/evening/pt${num}/${time}${
              gender === "TOUS" ? "" : `?gender=${gender}`
            }`
          : `/favorite/channels/programs/atthemoment/${time} ${
              gender === "TOUS" ? "" : `?gender=${gender}`
            }`
      );
      setGenderProgram(data.data);
      setLoading(false);

      // setEvening(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getGenderProgram = async (gender, num, evening = evening) => {
    const genderTrim = gender.trim();
    setLoading(true);
    try {
      const time = moment(Date.now()).format("yyyy/MM/DD");
      const { data } = await axios.get(
        evening
          ? `/public/programs/evening/pt${num}/${time} ${
              genderTrim === "TOUS" ? "" : `?gender=${genderTrim}`
            } `
          : `/public/programs/atthemoment/${time} ${
              genderTrim === "TOUS" ? "" : `?gender=${genderTrim}`
            }`
      );
      setGenderProgram(data.data);
      setLoading(false);
      // setEvening(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!searchValue) {
      return;
    }
    try {
      const { data } = await axios.get(
        token
          ? `/favorite/search/${searchValue}`
          : `/public/search/${searchValue}`
      );
      setGenderProgram(data.data);
      setLoading(false);
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
      {dropDown && (
        <DropDown setDate={setDate} date={date} setDropDown={setDropDown} />
      )}
      {loading && (
        <>
          <div className="h-full w-full absolute top-0 left-0 bg-black opacity-25 z-10"></div>
          <div
            className="h-40 absolute top-1/2 left-1/2 z-50 "
            style={{ transform: " translate(-50% , -50%)" }}
          >
            <img
              src="/static/loading.svg"
              alt="logo chaine"
              width="100px"
              height="100px"
            />
          </div>
        </>
      )}
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
        setGenderProgram={setGenderProgram}
        evening={evening}
        journee={journee}
        setLoading={setLoading}
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
          evening={evening}
          journee={journee}
          bouquet={bouquet}
          eveningNumber={eveningNumber}
          redGender={redGender}
          details={details}
        />
        {evening && (
          <div
            onClick={() => setDropDown(true)}
            className="capitalize text-center flex justify-between rounded-sm items-center
           font-semibold cursor-pointer border-2 p-2 w-60 mt-2 m-auto"
          >
            <h1>{moment(date).format("dddd Do MMMM YYYY")}</h1>
            <img
              src="/static/arrow_drop_down.svg"
              alt="banner"
              width="30px"
              height="30px"
            />
          </div>
        )}
        {bouquet && (
          <Bouquet
            setBouquetChoisiNumero={setBouquetChoisiNumero}
            setBouquetChoisi={setBouquetChoisi}
            bf={bf}
            bm={bm}
            bmo={bmo}
            bouquetChoisiNumero={bouquetChoisiNumero}
            bouquetChoisi={bouquetChoisi}
            bouquetApi={bouquetApi}
            setBouquetApi={setBouquetApi}
            bouquetFavoris={bouquetFavoris}
            setBouquetFavoris={setBouquetFavoris}
          />
        )}

        {journee && !bouquet && (
          <div className="mt-5   border-slate-100 px-5">
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
                            let title = "";
                            if (i18n.language === "fr") {
                              title = item.title_fr
                                ? item.title_fr
                                : item.title_en
                                ? item.title_en
                                : item.title_ar;
                            }
                            if (i18n.language === "ar") {
                              title = item.title_ar;
                            }
                            if (i18n.language === "en") {
                              title = item.title_en
                                ? item.title_en
                                : item.title_ar;
                            }
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
                                    {title}
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
                        navigation={true}
                        modules={[Navigation]}
                      >
                        <div className="">
                          {chaine?.programDay.map((item) => {
                            let title = "";
                            if (i18n.language === "fr") {
                              title = item.title_fr
                                ? item.title_fr
                                : item.title_en
                                ? item.title_en
                                : item.title_ar;
                            }
                            if (i18n.language === "ar") {
                              title = item.title_ar;
                            }
                            if (i18n.language === "en") {
                              title = item.title_en
                                ? item.title_en
                                : item.title_ar;
                            }
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
                                    {title}
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
                        navigation={true}
                        modules={[Navigation]}
                      >
                        <div className="">
                          {chaine?.programDay.map((item) => {
                            let title = "";
                            if (i18n.language === "fr") {
                              title = item.title_fr
                                ? item.title_fr
                                : item.title_en
                                ? item.title_en
                                : item.title_ar;
                            }
                            if (i18n.language === "ar") {
                              title = item.title_ar;
                            }
                            if (i18n.language === "en") {
                              title = item.title_en
                                ? item.title_en
                                : item.title_ar;
                            }
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
                                    {title}
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
          <div className="flex content-center  justify-center md:w-11/12 md:py-3 w-full md:m-auto">
            <div className="w-full">
              <div
                className={`md:flex ${
                  i18n.language === "ar" ? "rtl" : ""
                } hidden mb-2 items-center space-x-1`}
              >
                <h1
                  onClick={() => {
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
                  {i18n.language === "fr"
                    ? "TOUS"
                    : i18n.language === "ar"
                    ? "الكل"
                    : "ALL"}
                </h1>
                {genders?.map((gender) => (
                  <>
                    <h1 className="text-slate-200 mx-1">|</h1>
                    <h1
                      onClick={() => {
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
                      {i18n.language === "fr"
                        ? gender.gender_fr.trim()
                        : i18n.language === "ar"
                        ? gender.gender_ar.trim()
                        : gender.gender_en.trim()}
                    </h1>
                  </>
                ))}
                <div className="flex-1"></div>
                <div
                  style={{ marginLeft: "auto" }}
                  className="hidden md:flex items-center space-x-1  ml-auto "
                >
                  <form
                    onSubmit={(e) => handleSearch(e)}
                    className="flex space-x-1 items-center"
                  >
                    <input
                      type="text"
                      value={searchValue}
                      placeholder={t("search_placeholder")}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="p-3 border-b-2 h-5 w-80 "
                      required={"required"}
                    />
                    <div
                      onClick={(e) => handleSearch(e)}
                      className="bg-color-blue p-1 rounded-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4   cursor-pointer   "
                        fill="none"
                        viewBox="0 0 20 20"
                        stroke="#FFFFFF"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </form>
                </div>
              </div>
              <div>
                <InfiniteScroll
                  dataLength={genderProgram.length}
                  next={token ? fetchMoreDataWithToken : fetchMoreData}
                  hasMore={hasMore}
                  loader={
                    genderProgram.length > 0 ? (
                      <h4 className="md:p-2 ml-2 text-gray-500">Loading ...</h4>
                    ) : (
                      <h4 className="md:p-2 ml-2  font-semibold text-center text-gray-500">
                        Rien a afficher dans ce genre
                      </h4>
                    )
                  }
                  className={`grid pt-2 sm:grid-cols-1 gap-1 md:gap-5  md:grid-cols-3 content-center
                 xl:grid-cols-4  m-auto mb-10 border-t-2 w-full ${
                   i18n.language === "ar" ? "rtl" : ""
                 }`}
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
                              <img
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
