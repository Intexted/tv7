import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import { SyncOutlined } from "@ant-design/icons";
import moment from "moment";

function Details() {
  const [programDetails, setProgramDetails] = useState();
  const [programAll, setProgramAll] = useState();
  const router = useRouter();
  useEffect(() => {
    if (router.query.channel != undefined && programAll == undefined) {
      const time = moment(new Date()).format("yyyy/MM/DD");
      try {
        axios
          .get(`/public/programs/channel/${router.query.channel}/${time}`)
          .then((data) => {
            setProgramAll(data.data.data);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [router.query.channel]);

  useEffect(() => {
    if (router.query._id != undefined && programDetails == undefined) {
      try {
        axios.get(`/public/programs/${router.query._id}`).then((data) => {
          setProgramDetails(data.data.data[0]);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [router.query._id]);

  if (programDetails == undefined || programAll == undefined) {
    return <SyncOutlined spin className="py-1  " />;
  }
  return (
    <div className="p-5">
      <h1>Title : {programDetails.title_fr}</h1>
      <h1>Date Start : {programDetails.date_start}</h1>
      <h1>Date end : {programDetails.date_end}</h1>
      <h1>Description : {programDetails.description_ar}</h1>
      <h1>Duration : {programDetails.duration} mn</h1>
      <h1>Genre : {programDetails.gender} </h1>
      <h1>jjj : {programAll.length} </h1>
      <div>
        {" "}
        <h1>Image</h1>
        <h1>{programDetails?.length && programDetails?.image}</h1>
        <Image
          src={
            programDetails?.image
              ? programDetails?.image
              : "/static/tvShowNo.jfif"
          }
          alt="logo chaine"
          width="150px"
          height="150px"
        />
      </div>
      <div>
        {" "}
        <h1>Cover</h1>
        <Image
          src={
            programDetails?.cover
              ? programDetails?.cover
              : "/static/tvShowNo.jfif"
          }
          alt="logo chaine"
          width="150px"
          height="150px"
        />
      </div>
    </div>
  );
}

export default Details;

// useEffect(() => {
//     axios.get(`${process.env.REACT_APP_API}/product`).then((res) => {
//       dispatch(updateData(res.data));
//     });
//   }, []);
