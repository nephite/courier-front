import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
import Page from 'material-ui-shell/lib/containers/Page'
// import NativeSelect from '@material-ui/core/NativeSelect';
// import Select from '@material-ui/core/Select';
import React, { useState } from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import axios from 'axios'
// import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { provincesWithoutPickUpLocation, provincesWithPickUpLocation } from '../../utils/data';
import { Helmet } from 'react-helmet'
import Checkbox from '@material-ui/core/Checkbox';

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

const HomePage = () => {
  const intl = useIntl()
  // const classes = useStyles();
  // const [deliveries, setDeliveries] = useState([])
  const [delivery, setDelivery] = useState({
    sender: {
      full_name: '',
      province: {
        name: ''
      },
      city: {
        name: ''
      },
      district: {
        name: ''
      },
      cellphone_no: '',
      street: '',
      landmarks: ''
    },
    recipient: {
      full_name: '',
      province: '',
      city: '',
      disctrict: '',
      cellphone_no: ''
    }
  })

  const [isModalFormOpen, setModalFormOpen] = useState(false)
  const [dialogs, setDialogs] = useState({
    isSenderOpen: false,
    isRecipientOpen: false,
  })
  const defaultSenderProvinceProps = {
    options: provincesWithPickUpLocation,
    getOptionLabel: (option) => option.name,
  };

  const defaultRecipientsProvinceProps = {
    options: provincesWithoutPickUpLocation,
    getOptionLabel: (option) => option.name,
  };

  const [cities, setCities] = useState({
    cached: {},
    selected: [{
      name: ''
    }],
    selectedForSender: [{
      name: ''
    }],
    selectedForRecipient: [{
      name: ''
    }],
  })

  const [districts, setDistricts] = useState({
    cached: {},
    selected: [{
      name: ''
    }],
    selectedForSender: [{
      name: ''
    }],
    selectedForRecipient: [{
      name: ''
    }],
  })

  const defaultProps = {
    options: [
      {
        name: 'title1',
      },
      {
        name: 'title2',
      },
      {
        name: 'title3',
      },
    ],
    getOptionLabel: (option) => option.name,
  };

  const handleModalFormState = (isOpen=false) => {
    let modalFormState = isOpen ? true : !isModalFormOpen
    setModalFormOpen(modalFormState)
  }

  const handleModalFormClose = () => {
    setModalFormOpen(false)
  }

  const handleDialogsStates = (isOpen, diaglogKey) => {
    let isDialogOpen = isOpen ? false : !dialogs[diaglogKey]

    setDialogs({
      ...dialogs,
      [diaglogKey]: isDialogOpen
    })
  }

  const handleDiaglogClose = (diaglogKey) => {
      handleDialogsStates(true, diaglogKey)
  }

  // useEffect(() => {
  //   axios.get('http://localhost:8080/locations/cities', {
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   })
  // }, [])


  const handleDeliverySenderState = (event) => {
    let sender = { ...delivery.sender, 
      [event.target.name]: event.target.value
     }

     setDelivery({ 
       ...delivery,
       sender: sender
     })
  }

  const handleDeliveryRecipientState = (event) => {
    let sender = { ...delivery.sender, 
      [event.target.name]: event.target.value
     }

     setDelivery({ 
       ...delivery,
       sender: sender
     })
  }


  const handleProvinceChange = (province, isSender=true) => {
    
    let citiesCopy = { ...cities }
    let cityKey = province.id.toString()
    let selectedKey = isSender ? 'selectedForSender' : 'selectedForRecipient' 

    if (cityKey in citiesCopy.cached) {  
      citiesCopy[selectedKey] = citiesCopy.cached[cityKey]
      setCities(citiesCopy)
      return;
    }
      axios.get('http://localhost:8080/locations/cities', {
        params: {
          province_id: province.id
        }
      })
      .then(function (response) {
        citiesCopy.cached[cityKey] = response.data.data.cities
        citiesCopy[selectedKey] = response.data.data.cities
        
        setCities(citiesCopy)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const handleCityChange = (city, isSender=true) => {
    let districtsCopy = { ...districts }
    let districtKey = city.id.toString()
    let selectedKey = isSender ? 'selectedForSender' : 'selectedForRecipient'

    if (districtKey in districtsCopy.cached) {  
      districtsCopy[selectedKey] = districtsCopy.cached[districtKey]
      setDistricts(districtsCopy)
      return;
    }
      axios.get('http://localhost:8080/locations/districts', {
        params: {
          city_id: city.id
        }
      })
      .then(function (response) {
        console.log(response)
        districtsCopy.cached[districtKey] = response.data.data.districts
        districtsCopy[selectedKey] = response.data.data.districts
        
        setDistricts(districtsCopy)
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  
  return (
    <Page pageTitle={intl.formatMessage({ id: 'home' })}>
      <Helmet>
        <title>{ 'e-lamove | Home' }</title>
      </Helmet>
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

        <Button 
          variant="contained" 
          color="primary"
          onClick={() => handleDialogsStates(false, 'isRecipientOpen')}
        >
          Set Recipient
        </Button>

        <FormControlLabel
          control={
            <Checkbox
              onChange={()  => {}}
              name="checkedF"
            />
          }
          label="Indeterminate"
      />

    <FormControlLabel   
          control={
            <Checkbox
              onChange={()  => {}}
              name="checkedF"
            />
          }
          label="Indeterminate"
      />


        <Dialog open={isModalFormOpen} onClose={handleModalFormClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Sender</DialogTitle>
          <DialogContent>
          <DialogContentText>
            Sender's details
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="street"
            label="Street Address"
            type="text"
            name={"street"}
            value={delivery.sender.street}
            onChange={handleDeliverySenderState}
            fullWidth
          />

          <Autocomplete
            {...defaultSenderProvinceProps}
            id="sender_province"
            clearOnEscape
            name={"province"}
            value={delivery.sender.province}
            autoComplete={true}
            onChange={(event, newValue) => {
              let newSender = {
                ...delivery.sender, province: newValue
              }

              handleProvinceChange(newValue)

              setDelivery({
                ...delivery,
                sender: newSender
              })
            }}
            renderInput={(params) => <TextField {...params} autoComplete={true} value={delivery.sender.province} label="Province" margin="normal" />}
          />

          <Autocomplete
            {...defaultProps}
            id="sender_city"
            clearOnEscape
            name={"city"}
            value={delivery.sender.city}
            options={cities.selectedForSender}
            onChange={(event, newValue) => {
              let newSender = {
                ...delivery.sender, city: newValue
              }

              handleCityChange(newValue)

              setDelivery({
                ...delivery,
                sender: newSender
              })
            }}
            renderInput={(params) => <TextField {...params}  label="City" margin="normal" />}
          />

        <Autocomplete
            {...defaultProps}
            id="sender_district"
            clearOnEscape
            name={"district"}
            value={delivery.sender.district}
            options={districts.selectedForSender}
            onChange={(event, newValue) => {
              let newSender = {
                ...delivery.sender, district: newValue
              }

              setDelivery({
                ...delivery,
                sender: newSender
              })
            }}
            renderInput={(params) => <TextField {...params} label="District" margin="normal" />}
          />

        <TextField
            autoFocus
            margin="dense"
            id="sender_other_location"
            value={delivery.sender.landmarks}
            label="Other location"
            type="text"
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            id="sender_full_name"
            label="Sender's Full Name"
            type="text"
            name={"full_name"}
            value={delivery.sender.full_name}
            onChange={handleDeliverySenderState}
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            id="sender_cellphone_no"
            label="Sender's Mobile Number"
            type="text"
            name={"cellphone_no"}
            value={delivery.sender.cellphone_no}
            onChange={handleDeliverySenderState}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalFormClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleModalFormClose} color="primary">
            Use Address
          </Button>
        </DialogActions>
        </Dialog>        
        <Dialog open={dialogs.isRecipientOpen} onClose={() => handleDiaglogClose('isRecipientOpen')} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Recipient</DialogTitle>
          <DialogContent>
          <DialogContentText>
            Recipient's details
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="recipient_street"
            label="Street Address"
            type="text"
            name={"street"}
            value={delivery.recipient.street}
            onChange={handleDeliverySenderState}
            fullWidth
          />

          <Autocomplete
            {...defaultRecipientsProvinceProps}
            id="recipient_province"
            clearOnEscape
            name={"province"}
            value={delivery.recipient.province}
            autoComplete={true}
            onChange={(event, newValue) => {
              let newRecipient = {
                ...delivery.recipient, province: newValue
              }

              handleProvinceChange(newValue, false)

              setDelivery({
                ...delivery,
                recipient: newRecipient
              })
            }}
            renderInput={(params) => <TextField {...params} autoComplete={true} value={delivery.sender.province} label="Province" margin="normal" />}
          />

          <Autocomplete
            {...defaultProps}
            id="recipient_city"
            clearOnEscape
            name={"city"}
            value={delivery.recipient.city}
            options={cities.selectedForSender}
            onChange={(event, newValue) => {
              let newRecipient = {
                ...delivery.recipient, city: newValue
              }

              handleCityChange(newValue, false)

              setDelivery({
                ...delivery,
                recipient: newRecipient
              })
            }}
            renderInput={(params) => <TextField {...params}  label="City" margin="normal" />}
          />

        <Autocomplete
            {...defaultProps}
            id="recipient_district"
            clearOnEscape
            name={"district"}
            value={delivery.recipient.district}
            options={districts.selectedForRecipient}
            onChange={(event, newValue) => {
              let newRecipient = {
                ...delivery.recipient, district: newValue
              }

              setDelivery({
                ...delivery,
                recipient: newRecipient
              })
            }}
            renderInput={(params) => <TextField {...params} label="District" margin="normal" />}
          />

        <TextField
            autoFocus
            margin="dense"
            id="recipient_other_location"
            value={delivery.recipient.landmarks}
            label="Other location"
            type="text"
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            id="recipient_full_name"
            label="Recipient's Full Name"
            type="text"
            name={"full_name"}
            value={delivery.recipient.full_name}
            onChange={handleDeliveryRecipientState}
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            id="recipient_cellphone_no"
            label="Recipient's Mobile Number"
            type="text"
            name={"cellphone_no"}
            value={delivery.recipient.cellphone_no}
            onChange={handleDeliveryRecipientState}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogsStates(true, 'isRecipientOpen')} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDialogsStates(true, 'isRecipientOpen')} color="primary">
            Use Address
          </Button>
        </DialogActions>
        </Dialog>
        
      </Scrollbar>
    </Page>
  )
}
export default HomePage
