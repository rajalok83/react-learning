const {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  TextField 
} = MaterialUI
const {
  useState,
  useRef 
} = React

const DynamoDBImport = (props) => {
  const [open, setOpen] = useState(props.isOpenModal)
  const tblNmRef = useRef()
  const tblDescRef = useRef()

  const handleClose = () => {
    props.onClose(!open)
    setOpen(!open)
    // console.log("Close")
  }

  const handleImport = (e) => {
    e.preventDefault()
    var input = e.target;
    var reader = new FileReader()
    reader.onload = () => {
      // console.log(JSON.parse(reader.result))
      props.onImport({ ...JSON.parse(reader.result) })
    }
    reader.readAsText(input.files[0])
    handleClose()
  }

  return (
    <Dialog open={true} onClose={handleClose} sx={{
      "& .MuiDialog-container": {
        "& .MuiPaper-root": {
          width: "100%",
          maxWidth: "500px",  // Set your width here
        },
      },
    }}>
      <DialogTitle>Import File</DialogTitle>
      <DialogContent >
        <FormGroup>
          <TextField
            name="file"
            value=""
            onChange={handleImport}
            readOnly
            InputProps={{
              endAdornment: (
                <input
                  ref={tblNmRef}
                  type="file"
                  accept="application/JSON"
                  onChange={handleImport}
                  tabIndex={-1}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    opacity: 0,
                  }} />
              )
            }} />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleImport}>Add Table</Button>
      </DialogActions>
    </Dialog >
  )
}
