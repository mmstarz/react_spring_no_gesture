import { SET_ALERT, REM_ALERT } from "../actions/types";

const initialState = {
  alerts: [],
};

const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      // @ payload = {id, msg, type}
      return {
        ...state,
        alerts: [...state.alerts, payload],
      };
    case REM_ALERT:
      // @ payload = number
      return {
        ...state,
        alerts: state.alerts.filter((el) => el.id !== payload),
      };
    default:
      return state;
  }
};

export default alertReducer;
