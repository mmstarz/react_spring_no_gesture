// import uuid from "uuid/v4";
import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REM_ALERT } from "./types";

export const setAlert = (msg, type, timeout = 3000) => (dispatch) => {
  const id = uuidv4(); // returns random long string
  dispatch({
    type: SET_ALERT,
    payload: { id, msg, type },
  });

  setTimeout(() => dispatch({ type: REM_ALERT, payload: id }), timeout);
};

export const removeAlert = (id) => {
  return (dispatch) => {
    dispatch({
      type: REM_ALERT,
      payload: id,
    });
  };
};