import { put, takeLatest, call, all } from "redux-saga/effects";
import {
  ADD_COURS_REQUEST,
  GET_COURS_FAILURE,
  GET_ALL_COURS_REQUEST,
  DELETE_COURS_SUCCESS,
  DELETE_COURS_REQUEST,
  UPDATE_COURS_REQUEST,
} from "../types/cours.types";
import {
  addCours,
  getAllCours,
  deleteCours,
  updateCours,
} from "../services/cours.service";
import {
  addCoursSuccess,
  getAllCoursRequest,
  getAllCoursSuccess,
  updateCoursFailure,
  updateCoursSuccess,
} from "../actions/cours.action";

function* addCoursSaga(action) {
  try {
    const token = localStorage.getItem("token");
    // Appel à l'API pour ajouter le cours
    const { file } = action.payload;
    const response = yield call(addCours, file, token);
    console.log("saga cours ");
    console.log(response);

    // Vérification de la réponse de l'API et construction du cours
    const cours = {
      createdAt: response.cours.createdAt,
      description: response.cours.description,
      id: response.cours.id,
      idEnseignant: response.cours.idEnseignant,
      namePdf: response.cours.namePdf,
      title: response.cours.title,
      updatedAt: response.cours.updatedAt,
    };

    console.log(cours);
    yield put(addCoursSuccess(cours));
    // yield put({ type: ADD_COURS_SUCCESS, payload: cours });
    yield put(getAllCoursRequest());
  } catch (error) {
    // Dispatch de l'action d'erreur en cas d'échec
    // yield put(addCoursFailure(error.message));
  }
}

function* deleteCoursSaga(action) {
  try {
    const token = localStorage.getItem("token");
    // Déclenche l'action GET_COURS_REQUEST pour indiquer que la requête est en cours
    const userId = action.payload;
    const response = yield call(deleteCours, userId, token);

    // Vérification de la réponse de l'API et construction des cours

    yield put({ type: DELETE_COURS_SUCCESS, payload: response.data });
    yield put(getAllCoursRequest());
  } catch (error) {}
}
function* getAllCoursSaga() {
  try {
    // Déclenche l'action GET_COURS_REQUEST pour indiquer que la requête est en cours
    const token = localStorage.getItem("token");
    const response = yield call(getAllCours, token);
    console.log("saga cours all cours get ");
    console.log(response);

    // Vérification de la réponse de l'API et construction des cours

    const cours = response.map((coursData) => ({
      nameEnseignant: coursData.Enseignant.name,
      createdAt: coursData.createdAt,
      description: coursData.description,
      id: coursData.id,
      idEnseignant: coursData.idEnseignant,
      namePdf: coursData.namePdf,
      title: coursData.title,
      updatedAt: coursData.updatedAt,
    }));
    console.log("cours dans saga ");
    console.log(cours);
    // yield put({ type: GET_ALL_COURS_SUCCESS, payload: cours });
    yield put(getAllCoursSuccess(cours));
  } catch (error) {
    yield put({ type: GET_COURS_FAILURE, payload: error.message });
  }
}
function* updateCoursSaga(action) {
  try {
    const token = localStorage.getItem("token");
    const formData = action.payload.file; // Accès direct à action.payload.file
    const coursId = action.payload.coursId; // Accès direct à action.payload.coursId

    // Appel à l'API pour mettre à jour le cours
    const response = yield call(updateCours, coursId, formData, token);
    console.log("response saga ", response);
    // Vérification de la réponse de l'API et construction du cours
    const cours = {
      createdAt: response.cours.createdAt,
      description: response.cours.description,
      id: response.cours.id,
      idEnseignant: response.cours.idEnseignant,
      namePdf: response.cours.namePdf,
      title: response.cours.title,
      updatedAt: response.cours.updatedAt,
    };

    yield put(updateCoursSuccess(cours));
    yield put(getAllCoursRequest());
  } catch (error) {
    // Dispatch de l'action d'erreur en cas d'échec
    yield put(updateCoursFailure(error.message));
  }
}

export function* watchAddCours() {
  yield all([
    takeLatest(ADD_COURS_REQUEST, addCoursSaga),
    takeLatest(DELETE_COURS_REQUEST, deleteCoursSaga),
    takeLatest(GET_ALL_COURS_REQUEST, getAllCoursSaga),
    takeLatest(UPDATE_COURS_REQUEST, updateCoursSaga),
  ]);
}
