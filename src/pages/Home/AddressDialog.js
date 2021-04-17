import React, { useState, Fragment } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import _ from 'lodash';
import axios from 'axios'
import { Validator } from '../../utils/customValidator';
import { provincesWithoutPickUpLocation, provincesWithPickUpLocation } from '../../utils/data';

/**
 * For the following object keys (province, city, district) 
 * suffix _name is use for validation while the keys without suffix is the variable key for its real value
 */
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
  province_name: '',
  city_name: '',
  district_name: '',
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
  const [errors, setErrors] = useState({})
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
    let value = event.target.value

    if (event.target.name === 'cellphone_no') {
      value = handleCellPhoneChange(value)
    }

    setInfo({ 
      ...info, 
      [event.target.name]: value
    })
  }

  const handleCellPhoneChange = (value) => {
    const cpRegex = /^[0-9\b]+$/;

    if (value === '' || cpRegex.test(value)) {
      return value.slice(0, 10)
    }

    return info.cellphone_no
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
    
    axios.get('https://dev-courier-api.herokuapp.com/locations/cities', {
      params: {
        province_id: province.id
      }
    })
    .then(function (response) {
      citiesCopy.cached[cityKey] = response.data.data.cities
      let citiesOptions = [{
        'id': 0,
        'name': '',
      }]
      citiesOptions = response.data.data.cities
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

    axios.get('https://dev-courier-api.herokuapp.com/locations/districts', {
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

  const validateAddress = () => {
    let addressValidationSchema = {
      street: [
        'isEmpty'
      ],
      province_name: [
        'isEmpty'
      ],
      city_name: [
        'isEmpty'
      ],
      district_name: [
        'isEmpty'
      ],
      full_name: [
        'isEmpty'
      ],
      cellphone_no: [
        'isEmpty'
      ]
    }

    let validator = new Validator()
    validator.validate(addressValidationSchema, info)

    let adddressErrors = validator.getErrors()

    if (_.isEmpty(adddressErrors) === false) {
      setErrors(adddressErrors)
      return true
    }

    return true
  }

  const saveAdress = () => {
    let isValidAddress = validateAddress()
    if (isValidAddress === true) {
      getInfo(info)
      setDialogOpen(false)
      return
    }
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
        <DialogTitle>Input {capitalizeFirstLetter(type)} Details</DialogTitle>

        
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
            error={errors.hasOwnProperty('street') === true}
            helperText={errors.hasOwnProperty('street') ? errors['street'][0] : '' }
          />

          <Autocomplete
            {...defaultProvincesProps[type]}
            clearOnEscape
            name={'province'}
            value={info.province}
            onChange={(event, newValue) => {
              handleProvinceChange(newValue)
              
              let value = ''

              if (newValue === null) {
                value = ''
              } else if ('name' in newValue) {
                value = newValue.name
              }

              setInfo({
                ...info,
                province_name: value,
                province: newValue
              })
            }}
            renderInput={(params) => <TextField 
                  {...params} 
                  value={info.province} 
                  label="Province" 
                  margin="normal" 
                  error={errors.hasOwnProperty('province_name') === true}
                  helperText={errors.hasOwnProperty('province_name') ? errors['province_name'][0] : '' }  
                />}
          />
  
          <Autocomplete
            {...defaultOptionProps}
            clearOnEscape
            name={'city'}
            value={info.city}
            options={cities.selected}
            onChange={(event, newValue) => {
              handleCityChange(newValue)
              
              let value = ''

              if (newValue === null) {
                value = ''
              } else if ('name' in newValue) {
                value = newValue.name
              }

              setInfo({
                ...info,
                city_name: value,
                city: newValue
              })
            }}
            renderInput={(params) => <TextField 
                  {...params}
                  label="City" 
                  margin="normal" 
                  error={errors.hasOwnProperty('city_name') === true}
                  helperText={errors.hasOwnProperty('city_name') ? errors['city_name'][0] : '' }
                />}
          />

          <Autocomplete
             {...defaultOptionProps}
             clearOnEscape
             name={'district'}
             value={info.district}
             options={districts.selected}
             onChange={(event, newValue) => {
                let value = ''

                if (newValue === null) {
                  value = ''
                } else if ('name' in newValue) {
                  value = newValue.name
                }

               setInfo({
                 ...info,
                 district_name: value,
                 district: newValue
               })
             }}
            renderInput={(params) => <TextField 
                  {...params} 
                  label="District" 
                  margin="normal" 
                  error={errors.hasOwnProperty('district_name') === true}
                  helperText={errors.hasOwnProperty('district_name') ? errors['district_name'][0] : '' }
                />}
           />

          <TextField
            margin="dense"
            name={"landmarks"}
            value={info.landmarks}
            onChange={handleInfoChange}
            label="Other location"
            type="text"
            fullWidth
          />

          <TextField
            margin="dense"
            label={capitalizeFirstLetter(type) + '\'s Full Name'}
            type="text"
            name={'full_name'}
            value={info.full_name}
            onChange={handleInfoChange}
            fullWidth
            error={errors.hasOwnProperty('full_name') === true}
            helperText={errors.hasOwnProperty('full_name') ? errors['full_name'][0] : '' }
          />

          <TextField
            margin="dense"
            label={capitalizeFirstLetter(type) + '\'s Mobile Number'}
            type="text"
            name={'cellphone_no'}
            value={info.cellphone_no}
            onChange={handleInfoChange}
            fullWidth
            error={errors.hasOwnProperty('cellphone_no') === true}
            helperText={errors.hasOwnProperty('cellphone_no') ? errors['cellphone_no'][0] : '' }
            InputProps={{
              startAdornment: <InputAdornment position="start">+63</InputAdornment>,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { manageInfo(true) }} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={(event) => {
              saveAdress()
             }
            } color="primary">
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
