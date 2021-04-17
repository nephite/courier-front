import React, { Fragment, useState } from 'react'

import Page from 'material-ui-shell/lib/containers/Page'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { useIntl } from 'react-intl'
import { Helmet } from 'react-helmet'
import AddressDialog from './AddressDialog';
import PackageDialog from './PackageDialog';


import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import { RATES } from '../../utils/data';

import _ from 'lodash';
import axios from 'axios'

import { useConfirm } from 'material-ui-confirm';
import { ToastEmitter } from '../../components/Toast';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Set Sender Info', 'Set Recipient Info', 'Set Package Details', 'Review Details'];
}

const defaultDelivery = {
  item_name: '',
  is_provincial: 'F',
  item_type: 'S-M',
  item_amount: 0,
  total_amount: 0,
  package: {
    item_name: '',
    is_cod: 'F',
    package: {
      name: 'Small/Medium',
      item_type: 'S-M',
      item_code: 's_m',
      rate: 60,
      weight: 'Max weight: 3 kg',
      size: '23.7cm x 39.8cm',
      description: ''}
  },
  sender: {
    full_name: '',
    province_name: '',
    province: {
      name: ''
    },
    city_name: '',
    city: {
      name: ''
    },
    district_name: '',
    district: {
      name: '',
      postal_code: ''
    },
    cellphone_no: '',
    street: '',
    landmarks: ''
  },
  recipient: {
    full_name: '',
    province_name: '',
    province: {
      name: ''
    },
    city_name: '',
    city: {
      name: ''
    },
    district_name: '',
    district: {
      name: '',
      postal_code: ''
    },
    cellphone_no: '',
    street: '',
    landmarks: ''
  }
}

const HomePage = () => {
  const confirm = useConfirm();
  const intl = useIntl()
  const [delivery, setDelivery] = useState(defaultDelivery)

  const classes = useStyles();
  const [activeStep, setActiveStep] =useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Fragment>
            <AddressDialog
              defaults={delivery.sender}
              btnText={'Set Sender'}
              type={'sender'}
              getInfo={(data) => {
                handleDeliveryState('sender', data)
              }}
            />
            <p>
              Sender: {delivery.sender.full_name}, {delivery.sender.cellphone_no}, {delivery.sender.province_name}, {delivery.sender.city_name}, {delivery.sender.district_name}, {delivery.sender.district.postal_code}
            </p>
          </Fragment>
        );
      case 1:
        return (
          <Fragment>
            <AddressDialog
              btnText={'Set Recipient'}
              type={'recipient'}
              getInfo={(data) => {
                handleDeliveryState('recipient', data)
              }}
            />
            <p>
            Recipient: {delivery.recipient.province_name}, {delivery.recipient.city_name}, {delivery.recipient.district_name}, {delivery.recipient.district.postal_code}
            </p>
          </Fragment>
        );
      case 2:
        return (
          <Fragment>
            <PackageDialog 
              getPackageInfo={handlePackageInfo}
            />
          </Fragment>
        );
      case 3:
        return (
          <Fragment>
            <h1>Summary</h1>
            <ul>
              <li>Sender: {delivery.sender.full_name}, {delivery.sender.cellphone_no}, {delivery.sender.street}, {delivery.sender.landmarks}, {delivery.sender.province_name}, {delivery.sender.city_name}, {delivery.sender.district_name}, {delivery.sender.district.postal_code}</li>
              <li>Recipient: {delivery.recipient.full_name}, {delivery.recipient.cellphone_no}, {delivery.recipient.street}, {delivery.recipient.landmarks}, {delivery.recipient.province_name}, {delivery.recipient.city_name}, {delivery.recipient.district_name}, {delivery.recipient.district.postal_code}</li>
              <li>Package: {delivery.package.item_name}, {delivery.package.package.name}</li>
              <li>Shipping Rate: {delivery.package.package.rate}</li>
              <li>Cash on Delivery: {delivery.package.is_cod}</li>
              <li>Total Amount: {computeShippingRate()}</li>
            </ul>
          </Fragment>
        );
      default:
        return 'Unknown step';
    }
  }

  const requestDelivery = () => {
    let requestData  = {
      client_id: "1",
      is_cod: delivery.package.is_cod,
      is_provincial: 'F',
      item_name: delivery.package.item_name,
      item_type: delivery.package.package.item_type,
      item_amount: delivery.package.package.rate,
      total_amount: computeShippingRate(),
      sender: _.pick(delivery.sender, ['full_name', 'cellphone_no']),
      recipient: _.pick(delivery.recipient, ['full_name', 'cellphone_no',])
    }

    requestData.sender.cellphone_no = '0' + delivery.sender.cellphone_no
    requestData.sender.province = delivery.sender.province_name
    requestData.sender.city = delivery.sender.city_name
    requestData.sender.district = delivery.sender.district_name
    requestData.sender.postal_code = delivery.sender.district.postal_code
    requestData.sender.landmarks = delivery.sender.landmarks
    requestData.sender.street = delivery.sender.street

    requestData.recipient.cellphone_no = '0' + delivery.recipient.cellphone_no
    requestData.recipient.province = delivery.recipient.province_name
    requestData.recipient.city = delivery.recipient.city_name
    requestData.recipient.district = delivery.recipient.district_name
    requestData.recipient.postal_code = delivery.recipient.district.postal_code
    requestData.recipient.landmarks = delivery.recipient.landmarks
    requestData.recipient.street = delivery.recipient.street

    console.log('requestData', requestData)
    
    axios.post('https://dev-courier-api.herokuapp.com/deliveries', requestData)
    .then(function (response) {
      ToastEmitter('success', 'Transaction are successfuly created!')
      setDelivery(defaultDelivery)
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const computeShippingRate = () => {
    let provinceName = delivery.sender.province_name.toLowerCase().replace(' ', '_')
    if (provinceName === '') {
      return 60
    } else {
      console.log(delivery)
      // let codKey = (delivery.package.is_cod === 'T') ? 'cod' : 'non_cod'
      // let packageValueKey = delivery.package.package.item_code
      let shippingFee = 100
      // let shippingFee = RATES[provinceName][packageValueKey][codKey]
    return shippingFee
    }
    
  }

  const handleDeliveryState = (key, value) => {
    setDelivery({
      ...delivery,
      [key]: value
    })
  }

  // const handleChangeActiveStep = (step) => {
  //   setActiveStep(step)
  // }

  const handlePackageInfo = (packageInfo) => {
    console.log(packageInfo)
    setDelivery({
      ...delivery,
      package: packageInfo
    })
  }

  const handleFinish = () => {
    confirm({ description: 'This action is permanent!' })
      .then(() => { 
        requestDelivery()
      })
      .catch(() => { /* ... */ });
  }

  return (
    <Page pageTitle={intl.formatMessage({ id: 'home' })}>
      <Helmet>
        <title>{ 'e-lamove | Home' }</title>
      </Helmet>
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >
        <h1>Delivery</h1>
        
    
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Fragment>{getStepContent(index)}</Fragment>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    // disabled
                    variant="contained"
                    color="primary"
                    onClick={activeStep === steps.length - 1 ? handleFinish: handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
      </Scrollbar>
    </Page>
  )
}

export default HomePage
