import { useRouteMatch } from "react-router";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { useState } from "react";
import { IUserRegRequst, IUserRegErrResponse } from "../api/interfaces";
import { Post } from "../api/http.util";

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

const Registration = () => {
  const [formValues, setFormValues] = useState<IUserRegRequst>({
    username: "",
    name: "",
    gender: "FEMALE",
    birthDate: new Date("2002-05-24"),
    password: "",
    confirmPassword: "",
  });

  const [errorValues, setErrorValues] = useState<IUserRegErrResponse>({
    username: { isInCorrect: false, errMessage: "" },
    name: { isInCorrect: false, errMessage: "" },
    password: { isInCorrect: false, errMessage: "" },
    birthDate: { isInCorrect: false, errMessage: "" },
    gender: { isInCorrect: false, errMessage: "" },
    confirmPassword: { isInCorrect: false, errMessage: "" },
  });

  const onGender = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValues({ ...formValues, gender: e.currentTarget.value });
  };
  const onName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setErrorValues({
      ...errorValues,
      name: { isInCorrect: false, errMessage: "" },
    });
    setFormValues({ ...formValues, name: e.currentTarget.value });
  };
  const onPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setErrorValues({
      ...errorValues,
      password: { isInCorrect: false, errMessage: "" },
    });
    setFormValues({ ...formValues, password: e.currentTarget.value });
  };
  const onConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setErrorValues({
      ...errorValues,
      confirmPassword: { isInCorrect: false, errMessage: "" },
    });
    setFormValues({ ...formValues, confirmPassword: e.currentTarget.value });
  };
  const onUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setErrorValues({
      ...errorValues,
      username: { isInCorrect: false, errMessage: "" },
    });
    setFormValues({ ...formValues, username: e.currentTarget.value });
  };
  const onDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const getBirthDate: Date = new Date(e.currentTarget.value);
    setErrorValues({
      ...errorValues,
      birthDate: { isInCorrect: false, errMessage: "" },
    });
    setFormValues({ ...formValues, birthDate: getBirthDate });
  };

  const { path } = useRouteMatch();
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
            onChange={onUsername}
            autoFocus
            error={errorValues.username.isInCorrect && Boolean(true)}
            helperText={
              errorValues.username.isInCorrect &&
              errorValues.username.errMessage
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
            error={errorValues.name.isInCorrect && Boolean(true)}
            helperText={
              errorValues.name.isInCorrect && errorValues.name.errMessage
            }
            onChange={onName}
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
            error={errorValues.birthDate.isInCorrect && Boolean(true)}
            helperText={
              errorValues.birthDate.isInCorrect &&
              errorValues.birthDate.errMessage
            }
            defaultValue="2002-05-24"
            InputLabelProps={{
              shrink: true,
            }}
            autoFocus
            onChange={onDate}
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
            error={errorValues.password.isInCorrect && Boolean(true)}
            helperText={
              errorValues.password.isInCorrect &&
              errorValues.password.errMessage
            }
            autoComplete="current-password"
            onChange={onPassword}
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
            onChange={onConfirmPassword}
            error={errorValues.confirmPassword.isInCorrect && Boolean(true)}
            helperText={
              errorValues.confirmPassword.isInCorrect &&
              errorValues.confirmPassword.errMessage
            }
          />

          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={async () => {
              const res = await Post(formValues);
              console.log(res);
              setErrorValues({ ...errorValues, ...res });
            }}
          >
            Registration
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Registration;
