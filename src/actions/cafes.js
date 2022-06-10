import * as api from "../api";
import { CREATE, DELETE, FETCH_ALL, FETCH_BY_SEARCH, UPDATE } from "../constants/actionTypes";

// Action creators
export const getCafes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCafes();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getCafesBySearch = (searchQuery) => async (dispatch) => {
  try {
    const { data } = await api.fetchCafesBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createCafes = (cafe) => async (dispatch) => {
  try {
    const { data } = await api.createCafe(cafe);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateCafes = (id, cafe) => async (dispatch) => {
  try {
    const { data } = await api.updateCafe(id, cafe);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCafes = (id) => async (dispatch) => {
  try {
    await api.deleteCafe(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const addEmployeeCafes = (id, employee) => async (dispatch) => {
  try {
    const { data } = await api.addEmployeeToCafe(id, employee);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    alert(error);
  }
};
