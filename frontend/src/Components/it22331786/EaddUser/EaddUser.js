import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextField, Button, Checkbox, FormControlLabel, RadioGroup, Radio, FormControl, FormLabel, IconButton, InputAdornment, Grid, Typography, Container, Paper, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Emnav from '../emnav/emnav';
import Eheader from '../eheader/eheader';

function EaddUser() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ 
        username: "",
        name: "",
        NIC: "",
        Gender: "",
        Email: "",
        DOB: null,
        password: "",
        contactno: "",
        includeV: false, 
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === 'includeV') {
            setInputs((prevState) => ({
                ...prevState,
                [name]: checked,
            }));
        } else {
            setInputs((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleDOBChange = (date) => {
        setInputs((prevState) => ({
            ...prevState,
            DOB: date,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            sendRequest().then(() => {
                navigate('/ecreate');
                toast.success("Successfully Added!");
            }).catch(error => {
                toast.error("Error adding user. Please try again.");
            });
        }
    };

    const validate = () => {
        let isValid = true;
        const errors = {};

        if (!inputs.username.trim()) {
            errors.username = "User Name is required";
            isValid = false;
        }

        if (!inputs.name.trim()) {
            errors.name = "Name is required";
            isValid = false;
        }

        if (!inputs.NIC.trim()) {
            errors.NIC = "NIC is required";
            isValid = false;
        } else if (!(/^(?:\d{9}(?:V|v)?|\d{12})$/.test(inputs.NIC.trim()))) {
            errors.NIC = "NIC should be a 9-digit number optionally followed by 'V' or a 12-digit number";
            isValid = false;
        }

        if (!inputs.Gender.trim()) {
            errors.Gender = "Gender is required";
            isValid = false;
        }

        if (!inputs.Email.trim()) {
            errors.Email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(inputs.Email.trim())) {
            errors.Email = "Invalid Email format";
            isValid = false;
        }

        if (!inputs.DOB) {
            errors.DOB = "Date of Birth is required";
            isValid = false;
        }

        const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$&*]).{6,}$/;
        if (!inputs.password.trim()) {
            errors.password = "Password is required";
            isValid = false;
        } else if (!passwordPattern.test(inputs.password.trim())) {
            errors.password = "Password must be at least 6 characters long and include at least one uppercase letter and one symbol";
            isValid = false;
        }

        if (!inputs.contactno.trim()) {
            errors.contactno = "Contact No is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(inputs.contactno.trim())) {
            errors.contactno = "Invalid Contact No format";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/eusers", {
            username: inputs.username.trim(),
            name: inputs.name.trim(),
            NIC: inputs.includeV ? `${inputs.NIC.trim()}V` : Number(inputs.NIC.trim()),
            Gender: inputs.Gender.trim(),
            Email: inputs.Email.trim(),
            DOB: inputs.DOB,
            password: inputs.password.trim(),
            contactno: Number(inputs.contactno.trim()),
        }).then(res => res.data);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh', padding: 2 }}>
            <Eheader />
            <Emnav />
            <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
                <Paper elevation={3} sx={{ padding: '2rem' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        ADD EMPLOYEE DETAILS
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="User Name"
                                    name="username"
                                    value={inputs.username}
                                    onChange={handleChange}
                                    required
                                    color="primary"
                                />
                                {errors.username && <Typography color="error">{errors.username}</Typography>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    value={inputs.name}
                                    onChange={handleChange}
                                    required
                                    color="primary"
                                />
                                {errors.name && <Typography color="error">{errors.name}</Typography>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="NIC"
                                    name="NIC"
                                    value={inputs.NIC}
                                    onChange={handleChange}
                                    required
                                    color="primary"
                                />
                                {errors.NIC && <Typography color="error">{errors.NIC}</Typography>}
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox checked={inputs.includeV} onChange={handleChange} name="includeV" />}
                                    label="'V'"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup row name="Gender" value={inputs.Gender} onChange={handleChange}>
                                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                    </RadioGroup>
                                </FormControl>
                                {errors.Gender && <Typography color="error">{errors.Gender}</Typography>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="Email"
                                    value={inputs.Email}
                                    onChange={handleChange}
                                    required
                                    color="primary"
                                />
                                {errors.Email && <Typography color="error">{errors.Email}</Typography>}
                            </Grid>
                            <Grid item xs={12}>
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
                                    customInput={<TextField fullWidth label="Date of Birth" />}
                                />
                                {errors.DOB && <Typography color="error">{errors.DOB}</Typography>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    label="Password"
                                    name="password"
                                    value={inputs.password}
                                    onChange={handleChange}
                                    required
                                    color="primary"
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
                                {errors.password && <Typography color="error">{errors.password}</Typography>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Contact No"
                                    name="contactno"
                                    value={inputs.contactno}
                                    onChange={handleChange}
                                    required
                                    color="primary"
                                />
                                {errors.contactno && <Typography color="error">{errors.contactno}</Typography>}
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" type="submit" fullWidth>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
}

export default EaddUser;
