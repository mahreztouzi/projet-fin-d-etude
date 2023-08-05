import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/forms/LoginForm";
import "../../index.css";
import illustration from "../../assets/login.svg";
import edu from "../../assets/edu.png";

const Login = () => {
  return (
    <div className="lg:flex-row flex flex-col-reverse">
      <div className="lg:w-1/2  xl:max-w-screen-sm">
        <div className="h-screen flex">
          <div className="w-full max-w-md m-auto bg-white py-5 px-10">
            <h1 className="text-4xl font-medium mt-4 antialiased lg:mb-12 mb-6 text-center">
              Content de vous revoir !
            </h1>
            <LoginForm />
            <div className="flex flex-wrap mt-3"></div>
            <div className="text-sm font-medium mt-4">
              Nouveau ici ?{" "}
              <Link to="/signup" className="text-secondary">
                Inscription
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 lg:h-screen xl:max-w-screen-sm bg-purple-200 lg:ml-auto">
        <div className="grid grid-rows-2">
          <div className="items-center py-5 px-10">
            <img
              src={edu}
              alt=""
              className="ml-auto object-scale-down h-16"
            ></img>
          </div>
          <div className="lg:h-20 h-4 p-5">
            <img
              src={illustration}
              alt=""
              className="mx-auto object-fit w-1/2 lg:w-full"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
