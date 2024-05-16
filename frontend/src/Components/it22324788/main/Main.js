import React from 'react';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Assignment, Storage, Build, People, PersonOutline, MonetizationOn } from '@material-ui/icons';

import Head from "./MainHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(2),
    minWidth: 200,
  },
}));

function Main() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Head/>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3}>
            <Link to="/tharaka" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" className={classes.button} startIcon={<Assignment />}>
                Sales and Invoice
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3}>
            <Link to="/yevin" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" className={classes.button} startIcon={<Storage />}>
                Inventory Management
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3}>
            <Link to="/manoj" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" className={classes.button} startIcon={<Build />}>
                Production Management
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3}>
            <Link to="/nalinda" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" className={classes.button} startIcon={<People />}>
                HR Management
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3}>
            <Link to="/chathumin" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" className={classes.button} startIcon={<PersonOutline />}>
                CR Management
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3}>
            <Link to="/senuri" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" className={classes.button} startIcon={<MonetizationOn />}>
                Finance
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Main;
