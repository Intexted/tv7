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
}) {
  const router = useRouter();
  return (
    <>
      <div className="flex md:justify-center px-5 pt-5 md:items-center mt-2 space-x-4 md:space-x-12">
        <h1
          onClick={() => {
            setBouquetChoisiNumero(1);
            setBouquetChoisi(bf);
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
        <h1
          onClick={() => {
            setBouquetChoisiNumero(2);
            setBouquetChoisi(bm);
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
        <h1
          onClick={() => {
            setBouquetChoisiNumero(3);
            setBouquetChoisi(bmo);
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
      <div className="grid grid-cols-5 md:grid-cols-8 px-5 md:px-20 my-10 gap-4">
        {bouquetChoisi?.map((chaine) => (
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
        ))}
      </div>
    </>
  );
}

export default Bouquet;
