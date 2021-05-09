import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createUser } from "../service/fetchApi";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import schema from "../service/yupSchema";
import { Formik, Form } from "formik";
import { updateProfile } from "../service/fetchApi";
const SignIn = ({
  doLogIn,
  isConnected,
  setUserProfile,
  title,
  userProfile = {},
  userToken,
}) => {
  const passInput = useRef(null);
  const passConfInput = useRef(null);
  const mailInput = useRef(null);
  const fnameInput = useRef(null);
  const lnameInput = useRef(null);

  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const doSignUp = async (email, password, fname, lname) => {
    if (!isConnected) {
      await createUser(email, password, fname, lname);
      doLogIn(email, password);
      handleClose();
    } else {
      if (password === "") {
        password = (prevState) => ({ ...prevState.userProfile.password });
      }

      const newProfile = await updateProfile(
        { email, password, fname, lname },
        userToken
      );
      console.log(newProfile);
      await setUserProfile(newProfile);
      handleClose();
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        className="editbt"
        color="primary"
        onClick={handleClickOpen}
      >
        {title}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        className={classes.root}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> {title} details</DialogTitle>
        <Formik
          initialValues={{
            fname: isConnected ? userProfile.fname : "",
            lname: isConnected ? userProfile.lname : "",
            email: isConnected ? userProfile.email : "",
            password: isConnected ? userProfile.email : "",
            passwordConfirmation: isConnected ? userProfile.email : "",
          }}
          validationSchema={schema}
          onSubmit={(values, actions) => {
            console.log(fnameInput.current.value);
            doSignUp(
              mailInput.current.value,
              passInput.current.value,
              fnameInput.current.value,
              lnameInput.current.value
            ).catch((e) => {
              console.log(e);
              actions.setFieldError("emailerr", e.message);
            });
          }}
        >
          {({ errors, handleChange, touched }) => (
            <Form className={classes.form}>
              <DialogContent className={classes.root}>
                <div className={classes.details}>
                  <TextField
                    autoFocus
                    margin="normal"
                    error={errors.fname && touched.fname}
                    id="fname"
                    defaultValue={isConnected ? userProfile.fname : ""}
                    name="fname"
                    label="first name"
                    type="text"
                    size="small"
                    onChange={handleChange}
                    inputRef={fnameInput}
                    className={classes.MuiFormControl}
                    helperText={
                      errors.fname && touched.fname ? errors.fname : null
                    }
                  />
                  <TextField
                    autoFocus
                    margin="normal"
                    error={errors.lname && touched.lname}
                    id="lname"
                    label="last name"
                    type="text"
                    size="small"
                    name="lname"
                    defaultValue={isConnected ? userProfile.lname : ""}
                    onChange={handleChange}
                    inputRef={lnameInput}
                    className={classes.MuiFormControl}
                    helperText={
                      errors.lname && touched.lname ? errors.lname : null
                    }
                  />
                  <TextField
                    autoFocus
                    error={errors.email && touched.email}
                    margin="normal"
                    id="email"
                    label="Email Address"
                    type="email"
                    name="email"
                    defaultValue={!isConnected ? userProfile.email : ""}
                    size="small"
                    onChange={handleChange}
                    inputRef={mailInput}
                    className={isConnected ? "none" : classes.MuiFormControl}
                    helperText={
                      (errors.email && touched.email ? errors.email : null) ||
                      errors.emailerr
                        ? errors.emailerr
                        : null
                    }
                  />

                  <TextField
                    autoFocus
                    error={errors.password && touched.password}
                    margin="normal"
                    id="password"
                    label="password"
                    type="text"
                    name="password"
                    onChange={handleChange}
                    inputRef={passInput}
                    size="small"
                    className={classes.MuiFormControl}
                    helperText={
                      errors.password && touched.password
                        ? errors.password
                        : null
                    }
                  />
                  <TextField
                    autoFocus
                    margin="normal"
                    id="passwordConfirmation"
                    label="passwordConfirmation"
                    type="text"
                    name="passwordConfirmation"
                    onChange={handleChange}
                    inputRef={passConfInput}
                    size="small"
                    className={classes.MuiFormControl}
                    error={
                      errors.passwordConfirmation &&
                      touched.passwordConfirmation
                    }
                    helperText={
                      errors.passwordConfirmation &&
                      touched.passwordConfirmation
                        ? errors.passwordConfirmation
                        : null
                    }
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  ok
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default SignIn;

const useStyles = makeStyles({
  "MuiDialog-paperScrollPaper": {
    " max-height": "500px",
  },

  root: {
    display: "flex",
  },

  details: {
    display: "flex",
    margin: "10px",
    width: "300px",
    "flex-direction": "column",
  },
  logoutDiv: {
    width: "300px",
    display: "flex",
    "justify-content": "space-around",
  },

  MuiFormControl: {
    margin: "16px",
    "&$helperText": {
      color: red,
    },
  },
});
