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
import {
  createEmployee,
  getEmployees,
  updateEmployee,
} from "../../../redux/actions/employees";
import { Container } from "@mui/system";
import { addEmployeeCafes, getCafes } from "../../../redux/actions/cafes";

function generateUUID() {
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds
  return "UIXXXXXXX".replace(/[X]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "X" && r).toString(16);
  });
}

const Form = () => {
  const [currentId, setCurrentId] = useState(null);
  const [employeeData, setEmployeeData] = useState({
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
    const uuid = generateUUID();
    const userId = uuid;

    if (currentId) {
      dispatch(updateEmployee(currentId, values));

      // add employee to cafe if cafe selected
      if (values.cafe !== "") {
        addEmployeeToCafe(values._id, values.name, values.cafe);
      }
    } else {
      values.id = userId;

      dispatch(createEmployee(values));
      // add employee to cafe if cafe selected
      if (values.cafe !== "") {
        addEmployeeToCafe(values.id, values.name, values.cafe);
      }
    }

    clear();
  };

  const addEmployeeToCafe = (userId, name, cafe) => {
    const employee = {
      employee_id: userId,
      name: name,
      startDate: new Date(),
    };
    dispatch(addEmployeeCafes(cafe, employee));
  };

  const clear = () => {
    setCurrentId(null);
    setEmployeeData({
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
          _id: data._id,
          id: data.id,
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
            gender: Yup.string().required("Required"),
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
                  onChange={(e) => setFieldValue("gender", e.target.value)}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
                <FormHelperText>{errors.gender}</FormHelperText>
              </FormControl>
              {/* {currentId && ( */}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={cafeDropdown}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="Cafe" value={values.cafe} />
                )}
                onChange={(event, newValue) =>
                  setFieldValue("cafe", newValue.value)
                }
              />
              {/* )} */}
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
