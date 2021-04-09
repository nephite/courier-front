import React from "react";
import {
  makeStyles,
  Dialog,
  DialogTitle,
  IconButton,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  InputAdornment
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { ADDRESS } from "constants/address";
const useStyles = makeStyles(theme => ({
  dialog: {
    backgroundColor: "#fff",
    padding: "18px 48px 32px",
    height: "100vh",
    overflowY: "scroll"
  },
  header: {
    fontSize: 24,
    fontWeight: 600,
    fontFamily: "Ubuntu",
    color: "#333",
    textTransform: "uppercase",
    padding: 12
  },
  closeBtn: {
    position: "absolute",
    right: 0
  },
  field: {
    fontSize: 12,
    textTransform: "capitalize"
  },
  label: {
    fontSize: 12,
    fontFamily: "Ubuntu"
  },
  btnSave: {
    backgroundColor: "#EAB543",
    color: "#fff"
  }
}));

const DeliveryDetails = props => {
  const classes = useStyles();
  const { delivery, setDelivery, state, setState } = props;
  const [formHasErrors, setFormHasErrors] = React.useState(true);
  const [isFormEnough, setIsFormEnough] = React.useState(false);
  const [values, setValues] = React.useState({
    full_name: "",
    province: "",
    city: "",
    district: "",
    cellphone_no: "",
    street: "",
    landmarks: ""
  });

  const [error, setError] = React.useState({
    full_name: "",
    province: "",
    city: "",
    district: "",
    cellphone_no: "",
    street: "",
    landmarks: ""
  });

  const handleClose = () => {
    setState({ openDialog: false });
  };

  const setDeliveryDetails = (value, name) => {
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const getProvinces = () => {
    let provinces = [];
    for (var i in ADDRESS) {
      provinces.push(<MenuItem value={i}>{i}</MenuItem>);
    }
    return provinces;
  };

  const getCities = () => {
    let cities = [];
    if (values.province in ADDRESS) {
      for (var i in ADDRESS[values.province]["Municipality_list"]) {
        cities.push(<MenuItem value={i}>{i}</MenuItem>);
      }
    }
    return cities;
  };

  const getBarangay = () => {
    let baranggays = [];
    if (values.province in ADDRESS) {
      if (values.city in ADDRESS[values.province]["Municipality_list"]) {
        let baranggay_list =
          ADDRESS[values.province]["Municipality_list"][values.city][
            "Barangay_list"
          ];
        for (var i = 0; i < baranggay_list.length; i++) {
          baranggays.push(
            <MenuItem value={baranggay_list[i]}>{baranggay_list[i]}</MenuItem>
          );
        }
      }
    }
    return baranggays;
  };

  function handleSave() {
    if (state.key === "sender") {
      setDelivery({ ...delivery, sender: values });
    } else if (state.key === "recipient") {
      setDelivery({ ...delivery, recipient: values });
    }
  }

  React.useEffect(() => {
    if (state.open && state.key === "sender") {
      setValues({ ...delivery, sender: delivery.sender });
    } else if (state.open && state.key === "recipient") {
      setValues({ ...delivery, recipient: delivery.recipient });
    }
  }, [state.open]);

  React.useEffect(() => {
    setIsFormEnough(
      values.full_name &&
        values.province &&
        values.city &&
        values.district &&
        values.cellphone_no &&
        values.street &&
        values.landmarks
    );
  }, [values]);

  React.useEffect(() => {
    for (let e in error) {
      if (error[e].length > 0) {
        setFormHasErrors(true);
        return;
      }
    }
    setFormHasErrors(false);
  }, [error]);
  return (
    <Dialog
      open={state.openDialog}
      onClose={handleClose}
      fullWidth
      fullWidth="sm"
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={classes.header}>INPUT {state.key} DETAILS</div>
        <IconButton className={classes.closeBtn} onClick={() => handleClose()}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.dialog}>
        <TextField
          style={{ paddingBottom: "3vh" }}
          label={<div className={classes.label}>Street Address</div>}
          fullWidth
          value={values.sender_street}
          error={error.street}
          helperText={error.street}
          onChange={e => {
            setDeliveryDetails(e.target.value, "street");
            if (e.target.value === "") {
              setError({ ...error, street: "This field is required." });
            } else {
              setError({ ...error, street: "" });
            }
          }}
          onBlur={e => {
            if (e.target.value === "") {
              setError({ ...error, street: "This field is required." });
            } else {
              setError({ ...error, street: "" });
            }
          }}
        />
        <TextField
          select
          style={{ paddingBottom: "3vh" }}
          label={<div className={classes.label}>Province</div>}
          fullWidth
          value={values.province}
          onChange={e => setDeliveryDetails(e.target.value, "province")}
        >
          {getProvinces()}
        </TextField>

        <TextField
          select
          style={{ paddingBottom: "3vh" }}
          label={<div className={classes.label}>City</div>}
          fullWidth
          disabled={values.province === "" ? true : false}
          value={values.city}
          onChange={e => setDeliveryDetails(e.target.value, "city")}
        >
          {getCities()}
        </TextField>

        <TextField
          select
          style={{ paddingBottom: "3vh" }}
          label={<div className={classes.label}>Barangay / District</div>}
          fullWidth
          disabled={values.city === "" ? true : false}
          value={values.district}
          onChange={e => setDeliveryDetails(e.target.value, "district")}
        >
          {getBarangay()}
        </TextField>

        <TextField
          style={{ paddingBottom: "3vh" }}
          label={
            <div className={classes.label}>
              Other Location Details (Landmark, Floor/Unit no, .etc)
            </div>
          }
          fullWidth
          value={values.landmarks}
          onChange={e => setDeliveryDetails(e.target.value, "landmarks")}
        />

        <TextField
          style={{ paddingBottom: "3vh" }}
          label={<div className={classes.field}>{state.key}'s Name</div>}
          fullWidth
          value={values.full_name}
          error={error.full_name}
          helperText={error.full_name}
          onChange={e => {
            setDeliveryDetails(e.target.value, "full_name");
            if (e.target.value === "") {
              setError({ ...error, full_name: "This field is required." });
            } else {
              setError({ ...error, full_name: "" });
            }
          }}
          onBlur={e => {
            if (e.target.value === "") {
              setError({ ...error, full_name: "This field is required." });
            } else {
              setError({ ...error, full_name: "" });
            }
          }}
        />

        <TextField
          style={{ paddingBottom: "3vh" }}
          label={
            <div className={classes.field}>{state.key}'s Mobile Number</div>
          }
          fullWidth
          value={values.cellphone_no}
          type="number"
          inputProps={{ maxLength: 10 }}
          error={error.cellphone_no}
          helperText={error.cellphone_no}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+63</InputAdornment>
            )
          }}
          onChange={e => {
            setDeliveryDetails(e.target.value, "cellphone_no");
            if (e.target.value === "") {
              setError({ ...error, cellphone_no: "This field is required." });
            } else {
              setError({ ...error, cellphone_no: "" });
            }
          }}
          onBlur={e => {
            if (e.target.value === "") {
              setError({ ...error, cellphone_no: "This field is required." });
            } else {
              setError({ ...error, cellphone_no: "" });
            }
          }}
        />
      </div>

      <div style={{ padding: "24px 48px" }}>
        <Button
          variant="contained"
          className={classes.btnSave}
          disableElevation
          fullWidth
          size="large"
          disabled={!isFormEnough || formHasErrors}
          onClick={handleSave}
        >
          Save Sender Details
        </Button>
      </div>
    </Dialog>
  );
};

export default DeliveryDetails;
