import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { TextField, Button, Grid, Typography, Container, Paper } from '@material-ui/core';
import banner from './banner.jpg';
import Eheader from '../eheader/eheader';

function Home() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = () => {
    console.log("Searching for:", searchValue);
  };

  return (<div> <Eheader />
    <Container>
      <img src={banner} alt='Banner' style={{ width: '100%', marginBottom: '20px' }} />
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" align="center" gutterBottom>Employee Management System</Typography>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearchClick}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} sm={6}>
            <Link to="/ecreate" style={{ textDecoration: 'none' }}>
              <Button fullWidth variant="contained" color="primary" style={{ marginBottom: '10px' }}>
                Employee Generate Report
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Link to="/screate" style={{ textDecoration: 'none' }}>
              <Button fullWidth variant="contained" color="primary" style={{ marginBottom: '10px' }}>
                Salary Generate Report
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
    </div>
  );
}

export default Home;
