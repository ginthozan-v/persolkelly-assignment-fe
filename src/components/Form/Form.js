import React, { useState, useEffect } from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";

import s from "./styles.module.css";
// import { updateCafes, createCafes } from "../../actions/cafes";

const Form = ({ currentId, setCurrentId, data }) => {
  const [cafeData, setCafeData] = useState({
    name: "",
    description: "",
    logo: "",
    location: "",
  });

  const dispatch = useDispatch();

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
    setCurrentId(null);
    setCafeData({
      name: "",
      description: "",
      logo: "",
      location: "",
    })
  };

  useEffect(() => {
    if (data) {
      setCafeData({
        name: data.name,
        description: data.description,
        logo: data.logo,
        location: data.location,
      })
    }
  }, [data])

  return (
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
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => clear()}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
