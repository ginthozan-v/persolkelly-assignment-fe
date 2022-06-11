import React, { useState, useEffect } from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

import s from "./styles.module.css";
import {
  createCafes,
  getCafes,
  updateCafes,
} from "../../../redux/actions/cafes";
import { Container } from "@mui/system";

const Form = () => {
  const [currentId, setCurrentId] = useState(null);
  const [cafeData, setCafeData] = useState({
    name: "",
    description: "",
    logo: "",
    location: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  let cafes = useSelector((state) => state.cafes);

  const handleSubmit = (value) => {
    if (currentId) {
      dispatch(updateCafes(currentId, value));
    } else {
      value.id = uuidv4();
      dispatch(createCafes(value));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setCafeData({
      name: "",
      description: "",
      logo: "",
      location: "",
    });
    navigate("/");
  };

  useEffect(() => {
    if (id) {
      setCurrentId(id);
      dispatch(getCafes());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentId && cafes) {
      const data = cafes.find((c) => c._id === currentId);
      if (data) {
        setCafeData({
          _id: data._id,
          id: data.id,
          name: data.name,
          description: data.description,
          logo: data.logo,
          location: data.location,
        });
      }
    }
  }, [currentId, cafes]);

  return (
    <Container maxWidth="xl" className={s.container}>
      <Paper className={s.paper}>
        <Formik
          initialValues={cafeData}
          enableReinitialize
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(6, "Must be atleast 6 characters")
              .max(10, "Must be 10 characters or less")
              .required("Required"),
            description: Yup.string()
              .max(256, "Must be 256 characters or less")
              .required("Required")
              .required("Required"),
            location: Yup.string().required("Required"),
          })}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
            submitCount,
          }) => (
            <form
              autoComplete="off"
              noValidate
              className={s.form}
              onSubmit={handleSubmit}
            >
              <Typography variant="h6">
                {currentId ? "Editing" : "Creating"} a Cafe
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
                name="description"
                variant="outlined"
                label="Description"
                fullWidth
                value={values.description}
                onChange={handleChange}
                error={errors.description && touched.description}
                helperText={errors.description}
              />
              <TextField
                name="location"
                variant="outlined"
                label="Location"
                fullWidth
                value={values.location}
                onChange={handleChange}
                error={errors.location && touched.location}
                helperText={errors.location}
              />
              <div className={s.fileInput}>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => setFieldValue("logo", base64)}
                />
              </div>
              <Button
                className={s.submitBtn}
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                fullWidth
              >
                {currentId ? "Update" : "Add"} Cafe
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
