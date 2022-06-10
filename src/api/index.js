import axios from 'axios'

const cafesUrl = 'http://localhost:5000/cafes';
const employeesUrl = 'http://localhost:5000/employees';

export const fetchCafes = () => axios.get(cafesUrl);
export const fetchCafesBySearch = (searchQuery) => axios.get(`${cafesUrl}?location=${searchQuery.search}`);
export const createCafe = (newCafe) => axios.post(cafesUrl, newCafe);
export const updateCafe = (id, updatedCafe) => axios.patch(`${ cafesUrl }/${ id }`, updatedCafe);
export const deleteCafe = (id) => axios.delete(`${ cafesUrl }/${ id }`);
export const addEmployeeToCafe = (id, addEmployee) => axios.patch(`${ cafesUrl }/${ id }/add-employee`, addEmployee);

export const fetchEmployees = () => axios.get(employeesUrl);
export const createEmployee = (newEmployee) => axios.post(employeesUrl, newEmployee);
export const updateEmployee = (id, updatedEmployee) => axios.patch(`${ employeesUrl }/${ id }`, updatedEmployee);
export const deleteEmployee = (id) => axios.delete(`${ employeesUrl }/${ id }`);