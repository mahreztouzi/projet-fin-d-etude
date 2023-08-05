import axios from "axios";
import { BASE_API_URL } from "./constant";
export const createMessage = (idRecepteur, contenu, token) => {
  return axios.post(
    `${BASE_API_URL}/message/${idRecepteur}`,
    { contenu },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getMessages = (idRecepteur, token) => {
  return axios.get(`${BASE_API_URL}/message/${idRecepteur}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
