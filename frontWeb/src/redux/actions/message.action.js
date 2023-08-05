import {
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAILURE,
} from "../types/messages.types";

export const createMessageRequest = (idRecepteur, contenu) => ({
  type: CREATE_MESSAGE_REQUEST,
  payload: { idRecepteur, contenu: contenu },
});

export const createMessageSuccess = (message) => ({
  type: CREATE_MESSAGE_SUCCESS,
  payload: { message },
});

export const createMessageFailure = (error) => ({
  type: CREATE_MESSAGE_FAILURE,
  payload: { error },
});

export const getMessagesRequest = (idRecepteur) => ({
  type: GET_MESSAGES_REQUEST,
  payload: { idRecepteur },
});

export const getMessagesSuccess = (messages) => ({
  type: GET_MESSAGES_SUCCESS,
  payload: { messages },
});

export const getMessagesFailure = (error) => ({
  type: GET_MESSAGES_FAILURE,
  payload: { error },
});
