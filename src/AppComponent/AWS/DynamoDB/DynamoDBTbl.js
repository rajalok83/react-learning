const {
  Card,
  CardContent,
  CardHeader,
  Icon,
  ListItemButton,
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

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  return (
    props.tbls.map((tbl) => {
      return (
        < Card >
          <CardHeader style={{ backgroundColor: "fdffb6" }}
            action={
              <ListItemButton sx={{ pl: 4 }} expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more" className="sidebar-listitem" justifyContent="flex-end">
                <Icon justifyContent="flex-end" >expand_more</Icon>
              </ListItemButton>
            }
            title={tbl.name}
            subheader={getFormattedDate(typeof tbl.dt !== 'undefined' ? tbl.dt : (new Date()))}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {tbl.desc}
            </Typography>
          </CardContent>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Details:</Typography>
              <Typography paragraph>

              </Typography>
            </CardContent>
          </Collapse>
        </Card >
      )
    })
  )
}