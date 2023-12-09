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
const {
  useState
} = React

const DynamoDBTbl = (props) => {
  const [expandedTbl, setExpandedTbl] = useState(false)
  const [expandedCol, setExpandedCol] = useState(true)
  const [columns, setColumns] = useState(props.tbl_dtl["columns"])
  console.log(props.tbl_dtl)

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

  const handleExpandTbl = () => {
    setExpandedTbl(!expandedTbl)
  }

  const handleExpandCol = () => {
    setExpandedCol(!expandedCol)
  }

  return (
    < Card >
      <CardHeader style={{ backgroundColor: "fdffb6" }}
        action={
          <ListItem justifyContent="flex-end">
            <Button variant="contained"
              onClick={() => handleDropTable(props.tblnm)}
              aria-label="drop table"
              color="error"
            ><Icon>delete_forever</Icon></Button>
            <ListItemButton sx={{}} expand={expandedTbl}
              onClick={handleExpandTbl}
              aria-expanded={expandedTbl}
              aria-label="show more" className="sidebar-listitem">
              <Icon justifyContent="flex-end" >expand_more</Icon>
            </ListItemButton>
          </ListItem>
          // <ButtonGroup variant="contained" aria-label="outlined primary button group" >
          //   <div>
          //     <Button variant="contained"
          //       onClick={handleAddColumn}
          //       aria-label="add column"
          //     >Add Column</Button>
          //     <Button variant="contained" expand={expandedTbl}
          //       onClick={handleExpandTbl}
          //       aria-expanded={expandedTbl}
          //       aria-label="show more" className="sidebar-listitem" justifyContent="flex-end"><Icon justifyContent="flex-end" >expand_more</Icon></Button>
          //   </div>
          // </ButtonGroup>
        }
        title={props.tblnm}
        subheader={getFormattedDate(typeof props.tbl_dtl["dt"] !== 'undefined' ? (new Date(props.tbl_dtl["dt"])) : (new Date()))}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.tbl_dtl["desc"]}
        </Typography>
      </CardContent>
      <Collapse in={expandedTbl} timeout="auto" unmountOnExit>
        <CardContent>
          <Table justifyContent="flex-end">
            <TableCell>
              <Typography variant="h6">Columns:</Typography>
            </TableCell>
            <TableCell>
              <ListItem justifyContent="flex-end">
                <ListItem></ListItem>
                <ListItemButton sx={{
                  display: 'flex',
                  flexDirection: 'row-reverse'
                }} expand={expandedCol} justifyContent="flex-end"
                  onClick={handleExpandCol}
                  aria-expanded={expandedCol}
                  aria-label="show more" className="sidebar-listitem">
                  <Icon justifyContent="flex-end" >expand_more</Icon>
                </ListItemButton>
              </ListItem>
            </TableCell>

          </Table>
          <Divider variant="h4"></Divider>
          <Typography paragraph></Typography>
          <Collapse in={expandedCol} timeout="auto" unmountOnExit>
            <Typography paragraph justifyContent="center">
              <DynamoDBTblColList columnsHeader={props.columnsHeader} columns={columns} tblnm={props.tblnm} onColDrop={props.onColDrop} onColChange={props.onColChange}></DynamoDBTblColList>
              <Button variant="contained"
                onClick={handleAddColumn}
                aria-label="add column"
                justifyContent="center"
              >Add Column</Button>
            </Typography>
          </Collapse>
          <Typography variant="h6">Details:</Typography>
          <Typography paragraph>
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow style={{ backgroundColor: "caffd0" }}>
                  <TableCell>
                    <Typography variant="h5">{props.tblnm}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">BySize=></Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">RCU</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6"></Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">RCU Batch</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6"></Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">WCU</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6"></Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">WCU Batch</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6"></Typography>
                  </TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: "caffd0" }}>
                  <TableCell>
                    {/* <Typography variant="h6">{props.tblnm}</Typography> */}
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{props.tblnm}</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </CardContent>
      </Collapse>
    </Card >
  )
}