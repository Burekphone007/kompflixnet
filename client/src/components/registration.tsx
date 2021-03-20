import { useRouteMatch } from "react-router";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { useState } from "react";
import { MouseEvent } from "react";
import { Post, IUserRegRequst } from "../api/http.util";

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
  const [gender, setGender] = useState("female");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState();
  const [formValues, setFormValues] = useState<IUserRegRequst>({
    username: "",
    name: "",
    birthDate: new Date(),
    password: "",
  });

  const radioButton = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const genderName: string = e.currentTarget.value;
    setGender(genderName);
  };
  const onName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValues({ ...formValues, name: e.currentTarget.value });
  };
  const onPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValues({ ...formValues, password: e.currentTarget.value });
  };
  const onConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const confirmPw: string = e.currentTarget.value;
    setConfirmPassword(e.currentTarget.value);
  };
  const onUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValues({ ...formValues, username: e.currentTarget.value });
  };
  const onDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const getBirthDate: Date = new Date(e.currentTarget.value);
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
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="name"
            name="name"
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
            value={gender}
            onChange={radioButton}
          >
            <FormControlLabel
              value="female"
              control={<Radio color="primary" />}
              label="Female"
              labelPlacement="start"
            />
            <FormControlLabel
              value="male"
              control={<Radio color="primary" />}
              label="Male"
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
          />

          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              console.log(formValues);
              Post(formValues);
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
/**




export default function SignIn() {
  
} */
