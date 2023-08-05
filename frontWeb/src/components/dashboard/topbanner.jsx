import React from "react";
import "../../index.css";
import Pharmacists from "../../assets/pharmacicts.svg";
import messagesPng from "../../assets/messagesPng.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TopBanner = () => {
  const userData = useSelector((state) => state.auth.user.user);
  return (
    <div className="flex flex-wrap w-2/2">
      <div className="bg-purple-100 rounded-2xl w-screen lg:flex sm:flex-column gap-x-14 mt-10 p-4 items-center z-0">
        <img className="h-48 rounded-lg" src={Pharmacists} alt="#" />
        <div>
          <p className="opacity-80 lg:text-4xl text-2xl font-bold text-indigo-700 z-10">
            {userData.role === "professeur"
              ? "  Ajouter un nouveau cours"
              : "Bienvenue chere apprenant"}
          </p>
          {userData.role === "professeur" ? (
            <Link to="/AddCours">
              <button className="button px-16 py-4 my-4 bg-primary hover:bg-indigo-700 transition-all rounded-lg text-sm font-medium text-center text-white">
                Ajouter
              </button>
            </Link>
          ) : (
            "  "
          )}
        </div>
      </div>
      <div className="bg-purple-100 w-auto  w-screen  rounded-2xl lg:flex sm:flex-column gap-x-14 mt-10 p-4 items-center z-0">
        <img
          className="h-48 ml-10 mr-12 rounded-lg"
          src={messagesPng}
          alt="#"
        />
        <div>
          <p className="opacity-80 lg:text-4xl text-2xl font-bold text-indigo-700 z-10">
            Consulter mes messages
          </p>

          <Link to="/message">
            <button className="button px-16 py-4 my-4 bg-primary hover:bg-indigo-700 transition-all rounded-lg text-sm font-medium text-center text-white">
              Mes messages
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
