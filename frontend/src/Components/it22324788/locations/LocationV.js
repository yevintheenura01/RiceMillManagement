import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TableCell, TableRow } from "@mui/material";

function LocationV({ Location }) {
  const { _id, locationName, capacity } = Location || {};
  const history = useNavigate();

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/location/${_id}`);
      alert("Deleted Successfully");
      history("/manageLocation", { replace: true });
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  return (
    <TableRow>
      <TableCell>{_id}</TableCell>
      <TableCell>{locationName}</TableCell>
      <TableCell>{capacity}</TableCell>
      <TableCell>
        <Link to={`/manageLocation/${_id}`}>
          <Button variant="contained" color="primary" style={{ width: "80px", height: "40px", marginRight: "10px" }}>
            Update
          </Button>
        </Link>
        <Button variant="contained" color="error" onClick={deleteHandler} style={{ width: "80px", height: "40px" }}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default LocationV;
