import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function Bouquet({
  setBouquetChoisiNumero,
  setBouquetChoisi,
  bf,
  bm,
  bmo,
  bouquetChoisiNumero,
  bouquetChoisi,
  bouquetApi,
  setBouquetApi,
  bouquetFavoris,
  setBouquetFavoris,
}) {
  const router = useRouter();

  const addToFav = async (chaine, index) => {
    try {
      await axios.post(
        `https://api.tv7guide.com/api/favorite/channels/post/${chaine.id}`
      );
    } catch (error) {
      console.log(error);
    }
    setBouquetApi([...bouquetApi, (bouquetApi[index].favoris = "true")]);
    setBouquetFavoris([
      ...bouquetFavoris,
      (bouquetFavoris[bouquetApi[index]?.package_id - 1].favoris = "true"),
    ]);
  };
  const removeFromFav = async (chaine, index) => {
    try {
      await axios.delete(
        `https://api.tv7guide.com/api/favorite/channels/delete/${chaine.id}`
      );
    } catch (error) {
      console.log(error);
    }
    setBouquetApi([...bouquetApi, (bouquetApi[index].favoris = "false")]);
  };
  const addBouquetToFav = async (index) => {
    // console.log("add", bouquetFavoris);
    try {
      await axios.post(
        `https://api.tv7guide.com/api/favorite/packages/channels/post/${index}`
      );
    } catch (error) {
      console.log(error);
    }
    setBouquetFavoris([
      ...bouquetFavoris,
      (bouquetFavoris[index - 1].favoris = "true"),
    ]);
    bouquetApi.map((b, i) => {
      b.package_id === index
        ? setBouquetApi([...bouquetApi, (bouquetApi[i].favoris = "true")])
        : "";
    });
  };
  const removeBouquetFromFav = async (index) => {
    // console.log("remove", bouquetFavoris);
    try {
      await axios.delete(
        `https://api.tv7guide.com/api/favorite/packages/channels/delete/${index}`
      );
    } catch (error) {
      console.log(error);
    }
    setBouquetFavoris([
      ...bouquetFavoris,
      (bouquetFavoris[index - 1].favoris = "false"),
    ]);
    bouquetApi.map((b, i) =>
      b.package_id === index
        ? setBouquetApi([...bouquetApi, (bouquetApi[i].favoris = "false")])
        : ""
    );
  };
  if (!bouquetFavoris || !bouquetApi) {
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
  return (
    <>
      <div className="flex md:justify-center px-5 pt-5 md:items-center mt-2 space-x-4 md:space-x-12">
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-white">BIENTÔT</h1>
          <div className="flex space-x-1 items-center">
            <div
              onClick={() => {
                bouquetFavoris[0].favoris === "false"
                  ? addBouquetToFav(1)
                  : removeBouquetFromFav(1);
              }}
              className="h-8 w-8 border-2"
            >
              {" "}
              {bouquetFavoris[0].favoris === "true" && (
                <img
                  src="/static/check.svg"
                  alt="banner"
                  width="30px"
                  height="30px"
                />
              )}
            </div>{" "}
            <h1
              onClick={() => {
                setBouquetChoisiNumero(1);
                // setBouquetChoisi(bf);
                router.push("/bouquet/1");
              }}
              className={`cursor-pointer text-center text-xs md:text-lg ${
                bouquetChoisiNumero === 1
                  ? "bg-color-blue text-white p-1"
                  : " hover:bg-slate-400 hover:text-white hover:p-1"
              } font-semibold `}
            >
              BOUQUET FRANCE
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-red-600">BIENTÔT</h1>
          <div className="flex space-x-1 items-center">
            <div
              onClick={() => {
                bouquetFavoris[1].favoris === "false"
                  ? addBouquetToFav(2)
                  : removeBouquetFromFav(2);
              }}
              className="h-8 w-8 border-2"
            >
              {" "}
              {/* {bouquetFavoris[1].favoris === "true" && (
                <img
                  src="/static/check.svg"
                  alt="banner"
                  width="30px"
                  height="30px"
                />
              )} */}
            </div>{" "}
            <h1
              onClick={() => {
                setBouquetChoisiNumero(2);
                // setBouquetChoisi(bm);

                router.push("/bouquet/2");
              }}
              className={`cursor-pointer text-center text-xs md:text-lg ${
                bouquetChoisiNumero === 2
                  ? "bg-color-blue text-white p-1"
                  : " hover:bg-slate-400 hover:text-white hover:p-1"
              } font-semibold `}
            >
              BOUQUET MAROC
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-red-600">BIENTÔT</h1>
          <div className="flex space-x-1 items-center">
            <div
              onClick={() => {
                bouquetFavoris[2].favoris === "false"
                  ? addBouquetToFav(3)
                  : removeBouquetFromFav(3);
              }}
              className="h-8 w-8 border-2"
            >
              {" "}
              {/* {bouquetFavoris[2].favoris === "true" && (
                <img
                  src="/static/check.svg"
                  alt="banner"
                  width="30px"
                  height="30px"
                />
              )} */}
            </div>
            <h1
              onClick={() => {
                setBouquetChoisiNumero(3);
                // setBouquetChoisi(bmo);

                router.push("/bouquet/3");
              }}
              className={`cursor-pointer text-center text-xs md:text-lg ${
                bouquetChoisiNumero === 3
                  ? "bg-color-blue text-white p-1"
                  : " hover:bg-slate-400 hover:text-white hover:p-1"
              } font-semibold `}
            >
              BOUQUET MOYEN-ORIENT
            </h1>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 md:grid-cols-8 px-5 md:px-20 my-10 gap-4">
        {/* {bouquetChoisi?.map((chaine) => (
          <div
            className="border-2  rounded-md h-16 bg-gray-100 flex items-center justify-center"
            key={chaine.id}
          >
            <Image
              src={chaine.logo_chaine}
              alt="logo chaine"
              width="50px"
              height="50px"
            />
          </div>
        ))} */}

        {bouquetApi?.map((chaine, index) =>
          bouquetChoisiNumero == chaine.package_id ? (
            <div
              className="border-2 relative rounded-md h-16 bg-gray-100 flex items-center justify-center"
              key={chaine.id}
              onClick={() => {
                chaine.favoris === "false"
                  ? addToFav(chaine, index)
                  : removeFromFav(chaine, index);
              }}
            >
              <Image
                src={chaine.logo_chaine}
                alt="logo chaine"
                width="50px"
                height="50px"
              />
              {chaine.favoris === "true" && (
                <div className="h-full w-full bg-blue-700/10 absolute"></div>
              )}
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </>
  );
}

export default Bouquet;
