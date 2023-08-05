// coursReducer.js

import {
  ADD_COURS_REQUEST,
  ADD_COURS_SUCCESS,
  // GET_COURS_REQUEST,
  // GET_COURS_SUCCESS,
  GET_COURS_FAILURE,
  GET_ALL_COURS_SUCCESS,
  GET_ALL_COURS_REQUEST,
  DELETE_COURS_REQUEST,
  DELETE_COURS_SUCCESS,
  UPDATE_COURS_REQUEST,
  UPDATE_COURS_SUCCESS,
  UPDATE_COURS_FAILLURE,
} from "../types/cours.types";

const initialState = {
  allCours: [],
  isLoading: false,
  error: null,
};

const coursReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COURS_REQUEST:
      const { file } = action.payload;
      return {
        ...state,
        allCours: [...state.allCours, file],
      };
    case ADD_COURS_SUCCESS:
      return {
        ...state,
        allCours: action.payload.cours,
      };

    case GET_COURS_FAILURE:
      return {
        ...state,
        isLoading: false, // Définir isLoading sur false
        error: action.payload,
      };
    // la recuperation de tout les cours
    case GET_ALL_COURS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_ALL_COURS_SUCCESS:
      return {
        ...state,
        allCours: action.payload,
        isLoading: false,
        error: null,
      };
    case DELETE_COURS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case DELETE_COURS_SUCCESS:
      // Supprimez le cours de l'état en filtrant les cours existants
      const updatedCours = state.allCours.filter(
        (cours) => cours.id !== action.payload
      );

      return {
        ...state,
        allCours: updatedCours,
        isLoading: false,
        error: null,
      };
    case UPDATE_COURS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case UPDATE_COURS_SUCCESS:
      // Mettez à jour le cours dans l'état en remplaçant le cours existant avec le cours mis à jour
      const updatedAllCours = state.allCours.map((cours) =>
        cours.id === action.payload.id ? action.payload : cours
      );

      return {
        ...state,
        allCours: updatedAllCours,
        isLoading: false,
        error: null,
      };
    case UPDATE_COURS_FAILLURE:
      return {
        ...state,
        isLoading: false, // Définir isLoading sur false
        error: action.payload,
      };
    default:
      return state;
  }
};

export default coursReducer;
