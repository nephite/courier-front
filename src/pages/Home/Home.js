import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Page from 'material-ui-shell/lib/containers/Page'
import Select from '@material-ui/core/Select';
import React, { useEffect, useState } from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl'


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const HomePage = () => {
  const intl = useIntl()
  const classes = useStyles();
  const [deliveries, setDeliveries] = useState([])
  const [isModalFormOpen, setModalFormOpen] = useState(false)

  const handleModalFormState = (isOpen=false) => {
    let modalFormState = isOpen ? true : !isModalFormOpen
    console.log(modalFormState)
    setModalFormOpen(modalFormState)
  }

  const handleModalFormClose = () => {
    setModalFormOpen(false)
  }

  useEffect(() => {
    axios.get('http://localhost:8080/locations/cities', {
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [])

  return (
    <Page pageTitle={intl.formatMessage({ id: 'home' })}>
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >
        {intl.formatMessage({ id: 'home' })}

        <h1>Delivery</h1>

        <Button 
          variant="contained" 
          color="primary"
          onClick={handleModalFormState}  
        >
          Set Sender
        </Button>

        <Button variant="contained" color="primary">
          Set Recipient
        </Button>

        <Dialog open={isModalFormOpen} onClose={handleModalFormClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sender</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>

          <InputLabel id="sender_provinces-label">Province</InputLabel>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={7}
              onChange={() => {}}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <TextField
            autoFocus
            margin="dense"
            id="street"
            label="Street Address"
            type="text"
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            id="sender_name"
            label="Sender's Name"
            type="text"
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            id="sender_contact_no"
            label="Sender's Mobile Number"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalFormClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleModalFormClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
        </Dialog>
        

      </Scrollbar>
    </Page>
  )
}
export default HomePage
