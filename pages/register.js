import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { SyncOutlined } from "@ant-design/icons";

function Register() {
  const [isLoadingFacebook, setIsLoadingFacebook] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingTwitter, setIsLoadingTwitter] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    router.push("/");
  }
  return (
    <div className="py-14">
      <div className="w-1/3 m-auto">
        <form>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold roboto mb-2">Inscription</h1>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="p-2 border-2 mb-2"
            />
            <input
              type="text"
              name="name"
              placeholder="Email"
              className="p-2 border-2 mb-2"
            />

            <input
              type="password"
              name="name"
              placeholder="Password"
              className="p-2 border-2 mb-2"
            />

            <input
              type="password"
              name="name"
              placeholder="Confirm Password"
              className="p-2 border-2 mb-2"
            />
            <h1 className="bg-blue-700 mb-2 hover:bg-blue-800 rounded-sm text-center font-bold w-2/3 m-auto text-white p-2 cursor-pointer">
              S&apos;inscrire
            </h1>
          </div>
        </form>
        <h1 className="text-sm text-center">
          Vous avez déja un compte ?
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 cursor-pointer font-semibold"
          >
            {" "}
            Se Connecter
          </span>
        </h1>
        <div className="mt-10 w-4/5 m-auto">
          <div
            onClick={() => {
              signIn("facebook", { callbackUrl: "/" });
              setIsLoadingFacebook(true);
            }}
            className="border-2 cursor-pointer hover:bg-slate-200 flex space-x-2 items-center p-2 rounded-2xl font-bold mb-2"
          >
            <Image
              src="https://www.svgrepo.com/show/138943/facebook.svg"
              height="40px"
              width="40px"
              alt="facebook logo"
            />
            <h1>
              {isLoadingFacebook ? (
                <SyncOutlined spin className="py-1 h-8 ml-20 " />
              ) : (
                "Continuer avec Facebook"
              )}{" "}
            </h1>
          </div>

          <div
            onClick={() => {
              signIn("google", { callbackUrl: "/" });
              setIsLoadingGoogle(true);
            }}
            className="border-2 cursor-pointer hover:bg-slate-200 flex space-x-2 items-center p-2 rounded-2xl font-bold mb-2"
          >
            <Image
              src="https://www.svgrepo.com/show/355037/google.svg"
              height="40px"
              width="40px"
              alt="google logo"
            />
            <h1>
              {isLoadingGoogle ? (
                <SyncOutlined spin className="py-1" />
              ) : (
                "Continuer avec Gmail"
              )}
            </h1>
          </div>

          <div
            onClick={() => {
              signIn("twitter", { callbackUrl: "/" });
              setIsLoadingTwitter;
            }}
            className="border-2 cursor-pointer hover:bg-slate-200 flex space-x-2 items-center p-2 rounded-2xl font-bold mb-2"
          >
            <Image
              src="https://www.svgrepo.com/show/157844/twitter.svg"
              height="40px"
              width="40px"
              alt="twitter logo"
            />
            <h1>
              {isLoadingTwitter ? (
                <SyncOutlined spin className="py-1" />
              ) : (
                "Continuer avec Twitter "
              )}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
