import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Emnav from '../emnav/emnav';
import Eheader from '../eheader/eheader';
import { TextField, Button, CircularProgress, Grid, Typography, Container, Paper } from '@mui/material';

function SalaryUpdate() {
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/saddusers/${id}`);
        setInputs(response.data.user);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data. Please try again.");
        setIsLoading(false);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/saddusers/${id}`, inputs);
      toast.success('Update successful!');
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Error updating user. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedErrors = { ...errors };

    // Basic validation
    if (name === "basicsalary") {
      // Ensure only numbers are entered and length is at least 5
      if (!/^\d*$/.test(value) || value.length < 5) {
        updatedErrors.basicsalary = "Basic salary must be at least 5 digits long and contain only numbers.";
      } else {
        delete updatedErrors.basicsalary;
      }
    } else if (name === "othours") {
      // Ensure only integer values are entered
      if (!/^\d*$/.test(value)) {
        updatedErrors.othours = "OT hours must be an integer.";
      } else {
        delete updatedErrors.othours;
      }
    } else if (name === "AmountOTH" || name === "bonus") {
      // Ensure only numbers with optional decimal point are entered
      if (!/^\d*\.?\d*$/.test(value)) {
        updatedErrors[name] = "This field must contain only numbers.";
      } else {
        delete updatedErrors[name];
      }
    }

    setErrors(updatedErrors);

    setInputs(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Recalculate total salary
    let basicsalary = parseFloat(name === "basicsalary" ? value : inputs.basicsalary || 0);
    let othours = parseFloat(name === "othours" ? value : inputs.othours || 0);
    let AmountOTH = parseFloat(name === "AmountOTH" ? value : inputs.AmountOTH || 0);
    let bonus = parseFloat(name === "bonus" ? value : inputs.bonus || 0);

    let totalSalary = basicsalary + (othours * AmountOTH) + bonus;

    setInputs(prevState => ({
      ...prevState,
      totalsalary: isNaN(totalSalary) ? "" : totalSalary.toFixed(2)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      await sendRequest();
      window.location.assign('/screate');
    } else {
      toast.error("Please fix validation errors before submitting.");
    }
  };

  return (
    <div>
      <Eheader />
      <Emnav />
      <Container maxWidth="md" style={{ marginTop: '2rem' }}>
        <Paper elevation={3} style={{ padding: '2rem' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Update Salary Details
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Basic Salary"
                  name="basicsalary"
                  value={inputs.basicsalary || ""}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errors.basicsalary}
                  helperText={errors.basicsalary}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="OT Hours"
                  name="othours"
                  value={inputs.othours || ""}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errors.othours}
                  helperText={errors.othours}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Amount for OT"
                  name="AmountOTH"
                  value={inputs.AmountOTH || ""}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errors.AmountOTH}
                  helperText={errors.AmountOTH}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Bonus"
                  name="bonus"
                  value={inputs.bonus || ""}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errors.bonus}
                  helperText={errors.bonus}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Total Salary"
                  name="totalsalary"
                  value={inputs.totalsalary || ""}
                  readOnly
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

export default SalaryUpdate;
