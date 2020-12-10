import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Header from "./header.jsx";

var MyInput = styled(TextField)({
  color: "#0A194F",
  width: 200,
  margin: "0px 0px 30px 30px",
});

var MyTextField = styled(TextField)({
  color: "#0A194F",
  width: 400,
  margin: "20px 40px 10px 50px",
});

const MyButton = styled(Button)({
  width: 100,
  margin: "auto",
  backgroundColor: "#0A194F",
  color: "#F9FBE7",
});

var Mypaper = styled(Paper)({
  width: 510,
  height: 550,
  margin: "100px",
});

var MyBox = styled(Box)({
  backgroundColor: "#0A194F",
});

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    };
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.submitHandle = this.submitHandle.bind(this);
  }
  onChangeHandle(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  submitHandle(e) {
  //  console.log(this.state.firstName, this.state.lastName);
    var user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    if (
      user.firstName == "" ||
      user.lastName == "" ||
      user.username == "" ||
      user.email == ""
    ) {
      alert("Please fill in a valid value for all required fields!");
    }
    if (0 < user.password.length && user.password.length < 8) {
      alert("Your password is too short, try to make it 8 chars or more!");
    } else {

          $.ajax({
            url: "/signup",
            method: "POST",
            data: JSON.stringify(user),
            contentType: "application/json",
            success: (data) => {
              console.log(data, "post method successeded ");
              window.location = "/login";
            },
            error: (err) => {
              console.log(err, "Sign up post method failed");
             }
          })
        }
  }

  //render the signup form
  render() {
    return (
      <MyBox>
        <Header />
        <div>
          <Grid
            alignItems="center"
            alignContent="center"
            container
            direction="row"
            alignItems="center"
            justify="center">
            <Mypaper>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <img
                  src="https://scontent.famm5-1.fna.fbcdn.net/v/t1.0-9/128255422_227091088758997_7058702321390752154_n.jpg?_nc_cat=108&ccb=2&_nc_sid=730e14&_nc_eui2=AeEqFQYaN_ad4f9gK-R_00w0xeq3jpBC8OPF6reOkELw4wT-RH0yveh5W6rCgR4sTojyscWbVB4AC485fRaU9tmG&_nc_ohc=ige5aDJwuj0AX_nHzs2&_nc_oc=AQmh70KqaJc_XuRjsXfrEZ2TFCRNhUgAlWxjabqZ2UOrLvolXf7W1N34wTttPuSPf14&_nc_ht=scontent.famm5-1.fna&oh=aaea198d1eb4f019d2c150895411b2c1&oe=5FE68806"
                  width="150"
                  height="70"></img>
              </div>
              <form>
                <p>
                  <MyInput
                    id="outlined-basic"
                    label="First name"
                    variant="outlined"
                    name="firstName"
                    onChange={this.onChangeHandle}
                  />
                  <MyInput
                    id="outlined-basic"
                    label="Last name"
                    variant="outlined"
                    name="lastName"
                    onChange={this.onChangeHandle}
                  />
                </p>
                <MyTextField
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  name="username"
                  onChange={this.onChangeHandle}
                />
                <MyTextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  onChange={this.onChangeHandle}
                />
                <MyTextField
                  id="outlined-basic"
                  label="Password"
                  type="password"
                  variant="outlined"
                  name="password"
                  onChange={this.onChangeHandle}
                />
                <MyButton
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={this.submitHandle}>
                  Sign Up
                </MyButton>
              </form>
            </Mypaper>
          </Grid>
          <Typography align="center" variant="subtitle1" color="primary">
            &copy;{new Date().getFullYear()} CarSooq | All right reserved |
            Terms Of Service | Privacy
          </Typography>
        </div>
      </MyBox>
    );
  }
}