import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Typography,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Head from "../Header/Header";
import LocIMG from "./location-01.jpg";

const URL = "http://localhost:5000/location";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ManageLoc() {
  const [location, setLocation] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setLocation(data.location));
  }, []);

  const deleteHandler = async (_id) => {
    try {
      await axios.delete(`${URL}/${_id}`);
      alert("Deleted Successfully");
      setLocation(location.filter((loc) => loc._id !== _id));
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  return (
    <div>
      <Head />
      <Typography variant="h3" gutterBottom>
        Manage Location
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <img src={LocIMG} alt="location map" style={{ maxWidth: "70%", height: "auto", marginLeft: "1em" }} />
        </Grid>
      </Grid>
      <br />
      <Link to="/addLocation">
        <Button variant="contained" color="primary" style={{ width: "13em", height: "2em", fontSize: "15px", marginLeft: "1em" }}>
          Add location
        </Button>
      </Link>
      <TableContainer component={Paper} style={{ width: "65%", margin: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" style={{ color: "black", fontWeight: "bold" }}>
                  ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" style={{ color: "black", fontWeight: "bold" }}>
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" style={{ color: "black", fontWeight: "bold" }}>
                  Capacity
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" style={{ color: "black", fontWeight: "bold" }}>
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <tbody>
            {location.map((loc) => (
              <LocationV key={loc._id} Location={loc} deleteHandler={deleteHandler} />
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

function LocationV({ Location, deleteHandler }) {
  const { _id, locationName, capacity } = Location || {};

  return (
    <TableRow>
      <TableCell>{_id}</TableCell>
      <TableCell>{locationName}</TableCell>
      <TableCell>{capacity}</TableCell>
      <TableCell>
        <Box display="flex" alignItems="center">
          <Link to={`/manageLocation/${_id}`}>
            <IconButton size="small" color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton size="small" color="error" onClick={() => deleteHandler(_id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default ManageLoc;
