import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import Loader from "./loader";
import {
  addCommentRequest,
  getCommentsRequest,
} from "../redux/actions/comment.action";

const CoursDetailsComponent = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const cours = useSelector((state) => state.cours.allCours);
  const getComments = useSelector((state) => state.comment.comments);
  const isLoading = useSelector((state) => state.cours.isLoading);
  const [comment, setComment] = useState("");
  const selectedCours = cours.find((cours) => cours.id === parseInt(id));
  const [commentAded, setCommentAded] = useState(false);

  console.log("cours ", cours);
  console.log("comment", getComments);
  console.log(cours[0].id);
  console.log("selected cours", selectedCours);
  useEffect(() => {
    dispatch(getCommentsRequest(id));
    scrollToBottom();
  }, [dispatch, id, commentAded]);
  const scrollToBottom = () => {
    const scrollOptions = {
      behavior: "smooth",
      block: "end",
    };

    commentScrollAuto.current.scrollIntoView(scrollOptions);
  };
  useEffect(() => {
    scrollToBottom();
  }, [getComments]);
  const dateCreation = new Date(selectedCours?.createdAt);
  const formattedDate = dateCreation.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const commentListRef = useRef(null);
  const commentScrollAuto = useRef(null);

  console.log("voila le console log de comment", getComments);

  const handleAddComment = () => {
    const commentData = {
      contenu: comment,
    };
    if (commentListRef.current.value === "") {
      commentListRef.current.focus();
    } else {
      console.log("cooment", commentData);
      dispatch(addCommentRequest(id, commentData));
      setCommentAded(!commentAded);
      setComment("");
    }
  };

  return (
    <div className="mt-3 lg:w-4/5 w-full  p-3 bg-gray-50 ml-auto">
      <div className="mt-8"></div>
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ height: "43vw" }} className="flex flex-col h-screen ">
          <div
            style={{
              boxShadow: "0px 5px 6px rgb(140, 161, 216)",
              // border: "2px solid rgb(140, 161, 216) ",
            }}
            className="sticky top-0 z-10 bg-white bg-purple-50 rounded-lg py-2 px-6 shadow"
          >
            <div className="flex items-center justify-between">
              <div style={{ display: "flex" }}>
                <h2 className="text-2xl  font-semibold mr-5">
                  Titre du cours :{" "}
                </h2>
                <h2 className="text-2xl font-bold text-primary ">
                  {" "}
                  {selectedCours.title}
                </h2>
              </div>
              <span className="text-gray-500">
                Créé par <strong>M. {selectedCours.nameEnseignant} </strong> le{" "}
                <strong> {formattedDate}</strong>
              </span>
            </div>
            <div style={{ display: "flex" }}>
              <p className="text-xl font-semibold mr-5">
                Description du cours :{" "}
              </p>
              <p className="text-xl font-bold text-gray-400 ">
                {" "}
                {selectedCours.description}
              </p>
            </div>
            <div className="my-4">
              <p></p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3 className="text-lg font-semibold mt-7 ">Commentaires</h3>
              <div className="my-4 ">
                <a
                  href={`http://localhost:8080/uploads/${selectedCours.namePdf}`}
                  className=" bg-indigo-600 hover:bg-white text-white rounded-md hover:text-indigo-900 rounded-lg border py-3 px-8"
                >
                  Consulter le PDF
                </a>
              </div>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto">
            <div className="my-5">
              <div
                className="mt-4"
                style={{
                  marginBottom: "100px",
                  marginLeft: "20px",
                  height: "30vw",
                }}
              >
                {getComments && getComments.length > 0 ? (
                  getComments &&
                  getComments.map((comment) => {
                    const dateCreationComment = new Date(
                      comment && comment.createdAt
                    );
                    const formattedDateComment =
                      dateCreationComment.toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      });

                    // Obtenir les deux premières lettres du prénom de l'utilisateur
                    const initials =
                      comment && comment.User.name.substr(0, 2).toUpperCase();

                    return (
                      <div
                        key={comment && comment.id}
                        className="flex ml-5 mb-4"
                      >
                        <div className="pt-5 pr-3 mb-4">
                          <div
                            className={
                              comment && comment.User.role === "professeur"
                                ? "w-10 h-10 bg-primary  rounded-full flex items-center justify-center text-white text-xl font-bold"
                                : "w-10 h-10 bg-secondary  rounded-full flex items-center justify-center text-white text-xl font-bold"
                            }
                          >
                            {initials}
                          </div>
                        </div>
                        <div
                          style={{
                            maxWidth: "80%",
                            height: "auto",
                            wordWrap: "break-word",
                          }}
                          className={
                            comment && comment.User.role === "professeur"
                              ? "bg-gray-200 mt-5 rounded-lg pr-3 pl-3 pt-1 pb-1 h-14 inline-block max-w-max max-h-max"
                              : "bg-blue-100 mt-5 rounded-lg pr-3 pl-3 pt-1 pb-1 h-14 inline-block max-w-max max-h-max"
                          }
                        >
                          <h4 className="text-lg font-bold">
                            {comment && comment.User.name}
                          </h4>
                          <p className="text-primary">
                            {comment && comment.contenu}
                          </p>
                        </div>

                        <div
                          style={{ fontSize: "10px" }}
                          className="mt-10 ml-5 inline-block "
                        >
                          <p>{comment && comment.User.role} </p>
                          <div className="  ">{formattedDateComment}</div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ height: "15vw" }} className="flex ml-5 mb-4">
                    <p>Aucun commentaire pour le moment.</p>
                  </div>
                )}
                <div ref={commentScrollAuto}></div>
              </div>
            </div>
            <div
              style={{
                boxShadow: "0px -5px 10px rgb(140, 161, 216)",
                border: "2px solid rgb(140, 161, 216) ",
              }}
              className="mt-8 sticky bottom-0 bg-purple-50 rounded-lg py-4 px-6 shadow"
            >
              <h3 className="text-lg text-primary font-semibold">
                Ajouter un commentaire
              </h3>
              <div className="flex">
                <input
                  type="text"
                  value={comment}
                  ref={commentListRef}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Saisissez votre commentaire..."
                  className="w-full border rounded-md py-2 px-4 mt-2"
                />
                <button
                  onClick={handleAddComment}
                  className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md py-2 px-4 mt-2"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CoursDetailsComponent;
