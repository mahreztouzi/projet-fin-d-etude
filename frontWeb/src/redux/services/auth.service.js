import Axios from "axios";
import { BASE_API_URL } from "./constant";

const api = Axios.create({
  baseURL: BASE_API_URL,
});

// Intercepteur de requêtes
api.interceptors.request.use((config) => {
  // Récupérer le token d'authentification depuis localStorage
  const token = localStorage.getItem("token");

  // Ajouter le token à l'en-tête de la requête
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function Login(data) {
  try {
    // Tentative d'authentification en tant qu'enseignant
    const enseignantResponse = await api.post(
      `${BASE_API_URL}/enseignant`,
      data
    );
    console.log(data);
    console.log("login as enseignant");
    console.log(enseignantResponse);
    return enseignantResponse.data;
  } catch (enseignantError) {
    try {
      // Tentative d'authentification en tant qu'apprenant
      const apprenantResponse = await api.post(
        `${BASE_API_URL}/apprenant`,
        data
      );
      console.log(data);
      console.log("login as apprenant");
      console.log(apprenantResponse);
      return apprenantResponse.data;
    } catch (apprenantError) {
      console.log(apprenantError);
      throw apprenantError;
    }
  }
}
export async function Signup(data) {
  console.log("data", data.email);
  try {
    const response = await api.post(`${BASE_API_URL}/enseignant/signUp`, data);

    console.log("signup");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function SignupStudent(data) {
  try {
    const response = await api.post(`${BASE_API_URL}/apprenant/signUp`, data);
    console.log(data);
    console.log("signup");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
