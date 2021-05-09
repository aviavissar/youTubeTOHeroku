import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const LogIn = ({ userProfile, isConnected, doLogIn, doLogout, errMesg }) => {
  const passInput = useRef(null);
  const mailInput = useRef(null);

  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {!isConnected ? (
        <Button
          className={classes.MuiButton}
          variant="outlined"
          color="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          LogIn
        </Button>
      ) : (
        <div className={classes.logoutDiv}>
          <Button variant="outlined" color="primary" onClick={doLogout}>
            logOut
          </Button>
          <div className="hi-div">
            <span>hi {userProfile.fname}</span>
          </div>
        </div>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        className={classes.root}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">log In</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please enter your email address and password
            <br />
            <span className="errmsg"> {errMesg}</span>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            size="small"
            inputRef={mailInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="password"
            type="password"
            error={false}
            inputRef={passInput}
            size="small"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              doLogIn(mailInput.current.value, passInput.current.value).then(
                (res) => {
                  if (res) handleClose();
                }
              );
            }}
          >
            login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LogIn;

const useStyles = makeStyles({
  root: {
    width: "320px",
  },
});
