import { combineReducers } from "redux";
import cafes from "./cafes";
import employees from './employees'

export default combineReducers({ cafes, employees });
