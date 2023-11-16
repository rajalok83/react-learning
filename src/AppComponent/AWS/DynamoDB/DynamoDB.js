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
  const [open, setOpen] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState(false)
  const [severity, setSeverity] = useState(false)
  const [tbls, setTbls] = useState({})
  const columnsHeader = [{ "label": "Name", "type": "text", "key": "name" },
  { "label": "Datatype", "type": "list", "key": "type", "options": ["Number", "Boolean", "Text"] },
  { "label": "Size(Bytes)", "type": "number", "key": "size" },
  { "label": "Partition Key", "type": "boolean", "key": "ispart" },
  { "label": "Sort Key", "type": "boolean", "key": "issort" },
  { "label": "LSI", "type": "boolean", "key": "islsi" },
  { "label": "GSI", "type": "boolean", "key": "isgsi" },
  { "label": "Operation" }
  ]

  // let handleExport = () => {

  // }

  // let handleImport = () => { }

  // let handleShare = () => { }

  // let handlePrint = () => { }

  let handleCreate = () => {
    setOpen(!open)
  }

  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return
  //   }
  //   setOpen(false)
  // }

  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar(false)
  }

  const onTblAdd = (inNewTbl) => {
    if (inNewTbl.name !== "") {
      tbls[inNewTbl["name"]] = { "desc": inNewTbl["desc"], "columns": inNewTbl["columns"] }
      setTbls(tbls)
      setSnackbarMessage("Table " + inNewTbl["name"] + " added to the list")
      setSeverity("success")
    }
    else {
      setOpenSnackbar(true)
      setSnackbarMessage("Table name cannot be blank")
      setSeverity("error")
    }
  }

  const onTblDrop = (inTbl) => {
    console.log("Dropping table")
    delete tbls[inTbl]
    setTbls({ ...tbls })
  }

  const onColAdd = (inTbl) => {
    console.log("Adding column")
    tbls[inTbl]["columns"]["NewColumn"] = {}
    setTbls({ ...tbls })
  }

  const onColDrop = (inTbl, inCol) => {
    console.log("Dropping column")
    delete tbls[inTbl]["columns"][inCol]
    setTbls({ ...tbls })
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
      <DynamoDBTblList columnsHeader={columnsHeader} tbls={tbls} onTblDrop={onTblDrop} onColDrop={onColDrop} onColAdd={onColAdd}></DynamoDBTblList>
      <DynamoDBInfo></DynamoDBInfo>
    </Box>
  )
}