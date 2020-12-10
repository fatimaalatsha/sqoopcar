//import React from "react";
import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link ,withRouter,Route,BrowserRouter } from "react-router-dom" ;

import { styled } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Header from "./header.jsx";
import Box from "@material-ui/core/Box";

const Mypaper = styled(Paper)({
  margin: "50px",
  width: 510,
  height: 500,
});

const MyButton = styled(Button)({
  width: 100,
  margin: "auto",
  backgroundColor: "#0A194F",
  color: "#F9FBE7",
});
// const profile = require('./profileBackend')

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

var MyBox = styled(Box)({
  backgroundColor: "#0A194F",
});

function NaveBar() {
  const classes = useStyles();
  return (
    <div className={classes.root} >
      <MyBox>
        <Header />
        <Grid
          alignItems="center"
          alignContent="center"
          container
          direction="row"
          justify="center"
          alignItems="center">
          <Mypaper>
            <Typography
              component="div"
              style={{
                height: "50vh",
                width: "50vh",
                color: "#0A194F",
                fontStyle: "italic",
                fontSize: 30,
                padding: "60px 60px 60px 60px",
              }}>
              <pre>
                <b>CarSooq</b>
              </pre>
              <br></br>
              Welcome to CarSooq where you can easily pick your dream car!
            </Typography>
            <form>
              <MyButton
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogoutClick}>
                Log Out
              </MyButton>
            </form>
          </Mypaper>
        </Grid>
      </MyBox>
      <Typography align="center" variant="subtitle1" color="primary">
        &copy;{new Date().getFullYear()} CarSooq | All right reserved | Terms Of
        Service | Privacy
      </Typography>
    </div>
  );
}

//when user clcks on logout => dlete token from local storage
function handleLogoutClick(e) {
  e.preventDefault();
  localStorage.clear();
  window.location = "http://localhost:3000/";
}

export default withRouter(NaveBar)