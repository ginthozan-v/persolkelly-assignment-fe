import { CREATE, DELETE, FETCH_ALL, UPDATE } from "../constants/actionTypes";

export default function employees (employees = [], action) {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...employees, action.payload];
        case UPDATE:
            return employees.map((employee) => employee._id === action.payload._id ? action.payload : employee)
        case DELETE:
            return employees.map((employee) => employee._id !== action.payload)
        default:
            return employees;
    }
};
