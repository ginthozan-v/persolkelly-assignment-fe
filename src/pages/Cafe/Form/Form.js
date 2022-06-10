import React, { useState, useEffect } from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

import s from "./styles.module.css";
import { createCafes, updateCafes } from "../../../actions/cafes";
import { Container } from '@mui/system';

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cafeData.name !== '') {
      if (currentId) {
        dispatch(updateCafes(currentId, cafeData));
      } else {
        dispatch(createCafes(cafeData));
      }
    }

    clear();
  };

  const clear = () => {
    setCurrentId(null)
    setCafeData({
      name: "",
      description: "",
      logo: "",
      location: "",
    })
    navigate('/');
  };

  useEffect(() => {
    const data = cafes.find((c) => c._id === id);
    if (data) {
      setCafeData({
        name: data.name,
        description: data.description,
        logo: data.logo,
        location: data.location,
      })
    }
  }, [currentId, cafes])

  useEffect(() => {
    setCurrentId(id);
  }, [id])

  return (
    <Container maxWidth="xl">
      <Paper className={s.paper}>
        <form
          autoComplete="off"
          noValidate
          className={s.form}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Cafe</Typography>
          <TextField
            name="name"
            variant="outlined"
            label="Name"
            fullWidth
            value={cafeData.name}
            onChange={(e) => setCafeData({ ...cafeData, name: e.target.value })}
          />
          <TextField
            name="description"
            variant="outlined"
            label="Description"
            fullWidth
            value={cafeData.description}
            onChange={(e) =>
              setCafeData({ ...cafeData, description: e.target.value })
            }
          />
          <TextField
            name="location"
            variant="outlined"
            label="Location"
            fullWidth
            value={cafeData.location}
            onChange={(e) =>
              setCafeData({ ...cafeData, location: e.target.value })
            }
          />
          <div className={s.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => setCafeData({ ...cafeData, logo: base64 })}
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
      </Paper>
    </Container>
  );
};

export default Form;
