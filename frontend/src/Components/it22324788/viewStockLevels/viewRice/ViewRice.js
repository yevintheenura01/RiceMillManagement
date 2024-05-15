import React, { useEffect, useState } from "react";
import Head from "../../Header/Header";
import ViewStock from "../../buttonGroups/viewStockBtns";
import RiceView from "./RiceV";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography, // Import Typography for better text styling
} from "@mui/material";

const URL = "http://localhost:5000/users1";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ViewRice() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  return (
    <div>
      <Head />
      <ViewStock />
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1">Product ID</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">Batch No.</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">Product Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">Manufacture Date</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">Expiry Date</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">Weight</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">Description</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, i) => (
              <RiceView key={i} user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ViewRice;
