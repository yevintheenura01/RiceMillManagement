import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import { TextField, Button, Typography, Grid, Paper } from '@mui/material';
import Emnav from '../emnav/emnav';
import Eheader from '../eheader/eheader';

function SalaryAddUser() {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        basicsalary: "",
        othours: "",
        AmountOTH: "",
        bonus: "",
        totalsalary: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        let updatedErrors = { ...errors };
        // Basic validation
        if (name === "basicsalary") {
            // Ensure only numbers with optional decimal point are entered
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

        // Update the specific field being changed
        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Calculate total salary if the bonus field is changing
        if (name === "bonus") {
            let totalSalary = (parseFloat(inputs.basicsalary || 0) * 100) + 
                             (parseFloat(inputs.othours || 0) * parseFloat(inputs.AmountOTH || 0)) * 100 + 
                             (parseFloat(value || 0) * 100);

            // Update the total salary field
            setInputs(prevState => ({
                ...prevState,
                totalsalary: isNaN(totalSalary) ? "" : (totalSalary / 100).toFixed(2) // Convert to string with 2 decimal places
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            try {
                // Send data to the server
                await axios.post("http://localhost:5000/saddusers", {
                    basicsalary: String(inputs.basicsalary),
                    othours: String(inputs.othours),
                    AmountOTH: Number(inputs.AmountOTH),
                    bonus: String(inputs.bonus),
                    totalsalary: inputs.totalsalary
                });
                toast.success("Successfully Added!");
                history('/screate');
            } catch (err) {
                console.error(err);
                toast.error("Failed to add user");
            }
        } else {
            toast.error("Please fix validation errors before submitting.");
        }
    };

    return (
        <div><Eheader />
            <Emnav />
            <Grid container justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                        <Typography variant="h4" align="center" gutterBottom>CALCULATE PAYROLL</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Basic Salary (LKR)"
                                name="basicsalary"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={inputs.basicsalary}
                                required
                                error={!!errors.basicsalary}
                                helperText={errors.basicsalary}
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                label="OT Hours"
                                name="othours"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={inputs.othours}
                                required
                                error={!!errors.othours}
                                helperText={errors.othours}
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                label="Amount for OT (LKR)"
                                name="AmountOTH"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={inputs.AmountOTH}
                                required
                                error={!!errors.AmountOTH}
                                helperText={errors.AmountOTH}
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                label="Bonus (LKR)"
                                name="bonus"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={inputs.bonus}
                                required
                                error={!!errors.bonus}
                                helperText={errors.bonus}
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                label="Total Salary (LKR)"
                                name="totalsalary"
                                type="text"
                                fullWidth
                                value={inputs.totalsalary}
                                readOnly
                                variant="outlined"
                                margin="normal"
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth mt={2}>Submit</Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default SalaryAddUser;
