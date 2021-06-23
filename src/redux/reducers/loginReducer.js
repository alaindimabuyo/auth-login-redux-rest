
import {
  TASK_ADDED,
  DELETE_TASK,
    SET_CURRENT,
    CLEAR_CURRENT,
    TASK_UPDATED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    GET_TASK,
    USER_LOADED,
    SET_LOADING
  } from "../constants/types";

 
 const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: false,
    user: null,
    error: null,
    task: null,
    selectedTask: null
  };


export const loginReducer = (state = initialState, {type, payload}) => {
   switch (type) {

    case LOGIN_SUCCESS:
        localStorage.setItem("token", payload.results.token);
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          token: payload.results.token
        };
    case LOGIN_FAIL:
    case AUTH_ERROR:
        localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
          error: payload
        };
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_TASK:
          return {
            ...state,
            task: payload,
            loading: false
          };
          case USER_LOADED:
            return {
              ...state,
              user: payload,
              loading: false
            };
        case TASK_ADDED:
          return {
            ...state,
            task: [payload, ...state.task],
            loading: false
          };
        case TASK_UPDATED:
          return {
            ...state,
            task: state.task.map(item =>
              item.id === payload.id ? payload : item
            ),
            loading: false
          };
          case DELETE_TASK:
            return {
              ...state,
              task: state.task.filter(item => item._id !== payload),
              loading: false
            };
          case SET_CURRENT:
            return {
              ...state,
              selectedTask: payload,
              loading: false,
            };
          case CLEAR_CURRENT:
            return {
              ...state,
              selectedTask: null,
              loading: false,
            };
       default:
           return state;
    
   }
  };