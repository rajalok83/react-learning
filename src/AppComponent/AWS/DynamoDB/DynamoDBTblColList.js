const {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip 
} = MaterialUI
const {
  useState 
} = React

const DynamoDBTblColList = (props) => {
  // const [columns, setColumns] = useState({ ...props.columns })

  return (
    ((props.columns != undefined &&
      Object.keys(props.columns).length >= 0)) &&
    <TableContainer key={props.tblnm} component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow style={{ backgroundColor: "caffd0" }}>
            {
              props.columnsHeader.map((columnHeader) => {
                return (
                  <TableCell>
                    <Typography align={columnHeader["type"] == "text" || columnHeader["type"] == "list" || columnHeader["type"] == "boolean" || typeof columnHeader["type"] == "undefined" ? "left" : "right"} variant="h5">{columnHeader.label}
                      {columnHeader["tooltip"] && <Tooltip sx={{ px: 0, pt: 0 }} title={<Box>
                        <Typography variant="h6">{columnHeader["tooltip"]["header"]}</Typography>{columnHeader["tooltip"]["desc"]}</Box>} placement="top">
                        <Button><Icon>help</Icon></Button>
                      </Tooltip>
                      }
                    </Typography>
                  </TableCell>
                )
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(props.columns).map((column) => (
            <DynamoDBTblCol key={column} columnnm={column} tblnm={props.tblnm} column_dtl={props.columns[column]} columns={props.columnsHeader} onColDrop={props.onColDrop} onColChange={props.onColChange}></DynamoDBTblCol>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  )
}