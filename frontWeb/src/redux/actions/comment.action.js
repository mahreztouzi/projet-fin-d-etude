// commentActions.js

import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
} from "../types/comment.types";

export const addCommentRequest = (coursId, comment) => ({
  type: ADD_COMMENT_REQUEST,
  payload: { coursId, comment },
});

export const addCommentSuccess = () => ({
  type: ADD_COMMENT_SUCCESS,
});

export const addCommentFailure = (error) => ({
  type: ADD_COMMENT_FAILURE,
  payload: error,
});

export const getCommentsRequest = (coursId) => ({
  type: GET_COMMENTS_REQUEST,
  payload: coursId,
});

export const getCommentsSuccess = (comments) => ({
  type: GET_COMMENTS_SUCCESS,
  payload: comments,
});

export const getCommentsFailure = (error) => ({
  type: GET_COMMENTS_FAILURE,
  payload: error,
});
