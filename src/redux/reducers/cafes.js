import { CREATE_CAFE, DELETE_CAFE, FETCH_ALL_CAFE, UPDATE_CAFE, FETCH_BY_SEARCH_CAFE } 
from "../../constants/actionTypes";

export default function cafes(cafes = [], action) {
  switch (action.type) {
    case FETCH_ALL_CAFE:
      return action.payload;
    case FETCH_BY_SEARCH_CAFE:
      return action.payload
    case CREATE_CAFE:
      return [...cafes, action.payload];
    case UPDATE_CAFE:
      return cafes.map((cafe) => cafe._id === action.payload._id ? action.payload : cafe)
    case DELETE_CAFE:
      return cafes.filter((cafe) => cafe._id !== action.payload)
    default:
      return cafes;
  }
};
