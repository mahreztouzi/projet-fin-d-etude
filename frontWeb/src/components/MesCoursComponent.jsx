import React, { useEffect, useState } from "react";

import { PlusIcon } from "../icons/index";
import { Link } from "react-router-dom";
import { SearchIcon } from "../icons/index";
import Loader from "./loader";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteCoursRequest,
  getAllCoursRequest,
} from "../redux/actions/cours.action";

import Swal from "sweetalert2";
function getCurrentDate(separator = "-") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${date}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${year}`;
}

const MesCoursComponent = () => {
  const dispatch = useDispatch();
  const cours = useSelector((state) => state.cours.allCours);
  const userData = useSelector((state) => state.auth.user.user);
  const isLoading = useSelector((state) => state.cours.isLoading);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCours, setFilteredCours] = useState([]);
  const [filteredCoursSearch, setFilteredCoursSearch] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [idCours, setIdCours] = useState(null);
  const [state, setState] = useState({
    title: "",
    description: "",
    date: getCurrentDate(),
    file: null,
  });

  useEffect(() => {
    if (Array.isArray(cours)) {
      const filtered = cours.filter(
        (cours) => cours.idEnseignant === userData.enseignantId
      );
      setFilteredCours(filtered);
    }
  }, [cours, userData]);
  useEffect(() => {
    if (Array.isArray(filteredCours)) {
      const filteredSearch = filteredCours.filter(
        (cours) =>
          cours.title &&
          cours.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCoursSearch(filteredSearch);
    }
  }, [filteredCours, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  //  suppression d'un cours
  const handleDelete = (id) => {
    Swal.fire({
      title: "Vous êtes sure ?",
      text: "Ce cours sera supprimé pour toujours!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonText: "Non",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, je veux !",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCoursRequest(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // mise a jour du cours
  const handleUpdate = (e) => {
    e.preventDefault();

    // Créez un nouvel objet FormData
    const formData = new FormData();
    if (!selectedFile || !state.title || !state.description) {
      Swal.fire({
        title: "Erreur!",
        text: "Veuillez remplir tout les champs svp",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      formData.append("pdf", selectedFile);
      formData.append("filename", selectedFile.name);
      formData.append("title", state.title);
      formData.append("description", state.description);

      // Dispatch de l'action updateCours
      dispatch({
        type: "UPDATE_COURS_REQUEST",
        payload: {
          file: formData,
          coursId: idCours,
        },
      });

      // Réinitialisez les valeurs du formulaire ou effectuez d'autres actions nécessaires
      setIsOpen(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Vos Données sont a jour ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleRemplirSteteForm = (id) => {
    const cour = cours.find((c) => c.id === id);

    if (cour) {
      setState({
        title: cour.title,
        description: cour.description,
        date: cour.createdAt,
        file: null,
      });
    }
  };

  useEffect(() => {
    dispatch(getAllCoursRequest());
  }, [dispatch]);
  return (
    <>
      <div className="mt-auto lg:w-4/5 w-full p-10 bg-gray-50 ml-auto">
        <div className="mt-8"></div>
        {/* top search bar */}
        <div className="flex justify-between items-stretch">
          {/* search box */}
          <div className="flex space-x-1 items-stretch">
            <input
              onChange={handleSearch}
              type="search"
              className="w-full lg:p-4 p-1 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out"
              id="search"
              name="search_product"
              placeholder="Search for product"
            />
            <button
              type="button"
              // onClick={handleSearch}
              className="cursor-pointer bg-primary lg:p-4 p-1 text-sm text-white rounded-lg border focus:outline-none focus:"
            >
              <SearchIcon></SearchIcon>
            </button>
          </div>

          <Link to="/AddCours">
            <button className="flex space-x-2 justify-center button lg:px-16 lg:py-4 py-2 px-4 bg-indigo-600 rounded-lg text-sm font-medium text-center text-white">
              <PlusIcon></PlusIcon>
              Ajouter un cours
            </button>
          </Link>
        </div>

        <div className="flex flex-col h-screen">
          <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-200 border-b border-gray-600 ">
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 w-1/2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Titre
                      </th>

                      <th
                        scope="col"
                        className="px-3 w-1/6   py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Détails
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 w-1/6   text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        modifcation
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 w-1/6    text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        suppression
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y  divide-gray-200">
                    {isLoading ? (
                      <tr>
                        <td>
                          <Loader size="75" />
                        </td>
                      </tr>
                    ) : filteredCoursSearch.length > 0 ? (
                      filteredCoursSearch.map(
                        ({ id, title, description, namePdf }) => (
                          <tr key={id}>
                            <td className="px-5 w-1/2 py-4 whitespace-nowrap">
                              <div className="text-md font-medium text-gray-900">
                                {title}
                              </div>
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap">
                              <Link
                                to={`/coursDetails/${id}`}
                                className="text-indigo-600 hover:text-indigo-900 rounded-lg border py-2 px-6"
                              >
                                Details
                              </Link>
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap">
                              <button
                                onClick={() => {
                                  handleRemplirSteteForm(id);
                                  setIdCours(id);
                                  setIsOpen(!isOpen);
                                }}
                                className="text-indigo-600 hover:text-indigo-900 rounded-lg border py-2 px-6"
                              >
                                Modifier
                              </button>
                            </td>{" "}
                            <td className="px-3 py-4 whitespace-nowrap">
                              <button
                                onClick={() => handleDelete(id)}
                                className="text-white hover:text-red-600 hover:bg-white bg-red-500 rounded-lg border py-2 px-6"
                              >
                                Supprimer
                              </button>
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-6 py-4 whitespace-nowrap">
                          Cours non trouvé
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex w-auto items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-60 "
            onClick={() => closeModal()}
          >
            1
          </div>
          <div className="relative   rounded-lg ">
            <div className="mx-auto  w-full lg:px-20     ml-auto">
              <div className="container bg-white  border rounded-lg border-subtle lg:p-10 p-2">
                {/* total amount date showcase */}
                <div className="flex flex-row justify-center">
                  <div className="w-1/2  flex flex-col">
                    <div>
                      <h1 className="text-x font-medium antialiased mb-1 text-left">
                        Modification d'un nouveau cours
                      </h1>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="w-1/2 flex flex-col ml-auto">
                      <div>
                        <h1 className="text-x font-medium antialiased mb-1 text-left">
                          Date
                        </h1>
                        <h1 className="text-xl text-primary font-bold antialiased mb-3 text-left">
                          {getCurrentDate()}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                {/* name*/}
                <form
                  encType="multipart/form-data"
                  onSubmit={(e) => handleUpdate(e)}
                >
                  <div className="mt-4">
                    <label htmlFor="name" className="text-sm font-medium">
                      Titre du cours
                    </label>
                    <input
                      type="text"
                      autoFocus
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
                    <label
                      htmlFor="description"
                      className="text-sm font-medium"
                    >
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
                      placeholder="Une petite description..."
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
                              Glissez et déposez un fichier PDF ici ou cliquez
                              pour sélectionner un fichier
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`w-full border bg-primary hover:bg-indigo-700 transition-all text-white py-2 px-10 text-sm cursor-pointer rounded-lg`}
                  >
                    Modifier ce cours
                  </button>

                  <div className="flex mt-3 justify-center">
                    <button
                      onClick={() => closeModal()}
                      className={`w-100 border bg-secondary hover:bg-indigo-700 transition-all text-white py-2 px-10 text-sm cursor-pointer rounded-lg`}
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MesCoursComponent;
