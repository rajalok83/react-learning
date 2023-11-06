const {
    colors,
    CssBaseline,
    ThemeProvider,
    Typography,
    Container,
    createTheme,
    Box,
    Drawer,
    AppBar,
    Toolbar,
    IconButton,
    Icon
} = MaterialUI;

const drawerWidth = 240;
// const navItems = ['Home'
//     // , 'About', 'Contact'
// ];

const Dashboard = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
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
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', sm: 'block' }
                        }}
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
    );
}