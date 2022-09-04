import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import loading from "../public/static/loading.svg";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/actuellement");
  }, []);

  return (
    <div
      className="h-40 absolute top-1/2 left-1/2 "
      style={{ transform: " translate(-50% , -50%)" }}
    >
      <Image src={loading} alt="logo chaine" width="100px" height="100px" />
    </div>
  );
}
