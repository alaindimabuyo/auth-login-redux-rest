
import {
    DELETE_TASK,
    SET_CURRENT,
    CLEAR_CURRENT,
    TASK_UPDATED,

    TASK_ADD_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    TASK_ADDED,
    GET_TASK,
    TASK_ERROR,
    SET_LOADING
  } from "../constants/types";

  import axios from 'axios'
  import SetAuthToken from "../setAuthToken"
   //Load User



export const loadUser = () => async dispatch => {

    //@load token into global users
    if (localStorage.token) {
      SetAuthToken(localStorage.token)
    }
    dispatch({type: SET_LOADING})
    try {
      //call the auth endpoint 
      const res = await axios.get('https://stage.api.sloovi.com/team')
      dispatch({ type: USER_LOADED, payload: res.data })
    } catch (err) {
      dispatch({ type: AUTH_ERROR })
    }
  };

export const loginUser = (formData) => async dispatch => {
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json', 
      }
    };

    try {
      //connect to users endpoint
      const res = await axios.post("https://stage.api.sloovi.com/login", formData, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      //load corresponding user
      loadUser()
    } catch (err) {
      //show error from the trycatch method in the users endpoint
      dispatch({ type: LOGIN_FAIL, payload: err?.response?.data?.msg });
    }
  };


export const getAllTask = () => async dispatch => {
  dispatch({type: SET_LOADING})
    try {
      //call the auth endpoint 
      const res = await axios.get('https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38')
      dispatch({ type: GET_TASK, payload: res.data })
    } catch (err) {
      dispatch({ type: TASK_ERROR })
    }
};

export const addTask = (formData) => async dispatch => {
  dispatch({type: SET_LOADING})
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json', 
    }
  };

  try {
    //connect to users endpoint
  
    const res = await axios.post("https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38", formData, config);
 
    dispatch({ type: TASK_ADDED, payload: res.data });
    //load corresponding user
    loadUser()
  } catch (err) {

    //show error from the trycatch method in the users endpoint
    dispatch({ type: TASK_ADD_FAIL, payload: err?.response?.data?.msg });
  }
};


export const updateTask = (formData) => async dispatch => {
  dispatch({type: SET_LOADING})
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json', 
    }
  };

  try {
    //connect to users endpoint
    const res = await axios.put(`https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/${formData.id}`, formData, config);

    dispatch({ type: TASK_UPDATED, payload: res.data });
    //load corresponding user
    loadUser()
  } catch (err) {

    //show error from the trycatch method in the users endpoint
    dispatch({ type: TASK_ADD_FAIL, payload: err?.response?.data?.msg });
  }
};


  // Set Current Contact
  export const setCurrent = (task) => async dispatch => {
    dispatch({type: SET_LOADING})
    dispatch({ type: SET_CURRENT, payload: task });
  };
  // Clear Current Contact
  export const clearCurrent= () => async dispatch =>{
    dispatch({type: SET_LOADING})
    dispatch({ type: CLEAR_CURRENT });
  };


  export const deleteTask = (id) => async dispatch => {
    dispatch({type: SET_LOADING})
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json', 
      }
    };


    try {
      await axios.delete(`https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/${id}`, config)
      dispatch({ type: DELETE_TASK, payload: id });
    } catch (err) {
      dispatch({ type: TASK_ADD_FAIL, payload: err?.response?.msg });
    }

  };

