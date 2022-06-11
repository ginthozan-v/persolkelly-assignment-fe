import { CREATE_EMPLOYEE, DELETE_EMPLOYEE, FETCH_ALL_EMPLOYEE, FETCH_BY_SEARCH_EMPLOYEE, UPDATE_EMPLOYEE } 
from "../../constants/actionTypes";

export default function employees(employees = [], action) {
    switch (action.type) {
        case FETCH_ALL_EMPLOYEE:
            return action.payload;
        case FETCH_BY_SEARCH_EMPLOYEE:
            return action.payload;
        case CREATE_EMPLOYEE:
            return [...employees, action.payload];
        case UPDATE_EMPLOYEE:
            return employees.map((employee) => employee._id === action.payload._id ? action.payload : employee)
        case DELETE_EMPLOYEE:
            return employees.filter((employee) => employee._id !== action.payload)
        default:
            return employees;
    }
};
