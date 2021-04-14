import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Snackbar from "@material-ui/core/Snackbar";
import { useState } from "react";
import { IUserRegRequst, IUserRegErrRes } from "../api/interfaces";
import { registrationPost } from "../api/http.util";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Görög noFap István "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Registration = () => {
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [formValues, setFormValues] = useState<IUserRegRequst>({
    username: "",
    name: "",
    gender: "FEMALE",
    birthDate: new Date("2002-05-24"),
    password: "",
    confirmPassword: "",
  });

  const [errorValues, setErrorValues] = useState<IUserRegErrRes>({
    username: "",
    name: "",
    password: "",
    birthDate: "",
    gender: "",
    confirmPassword: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorValues({
      ...errorValues,
      [e.currentTarget.id]: "",
    });
    setFormValues({
      ...formValues,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };
  const onGender = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValues({ ...formValues, gender: e.currentTarget.value });
  };

  const handleCloseSnackBar = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };
  const submitRegistration = async (formValues: IUserRegRequst) => {
    try {
      const res: Response = await registrationPost(formValues);
      if (res.status > 199 && res.status < 400) {
        setOpenSnackBar(true);
      }
    } catch (error) {
      console.log("response error: ", error.response.data.message);
      let errors = errorValues;
      error.response.data.message.forEach((element: any) => {
        errors = { ...errors, [element.fieldName]: element.message };
      });
      setErrorValues(errors);
      console.log("result usestate Errvalue: ", errorValues);
    }
  };
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Registration
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="username"
            name="username"
            autoComplete="username"
            onChange={handleChange}
            autoFocus
            error={
              (errorValues.username.length > 0 ? true : false) &&
              Boolean(true) &&
              Boolean(true)
            }
            helperText={
              (errorValues.username.length > 0 ? true : false) &&
              errorValues.username
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="name"
            name="name"
            error={errorValues.name.length > 0 && Boolean(true)}
            helperText={errorValues.name.length > 0 && errorValues.name}
            onChange={handleChange}
            autoComplete="name"
            autoFocus
          />
          <TextField
            variant="outlined"
            id="date"
            label="Birthday"
            type="date"
            required
            fullWidth
            error={
              errorValues.name.length > 0 && Boolean(true) && Boolean(true)
            }
            helperText={errorValues.name.length > 0 && errorValues.name}
            defaultValue="2002-05-24"
            InputLabelProps={{
              shrink: true,
            }}
            autoFocus
            onChange={handleChange}
          />
          <RadioGroup
            aria-label="gender"
            name="gender2"
            value={formValues.gender}
            onChange={onGender}
          >
            <FormControlLabel
              value="FEMALE"
              control={<Radio color="primary" />}
              label="Female"
              labelPlacement="start"
            />
            <FormControlLabel
              value="MALE"
              control={<Radio color="primary" />}
              label="Male"
              labelPlacement="start"
            />
            <FormControlLabel
              value="OTHERS"
              control={<Radio color="primary" />}
              label="Others"
              labelPlacement="start"
            />
          </RadioGroup>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={errorValues.password.length > 0 && Boolean(true)}
            helperText={errorValues.password.length > 0 && errorValues.password}
            autoComplete="current-password"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            onChange={handleChange}
            error={errorValues.confirmPassword.length > 0 ? true : false}
            helperText={
              errorValues.confirmPassword.length > 0 &&
              errorValues.confirmPassword
            }
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              //  setErrorValues({ ...errorValues, username: "username hibas" });
              submitRegistration(formValues);
              //  console.log("errorooook ", errorValues);
              //   console.log(errorValues.confirmPassword.length > 0);
              // const res = await Post(formValues);
              // console.log(res);
              // setErrorValues({ ...errorValues, ...res });
            }}
          >
            Registration
          </Button>
          <Snackbar
            open={openSnackBar}
            autoHideDuration={6000}
            onClose={handleCloseSnackBar}
          >
            <Alert severity="success">The registration was succesful!</Alert>
          </Snackbar>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Registration;
