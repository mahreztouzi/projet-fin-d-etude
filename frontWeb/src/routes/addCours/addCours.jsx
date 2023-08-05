import React, { useState } from "react";
import "../../index.css";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar/sidebar";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

function getCurrentDate(separator = "-") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${date}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${year}`;
}

function AddCours({ isLoading }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user.user);
  const [state, setState] = useState({
    title: "",
    description: "",
    date: getCurrentDate(),
    file: null,
  });
  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();

    // Créer un nouvel objet FormData
    const formData = new FormData();
    formData.append("pdf", selectedFile, "file.pdf");
    formData.append("filename", selectedFile.name);
    formData.append("title", state.title);
    formData.append("description", state.description);
    formData.append("idEnseignant", userData.enseignantId);
    console.log("log de form data add", formData);

    // dispatch(addCours(formData));
    dispatch({ type: "ADD_COURS_REQUEST", payload: { file: formData } });
    Swal.fire({
      title: "Bravo!",
      text: "Cours crée avec succés",
      icon: "success",
      confirmButtonText: "OK",
    });
    // Réinitialiser les valeurs du formulaire ou effectuer d'autres actions nécessaires
    setState({
      title: "",
      description: "",
      date: getCurrentDate(),
      file: null,
    });
    history.goBack();
  };

  return (
    <div>
      <Header />
      {/* sidebar */}
      <div className="h-9/10 ">
        <Sidebar />
        {/* main content container */}
        <div className=" mt-auto lg:w-4/5 w-full lg:px-20 p-4 ml-auto bg-gray-50">
          <div className="container bg-white border rounded-lg border-subtle mt-12 lg:p-10 p-2">
            {/* total amount date showcase */}
            <div className="flex flex-row justify-center">
              <div className="w-1/2 flex flex-col">
                <div>
                  <h1 className="text-xl font-medium antialiased mb-1 text-left">
                    Creation d'un nouveau cours
                  </h1>
                </div>
              </div>
              <div className="w-1/2">
                <div className="w-1/2 flex flex-col ml-auto">
                  <div>
                    <h1 className="text-xl font-medium antialiased mb-1 text-left">
                      Date
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-2xl text-primary font-bold  antialiased mb-3 text-left">
                      {getCurrentDate()}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            {/* name*/}
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="mt-4">
                <label htmlFor="name" className="text-sm font-medium">
                  Titre du cours
                </label>
                <input
                  type="text"
                  autofocus
                  className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                  id="name"
                  name="title"
                  value={state.title}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Base de données"
                  required
                />
              </div>
              {/* description */}
              <div>
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  type="text"
                  rows="2"
                  className={`w-full p-2 text-primary form-textarea border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                  id="description"
                  name="description"
                  value={state.description}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Une petite description ..."
                />
              </div>

              <div>
                <label htmlFor="file" className="text-sm font-medium">
                  Fichier PDF
                </label>
                <div className="flex flex-row justify-center">
                  <div className="relative w-full  mb-5 w-30 border-dashed border-2 border-gray-300 rounded-md p-4 mt-2">
                    <input
                      type="file"
                      name="pdf"
                      accept=".pdf"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="file"
                      onChange={handleFileChange}
                    />
                    {selectedFile ? (
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-primary mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-primary">
                          {selectedFile.name}
                        </span>
                      </div>
                    ) : (
                      <div className="text-gray-500 text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mx-auto mb-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        <span className="text-sm  ">
                          Glissez et déposez un fichier PDF ici ou cliquez pour
                          sélectionner un fichier
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {!isLoading ? (
                <button
                  type="submit"
                  className={`w-full border bg-primary hover:bg-indigo-700 transition-all text-white py-2 px-10 text-sm  cursor-pointer  rounded-lg`}
                >
                  Crée cours
                </button>
              ) : (
                <button
                  className={`w-full flex disable cursor-pointer justify-center items-center bg-primary py-2 px-4 rounded border focus:outline-none`}
                >
                  <div className="justify-self-center">
                    <Loader color="#ffffff" />
                  </div>
                </button>
              )}
              <div className="flex  mt-3  justify-center">
                <button
                  onClick={() => {
                    history.goBack();
                  }}
                  type="submit"
                  className={`w-100 border bg-secondary  hover:bg-indigo-700 transition-all text-white py-2 px-10 text-sm  cursor-pointer  rounded-lg`}
                >
                  Annuler
                </button>
              </div>
            </form>

            {/* <Link to="/products" class="w-full"> */}

            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCours;
