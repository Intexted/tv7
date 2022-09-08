import React, { useContext, useEffect, useState } from "react";
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
import { IndexContext } from "../context/context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneHeader from "../components/PhoneHeader";

function Profile() {
  const [state, setState] = useContext(IndexContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  const token = Cookies.get("token");
  // const auth = Cookies.get("auth");

  // // console.log(auth));
  // if (!auth) {
  //   router.push("/");
  // }
  useEffect(() => {
    if (token) {
      const auth = JSON.parse(Cookies.get("auth"));
      setName(auth.name);
      setEmail(auth.email);
      setPassword("");
      setConfirmPassword("");
    } else {
      router.push("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Name is required !");
      return;
    }

    if (!email) {
      toast.error("Email required !");
      return;
    }
    if (password.length < 6) {
      toast.error("The password must be at least 6 characters.");
      return;
    }
    if (confirmPassword.length < 6) {
      toast.error("The password confirmation must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const data = axios({
        method: "post",
        url: "/user/profile/update",
        data: {
          name,
          email,
          password,
          password_confirmation: confirmPassword,
        },
      })
        .then((res) => {
          console.log(res.data);
          if (!res.data) {
            setLoading(false);
          } else {
            toast.success("Profile Updated Succesful");
            setName(res.data.user.name);
            setEmail(res.data.user.email);
            setLoading(false);
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
      <ToastContainer />
      <PhoneHeader />
      <Header details={true} />
      <Navbar login={true} />
      <div className="w-full md:w-1/3 py-5 px-10 md:px-0 md:m-auto">
        <form>
          <div className="flex text-center flex-col">
            <h1 className="text-xl font-semibold roboto mb-2">
              Mettre a jour le profil
            </h1>
            <div className="flex flex-col text-left mb-2 space-y-1">
              <h1 className="text-gray-500">
                Adresse Email
                <span className="text-red-500">*</span>
              </h1>
              <input
                type="text"
                name="name"
                placeholder="Email"
                className="p-2 border-2 mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-left mb-2 space-y-1">
              <h1 className="text-gray-500">
                Nom Complet
                <span className="text-red-500">*</span>
              </h1>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="p-2 border-2 mb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-left mb-2 space-y-1">
              <h1 className="text-gray-500">
                Mot de passe
                <span className="text-red-500">*</span>
              </h1>
              <input
                type="password"
                name="name"
                placeholder="Password"
                className="p-2 border-2 mb-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-left mb-2 space-y-1">
              <h1 className="text-gray-500">
                Confirmation Mot de passe
                <span className="text-red-500">*</span>
              </h1>
              <input
                type="password"
                name="name"
                placeholder="Confirm Password"
                className="p-2 border-2 mb-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              onClick={(e) => handleSubmit(e)}
              className="bg-red-500 my-2 hover:bg-red-700 rounded-sm text-center font-bold w-2/3 m-auto text-white p-2 cursor-pointer"
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
