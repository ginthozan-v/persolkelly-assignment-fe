import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import s from "./styles.module.css";
import { createEmployee, getEmployees, updateEmployee } from "../../../redux/actions/employees";
import { Container } from "@mui/system";
import { addEmployeeCafes, getCafes } from "../../../redux/actions/cafes";


const Form = () => {
  const [currentId, setCurrentId] = useState(null);
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

  const phoneRegExp = /^[89]\d{7}$/;

  let employees = useSelector((state) => state.employees);

  const handleSubmit = (values) => {
    if (currentId) {
      dispatch(updateEmployee(currentId, values));
    } else {
      dispatch(createEmployee(values));
    }

    // add employee to cafe if cafe selected
    if (values.cafe !== "") {
      const employee = {
        employee_id: values.id,
        name: values.name,
        startDate: new Date(),
      };
      dispatch(addEmployeeCafes(values.cafe, employee));
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
    navigate("/employee");
  };

  useEffect(() => {
    if (id) {
      setCurrentId(id);
      dispatch(getCafes());
      dispatch(getEmployees());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentId && employees) {
      const data = employees.find((c) => c._id === currentId);
      if (data) {
        setEmployeeData({
          id: data._id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          gender: data.gender,
        });
      }
    }
  }, [employees, currentId]);


  useEffect(() => {
    if (cafes) {
      let dropdown = [];
      cafes.map((cafe) =>
        dropdown.push({
          label: cafe.name,
          value: cafe._id,
        })
      );
      setCafeDropdown(dropdown);
    }
  }, [cafes]);

  return (
    <Container maxWidth="xl" className={s.container}>
      <Paper className={s.paper}>
        <Formik
          initialValues={employeeData}
          enableReinitialize
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(6, "Must be atleast 6 characters")
              .max(10, "Must be 10 characters or less")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            phone: Yup.string()
              .matches(phoneRegExp, "Phone number is not valid")
              .required("Required"),
            gender: Yup.string()
              .required("Required"),
          })}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
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
                value={values.name}
                onChange={handleChange}
                error={errors.name && touched.name}
                helperText={errors.name}
              />
              <TextField
                name="email"
                variant="outlined"
                label="Email"
                fullWidth
                value={values.email}
                onChange={handleChange}
                error={errors.email && touched.email}
                helperText={errors.email}
              />
              <TextField
                name="phone"
                variant="outlined"
                label="Phone"
                fullWidth
                value={values.phone}
                onChange={handleChange}
                error={errors.phone && touched.phone}
                helperText={errors.phone}
              />
              <FormControl error={errors.gender && touched.gender} fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.gender}
                  label="Gender"
                  onChange={(e) =>
                    setFieldValue('gender', e.target.value)
                  }
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
                <FormHelperText>{errors.gender}</FormHelperText>
              </FormControl>
              {currentId && (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={cafeDropdown}
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} label="Cafe" value={values.cafe} />
                  )}
                  onChange={(event, newValue) =>
                    setFieldValue('cafe', newValue.value)
                  }
                />
              )}
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
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Form;
