import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../index.css";
import illustration from "../../assets/signup.svg";
import SignupForm from "../../components/forms/SignupForm";
import SignUpFormStudent from "../../components/forms/SignupFormStudent";
import edu from "../../assets/edu.png";
const Signup = () => {
  const [userType, setUserType] = useState("teacher");

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };
  return (
    <div className="lg:flex">
      <div className="lg:w-1/2 xl:max-w-screen-sm bg-purple-200 mr-auto">
        <div class="grid grid-rows-2">
          <div class="items-center py-5 px-10">
            <img
              src={edu}
              alt=""
              className="mr-auto object-scale-down h-16"
            ></img>
          </div>
          <div class="h-20 p-5">
            <img
              src={illustration}
              alt=""
              className="ml-auto mr-auto object-fit"
            ></img>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="h-screen flex">
          <div className="w-full max-w-md m-auto bg-white py-5 px-10">
            <h1 className="text-4xl font-medium mt-1 antialiased mb-6 text-center">
              Bienvenue
            </h1>
            <div className="flex justify-center">
              <button
                className={`mr-2 ${
                  userType === "teacher" ? "bg-secondary" : "bg-gray-500"
                } py-2 px-4 rounded-lg text-sm font-medium text-white`}
                onClick={() => handleUserTypeChange("teacher")}
              >
                Enseignant
              </button>
              <button
                className={`ml-2 ${
                  userType === "student" ? "bg-secondary" : "bg-gray-500"
                } py-2 px-4 rounded-lg text-sm font-medium text-white`}
                onClick={() => handleUserTypeChange("student")}
              >
                Étudiant
              </button>
            </div>

            {userType === "teacher" ? (
              <SignupForm />
            ) : userType === "student" ? (
              <SignUpFormStudent />
            ) : null}

            <div className="flex flex-wrap mt-3"></div>
            <div className="text-sm font-medium mt-4">
              Toujours member ?{" "}
              <Link to="/login" class="text-secondary">
                Connexion
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
