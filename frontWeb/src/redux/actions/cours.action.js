import {
  ADD_COURS_REQUEST,
  ADD_COURS_SUCCESS,
  GET_ALL_COURS_REQUEST,
  GET_ALL_COURS_SUCCESS,
  DELETE_COURS_REQUEST,
  UPDATE_COURS_REQUEST,
  UPDATE_COURS_SUCCESS,
  UPDATE_COURS_FAILLURE,
} from "../types/cours.types";

export const addCours = (formData) => ({
  type: ADD_COURS_REQUEST,
  payload: formData,
});
export const addCoursSuccess = (cours) => ({
  type: ADD_COURS_SUCCESS,
  payload: { cours },
});

export const deleteCoursRequest = (userId) => ({
  type: DELETE_COURS_REQUEST,
  payload: userId,
});
export const getAllCoursRequest = () => ({
  type: GET_ALL_COURS_REQUEST,
});
export const getAllCoursSuccess = (cours) => ({
  type: GET_ALL_COURS_SUCCESS,
  payload: cours,
});

export const updateCours = (formData, coursId) => ({
  type: UPDATE_COURS_REQUEST,
  payload: { formData, coursId },
});
export const updateCoursSuccess = (cours) => ({
  type: UPDATE_COURS_SUCCESS,
  payload: { cours },
});
export const updateCoursFailure = (error) => ({
  type: UPDATE_COURS_FAILLURE,
  payload: error,
});
