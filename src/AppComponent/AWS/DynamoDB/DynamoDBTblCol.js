const { MenuItem, Select, Switch, TextField, TableCell, TableRow, ButtonGroup, Button, Icon } = MaterialUI;
// console.log(props)
const DynamoDBTblCol = (props) => {
  console.log(props)
  return (
    <TableRow
      key={props.column.name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      {columnsHeader.map((columnHeader) => (
        columnHeader.label != "Operation" &&
        <TableCell align={columnHeader.type == "number" ? "right" : "left"}>
          {(columnHeader.type == "text" || columnHeader.type == "number") && <TextField component="th" scope="row" defaultValue={props.column[columnHeader.key]}>
          </TextField>
          }
          {
            columnHeader.type == "boolean" && <Switch checked={props.column[columnHeader.key]} />
          }
          {
            columnHeader.type == "list" && <Select style={{ minWidth: 120 }}
              value={props.column[columnHeader.key]}
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
          <Button><Icon>delete</Icon></Button>
        </ButtonGroup>
      </TableCell>

    </TableRow>
  )
}