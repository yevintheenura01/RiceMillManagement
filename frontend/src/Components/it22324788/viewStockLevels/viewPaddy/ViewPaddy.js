import React, { useEffect, useState } from "react";
import Head from "../../Header/Header";
import ViewStock from "../../buttonGroups/viewStockBtns";
import PaddyView from "./PaddyV";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box // Import Box for better layout control
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Import Search icon for search input

const URL = "http://localhost:5000/paddy";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ViewPaddy() {
  const [paddy, setPaddy] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchHandler().then((data) => setPaddy(data.paddy));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPaddy = paddy.filter((Paddy) =>
    Paddy.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Head />
      <ViewStock />
      <Box display="flex" alignItems="center" marginBottom="20px">
        <SearchIcon style={{ marginRight: "10px", color: "#666" }} />
        <TextField
          label="Search by Location"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>ID</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Moisture content</TableCell>
              <TableCell>Purchase date</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPaddy.map((Paddy, i) => (
              <PaddyView key={i} Paddy={Paddy} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ViewPaddy;
