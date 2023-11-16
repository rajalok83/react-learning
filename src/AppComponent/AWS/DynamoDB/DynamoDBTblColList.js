const {
  ButtonGroup,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} = MaterialUI;


const { useState } = React;

const columnsHeader = [{ "label": "Name", "type": "text", "key": "name" },
{ "label": "Datatype", "type": "list", "key": "type", "options": ["Number", "Boolean", "Text"] },
{ "label": "Size(Bytes)", "type": "number", "key": "size" },
{ "label": "Partition Key", "type": "boolean", "key": "ispart" },
{ "label": "Sort Key", "type": "boolean", "key": "issort" },
{ "label": "LSI", "type": "boolean", "key": "islsi" },
{ "label": "GSI", "type": "boolean", "key": "isgsi" },
{ "label": "Operation" }
]

const DynamoDBTblColList = (props) => {
  const [newCol, isNewCol] = useState(props.newColumn)
  console.log(props)
  console.log(props.columns)
  console.log(props.columns.length)
  return (
    ((props.columns != undefined &&
      props.columns.length >= 0)) &&
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow style={{ backgroundColor: "caffd0" }}>
            {
              columnsHeader.map((columnHeader) => {
                return (
                  <TableCell><Typography align={columnHeader["type"] == "text" || columnHeader["type"] == "list" || columnHeader["type"] == "boolean" || typeof columnHeader["type"] == "undefined" ? "left" : "right"} variant="h5">{columnHeader.label}</Typography></TableCell>
                )
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {props.columns.map((column) => (
            <DynamoDBTblCol column={column} columns={columnsHeader}></DynamoDBTblCol>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}