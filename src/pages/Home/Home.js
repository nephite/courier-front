import React, { Fragment, useState } from "react";

import Page from "material-ui-shell/lib/containers/Page";
import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import AddressDialog from "./AddressDialog";
import PackageDialog from "./PackageDialog";

import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { StepButton } from "@material-ui/core";
import DeliveryDetails from "./DeliveryDetailsDialog";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#fff",
    padding: 36
  },
  header: {
    fontSize: 32,
    fontWeight: 500,
    color: "#333",
    fontFamily: "Ubuntu"
  },
  box: {
    marginTop: "4vh",
    border: "1px solid #d1d5dd",
    borderRadius: 4,
    padding: 4,
    width: "50%"
  }
}));

const steps = [
  { key: "sender", label: "Set Sender Info" },
  { key: "recipient", label: "Set Recipient Info" },
  { key: "package", label: "Set Package Details" }
];
const HomePage = () => {
  const classes = useStyles();
  const intl = useIntl();
  const [activeStep, setActiveStep] = React.useState(0);
  const [state, setState] = React.useState({
    openDialog: false,
    key: ""
  });

  const [delivery, setDelivery] = useState({
    sender: {
      full_name: "",
      province: "",
      city: "",
      district: "",
      cellphone_no: "",
      street: "",
      landmarks: ""
    },
    recipient: {
      full_name: "",
      province: "",
      city: "",
      district: "",
      cellphone_no: "",
      street: "",
      landmarks: ""
    }
  });

  return (
    <Page pageTitle={intl.formatMessage({ id: "home" })}>
      <Helmet>
        <title>{"e-lamove | Home"}</title>
      </Helmet>
      <div className={classes.root}>
        <div className={classes.header}>Delivery</div>
        <div className={classes.box}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((item, index) => {
              return (
                <Step key={index}>
                  <StepButton
                    onClick={() =>
                      setState({ openDialog: true, key: item.key })
                    }
                    style={{ padding: "18px 8px" }}
                  >
                    {item.label}
                  </StepButton>
                </Step>
              );
            })}
          </Stepper>
        </div>
      </div>

      <DeliveryDetails
        delivery={delivery}
        setDelivery={setDelivery}
        state={state}
        setState={setState}
      />
    </Page>
  );
};
export default HomePage;
