import Head from "next/head";
import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Grille from "../components/Grille";
import axios from "axios";
import moment from "moment";
import Login from "./login";
import { IndexContext } from "../context/context";
import { getSession, useSession } from "next-auth/react";

export default function Home({ genders, program, bf, bm, bmo }) {
  const [dataApi, setDataApi] = useContext(IndexContext);
  const { data: session } = useSession();
  // if (!session) {
  //   return <Login />;
  // }

  return (
    <div className="">
      <Head>
        <title>TV7</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Grille genders={genders} program={program} bf={bf} bm={bm} bmo={bmo} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  process.env.TZ = "UTC";
  const getBouquet = async (num) => {
    const time = moment(new Date()).format("yyyy/MM/DD");
    try {
      const res = await fetch(
        `https://api.tv7guide.com/api/public/packages/channels/${num}/${time}`
      );
      const data = await res.json();
      return data.data;
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

      return data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getGenders = async () => {
    try {
      const { data } = await axios.get(
        "https://api.tv7guide.com/api/public/genders"
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const dataGenders = await getGenders();
  const dataProgram = await getProgram();
  const bouquetFrancais = await getBouquet(1);
  const bouquetMaroc = await getBouquet(2);
  const bouquetMO = await getBouquet(3);

  return {
    props: {
      bf: bouquetFrancais,
      genders: dataGenders,
      program: dataProgram,
      bm: bouquetMaroc,
      bmo: bouquetMO,
      session,
    }, // will be passed to the page component as props
  };
}
