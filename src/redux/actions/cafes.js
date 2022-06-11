import * as api from "../../api";
import { CREATE_CAFE, DELETE_CAFE, FETCH_ALL_CAFE, FETCH_BY_SEARCH_CAFE, UPDATE_CAFE } 
from "../../constants/actionTypes";

// Action creators
export const getCafes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCafes();
    dispatch({ type: FETCH_ALL_CAFE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getCafesBySearch = (searchQuery) => async (dispatch) => {
  try {
    const { data } = await api.fetchCafesBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH_CAFE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createCafes = (cafe) => async (dispatch) => {
  try {
    const { data } = await api.createCafe(cafe);
    dispatch({ type: CREATE_CAFE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateCafes = (id, cafe) => async (dispatch) => {
  try {
    const { data } = await api.updateCafe(id, cafe);
    dispatch({ type: UPDATE_CAFE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCafes = (id) => async (dispatch) => {
  try {
    await api.deleteCafe(id);
    dispatch({ type: DELETE_CAFE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const addEmployeeCafes = (id, employee) => async (dispatch) => {
  try {
    const { data } = await api.addEmployeeToCafe(id, employee);
    dispatch({ type: UPDATE_CAFE, payload: data });
  } catch (error) {
    if(error.response.status === 409){
      alert('user already exist on another cafe')
    }
  }
};
