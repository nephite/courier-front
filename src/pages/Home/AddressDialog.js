import React, { useState, Fragment } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';

import { provincesWithoutPickUpLocation, provincesWithPickUpLocation } from '../../utils/data';

const defaultInfo = {
  street: '',
  province: {
    name: ''
  },
  city: {
    name: ''
  },
  district: {
    name: ''
  },
  landmarks: '',
  full_name: '',
  cellphone_no: ''
}

const defaultOptionProps = {
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

const defaultProvincesProps = {
  sender: {
    options: provincesWithPickUpLocation,
    getOptionLabel: (option) => option.name,
  },
  recipient: {
    options: provincesWithoutPickUpLocation,
    getOptionLabel: (option) => option.name,
  }
}

const AddressDialog = (props) => {

  const { btnText, isOpen, getInfo, type, defaults } = props

  const [isDialogOpen, setDialogOpen] = useState(isOpen || false)

  const [info, setInfo] = useState(defaults || defaultInfo)

  const [cities, setCities] = useState({
    cached: {},
    selected: [{
      name: ''
    }],
  })

  const [districts, setDistricts] = useState({
    cached: {},
    selected: [{
      name: ''
    }],
  })

  const handleInfoChange = (event) => {
    setInfo({ 
      ...info, 
      [event.target.name]: event.target.value
    })
  }

  const handleDialogState = (isOpen) => {
    setDialogOpen((isOpen === true) ? false : !isDialogOpen)
  }

  const handleDialogClose = () => {
    handleDialogState(true)
  }

  const manageInfo = (isClearInfo) => {
    handleDialogClose()
    if (isClearInfo === true) {
      setInfo(defaultInfo)
    } else {
      getInfo(info)
    }
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleProvinceChange = (province) => {
    
    if (province === null) {
      return;
    }

    let citiesCopy = { ...cities }
    let cityKey = province.id.toString()

    if (cityKey in citiesCopy.cached) {  
      citiesCopy['selected'] = citiesCopy.cached[cityKey]
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
      let citiesOptions = [{
        "id": 0,
        "name": "",
      }]
      citiesOptions += response.data.data.cities
      citiesCopy['selected'] = citiesOptions
      setCities(citiesCopy)
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const handleCityChange = (city) => {

    if (city === null) {
      return;
    }

    let districtsCopy = { ...districts }
    let districtKey = city.id.toString()

    if (districtKey in districtsCopy.cached) {  
      districtsCopy['selected'] = districtsCopy.cached[districtKey]
      setDistricts(districtsCopy)
      return;
    }

    axios.get('http://localhost:8080/locations/districts', {
      params: {
        city_id: city.id
      }
    })
    .then(function (response) {
      districtsCopy.cached[districtKey] = response.data.data.districts
      districtsCopy['selected'] = response.data.data.districts
      
      setDistricts(districtsCopy)
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  return (
    <Fragment>
      <Button 
        variant="contained" 
        color="primary"
        onClick={handleDialogState}  
      >
          {btnText}
      </Button>
    
      <Dialog open={isDialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle>{capitalizeFirstLetter(type)}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {capitalizeFirstLetter(type) + '\'s details'}
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            label={capitalizeFirstLetter(type) + '\'s Street'}
            type="text"
            name={"street"}
            value={info.street}
            onChange={handleInfoChange}
            fullWidth
          />

          <Autocomplete
            {...defaultProvincesProps[type]}
            clearOnEscape
            name={"province"}
            value={info.province}
            onChange={(event, newValue) => {
              handleProvinceChange(newValue)
              setInfo({
                ...info,
                province: newValue
              })
            }}
            renderInput={(params) => <TextField {...params} value={info.province} label="Province" margin="normal" />}
          />
  
          <Autocomplete
            {...defaultOptionProps}
            clearOnEscape
            name={"city"}
            value={info.city}
            options={cities.selected}
            onChange={(event, newValue) => {
              handleCityChange(newValue)
            
              setInfo({
                ...info,
                city: newValue
              })
            }}
            renderInput={(params) => <TextField {...params}  label="City" margin="normal" />}
          />

          <Autocomplete
             {...defaultOptionProps}
             clearOnEscape
             name={"district"}
             value={info.district}
             options={districts.selected}
             onChange={(event, newValue) => {
               setInfo({
                 ...info,
                 district: newValue
               })
             }}
             renderInput={(params) => <TextField {...params} label="District" margin="normal" />}
           />

          <TextField
            autoFocus
            margin="dense"
            name={"landmarks"}
            value={info.landmarks}
            onChange={handleInfoChange}
            label="Other location"
            type="text"
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            label={capitalizeFirstLetter(type) + '\'s Full Name'}
            type="text"
            name={"full_name"}
            value={info.full_name}
            onChange={handleInfoChange}
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            label={capitalizeFirstLetter(type) + '\'s Mobile Number'}
            type="text"
            name={"cellphone_no"}
            value={info.cellphone_no}
            onChange={handleInfoChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { manageInfo(true) }} color="primary">
            Cancel
          </Button>
          <Button onClick={() => { manageInfo(false) }} color="primary">
            Use Address
          </Button>
        </DialogActions>
        </Dialog>     
    </Fragment>   
  );
}

AddressDialog.defaultProps = {
  btnText: 'Set Info'
}

AddressDialog.propTypes = {
  btnText: PropTypes.string,
  defaults: PropTypes.object,
  isOpen: PropTypes.bool,
  type: PropTypes.string.isRequired,
  getInfo: PropTypes.func.isRequired
}

export default AddressDialog;
