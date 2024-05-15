import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TableRow, TableCell, Button } from "@mui/material";

function PaddyView(props) {
  const { _id, weight, mContent, pDate, price, location } = props.Paddy || {};
  const history = useNavigate();

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/paddy/${_id}`)
      .then(() => history("/"))
      .then(() => history("/viewPaddy"))
      .then(() => alert("Deleted Successfully"));
  };
  // Formatting date to display only date without time
  const formattedDate = new Date(pDate).toLocaleDateString();
  return (
    <TableRow>
      <TableCell>{_id}</TableCell>
      <TableCell>{weight}</TableCell>
      <TableCell>{mContent}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{location}</TableCell>
      <TableCell>
        <Link to={`/viewPaddy/${_id}`}>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "80px", height: "40px", margin: "0 10px 0 0" }}
          >
            Update
          </Button>
        </Link>
        <Button
          variant="contained"
          color="error"
          onClick={deleteHandler}
          style={{ width: "80px", height: "40px" }}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default PaddyView;
