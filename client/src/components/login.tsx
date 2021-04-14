import { Button, FormLabel, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import {
  IUserRegRequst,
  IUserRegErrResponse,
  ILoginReq,
} from "../api/interfaces";
import { loginPost } from "../api/http.util";
import { InputLabel } from "@material-ui/core";

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

const Login = () => {
  const classes = useStyles();
  const [formValues, setFormValues] = useState<ILoginReq>({
    username: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const submitLogin = async (formValues: ILoginReq) => {
    try {
      const res = await loginPost(formValues);
      if (res.status >= 200 && res.status < 400) {
        setIsError(false);
        window.localStorage.setItem("token", res.data.access_token);
      }
    } catch (error) {
      setIsError(true);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          {isError && (
            <InputLabel
              variant="outlined"
              margin="dense"
              required
              id="error"
              error={true}
              disabled={true}
            >
              Incorrect Username or password
            </InputLabel>
          )}
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
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="password"
            name="password"
            type="password"
            onChange={handleChange}
            autoComplete="name"
            autoFocus
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              submitLogin(formValues);
            }}
          >
            Registration
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
