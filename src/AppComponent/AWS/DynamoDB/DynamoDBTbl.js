const {
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Icon,
  Typography
} = MaterialUI
const { useState } = React

const DynamoDBTbl = (props) => {
  const [expanded, setExpanded] = useState(false)
  const [columns, setColumns] = useState(props.tbl_dtl["columns"])

  function getFormattedDate(today) {
    let month = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December')
    // var day  = week[today.getDay()]
    var dd = today.getDate()
    var mmmm = month[today.getMonth()] //January is 0!
    var yyyy = today.getFullYear()
    var hour = today.getHours()
    var minu = today.getMinutes()
    if (dd < 10) { dd = '0' + dd }
    // if(mm<10)  { mm='0'+mm } 
    if (hour < 10) { hour = '0' + hour }
    if (minu < 10) { minu = '0' + minu }
    return mmmm + ' ' + dd + ', ' + yyyy + ' ' + hour + ':' + minu
  }

  const handleDropTable = (in_table_name) => {
    if (confirm("Are you sure you want to drop table " + in_table_name + "?"))
      props.onTblDrop(in_table_name)
  }

  const handleAddColumn = () => {
    props.onColAdd(props.tblnm)
  }

  const handleExpand = () => {
    setExpanded(!expanded)
  }

  return (
    < Card >
      <CardHeader style={{ backgroundColor: "fdffb6" }}
        action={
          <ListItem>
            <Button variant="contained"
              onClick={() => handleDropTable(props.tblnm)}
              aria-label="drop table"
              color="error"
            ><Icon>delete_forever</Icon>Drop Table</Button>
            <ListItemButton sx={{ pl: 4 }} expand={expanded}
              onClick={handleExpand}
              aria-expanded={expanded}
              aria-label="show more" className="sidebar-listitem" justifyContent="flex-end">
              <Icon justifyContent="flex-end" >expand_more</Icon>
            </ListItemButton>
          </ListItem>
          // <ButtonGroup variant="contained" aria-label="outlined primary button group" >
          //   <div>
          //     <Button variant="contained"
          //       onClick={handleAddColumn}
          //       aria-label="add column"
          //     >Add Column</Button>
          //     <Button variant="contained" expand={expanded}
          //       onClick={handleExpand}
          //       aria-expanded={expanded}
          //       aria-label="show more" className="sidebar-listitem" justifyContent="flex-end"><Icon justifyContent="flex-end" >expand_more</Icon></Button>
          //   </div>
          // </ButtonGroup>
        }
        title={props.tblnm}
        subheader={getFormattedDate(typeof props.tbl_dtl["dt"] !== 'undefined' ? props.tbl_dtl["dt"] : (new Date()))}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.tbl_dtl["desc"]}
        </Typography>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6">Columns:</Typography>
          <Divider variant="h4"></Divider>
          <Typography paragraph></Typography>
          <Typography paragraph justifyContent="center">
            <DynamoDBTblColList columnsHeader={props.columnsHeader} columns={columns} tblnm={props.tblnm} onColDrop={props.onColDrop}></DynamoDBTblColList>
            <Button variant="contained"
              onClick={handleAddColumn}
              aria-label="add column"
              justifyContent="center"
            >Add Column</Button>
          </Typography>
          <Typography variant="h6">Details:</Typography>
          <Typography paragraph>
          </Typography>
        </CardContent>
      </Collapse>
    </Card >
  )
}