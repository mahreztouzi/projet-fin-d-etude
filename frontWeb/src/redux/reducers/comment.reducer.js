// commentReducer.js

import {
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
} from "../types/comment.types";

const initialState = {
  comments: [],
  error: null,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,

        error: null,
      };
    case ADD_COMMENT_FAILURE:
    case GET_COMMENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export default commentReducer;
