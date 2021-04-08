import React, { useState, Fragment } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Package from './Package'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { GridListTile } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const packageTypes = [
  {
    name: 'Small/Medium',
    item_type: 'S-M',
    rate: 60,
    weight: 'Max weight: 3 kg',
    size: '23.7cm x 39.8cm',
    description: ''
  },
  {
    name: 'Large',
    item_type: 'M',
    rate: 60,
    weight: 'Max weight: 3 kg',
    size: '28.8cm x 44.7cm',
    description: ''
  },
  {
    name: 'Extra Large',
    item_type: 'XL',
    rate: 60,
    weight: 'Max weight: 3 kg',
    size: '30cm x 50.5cm',
    description: ''
  },
]

const PackageDialog = (props) => {
  const classes = useStyles();
  const [packageName, setPackageName] = useState('')
  const [selectedPackage, setSelectedPackage] = useState(0)
  const [isCOD, setIsCOD] = useState(false)

  const { btnText, isOpen, getPackageInfo } = props

  const [isDialogOpen, setDialogOpen] = useState(isOpen || false)

  const handleDialogState = (isOpen) => {
    setDialogOpen((isOpen === true) ? false : !isDialogOpen)
  }

  const handleDialogClose = () => {
    handleDialogState(true)
  }

  const savePackageInfo = () => {
    handleDialogClose()
    getPackageInfo({
      item_name: packageName,
      is_cod: isCOD,
      package: packageTypes[selectedPackage]
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
        <DialogTitle>Package Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={'Package Name'}
            type="text"
            name={"packageName"}
            value={packageName}
            onChange={(event) => {
              setPackageName(event.target.value)
            }}
            fullWidth
          />

          <br />
          <Typography gutterBottom variant="h6" component="h3">
            {'Package Size'}
          </Typography>
          <GridList className={classes.gridList} cols={2.5} spacing={8} cellHeight={'auto'}>
            {packageTypes.map((packageType, index) => (
              <GridListTile key={index}
                onClick={() => {
                  setSelectedPackage(index)
                }}
              >
                <Package
                  packageInfo={packageType}
                  isSelected={selectedPackage === index}
                />
              </GridListTile>
            ))}
          </GridList>

          <FormControlLabel
            control={
              <Checkbox
                onChange={() => {
                  setIsCOD(!isCOD)
                }}
                name="checkedF"
              />
          }
          label="Cash on Delivery"
        />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={savePackageInfo} color="primary">
            Save Item Details
          </Button>
        </DialogActions>
        </Dialog>     
    </Fragment>   
  );
}

PackageDialog.defaultProps = {
  btnText: 'Set Package',
  isOpen: false
}

PackageDialog.propTypes = {
  getPackageInfo: PropTypes.func.isRequired,
  btnText: PropTypes.string,
  isOpen: PropTypes.bool,
}

export default PackageDialog;
