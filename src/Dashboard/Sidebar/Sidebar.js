const {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
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

      {props.sidebarItems.map((item) => (
        (item["type"] == "i" ?
          <ListItemButton sx={{ pl: 4 }} onClick={(e) => { handleItemClick(item.component) }}>
            <ListItemIcon>
              <Icon>star</Icon>
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton> :
          <div>
            <Divider textAlign="left" >{item.label}</Divider>
            <GroupNav label={item.menulabel} items={item.items} handleItemClick={handleItemClick}></GroupNav>
          </div>
        )
      ))}
    </Box>
  )
} 