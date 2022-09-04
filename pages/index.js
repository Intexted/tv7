import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

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
      <img
        src="/static/loading.svg"
        alt="logo chaine"
        width="100px"
        height="100px"
      />
    </div>
  );
}
