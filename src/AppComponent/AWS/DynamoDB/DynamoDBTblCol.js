const {
  Checkbox,
  MenuItem,
  Select,
  Switch,
  TextField,
  TableCell,
  TableRow,
  ButtonGroup,
  Button,
  Icon 
} = MaterialUI

const theme = {
  spacing: 8,
}

const DynamoDBTblCol = (props) => {
  // console.log(props)
  const handleDeleteMe = (in_table_name, in_column_name) => {
    if (confirm("Are you sure you want to delete column " + in_column_name + " from table " + in_table_name + "?"))
      props.onColDrop(in_table_name, in_column_name)
  }

  const handleSaveMe = (change, in_table_name, in_column_name, e) => {
    // console.log(change, in_table_name, in_column_name, e.target.checked)
    switch (change) {
      case "name":
        props.onColChange(change, in_table_name, in_column_name, e.target.value)
        break
      case "type":
      case "size":
        props.onColChange(change, in_table_name, in_column_name, e.target.value)
        break
      case "ispart":
      case "issort":
      case "islsi":
      case "isgsi":
        props.onColChange(change, in_table_name, in_column_name, e.target.checked)
        break
    }
  }

  return (
    <TableRow
      key={props.columnnm}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      {props.columns.map((columnHeader) => (
        columnHeader.label != "Operation" &&
        <TableCell padding="none" align={columnHeader.type == "number" ? "right" : "left"}>
          {(columnHeader.type == "text") && <TextField inputProps={{
            style: {
              padding: 5
            }
          }} component="th" scope="row" defaultValue={columnHeader.key == "name" ? props.columnnm : props.column_dtl[columnHeader.key]} onBlur={(e) => { handleSaveMe(columnHeader.key, props.tblnm, props.columnnm, e) }}>
          </TextField>
          }
          {(columnHeader.type == "number") && <TextField inputProps={{
            style: {
              padding: 5
            }
          }} component="th" scope="row" defaultValue={columnHeader.key == "name" ? props.columnnm : props.column_dtl[columnHeader.key]} onBlur={(e) => { handleSaveMe(columnHeader.key, props.tblnm, props.columnnm, e) }} type="number" minimum="1">
          </TextField>
          }
          {
            columnHeader.type == "boolean" && <Checkbox inputProps={{
              style: {
                padding: 5
              }
            }}
              checked={typeof props.column_dtl[columnHeader.key] === 'undefined' ? false : props.column_dtl[columnHeader.key]}
              onChange={(e) => { handleSaveMe(columnHeader.key, props.tblnm, props.columnnm, e) }}
            ></Checkbox>
          }
          {
            columnHeader.type == "list" && <Select sx={{ px: 5 / 8, py: 5 / 8 }} inputProps={{
              style: {
                padding: 5
              }
            }} style={{ minWidth: 120 }}
              value={props.column_dtl[columnHeader.key]} onChange={(e) => { handleSaveMe(columnHeader.key, props.tblnm, props.columnnm, e) }}
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
      <TableCell
        padding="none"
        align="left">
        <ButtonGroup>
          <Button sx={{ px: 0.5, py: 0.5 }}

            onClick={() => { handleDeleteMe(props.tblnm, props.columnnm) }} variant="contained" color="error"><Icon>delete</Icon></Button>
        </ButtonGroup>
      </TableCell>
    </TableRow >
  )
}