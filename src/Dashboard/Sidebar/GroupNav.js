const {
  Box,
  Collapse,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} = MaterialUI
const {
  useState
} = React

const GroupNav = (props) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <Box>
      <List className="sidebar-listitem">
        <ListItem className="sidebar-listitem" onClick={handleClick}>
          <ListItemButton className="sidebar-listitem" >
            <ListItemText className="sidebar-listitem" primary={props.label} />
            {open ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
          </ListItemButton>
        </ListItem>
      </List>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List className="sidebar-listitem" component="div" disablePadding>
          {props.items.map((item) => (
            (item["type"] == "i" ?
              <ListItemButton sx={{ pl: 4 }} className="sidebar-listitem" onClick={(e) => { props.handleItemClick(item.component) }}>
                <ListItemText className="sidebar-listitem" primary={item.label} />
              </ListItemButton> : <GroupNav label={item.menulabel} items={item.items} handleItemClick={props.handleItemClick}></GroupNav>
            )
          ))}
        </List>
      </Collapse>
    </Box>
  )
}