import "../index.css";
import React from "react";

import edu from "../assets/edu.png";
import logoSmall from "../assets/logosmall.png";
import bellicon from "../assets/bell.svg";
import { Link } from "react-router-dom";

import BackButton from "./backbutton";
import { useSelector } from "react-redux";

const Header = (props) => {
  const selectUserData = (state) => state.auth.user.user;
  const userData = useSelector(selectUserData);
  console.log("userData");
  console.log(userData);
  return (
    <div class="h-1/10 fixed flex px-3 w-full border bg-white z-50">
      <button
        type="button"
        className="fixed z-50 bottom-4 right-4 w-16 h-16 rounded-full bg-gray-900 text-white block lg:hidden"
      >
        menu
      </button>
      {props.back ? (
        <div className="flex flex-wrap">
          <BackButton />
        </div>
      ) : (
        ""
      )}
      <Link to="/dash">
        <img
          src={edu}
          style={{
            width: "17vw",
            marginBottom: "5px",
          }}
          alt=""
          className="mr-auto object-scale-down h-12 hidden lg:block"
        />
        <img
          src={logoSmall}
          alt=""
          className="mr-auto object-scale-down h-12 lg:hidden"
        />
      </Link>
      <div class="flex ml-auto items-center">
        <h2 class="text-xl font-medium antialiased">{userData.name}</h2>
        {/* bell icon */}
        <Link to="/">
          {" "}
          <img src={bellicon} alt="" class="h-6 px-4" />{" "}
        </Link>
        {/* avatar */}
        <Link to="/profile">
          <img
            src={
              "https://github.com/medicotary/Medicotary/blob/main/src/assets/profile/toy%20faces-male-01.png?raw=true"
            }
            alt="https://github.com/medicotary/Medicotary/blob/main/src/assets/profile/toy%20faces-male-01.png?raw=true"
            class="object-scale-down h-10 rounded-full "
            loading="lazy"
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
