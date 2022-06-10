import { CREATE, DELETE, FETCH_ALL, UPDATE, FETCH_BY_SEARCH } from "../constants/actionTypes";

export default function cafes (cafes = [], action){
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case FETCH_BY_SEARCH:
      return action.payload
    case CREATE:
      return [...cafes, action.payload];
    case UPDATE:
      return cafes.map((cafe) => cafe._id === action.payload._id ? action.payload : cafe)
      case DELETE:
      return cafes.map((cafe) => cafe._id !== action.payload)
    default:
      return cafes;
  }
};
