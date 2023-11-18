const {
  Avatar,
  Grid,
  Menu,
  MenuItem
} = MaterialUI

const HeaderAvatar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (elem) => {
    setAnchorEl(null)
  }

  const openProfile = () => {
    handleClose()
    window.open("https://github.com/rajalok83", '_blank').focus()
  }

  return (
    <Grid container justifyContent="flex-end">
      <Avatar justifyContent="flex-end" onClick={handleMenu}>{props.initials}</Avatar>
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
        <MenuItem onClick={(e) => { openProfile }}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Grid>
  )
}