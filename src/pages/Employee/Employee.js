import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

import Table from "../../components/Table/Table";
import s from "./styles.module.css";
import { Grid } from "@mui/material";
import { deleteEmployee, getEmployees } from "../../actions/employees";
import { getCafes } from './../../actions/cafes';


const Employee = (props) => {
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState(null);
  const [rowsData, setRowsData] = useState([]);
  const [employees, cafes] = useSelector((state) => [state.employees, state.cafes]);

  const ButtonRender = (params) => {
    return (
      <div className={s.btnGroup}>
        <Link to={`/edit-employee/${params.data.id}`}>
          <Button
            size="small"
            variant="contained"
          >
            Edit
          </Button>
        </Link>
        <Button
          size="small"
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => dispatch(deleteEmployee(params.data.id))}
        >
          Delete
        </Button>
      </div>
    );
  };

  const [columnDefs] = useState([
    { field: "id" },
    { field: "name" },
    { field: "email" },
    { field: "phone" },
    { field: "gender" },
    { field: "days" },
    { field: "cafe" },
    { field: "", cellRenderer: ButtonRender, width: "300px" },
  ]);

  useEffect(() => {
    dispatch(getEmployees());
  }, [currentId, dispatch]);

  useEffect(() => {
    let tableData = [];
    employees.map((d) =>
      tableData.push({
        id: d._id,
        name: d.name,
        email: d.email,
        phone: d.phone,
        gender: d.gender,
        days: d.days + ' days',
        cafe: d.cafe
      })
    );
    
    setRowsData(tableData);
  }, [employees]);
  
  return (
    <div className={s.container}>
       <div className={s.btnContainer}>
        <Link to="/add-employee" className={s.link}>
          <Button variant="contained">Add new employee</Button>
        </Link>
      </div> 

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Table rows={rowsData} column={columnDefs} />
        </Grid>
        {/* <Grid item xs={3}>
          <Form
            currentId={currentId}
            setCurrentId={setCurrentId}
            data={currentId ? employees.find((c) => c._id === currentId) : null}
          />
        </Grid> */}
      </Grid>
    </div>
  )
}

export default Employee