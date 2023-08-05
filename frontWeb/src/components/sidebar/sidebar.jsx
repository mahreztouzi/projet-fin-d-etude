import React from "react";
import { Link } from "react-router-dom";
import "../../index.css";
import { DashboardIcon } from "../../icons/index";
import messageIcon from "../../assets/messageIcon.png";
import cours from "../../assets/cours.png";
import allCours from "../../assets/allCours.png";
import QuickAdd from "./quickadd";
import Gotofaq from "./gotofaq";
import { useSelector } from "react-redux";

const Sidebar = ({ place }) => {
  const userData = useSelector((state) => state.auth.user.user);

  return (
    <div className="w-1/5 shadow mt-12 fixed h-full overflow-y-auto text-base lg:text-sm pb-4 sticky?lg:h-(screen-18) lg:block hidden">
      <div className="inline-flex flex-col space-y-2 items-start justify-between flex-1 h-full px-6 pt-6 pb-12">
        <div>
          <QuickAdd />
          {/* navlinks */}
          {/* dashboard */}
          <Link to="/dash" className="w-full">
            <div
              className={
                "inline-flex items-center justify-start w-full h-12 pl-2 pr-16 pt-2 pb-2.5 rounded-lg " +
                (place === "1" ? "bg-purple-100" : "")
              }
            >
              <div className="flex space-x-8 items-center justify-start">
                <DashboardIcon
                  className="h-5 "
                  stroke={place === "1" ? "#5E48E8" : "#8C8CA2"}
                />
                <p
                  className={
                    "text-sm font-medium " +
                    (place === "1" ? "text-indigo-600 " : "text-gray-400")
                  }
                >
                  Dashboard
                </p>
              </div>
            </div>
          </Link>
          {/* Products */}
          {userData.role === "professeur" ? (
            <Link to={`/cours/${userData.enseignantId}`} className="w-full">
              <div
                className={
                  "inline-flex items-center justify-start w-full h-12 pl-2 pr-16 pt-2 pb-2.5 rounded-lg " +
                  (place === "2" ? "bg-purple-100" : "")
                }
              >
                <div className="inline-flex space-x-8 items-center justify-start">
                  <img
                    src={cours}
                    className="h-4"
                    stroke={place === "2" ? "#5E48E8" : "#8C8CA2"}
                    alt="cours"
                  />
                  <p
                    className={
                      "text-sm font-medium " +
                      (place === "2" ? "text-indigo-600 " : "text-gray-400")
                    }
                  >
                    Mes Cours
                  </p>
                </div>
              </div>
            </Link>
          ) : (
            ""
          )}

          {/* billing */}
          <Link to="/allCours" className="w-full">
            <div
              className={
                "inline-flex items-center justify-start w-full h-12 pl-2 pr-16 pt-2 pb-2.5 rounded-lg " +
                (place === "3" ? "bg-purple-100" : "")
              }
            >
              <div className="inline-flex space-x-8 items-center justify-start">
                <img
                  src={allCours}
                  className="h-6 "
                  stroke={place === "5" ? "#5E48E8" : "#8C8CA2"}
                  alt="cours"
                />
                <p
                  className={
                    "text-sm font-medium " +
                    (place === "3" ? "text-indigo-600 " : "text-gray-400")
                  }
                >
                  Tout les Cours
                </p>
              </div>
            </div>
          </Link>
          {/* vendors */}
          <Link to="/message" className="w-full">
            <div
              className={
                "inline-flex items-center justify-start w-full h-12 pl-2 pr-16 pt-2 pb-2.5 rounded-lg " +
                (place === "4" ? "bg-purple-100" : "")
              }
            >
              <div className="inline-flex space-x-8 items-center justify-start">
                <img
                  src={messageIcon}
                  className="h-5 ml-1 "
                  stroke={place === "4" ? "#5E48E8" : "#8C8CA2"}
                  alt="message"
                />
                <p
                  className={
                    "text-sm font-medium " +
                    (place === "4" ? "text-indigo-600 " : "text-gray-400")
                  }
                >
                  Messages
                </p>
              </div>
            </div>
          </Link>
          {/* delivery */}
        </div>
        {/* faqs */}
        <Gotofaq />
      </div>
    </div>
  );
};

export default Sidebar;
