import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TableSortLabel,
} from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid-pro";
import * as React from "react";
import { useState } from "react";

export default function SubHdrTable(props) {
  //   console.log(props);
  let columns = !Object.keys(props.data).includes("COLHDR")
    ? []
    : props.data.COLHDR.map((column) => {
        return {
          field: column,
          headerClassName: "super-app-theme--header",
        };
      });
  let rows = !Object.keys(props.data).includes("ROWS")
    ? []
    : props.data.ROWS.map((row, idx) => {
        return props.data.COLHDR.reduce((acc, key, index) => {
          acc["id"] = idx;
          acc[key] = row[index];
          return acc;
        }, {});
      });
  //   let rows = { rows_data };
  //   console.log(rows);
  const [tableKey, setTableKey] = useState(0);
  const [filters, setFilters] = useState({});
  const [filteredRows, setFilteredRows] = useState(props.data.ROWS || []);
  const [sortConfig, setSortConfig] = useState({
    column: null,
    direction: "asc",
  });

  const handleFilterChange = (column, value) => {
    const updatedFilters = {
      ...filters,
      [column]: value,
    };
    setFilters(updatedFilters);

    // Filter rows based on the updated filters
    const newFilteredRows = props.data.ROWS.filter((row) =>
      props.data.COLHDR.every((col, index) =>
        updatedFilters[col]
          ? row[index]
              .toString()
              .toLowerCase()
              .includes(updatedFilters[col].toLowerCase())
          : true
      )
    );
    setFilteredRows(newFilteredRows);
  };

  const handleSort = (column) => {
    console.log("handleSort", column);
    const isAsc =
      sortConfig.column === column && sortConfig.direction === "asc";
    const direction = isAsc ? "desc" : "asc";

    const sortedRows = [...filteredRows].sort((a, b) => {
      const colIndex = props.data.COLHDR.indexOf(column);
      if (a[colIndex] < b[colIndex]) return direction === "asc" ? -1 : 1;
      if (a[colIndex] > b[colIndex]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    console.log(sortedRows);
    setSortConfig({ column, direction });
    setFilteredRows(sortedRows);
  };

  const exportToCSV = () => {
    const headers = props.data.COLHDR.join(","); // Convert column headers to CSV format
    const rows = filteredRows
      .map((row) => row.join(",")) // Convert each row to CSV format
      .join("\n");
    const csvContent = `${headers}\n${rows}`; // Combine headers and rows

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "table_data.csv"); // Set the file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  React.useEffect(() => {
    setTableKey(tableKey + 1);
  }, [filteredRows]);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table size="small" border={1}>
        <TableHead>
          <TableRow>
            {Object.keys(props.data).includes("COLHDR") &&
              props.data.COLHDR.map(
                (col, index) =>
                  Object.keys(props.data).includes("ROWS") && (
                    <TableCell
                      key={col}
                      sx={{
                        position:
                          index === props.data.COLHDR.length - 1
                            ? "relative"
                            : "static", // Make the last column relative,
                        p: 0,
                        m: 0,
                      }}
                    >
                      <TableSortLabel
                        active={sortConfig.column === col}
                        direction={
                          sortConfig.column === col
                            ? sortConfig.direction
                            : "asc"
                        }
                        onClick={() => handleSort(col)}
                      >
                        {col}
                      </TableSortLabel>
                      {index == props.data.COLHDR.length - 1 && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={exportToCSV}
                          sx={{
                            position: "absolute",
                            // top: 0,
                            bottom: 0,
                            right: 0,
                            p: 0,
                            m: 0,
                          }}
                        >
                          Download
                        </Button>
                      )}
                    </TableCell>
                  )
              )}
          </TableRow>
          <TableRow sx={{ p: 0, m: 0 }}>
            {Object.keys(props.data).includes("COLHDR") &&
              Object.keys(props.data).includes("ROWS") &&
              props.data.COLHDR.map((col) => (
                <TableCell key={col} sx={{ p: 0, m: 0 }}>
                  <TextField
                    size="small"
                    sx={{
                      width: "100%",
                      m: 0,
                      p: 0,
                      "& .MuiInputBase-root": {
                        margin: 0, // Remove margin inside the input
                        padding: 0, // Remove padding inside the input
                      },
                    }}
                    variant="outlined"
                    placeholder={`Filter ${col}`}
                    onChange={(e) => handleFilterChange(col, e.target.value)}

                    //   style={{ marginTop: 8 }}
                  />
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody key={tableKey}>
          {Object.keys(props.data).includes("ROWS") &&
            props.data.ROWS.length > 0 &&
            filteredRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell sx={{ p: 0, m: 1 }} key={cellIndex}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {!Object.keys(props.data).includes("ROWS") && (
            <TableRow key={0}>
              <TableCell
                key={0}
                align="center"
                sx={{ backgroundColor: "#f76260" }}
              >
                No Data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
  //   return (
  //     <Box
  //       sx={{
  //         width: "100%",
  //         // p: "0px",
  //         "& .super-app-theme--header": {
  //           backgroundColor: "rgba(255, 7, 0, 0.55)",
  //         },
  //       }}
  //     >
  //       <DataGrid
  //         // sx={{ p: "0px" }}
  //         rowHeight={30}
  //         columnHeaderHeight={30}
  //         columns={columns}
  //         rows={rows}
  //         sx={rows.length === 0 ? { backgroundColor: "red"} : {}}
  //         slots={
  //           columns.length === 0
  //             ? {
  //                 footer: () => null,
  //               }
  //             : { toolbar: GridToolbar, footer: () => null }
  //         }
  //       />
  //     </Box>
  //   );
}
