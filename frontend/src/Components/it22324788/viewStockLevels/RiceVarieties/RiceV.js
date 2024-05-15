import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TableRow, TableCell } from "@mui/material";

const RiceV = (props) => {
  const { _id, varietyName } = props.variety || {};
  const history = useNavigate();

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/varieties/${_id}`);
      history("/riceVarieties"); // Redirect to riceVarieties page after deletion
      alert("Deleted Successfully");
    } catch (error) {
      console.error("Error deleting variety:", error);
    }
  };

  return (
    <TableRow>
      <TableCell>{_id}</TableCell>
      <TableCell>{varietyName}</TableCell>
      <TableCell>
        <Link to={`/riceVarieties/${_id}`}>
          <Button variant="contained" color="primary" style={{marginRight:"1em"}}>Update</Button>
        </Link>
        <Button variant="contained" color="error" onClick={deleteHandler}>Delete</Button>
      </TableCell>
    </TableRow>
  );
};

export default RiceV;
