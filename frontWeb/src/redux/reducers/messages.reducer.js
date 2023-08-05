import {
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAILURE,
} from "../types/messages.types";

const initialState = {
  loading: false,
  message: null,
  error: null,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MESSAGE_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_MESSAGE_SUCCESS:
      return { ...state, loading: false, message: action.payload.message };
    case CREATE_MESSAGE_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    case GET_MESSAGES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.payload.messages,
      };
    case GET_MESSAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default messageReducer;
