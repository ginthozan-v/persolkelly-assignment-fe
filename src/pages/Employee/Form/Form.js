import React, { useState, useEffect } from "react";
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import s from "./styles.module.css";
import { createEmployee, updateEmployee } from "../../../actions/employees";
import { Container } from "@mui/system";
import { addEmployeeCafes, getCafes } from "../../../actions/cafes";

const Form = () => {
  const [currentId, setCurrentId] = useState(null)

  const [employeeData, setEmployeeData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    cafe: "",
  });

  const [cafeDropdown, setCafeDropdown] = useState([]);
  const cafes = useSelector((state) => state.cafes);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  let employees = useSelector((state) => state.employees);


  const handleSubmit = (e) => {
    e.preventDefault();
      if (employeeData.name !== "") {
        if (currentId) {
          dispatch(updateEmployee(currentId, employeeData));
        } else {
          dispatch(createEmployee(employeeData));
        }
      }

      if (employeeData.cafe !== "") {
        const employee = {
          employee_id: employeeData.id,
          name: employeeData.name,
          startDate: new Date()
        }
        dispatch(addEmployeeCafes(employeeData.cafe, employee));
      }
      clear();
  };

  const clear = () => {
    setCurrentId(null);
    setEmployeeData({
      id: "",
      name: "",
      email: "",
      phone: "",
      gender: "",
    });
    navigate('/employee');
  };

  useEffect(() => {
    dispatch(getCafes());
  }, [dispatch]);

  useEffect(() => {
    const data = employees.find((c) => c._id === id);
    if (data) {
      setEmployeeData({
        id: data._id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
      });
    }
  }, [employees]);

  useEffect(() => {
    setCurrentId(id);
  }, [id])

  useEffect(() => {
    if (cafes) {
      let dropdown = [];
      cafes.map(cafe => (
        dropdown.push({
          label: cafe.name,
          value: cafe._id
        })
      ))
      setCafeDropdown(dropdown)
    }
  }, [cafes])

  return (
    <Container maxWidth="xl">
      <Paper className={s.paper}>
        <form
          autoComplete="off"
          noValidate
          className={s.form}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">
            {currentId ? "Editing" : "Creating"} a Employee
          </Typography>
          <TextField
            name="name"
            variant="outlined"
            label="Name"
            fullWidth
            value={employeeData.name}
            onChange={(e) => setEmployeeData({ ...employeeData, name: e.target.value })}
          />
          <TextField
            name="email"
            variant="outlined"
            label="Email"
            fullWidth
            value={employeeData.email}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, email: e.target.value })
            }
          />
          <TextField
            name="phone"
            variant="outlined"
            label="Phone"
            fullWidth
            value={employeeData.phone}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, phone: e.target.value })
            }
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={employeeData.gender}
              label="Gender"
              onChange={(e) =>
                setEmployeeData({ ...employeeData, gender: e.target.value })}
            >
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
              <MenuItem value={'other'}>Other</MenuItem>
            </Select>
          </FormControl>
          {currentId &&
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={cafeDropdown}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Cafe" />}
              onChange={(event, newValue) => setEmployeeData({ ...employeeData, cafe: newValue.value })}
            />
          }
          <Button
            className={s.submitBtn}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            {currentId ? "Update" : "Add"} Employee
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => clear()}
            fullWidth
          >
            Cancel
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Form;
