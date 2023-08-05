// commentService.js

import { BASE_API_URL } from "./constant";
import axios from "axios";

// Configuration de l'en-tête d'autorisation
const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
});

// Fonction pour ajouter un commentaire
export const addComment = async (coursId, contenu, token) => {
  try {
    const commentData = {
      contenu: contenu,
    };

    const response = await axiosInstance.post(
      `/comment/${coursId}`,
      commentData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de l'ajout du commentaire");
  }
};

// Fonction pour obtenir les commentaires d'un cours
export const getComments = async (coursId, token) => {
  try {
    const response = await axiosInstance.get(`/comment/${coursId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des commentaires");
  }
};
