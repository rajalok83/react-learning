const {
    Avatar,
    Menu,
    MenuItem
} = MaterialUI;

const HeaderAvatar = (props) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (elem) => {
        setAnchorEl(null);
    };
    return (
        <div>
            <Avatar onClick={handleMenu}>{props.initials}</Avatar>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={(e) => { handleClose(); window.open("https://github.com/rajalok83", '_blank').focus(); }}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    )
}