import React from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import s from "./styles.module.css";

const Table = ({ rows, column }) => {

  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
  };

  const gridOptions = {
    alignedGrids: [],
    defaultColDef: {
      editable: false,
      sortable: false,
      resizable: false,
      filter: false,
      flex: 1,
      minWidth: 190,
      headerHeight: 150,
    },
  };

  return (
    <div className={`ag-theme-alpine
    ${s.table}`}>
      <AgGridReact
        onGridReady={onGridReady}
        gridOptions={gridOptions}
        rowData={rows}
        columnDefs={column}
      ></AgGridReact>
    </div>
  );
};

export default Table;
