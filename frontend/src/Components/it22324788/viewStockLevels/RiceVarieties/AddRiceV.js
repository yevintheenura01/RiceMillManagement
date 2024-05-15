import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, TextField, Button, Container, Grid } from "@mui/material";

function AddRiceV() {
  const history = useNavigate();
  const [varietyName, setVarietyName] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setVarietyName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest();
      setVarietyName(""); // Clear input field after successful submission
      history("/riceVarieties");
    } catch (error) {
      setError("Error adding variety. Please try again."); // Display error message
    }
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/varieties", {
      varietyName: varietyName,
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add Variety
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              label="Variety Name"
              variant="outlined"
              fullWidth
              value={varietyName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Add
            </Button>
          </Grid>
        </Grid>
        {error && (
          <Typography variant="body1" color="error" align="center">
            {error}
          </Typography>
        )}
      </form>
    </Container>
  );
}

export default AddRiceV;
