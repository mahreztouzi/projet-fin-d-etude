import { put, call, takeLatest, all } from "redux-saga/effects";
import { Login, Signup, SignupStudent } from "../services/auth.service";
import { push } from "react-router-redux";
import { AuthTypes } from "../types";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import { persistor } from "..";

export function* login(action) {
  try {
    const res = yield call(Login, action.payload);
    if (res.error) {
      yield put({
        type: AuthTypes.LOGIN_ERROR,
        error: res.message,
      });
    } else {
      // Sauvegarder le token dans le localStorage
      localStorage.setItem("token", res.token);
      // Décoder le token JWT
      const decodedToken = jwtDecode(res.token);
      localStorage.setItem("userData", JSON.stringify(decodedToken));
      Swal.fire({
        title: `Bienvenue M. ${decodedToken.name.toUpperCase()}`,
        text: "Parfait !",
        icon: "success",
        confirmButtonText: "OK",
      });

      yield put({
        type: AuthTypes.LOGIN_SUCCESS,
        data: { token: res.token, user: decodedToken },
      });
    }
  } catch (error) {
    yield put({ type: AuthTypes.LOGIN_ERROR, error });
  }
}

export function* signup(action) {
  try {
    const res = yield call(Signup, action.payload);
    console.log("signup");
    console.log(res);

    if (res.error) {
      yield put({
        type: AuthTypes.LOGIN_ERROR,
        error: res.message,
      });
    } else {
      // Sauvegarder le token dans le localStorage

      Swal.fire({
        title: "Bravo!",
        text: "Parfait ! bienvene parmi nous",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.reload();
      });

      yield put({ type: AuthTypes.SIGNUP_SUCCESS, data: res });
    }
  } catch (error) {
    yield put({ type: AuthTypes.LOGIN_ERROR, error });
  }
}
export function* signupStudent(action) {
  try {
    const res = yield call(SignupStudent, action.payload);
    console.log("signup");
    console.log(res);

    if (res.error) {
      yield put({
        type: AuthTypes.LOGIN_ERROR,
        error: res.message,
      });
    } else {
      // Sauvegarder le token dans le localStorage

      Swal.fire({
        title: "Bravo!",
        text: "Parfait ! bienvene parmi nous",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.reload();
      });

      yield put({ type: AuthTypes.SIGNUP_STUDENT_SUCCESS, data: res });
    }
  } catch (error) {
    yield put({ type: AuthTypes.LOGIN_ERROR, error });
  }
}

export function* logout() {
  try {
    persistor
      .purge()
      .then(() => {
        // Succès de la purge
        console.log("Données persistées supprimées avec succès.");
      })
      .catch((error) => {
        // Erreur lors de la purge
        console.error(
          "Erreur lors de la suppression des données persistées :",
          error
        );
      });
    // Supprimer le token du localStorage
    localStorage.removeItem("primary");
    localStorage.removeItem("cours");
    localStorage.removeItem("persist:primary");

    localStorage.removeItem("userData");
    localStorage.removeItem("token");

    // Effectuer d'autres opérations de nettoyage ou de réinitialisation si nécessaire

    // Rediriger vers la page de connexion (ou toute autre page appropriée)
    yield put(push("/login"));
    window.location.reload();
  } catch (error) {
    // Gérer les erreurs
    console.error("Erreur lors de la déconnexion :", error);
  }
}
export default function* allSaga() {
  yield all([
    takeLatest(AuthTypes.LOGIN_REQUEST, login),
    takeLatest(AuthTypes.SIGNUP_REQUEST, signup),
    takeLatest(AuthTypes.SIGNUP_STUDENT_REQUEST, signupStudent),
    takeLatest(AuthTypes.LOGOUT_REQUEST, logout),
  ]);
}
