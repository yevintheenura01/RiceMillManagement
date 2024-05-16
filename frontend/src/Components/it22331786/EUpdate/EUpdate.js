import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Emnav from '../emnav/emnav';
import Eheader from '../eheader/eheader';
import { TextField, Button, CircularProgress, Grid, Paper, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function EUpdate() {
  const history = useNavigate();
  const { id } = useParams();
  const [inputs, setInputs] = useState({
    username: "",
    name: "",
    NIC: "",
    Gender: "",
    Email: "",
    DOB: null,
    password: "",
    contactno: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/eusers/${id}`);
        setInputs(response.data.user);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };
    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleDOBChange = (date) => {
    setInputs((prevState) => ({
      ...prevState,
      DOB: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/eusers/${id}`, inputs);
      history('/ecreate');
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Eheader /><Emnav />
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            {isLoading ? (
              <div style={{ textAlign: 'center' }}>
                <CircularProgress />
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <TextField
                  label="User Name"
                  name="username"
                  value={inputs.username || ""}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
                
                <TextField
                  label="Name"
                  name="name"
                  value={inputs.name || ""}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
                
                <TextField
                  label="NIC"
                  name="NIC"
                  value={inputs.NIC || ""}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
                
                <TextField
                  label="Gender"
                  name="Gender"
                  value={inputs.Gender || ""}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
                
                <TextField
                  label="Email"
                  name="Email"
                  value={inputs.Email || ""}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
                
                <DatePicker
                  selected={inputs.DOB}
                  onChange={handleDOBChange}
                  dateFormat="dd/MM/yyyy"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  name="DOB"
                  placeholderText="Select DOB"
                  maxDate={new Date()}
                  required
                  customInput={<TextField fullWidth label="Date of Birth" margin="normal" />}
                />
                
                <TextField
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  name="password"
                  value={inputs.password || ""}
                  onChange={handleChange}
                  required
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  label="Contact No"
                  name="contactno"
                  value={inputs.contactno || ""}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
                
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                  Submit
                </Button>
              </form>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default EUpdate;