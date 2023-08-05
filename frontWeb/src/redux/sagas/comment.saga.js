// commentSagas.js

import { put, call, takeLatest } from "redux-saga/effects";

import {
  ADD_COMMENT_REQUEST,
  GET_COMMENTS_REQUEST,
} from "../types/comment.types";
import {
  addCommentSuccess,
  addCommentFailure,
  getCommentsSuccess,
  getCommentsFailure,
  getCommentsRequest,
} from "../actions/comment.action";

import * as commentService from "../services/comment.service";
function* addComment(action) {
  try {
    const token = localStorage.getItem("token");
    const { comment, coursId } = action.payload;
    const contenu = comment.contenu;

    // Appeler le service pour ajouter le commentaire
    yield call(commentService.addComment, coursId, contenu, token);

    yield put(addCommentSuccess());
    yield put(getCommentsRequest(coursId));
  } catch (error) {
    yield put(addCommentFailure(error.message));
  }
}

function* getComments(action) {
  try {
    const token = localStorage.getItem("token");
    const coursId = action.payload;
    // Appeler le service pour obtenir les commentaires
    const comments = yield call(commentService.getComments, coursId, token);
    yield put(getCommentsSuccess(comments));
  } catch (error) {
    yield put(getCommentsFailure(error.message));
  }
}

export function* commentSagas() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
  yield takeLatest(GET_COMMENTS_REQUEST, getComments);
}
