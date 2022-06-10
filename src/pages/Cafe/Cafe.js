import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import Table from "../../components/Table/Table";
import s from "./styles.module.css";
import { deleteCafes, getCafes, getCafesBySearch } from "./../../actions/cafes";
import { Grid, TextField } from "@mui/material";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Cafe = () => {
  const [currentId, setCurrentId] = useState(null);
  const cafes = useSelector((state) => state.cafes);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const searchQuery = query.get("searchQuery");

  const ButtonRender = (params) => {
    return (
      <div className={s.btnGroup}>
        <Link to={`/edit-cafe/${ params.data.id }`}>
          <Button size="small" variant="contained">
            Edit
          </Button>
        </Link>
        <Button
          size="small"
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => dispatch(deleteCafes(params.data.id))}
        >
          Delete
        </Button>
      </div>
    );
  };

  const ImageRender = params => {
    return (
      <div>
        <img src={params.data.logo} alt="logo" width={70} height={70}/>
      </div>
    )
  }

  const [rowsData, setRowsData] = useState([]);
  const [columnDefs] = useState([
    { field: "id" },
    { field: "logo", cellRenderer: ImageRender, width: "100px", autoHeight: true },
    { field: "name" },
    { field: "description" },
    { field: "employees" },
    { field: "location" },
    { field: "", cellRenderer: ButtonRender, width: "240px" },
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
    dispatch(getCafes());
  }, [currentId, dispatch]);

  useEffect(() => {
    let tableData = [];
    cafes.map((d) =>
      tableData.push({
        id: d._id,
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
        {/* <Grid item xs={3}>
          <Form
            currentId={currentId}
            setCurrentId={setCurrentId}
            data={currentId ? cafes.find((c) => c._id === currentId) : null}
          />
        </Grid> */}
      </Grid>
    </div>
  );
};

export default Cafe;
