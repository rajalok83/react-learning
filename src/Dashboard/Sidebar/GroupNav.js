const {
  Box,
  Collapse,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} = MaterialUI;
const GroupNav = (props) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <List className="sidebar-listitem">
        <ListItem className="sidebar-listitem">
          <ListItemButton className="sidebar-listitem" >
            <ListItemText className="sidebar-listitem" primary={props.label} />
            {open ? <Icon onClick={handleClick} >expand_less</Icon> : <Icon onClick={handleClick}>expand_more</Icon>}
          </ListItemButton>
        </ListItem>
      </List>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List className="sidebar-listitem" component="div" disablePadding>
          {props.items.map((item) => (
            (item["type"] == "i" ?
              <ListItemButton sx={{ pl: 4 }} className="sidebar-listitem" onClick={(e) => { props.handleItemClick(item.component) }}>
                {/* <ListItemIcon>
                  <Icon>star</Icon>
                </ListItemIcon> */}
                <ListItemText className="sidebar-listitem" primary={item.label} />
              </ListItemButton> : <div>
                {/* <Divider textAlign="left" >{item.label}</Divider> */}
                <GroupNav label={item.menulabel} items={item.items} handleItemClick={props.handleItemClick}></GroupNav>
              </div>
            )
          ))}
        </List>
      </Collapse>
    </Box>
  )
}