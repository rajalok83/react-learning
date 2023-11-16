const {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Icon,
  Typography
} = MaterialUI;
const { useState } = React;
const DynamoDBTbl = (props) => {
  // const [expanded, setExpanded] = React.useState(false);
  const [expanded, setExpanded] = useState(false)


  function getFormattedDate(today) {
    // var week = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')
    let month = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December')
    // var day  = week[today.getDay()];
    var dd = today.getDate();
    var mmmm = month[today.getMonth()]; //January is 0!
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var minu = today.getMinutes();

    if (dd < 10) { dd = '0' + dd }
    // if(mm<10)  { mm='0'+mm } 
    if (hour < 10) { hour = '0' + hour }
    if (minu < 10) { minu = '0' + minu }

    return mmmm + ' ' + dd + ', ' + yyyy + ' ' + hour + ':' + minu;
  }

  const handleAddColumn = () => {
    console.log(props)
    console.log("Column Add clicked");
    let add = true;
    props.tbl.columns.forEach(element => {
      console.log(element.name)
      if (typeof element.name == "undefined")
        add = false;
    });
    if (add)
      props.tbl.columns = [...props.tbl.columns, {}]
  }

  const handleExpand = () => {
    setExpanded(!expanded)
  }
  console.log(props)
  return (
    < Card >
      <CardHeader style={{ backgroundColor: "fdffb6" }}
        action={
          <ListItemButton sx={{ pl: 4 }} expand={expanded}
            onClick={handleExpand}
            aria-expanded={expanded}
            aria-label="show more" className="sidebar-listitem" justifyContent="flex-end">
            <Icon justifyContent="flex-end" >expand_more</Icon>
          </ListItemButton>
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
        title={props.tbl.name}
        subheader={getFormattedDate(typeof props.tbl.dt !== 'undefined' ? props.tbl.dt : (new Date()))}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.tbl.desc}
        </Typography>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Columns:</Typography>
          <Divider variant="h4"></Divider>
          <Typography paragraph></Typography>
          <Typography paragraph justifyContent="center">
            <DynamoDBTblColList columns={props.tbl.columns}></DynamoDBTblColList>
            <Button variant="contained"
              onClick={handleAddColumn}
              aria-label="add column"
              justifyContent="center"
            >Add Column</Button>
          </Typography>
          <Typography paragraph>Details:</Typography>
          <Typography paragraph>

          </Typography>
        </CardContent>
      </Collapse>
    </Card >
  )
}