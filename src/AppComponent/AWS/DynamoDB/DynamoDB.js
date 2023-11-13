const {
    Box,
    Button,
    FormControlLabel,
    FormGroup,
    Icon,
    Modal,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    Switch,
    Typography } = MaterialUI

const {
    useState
} = React

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
}

const style_header = {
    // bgcolor: 'rgb(85, 108, 214)',
    // border: '2px solid #000',
    boxShadow: 24
}

const TableNameModal = (props) => {
    const [open, setOpen] = useState(props.isOpenModal)
    // useEffect(() => {
    //     setOpen(!open)
    // }, [open])

    const handleClickOpen = () => {
        setOpen(!open)
        console.log("Open")
    }

    const handleClose = () => {
        props.onClose(!open)
        setOpen(!open)
        console.log("Close")
    }

    const handleAddTable = () => {
        console.log("Clicked Add Table")
    }

    return (
        <Modal
            open={true}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={style_header}><Typography>Table Details</Typography></Box>
                <br></br>
                <FormGroup justify="flex">
                    <TextField
                        required
                        id="outlined-required"
                        label="Table Name"
                        defaultValue=""
                    />
                    <br />
                    <TextField
                        required
                        id="outlined-required"
                        label="Table Description"
                        defaultValue=""
                    />
                    <FormControlLabel required control={<Switch />} label="LSI" />
                    <Button variant="outlined" startIcon={<Icon>add</Icon>} onClick={(e) => { handleAddTable() }}>
                        Add Table
                    </Button>
                </FormGroup>
            </Box>
        </Modal>
    )
}

const DynamoDB = (props) => {
    const [open, setOpen] = useState(false);

    let handleExport = () => {

    }

    let handleImport = () => { }

    let handleShare = () => { }

    let handlePrint = () => { }

    let handleCreate = () => {
        setOpen(!open)
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
            {open && <TableNameModal isOpenModal={open} onClose={setOpen}></TableNameModal>}
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
            <DynamoDBTbl></DynamoDBTbl>
            <DynamoDBInfo></DynamoDBInfo>
        </Box>
    )
}