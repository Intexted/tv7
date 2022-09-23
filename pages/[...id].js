import Head from "next/head";
import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Grille from "../components/Grille";
import axios from "axios";
import moment from "moment";
import Login from "./login";
import { IndexContext } from "../context/context";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";

import PhoneHeader from "../components/PhoneHeader";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Home() {
  const [dataApi, setDataApi] = useContext(IndexContext);
  const { data: session } = useSession();
  const [program, setProgram] = useState();
  const [genders, setGenders] = useState();

  const [bouquetApi, setBouquetApi] = useState();
  const [bouquetFavoris, setBouquetFavoris] = useState();

  const router = useRouter();
  const token = Cookies.get("token");
  let { id } = router.query;

  const getAndFilter = async () => {
    try {
      const { data } = await axios.get("https://api.tv7guide.com/api/channels");
      setBouquetApi(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getFavBouquet = async () => {
    try {
      const { data } = await axios.get("https://api.tv7guide.com/api/packages");
      setBouquetFavoris(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProgramWithToken = async () => {
    const time = moment(new Date()).format("yyyy/MM/DD");
    try {
      const { data } = await axios.post(
        `https://api.tv7guide.com/api/favorite/channels/programs/atthemoment/${time}`
      );
      setProgram(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProgram = async () => {
    const time = moment(new Date()).format("yyyy/MM/DD");
    try {
      const { data } = await axios.get(
        `https://api.tv7guide.com/api/public/programs/atthemoment/${time}`
      );
      setProgram(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getGenders = async () => {
    try {
      const { data } = await axios.get(
        "https://api.tv7guide.com/api/public/genders"
      );

      setGenders(data);
    } catch (error) {
      console.log(error);
    }
  };
  // const getBouquetWithToken = async (num) => {
  //   const time = moment(new Date()).format("yyyy/MM/DD");
  //   try {
  //     const { data } = await axios.get(
  //       `https://api.tv7guide.com/api/packages/channels/${num}/${time}`
  //     );

  //     switch (num) {
  //       case 1:
  //         setBf(data.data);
  //         break;
  //       case 2:
  //         setBm(data.data);
  //         break;
  //       case 3:
  //         setBmo(data.data);
  //         break;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const getBouquet = async (num) => {
  //   const time = moment(new Date()).format("yyyy/MM/DD");
  //   try {
  //     const res = await fetch(
  //       token
  //         ? `https://api.tv7guide.com/api/packages/channels/${num}/${time}`
  //         : `https://api.tv7guide.com/api/public/packages/channels/${num}/${time}`
  //     );
  //     const data = await res.json();
  //     switch (num) {
  //       case 1:
  //         setBf(data.data);
  //         break;
  //       case 2:
  //         setBm(data.data);
  //         break;
  //       case 3:
  //         setBmo(data.data);
  //         break;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getGenders();
    if (token) {
      getProgramWithToken();
      getAndFilter();
      getFavBouquet();
    } else {
      getProgram();
    }
  }, []);

  if (!token && id?.length > 0 && id[0] === "bouquets") {
    // return <Login />;
    router.push("/login?page=guide");
    return;
  }

  if (!program) {
    return (
      <div
        className="h-40 absolute top-1/2 left-1/2 "
        style={{ transform: " translate(-50% , -50%)" }}
      >
        <img
          src="/static/loading.svg"
          alt="logo"
          width="100px"
          height="100px"
        />
      </div>
    );
  }

  return (
    <div className="">
      <Head>
        <title>TV7 Guide</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/static/icon.png" />
      </Head>

      <Header details={true} />
      <Grille
        genders={genders}
        bouquetApi={bouquetApi}
        program={program}
        setBouquetApi={setBouquetApi}
        bouquetFavoris={bouquetFavoris}
        setBouquetFavoris={setBouquetFavoris}
      />
    </div>
  );
}
