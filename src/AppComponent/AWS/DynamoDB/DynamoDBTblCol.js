const { MenuItem, 
  Select, 
  Switch, 
  TextField, 
  TableCell, 
  TableRow, 
  ButtonGroup, 
  Button, 
  Icon } = MaterialUI

const DynamoDBTblCol = (props) => {

  const handleDeleteMe = (in_table_name, in_column_name) => {
    if (confirm("Are you sure you want to delete column " + in_column_name + " from table " + in_table_name + "?"))
      props.onColDrop(in_table_name, in_column_name)
  }

  return (
    <TableRow
      key={props.columnnm}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      {columnsHeader.map((columnHeader) => (
        columnHeader.label != "Operation" &&
        <TableCell align={columnHeader.type == "number" ? "right" : "left"}>
          {(columnHeader.type == "text" || columnHeader.type == "number") && <TextField component="th" scope="row" defaultValue={columnHeader.key == "name" ? props.columnnm : props.column_dtl[columnHeader.key]}>
          </TextField>
          }
          {
            columnHeader.type == "boolean" && <Switch checked={props.column_dtl[columnHeader.key]} />
          }
          {
            columnHeader.type == "list" && <Select style={{ minWidth: 120 }}
              value={props.column_dtl[columnHeader.key]}
            >
              {columnHeader.options.map((option) => (<MenuItem value={option}>{option}</MenuItem>))}

            </Select>
          }
        </TableCell>
      ))}
      {/*               
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
      <TableCell align="left">
        <ButtonGroup>
          <Button onClick={() => { handleDeleteMe(props.tblnm, props.columnnm) }} variant="contained" color="error"><Icon>delete</Icon></Button>
          <Button onClick={() => { }} variant="contained" color="error"><Icon>lock_open</Icon></Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  )
}