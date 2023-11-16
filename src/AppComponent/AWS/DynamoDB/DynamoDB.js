const {
  Alert,
  Box,
  Icon,
  Snackbar,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Typography } = MaterialUI

const {
  useState
} = React

const DynamoDB = (props) => {
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(false);
  const [severity, setSeverity] = useState(false);
  const [tbls, setTbls] = useState([{ 'name': 'Something', 'desc': 'somedesc', 'columns': [{ 'name': 'alok', "size": 100, "ispart": true }] }]);
  // let handleExport = () => {

  // }

  // let handleImport = () => { }

  // let handleShare = () => { }

  // let handlePrint = () => { }

  let handleCreate = () => {
    setOpen(!open)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar(false);
  };


  const onTblAdd = (inNewTbl) => {
    if (inNewTbl.name !== "") {
      setTbls([...tbls, inNewTbl])
      setSnackbarMessage("Table " + inNewTbl.name + " added to the list")
      setSeverity("success")
    }
    else {
      setOpenSnackbar(true)
      setSnackbarMessage("Table name cannot be blank")
      setSeverity("error")
    }
  }

  const actions = [
    { icon: <Icon>create</Icon>, name: 'Add Table', onClick: handleCreate },
    // { icon: <Icon>file_upload</Icon>, name: 'Import' },
    // { icon: <Icon>file_download</Icon>, name: 'Export' },
    // { icon: <Icon>print</Icon>, name: 'Print' },
    // { icon: <Icon>share</Icon>, name: 'Share' },
  ]
  return (
    <Box sx={{ flexGrow: 1 }}>
      {open && <DynamoDBNewTable isOpenModal={open} onClose={setOpen} onTblAdd={onTblAdd}></DynamoDBNewTable>}
      {openSnackbar && <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>}
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        // sx={{ position: 'bottom', bottom: 16, right: 16 }}
        sx={{
          margin: theme.spacing.unit, // You might not need this now
          position: "fixed",
          bottom: theme.spacing(2),
          right: theme.spacing(2),
        }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
      <DynamoDBTblList tbls={tbls}></DynamoDBTblList>
      <DynamoDBInfo></DynamoDBInfo>
    </Box>
  )
}