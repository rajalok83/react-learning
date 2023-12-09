const {
  AppBar,
  Box,
  colors,
  Container,
  createTheme,
  CssBaseline,
  Drawer,
  IconButton,
  Icon,
  ThemeProvider,
  Typography,
  Toolbar
} = MaterialUI
const { 
  useState 
} = React

const drawerWidth = 300
// const navItems = ['Home'
//     // , 'About', 'Contact'
// ]

const Dashboard = (props) => {
  const { window } = props
  const [mobileOpen, setMobileOpen] = useState(false)
  const container = window !== undefined ? () => window().document.body : undefined

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              // display: { sm: 'none' }
            }}
          >
            <Icon>menu</Icon>
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            TCO
          </Typography>
          <HeaderAvatar initials="AR"></HeaderAvatar>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            // display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Sidebar handleRenderView={props.handleRenderView} handleDrawerToggle={handleDrawerToggle} headers={props.headers} sidebarItems={props.sidebarItems} ></Sidebar>
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Typography></Typography>
      </Box>
    </Box>
  )
}