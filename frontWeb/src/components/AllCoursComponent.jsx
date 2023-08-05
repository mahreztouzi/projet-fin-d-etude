import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoursRequest } from "../redux/actions/cours.action";
import Loader from "./loader";
import { SearchIcon } from ".././icons/index";
import { PlusIcon } from ".././icons/index";
import { Link } from "react-router-dom";

const AllCoursComponent = () => {
  const dispatch = useDispatch();
  const cours = useSelector((state) => state.cours.allCours);
  const isLoading = useSelector((state) => state.cours.isLoading);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCours, setFilteredCours] = useState([]);

  console.log("all cours log", cours);
  useEffect(() => {
    dispatch(getAllCoursRequest());
  }, [dispatch]);
  useEffect(() => {
    if (Array.isArray(cours)) {
      const filtered = cours.filter(
        (cours) =>
          cours.title &&
          cours.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCours(filtered);
    }
  }, [cours, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
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

        {/* add vendor button */}
        <Link to="/AddCours">
          <button className="flex space-x-2 justify-center button lg:px-16 lg:py-4 py-2 px-4 bg-indigo-600 rounded-lg text-sm font-medium text-center text-white">
            <PlusIcon></PlusIcon>
            Ajouter un cours
          </button>
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 w-1/4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 w-1/2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-12 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Loader size="75" />
                      </td>
                    </tr>
                  ) : filteredCours.length > 0 ? (
                    filteredCours.map(({ id, title, description, namePdf }) => (
                      <tr key={id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-md font-medium text-gray-900">
                            {title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link
                            to={`/coursDetails/${id}`}
                            className="text-white bg-primary hover:text-indigo-900 hover:bg-white rounded-lg border py-2 px-6"
                          >
                            Détails
                          </Link>
                        </td>
                      </tr>
                    ))
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
  );
};

export default AllCoursComponent;
