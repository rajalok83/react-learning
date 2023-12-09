const {
  Alert,
  Box,
  Icon,
  Snackbar,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Typography 
} = MaterialUI
const {
  useState 
} = React

const DynamoDB = (props) => {
  const [newOpen, setNewOpen] = useState(false)
  const [importOpen, setImportOpen] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState(false)
  const [severity, setSeverity] = useState(false)
  const [tbls, setTbls] = useState({})
  const columnsHeader = [{ "label": "Name", "type": "text", "key": "name" },
  { "label": "Datatype", "type": "list", "key": "type", "options": ["Number", "Boolean", "Text"] },
  { "label": "Size(Bytes)", "type": "number", "key": "size" },
  { "label": "PKey", "type": "boolean", "key": "ispart", "tooltip": { "header": "Partition Key", "desc": "This is must to be able to query the data easily, only one partition key per table is allowed. This generally represents a collection of records with same value in this column" } },
  { "label": "SKey", "type": "boolean", "key": "issort", "tooltip": { "header": "Sort Key", "desc": "This column is used to identify a record uniquely within a partition" } },
  { "label": "LSI", "type": "boolean", "key": "islsi" },
  { "label": "GSI", "type": "boolean", "key": "isgsi" }
    // ,
    // { "label": "Operation" }
  ]

  let handleExport = () => {
    console.log(JSON.stringify(tbls, null, 2))
    var dlAnchorElem = document.createElement('a');
    // let dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tbls, null, 2)));
    dlAnchorElem.setAttribute("download", "dynamomodel.json");
    dlAnchorElem.click();
  }

  let handleImport = () => {
    setImportOpen(!importOpen)
  }

  // let handleShare = () => { }

  // let handlePrint = () => { }

  let handleCreate = () => {
    setNewOpen(!newOpen)
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
      // tbls[inNewTbl["name"]] = { "desc": inNewTbl["desc"], "columns": inNewTbl["columns"] }
      tbls[inNewTbl["name"]] = { "desc": inNewTbl["desc"], "columns": inNewTbl["columns"], "dt": (new Date()) }
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
    // console.log({ ...tbls })
    tbls[inTbl]["columns"]["NewColumn"] = {
      "type": "Number", "size": 1
    }
    // console.log({ ...tbls })
    setTbls({ ...tbls })
  }

  const onColChange = (typ, inTbl, inCol, newVal) => {
    console.log("Change column")
    // console.log("Before:" + JSON.stringify(tbls))
    switch (typ) {
      case "name":
        if (inCol !== newVal) {
          tbls[inTbl]["columns"][newVal] = tbls[inTbl]["columns"][inCol]
          onColDrop(inTbl, inCol)
        }
        break
      default:
        tbls[inTbl]["columns"][inCol][typ] = newVal
    }
    setTbls({ ...tbls })
  }

  const onColDrop = (inTbl, inCol) => {
    console.log("Dropping column")
    delete tbls[inTbl]["columns"][inCol]
    setTbls({ ...tbls })
  }

  const actions = [
    { icon: <Icon>create</Icon>, name: 'Add Table', onClick: handleCreate },
    { icon: <Icon>file_upload</Icon>, name: 'Import', onClick: handleImport },
    { icon: <Icon>file_download</Icon>, name: 'Export', onClick: handleExport },
    // { icon: <Icon>print</Icon>, name: 'Print' },
    // { icon: <Icon>share</Icon>, name: 'Share' },
  ]
  return (
    <Box sx={{ flexGrow: 1 }}>
      {newOpen && <DynamoDBNewTable isOpenModal={newOpen} onClose={setNewOpen} onTblAdd={onTblAdd}></DynamoDBNewTable>}
      {importOpen && <DynamoDBImport isOpenModal={importOpen} onClose={setImportOpen} onImport={setTbls}></DynamoDBImport>}
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
      <DynamoDBTblList columnsHeader={columnsHeader} tbls={tbls} onTblDrop={onTblDrop} onColDrop={onColDrop} onColAdd={onColAdd} onColChange={onColChange}></DynamoDBTblList>
      <DynamoDBInfo></DynamoDBInfo>
    </Box>
  )
}