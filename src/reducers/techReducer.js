import {
  SET_LOADING,
  GET_TECHS,
  ADD_TECH,
  UPDATE_TECH,
  DELETE_TECH,
  TECHS_ERROR,
  SET_CURRENT_TECH,
  CLEAR_CURRENT_TECH
} from "../actions/types";

const initialState = {
  techs: null,
  currentTech: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_TECHS:
      return {
        ...state,
        techs: action.payload,
        loading: false
      };
    case ADD_TECH:
      return {
        ...state,
        techs: [...state.techs, action.payload],
        loading: false
      };
    case UPDATE_TECH:
      return {
        ...state,
        techs: state.techs.map(tech =>
          tech.id === action.payload.id ? action.payload : tech
        ),
        loading: false
      };
    case DELETE_TECH:
      return {
        ...state,
        techs: state.techs.filter(tech => tech.id !== action.payload),
        loading: false
      };
    case SET_CURRENT_TECH:
      return {
        ...state,
        currentTech: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_TECH:
      return {
        ...state,
        currentTech: null,
        loading: false
      };
    case TECHS_ERROR:
      console.log(action.payload);
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
