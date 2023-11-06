const {
  Box,
  Collapse,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} = MaterialUI;
const { useState } = React;

const Sidebar = (props) => {
  const [open, setOpen] = useState(false);

  let handleItemClick = (e) => {
    props.handleRenderView(e);
    props.handleDrawerToggle();
  }

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box
      // onClick={props.handleDrawerToggle}
      sx={{ textAlign: 'center' }}
    >
      {props.headers.map((item) => (
        <Typography variant="h6"
          // sx={{ my: 2 }} 
          key={item}> {item}</Typography>
      ))}
      <Divider textAlign="left" >General</Divider>
      <List>
        {props.sidebarItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              onClick={(e) => { handleItemClick(e) }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem>
          <ListItemButton onClick={handleClick}>
            <ListItemText primary="AWS" />
            {open ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
          </ListItemButton>
        </ListItem>
      </List>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={(e) => { handleItemClick(e) }}>
            <ListItemIcon>
              <Icon>star</Icon>
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>
        </List>
      </Collapse>
    </Box>
  )
} 