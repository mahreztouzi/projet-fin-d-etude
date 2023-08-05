import React from "react";
import { Link, Redirect } from "react-router-dom";
import "../index.css";
import edu from "../assets/edu.png";
import rocket from "../assets/rocket.svg";
import { useSelector } from "react-redux";
import Footer from "../components/footer";
import ummto from "../assets/ummto.webp";
const Home = () => {
  const token = useSelector((state) => state.auth.user.token);
  return (
    <div>
      {token ? <Redirect to="/dash/" /> : null}
      <div style={{ height: "50vw" }} className="h-screen max-w-screen">
        <div className="relative">
          <div
            style={{
              zIndex: 999,
              background: "rgba(10 ,10 ,10 ,0.1)",
              backdropFilter: "blur(5px)",
            }}
            className="flex relative flex-row z-50"
          >
            <div className="py-5 px-10">
              <img
                style={{
                  width: "20vw",
                  position: "absolute",
                  top: "-0.5vw",
                  left: "2vw",
                }}
                src={edu}
                alt=""
                className="ml-auto   "
              />
            </div>
            <div className="py-5 ml-auto">
              <Link to="/login" className="w-full">
                <button
                  style={{ fontWeight: "bold" }}
                  className="w-full py-2 px-12 text-m cursor-pointer text-black rounded-lg"
                >
                  Connexion
                </button>
              </Link>
            </div>
            <div className="py-5 mr-10">
              <Link to="/signup" className="w-full">
                <button className="w-full cursor-pointer bg-primary py-2 px-10 text-m text-white rounded-lg  focus:outline-none">
                  Inscription
                </button>
              </Link>
            </div>
          </div>
          <div
            className="absolute inset-0  bg-gradient-to-tr from-gray-900 via-gray-900 to-transparent"
            style={{
              backgroundPositionX: "-5vw",
              backgroundRepeat: "no-repeat",
              backgroundSize: "105vw",

              zIndex: 0,
              marginTop: "5.8vw",
              backgroundImage: `linear-gradient(
      to top right,
      rgba(11, 10, 10, 0.6),
      rgba(11, 10, 10, 0.2)
    ),
    url(${ummto})`,
            }}
          ></div>

          <div
            style={{ marginTop: "13vw" }}
            className="relative h-screen mt-12 flex flex-col-reverse lg:flex-row items-center justify-center"
          >
            <div className="lg:w-3/5 w-screen mb-auto">
              <div className="w-full mx-auto ml-6 py-5 lg:px-20">
                <h1 className="lg:text-5xl text-3xl font-bold antialiased text-gray-200  text-center lg:mb-7 mb-2 mt-10">
                  Révolutionner l'éducation grâce à la technologie
                </h1>
                <h1 className="lg:text-xl font-normal text-gray-300 text-center mb-6">
                  EduTech Pro permet à chacun de libérer son plein potentiel et
                  d'atteindre le succès scolaire à l'ère du numérique.
                  Rejoignez-nous dans cette aventure transformative et embrassez
                  le futur de l'éducation avec EduTech Pro.
                </h1>
                <div className="flex flex-wrap items-center justify-center mt-3 z-40">
                  <Link to="/signup">
                    <button className="bg-primary text-white cursor-pointer rounded-lg  py-3 px-8 focus:outline-none z-40">
                      <div className="flex flex-row justify-center ml-2 mr-2">
                        <div className="self-center text-sm">Get Started</div>
                        <div className="h-2 px-1">
                          <img
                            src={rocket}
                            alt="rocket"
                            className="object-scale-down z-0"
                          />
                        </div>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
