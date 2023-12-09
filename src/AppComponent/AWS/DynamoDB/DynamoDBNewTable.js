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

const DynamoDBNewTable = (props) => {
  const [open, setOpen] = useState(props.isOpenModal)
  const tblNmRef = useRef()
  const tblDescRef = useRef()

  function getFormattedDate(today) {
    let month = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December')
    // var day  = week[today.getDay()]
    var dd = today.getDate()
    var mmmm = month[today.getMonth()] //January is 0!
    var yyyy = today.getFullYear()
    var hour = today.getHours()
    var minu = today.getMinutes()
    if (dd < 10) { dd = '0' + dd }
    // if(mm<10)  { mm='0'+mm } 
    if (hour < 10) { hour = '0' + hour }
    if (minu < 10) { minu = '0' + minu }
    return mmmm + ' ' + dd + ', ' + yyyy + ' ' + hour + ':' + minu
  }

  const handleClose = () => {
    props.onClose(!open)
    setOpen(!open)
    // console.log("Close")
  }

  const handleAddTable = (e) => {
    e.preventDefault()
    props.onTblAdd({ 'name': tblNmRef.current.value, 'desc': tblDescRef.current.value, 'columns': {}, 'dt': (new Date()) })
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
