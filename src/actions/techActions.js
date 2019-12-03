import {
  SET_LOADING,
  GET_TECHS,
  ADD_TECH,
  UPDATE_TECH,
  DELETE_TECH,
  TECHS_ERROR,
  SET_CURRENT_TECH,
  CLEAR_CURRENT_TECH
} from "./types";

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

export const getTechs = () => async dispatch => {
  try {
    setLoading();
    const res = await fetch("/techs");
    const data = await res.json();

    dispatch({
      type: GET_TECHS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.statusText
    });
  }
};

export const addTech = tech => async dispatch => {
  try {
    setLoading();
    const res = await fetch("/techs", {
      method: "POST",
      body: JSON.stringify(tech),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    dispatch({
      type: ADD_TECH,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.statusText
    });
  }
};

export const updateTech = tech => async dispatch => {
  try {
    setLoading();
    const res = await fetch(`/techs/${tech.id}`, {
      method: "PUT",
      body: JSON.stringify(tech),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    dispatch({
      type: UPDATE_TECH,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.statusText
    });
  }
};

export const deleteTech = id => async dispatch => {
  try {
    setLoading();
    await fetch(`/techs/${id}`, {
      method: "DELETE"
    });
    dispatch({
      type: DELETE_TECH,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.statusText
    });
  }
};

export const setCurrentTech = tech => dispatch => {
  dispatch({
    type: SET_CURRENT_TECH,
    payload: tech
  });
};

export const clearCurrentTech = () => dispatch => {
  dispatch({
    type: CLEAR_CURRENT_TECH
  });
};
