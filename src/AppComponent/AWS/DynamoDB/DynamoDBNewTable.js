const {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  TextField,
} = MaterialUI;
const { useState, useRef } = React;

const DynamoDBNewTable = (props) => {
  const [open, setOpen] = useState(props.isOpenModal);
  // let propsTblNm = {};
  const [tblNmProps, setTblNmProps] = useState({});
  const [tblRegTPSProps, setTblRegTPSProps] = useState({});
  const [tblPeekTPSProps, setTblPeekTPSProps] = useState({});
  const [tblPeekTPSPctProps, setTblPeekTPSPctProps] = useState({});
  const [tblDescProps, setTblDescProps] = useState({});
  const tblNmRef = useRef();
  const tblRegTPSRef = useRef();
  const tblPeekTPSRef = useRef();
  const tblPeekTPSPctofDayRef = useRef();
  const tblDescRef = useRef();

  function getFormattedDate(today) {
    let month = new Array(
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    );
    // var day  = week[today.getDay()]
    var dd = today.getDate();
    var mmmm = month[today.getMonth()]; //January is 0!
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var minu = today.getMinutes();
    if (dd < 10) {
      dd = "0" + dd;
    }
    // if(mm<10)  { mm='0'+mm }
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minu < 10) {
      minu = "0" + minu;
    }
    return mmmm + " " + dd + ", " + yyyy + " " + hour + ":" + minu;
  }

  const handleClose = () => {
    props.onClose(!open);
    setOpen(!open);
    // console.log("Close")
  };

  const handleAddTable = (e) => {
    e.preventDefault();
    console.log(tblNmRef.current.value);
    if (
      tblNmRef.current.value != "" &&
      tblDescRef.current.value != "" &&
      tblRegTPSRef.current.value != "" &&
      tblPeekTPSRef.current.value != "" &&
      tblPeekTPSPctofDayRef.current.value != ""
    ) {
      props.onTblAdd({
        name: tblNmRef.current.value,
        desc: tblDescRef.current.value,
        regtps: parseInt(tblRegTPSRef.current.value),
        peektps: parseInt(tblPeekTPSRef.current.value),
        peektpspct: parseInt(tblPeekTPSPctofDayRef.current.value),
        columns: {},
        dt: new Date(),
      });
      handleClose();
    } else {
      tblNmRef.current.value == ""
        ? setTblNmProps({ error: true })
        : setTblNmProps({});
      tblRegTPSRef.current.value == ""
        ? setTblRegTPSProps({ error: true })
        : setTblRegTPSProps({});
      tblPeekTPSRef.current.value == ""
        ? setTblPeekTPSProps({ error: true })
        : setTblPeekTPSProps({});
      tblPeekTPSPctofDayRef.current.value == ""
        ? setTblPeekTPSPctProps({ error: true })
        : setTblPeekTPSPctProps({});
      tblDescRef.current.value == ""
        ? setTblDescProps({ error: true })
        : setTblDescProps({});
    }
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "500px", // Set your width here
          },
        },
      }}
    >
      <DialogTitle>Add Table</DialogTitle>
      <DialogContent>
        <FormGroup>
          <TextField
            sx={{ mt: 0.6 }}
            required
            {...tblNmProps}
            id="outlined-required"
            label="Table Name"
            defaultValue=""
            inputRef={tblNmRef}
          />
          <TextField
            sx={{ mt: 0.6 }}
            required
            {...tblRegTPSProps}
            id="outlined-required"
            label="Table Regular TPS"
            defaultValue=""
            type="number"
            inputRef={tblRegTPSRef}
            onChange={(e) =>
              (tblRegTPSRef.current.value =
                e.target.value >= 0 ? parseInt(e.target.value) : 0)
            }
          />
          <TextField
            sx={{ mt: 0.6 }}
            required
            {...tblPeekTPSProps}
            id="outlined-required"
            label="Table Peek TPS"
            defaultValue=""
            type="number"
            inputRef={tblPeekTPSRef}
            onChange={(e) =>
              (tblPeekTPSRef.current.value =
                e.target.value >= 0 ? parseInt(e.target.value) : 0)
            }
          />
          <TextField
            sx={{ mt: 0.6 }}
            required
            {...tblPeekTPSPctProps}
            id="outlined-required"
            label="Peek TPS PCT in a Day"
            defaultValue=""
            type="number"
            inputRef={tblPeekTPSPctofDayRef}
            onChange={(e) =>
              (tblPeekTPSPctofDayRef.current.value =
                e.target.value >= 0
                  ? e.target.value < 100
                    ? parseInt(e.target.value)
                    : 100
                  : 0)
            }
          />
          <br />
          <TextField
            required
            {...tblDescProps}
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
    </Dialog>
  );
};
