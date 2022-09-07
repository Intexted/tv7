import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { SyncOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import axios from "axios";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

function Profile() {
  const [isLoadingFacebook, setIsLoadingFacebook] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingTwitter, setIsLoadingTwitter] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  const token = Cookies.get("token");
  //   if (!token) {
  //     router.push("/");
  //   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      alert("Name is required !");
      return;
    }

    if (!email) {
      alert("Email required !");
      return;
    }
    if (!password) {
      alert("Password required §!");
      return;
    }
    if (!confirmPassword) {
      alert("Password required !");
      return;
    }

    try {
      setLoading(true);

      const data = axios({
        method: "post",
        url: "/register",
        data: {
          name,
          email,
          password,
          password_confirmation: confirmPassword,
        },
      })
        .then((res) => {
          console.log(res);
          if (!res.data.token) {
            setName("");
            setEmail("");
            setConfirmPassword("");
            setPassword("");
            alert(data.message);
            setLoading(false);
          } else {
            setName("");
            setEmail("");
            setConfirmPassword("");
            setPassword("");
            setLoading(false);
            Cookies.set("token", res.data.token, { expires: 7 });
            // router.push("/");
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <Header details={true} />
      <Navbar login={true} />
      <div className="w-full md:w-1/3 py-5 px-10 md:px-0 md:m-auto">
        <form>
          <div className="flex text-center flex-col">
            <h1 className="text-xl font-semibold roboto mb-2">
              Mettre a jour le profil
            </h1>

            <input
              type="text"
              name="name"
              placeholder="Email"
              className="p-2 border-2 mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="p-2 border-2 mb-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="password"
              name="name"
              placeholder="Password"
              className="p-2 border-2 mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              name="name"
              placeholder="Confirm Password"
              className="p-2 border-2 mb-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              onClick={(e) => handleSubmit(e)}
              className="bg-red-500 mb-2 hover:bg-red-700 rounded-sm text-center font-bold w-2/3 m-auto text-white p-2 cursor-pointer"
            >
              {loading ? (
                <SyncOutlined spin className="py-1 " />
              ) : (
                <h1>Mettre a jour le profil</h1>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
