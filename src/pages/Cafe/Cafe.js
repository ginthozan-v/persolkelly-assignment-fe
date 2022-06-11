import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, TextField } from "@mui/material";

import Table from "../../components/Table/Table";
import s from "./styles.module.css";
import { deleteCafes, getCafes, getCafesBySearch } from "./../../redux/actions/cafes";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Cafe = () => {
  const cafes = useSelector((state) => state.cafes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const searchQuery = query.get("location");

  const deleteRow = (id) => {
    let isExecuted = window.confirm("Are you sure to execute this deletion?");
    if (isExecuted) {
      dispatch(deleteCafes(id));
    }
  }

  const ButtonRender = (params) => {
    return (
      <div className={s.btnGroup}>
        <Link to={`/edit-cafe/${ params.data._id }`} className={s.link}>
          <Button size="small" variant="contained">
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

  const ImageRender = params => {
    return (
        <img src={params.data.logo} alt="logo" width={70} height={70} style={{margin: '5px 0'}} />
    )
  }

  const LinkRender = params => {
    return (
      <Link to={`/employee?cafe=${ params.data.name }`}>
        {params.data.employees} Employees
      </Link>
    )
  }

  const [rowsData, setRowsData] = useState([]);
  const [columnDefs] = useState([
    { field: "logo", cellRenderer: ImageRender, autoHeight: true },
    { field: "name" },
    { field: "description" },
    { field: "employees", cellRenderer: LinkRender },
    { field: "location" },
    { field: "", cellRenderer: ButtonRender },
  ]);

  const [search, setSearch] = useState("");

  const handleKeyPress = () => {
    if (search === '') {
      dispatch(getCafes());
      navigate("/");
    }
  };

  const searchCafe = () => {
    if (search.trim()) {
      dispatch(getCafesBySearch({ search }));
      navigate(`/cafe?location=${ search }`);
    } else {
      dispatch(getCafes());
      navigate("/");
    }
  };

  useEffect(() => {
    if (searchQuery) {
      dispatch(getCafesBySearch({ search: searchQuery }));
    } else {
      dispatch(getCafes());
    }
  }, [dispatch, searchQuery]);

  useEffect(() => {
    let tableData = [];
    cafes.map((d) =>
      tableData.push({
        _id: d._id,
        id: d.id,
        logo: d.logo,
        name: d.name,
        description: d.description,
        employees: d.employees?.length,
        location: d.location,
      })
    );
    setRowsData(tableData.sort((a, b) => b.employees - a.employees));
  }, [cafes]);

  return (
    <div className={s.container}>
      <div className={s.btnContainer}>
        <div className={s.searchGrp}>
          <TextField
            name="search"
            variant="outlined"
            label="Location Search"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={handleKeyPress}
          />
          <Button
            variant="contained"
            size="medium"
            onClick={() => searchCafe()}
          >
            Search
          </Button>
        </div>
        <Link to="/add-cafe" className={s.link}>
          <Button variant="contained">Add new cafe</Button>
        </Link>
      </div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Table rows={rowsData} column={columnDefs} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Cafe;
