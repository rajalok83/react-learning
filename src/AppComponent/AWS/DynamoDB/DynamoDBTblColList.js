const {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} = MaterialUI
const { useState } = React

const DynamoDBTblColList = (props) => {
  return (
    ((props.columns != undefined &&
      Object.keys(props.columns).length >= 0)) &&
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow style={{ backgroundColor: "caffd0" }}>
            {
              props.columnsHeader.map((columnHeader) => {
                return (
                  <TableCell><Typography align={columnHeader["type"] == "text" || columnHeader["type"] == "list" || columnHeader["type"] == "boolean" || typeof columnHeader["type"] == "undefined" ? "left" : "right"} variant="h5">{columnHeader.label}</Typography></TableCell>
                )
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(props.columns).map((column) => (
            <DynamoDBTblCol columnnm={column} tblnm={props.tblnm} column_dtl={props.columns[column]} columns={props.columnsHeader} onColDrop={props.onColDrop}></DynamoDBTblCol>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}