import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useLocation } from "react-router-dom";

import Table from "../../components/Table/Table";
import s from "./styles.module.css";
import { Grid, TextField } from "@mui/material";
import { deleteEmployee, getEmployees, getEmployeesByCafe } from "../../redux/actions/employees";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Employee = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const searchQuery = query.get("cafe");

  const [rowsData, setRowsData] = useState([]);
  const employees = useSelector((state) => state.employees);

  const deleteRow = (id) => {
    let isExecuted = window.confirm("Are you sure to execute this deletion?");
    if (isExecuted) {
      dispatch(deleteEmployee(id));
    }
  }

  const ButtonRender = (params) => {
    return (
      <div className={s.btnGroup}>
        <Link to={`/edit-employee/${ params.data._id }`} className={s.link}>
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
          onClick={() => deleteRow(params.data._id)}
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

  const [search, setSearch] = useState("");

  const handleKeyPress = () => {
    if (search === '') {
      dispatch(getEmployees());
      navigate("/employee");
    }
  };

  const searchEmployee = () => {
    if (search.trim()) {
      dispatch(getEmployeesByCafe({ search }));
      navigate(`/employee?cafe=${ search }`);
    } else {
      dispatch(getEmployees());
      navigate("/employee");
    }
  };


  useEffect(() => {
    if (searchQuery) {
      dispatch(getEmployeesByCafe({ search: searchQuery }));
    } else {
      dispatch(getEmployees());
    }
  }, [dispatch, searchQuery]);

  useEffect(() => {
    let tableData = [];
    employees
      ?.sort((a, b) => b.days - a.days)
      .map((d) =>
        tableData.push({
          _id: d._id,
          id: d.id,
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
        <div className={s.searchGrp}>
          <TextField
            name="search"
            variant="outlined"
            label="Cafe Search"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={handleKeyPress}
          />
          <Button
            variant="contained"
            size="medium"
            onClick={() => searchEmployee()}
          >
            Search
          </Button>
        </div>
        <Link to="/add-employee" className={s.link}>
          <Button variant="contained">Add new employee</Button>
        </Link>
      </div>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Table rows={rowsData} column={columnDefs} />
        </Grid>
      </Grid>
    </div>
  )
}

export default Employee