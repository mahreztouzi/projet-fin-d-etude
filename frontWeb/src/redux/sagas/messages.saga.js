import { call, put, takeLatest } from "redux-saga/effects";
import {
  CREATE_MESSAGE_REQUEST,
  GET_MESSAGES_REQUEST,
} from "../types/messages.types";
import { createMessage, getMessages } from "../services/messages.service";
import {
  createMessageFailure,
  createMessageSuccess,
  getMessagesFailure,
  getMessagesRequest,
  getMessagesSuccess,
} from "../actions/message.action";

function* createMessageSaga(action) {
  try {
    const contenu = action.payload.contenu; // Accès direct à action.payload.file
    const idRecepteur = action.payload.idRecepteur; // Accès direct à action.payload.coursId
    const token = localStorage.getItem("token");

    console.log("saga message", action.payload);
    console.log(contenu);
    const response = yield call(createMessage, idRecepteur, contenu, token);
    yield put(createMessageSuccess(response.data.result));
    yield put(getMessagesRequest(idRecepteur));
  } catch (error) {
    yield put(createMessageFailure(error.message));
  }
}
function* getMessagesSaga(action) {
  try {
    const idRecepteur = action.payload.idRecepteur;
    const token = localStorage.getItem("token");

    const response = yield call(getMessages, idRecepteur, token);
    console.log("saga reposne message ", response);
    yield put(getMessagesSuccess(response.data.messages));
  } catch (error) {
    yield put(getMessagesFailure(error.message));
  }
}
export function* watchCreateMessage() {
  yield takeLatest(CREATE_MESSAGE_REQUEST, createMessageSaga);
  yield takeLatest(GET_MESSAGES_REQUEST, getMessagesSaga);
}
