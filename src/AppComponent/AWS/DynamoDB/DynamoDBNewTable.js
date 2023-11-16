const {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  TextField
} = MaterialUI

const { useState, useRef } = React

const DynamoDBNewTable = (props) => {
  const [open, setOpen] = useState(props.isOpenModal)
  const tblNmRef = useRef()
  const tblDescRef = useRef()
  
  const handleClose = () => {
    props.onClose(!open)
    setOpen(!open)
    // console.log("Close")
  }

  const handleAddTable = (e) => {
    e.preventDefault()
    props.onTblAdd({ 'name': tblNmRef.current.value, 'desc': tblDescRef.current.value, 'columns': {} })
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
      <DialogTitle>Add Table</DialogTitle>
      <DialogContent >
        <FormGroup>
          <TextField sx={{ mt: 0.6 }}
            required
            id="outlined-required"
            label="Table Name"
            defaultValue=""
            inputRef={tblNmRef}
          />
          <br />
          <TextField
            required
            id="outlined-required"
            label="Table Description"
            defaultValue=""
            multiline
            rows={6}
            inputRef={tblDescRef}
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddTable}>Add Table</Button>
      </DialogActions>
    </Dialog >
  )
}
