import { all, fork } from "redux-saga/effects";

// Sagas
// Import your sagas here!
import authSaga from "./auth.saga";
import { watchAddCours } from "./cours.saga";
import { commentSagas } from "./comment.saga";
import { watchCreateMessage } from "./messages.saga";

// Connect types to sagas
const rootSaga = function* root() {
  yield all([
    // Seperate the sagas by comma
    fork(authSaga),
    fork(watchAddCours),
    fork(commentSagas),
    fork(watchCreateMessage),
  ]);
};

export default rootSaga;
