import { BASE_API_URL } from "./constant";
import axios from "axios";

export const addCours = (formData, token) => {
  return axios
    .post(`${BASE_API_URL}/cours`, formData, {
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=----WebKitFormBoundary<boundary_value>",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)

    .catch((error) => {
      throw new Error(error.response.data.error);
    });
};

export function deleteCours(coursId, token) {
  const id = coursId;

  return axios
    .delete(`${BASE_API_URL}/cours/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response); // Afficher la réponse dans la console
      return response.data;
    })
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
}
export function getAllCours(token) {
  console.log("allCours");

  return axios
    .get(`${BASE_API_URL}/cours`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response); // Afficher la réponse dans la console
      return response.data;
    })
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
}

export const updateCours = (coursId, formData, token) => {
  console.log("formData", formData);
  return axios
    .patch(`${BASE_API_URL}/cours/${coursId}`, formData, {
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=----WebKitFormBoundary<boundary_value>",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
};
