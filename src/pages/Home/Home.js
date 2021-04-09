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
  return ['Set Sender Info', 'Set Recipient Info', 'Set Package Details'];
}



const HomePage = () => {

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
              btnText={'Set Sender'}
              type={'sender'}
              getInfo={(data) => {
                console.log(data)
              handleDeliveryState('sender', data)
              }}
            />
            {delivery.sender.full_name + ', ' + delivery.sender.province.name}
          </Fragment>
        );
      case 1:
        return (
          <Fragment>
            <AddressDialog
              btnText={'Set Recipient'}
              type={'recipient'}
              getInfo={(data) => {
                console.log(data)
              handleDeliveryState('recipient', data)
              }}
            />
            {delivery.recipient.full_name + ', ' + delivery.recipient.province.name}
          </Fragment>
        );
      case 2:
        return (
          <Fragment>
            <PackageDialog 
              getPackageInfo={handlePackageInfo}
            />
          </Fragment>
        );;
      default:
        return 'Unknown step';
    }
  }
  
  const intl = useIntl()
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
                    onClick={handleNext}
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
