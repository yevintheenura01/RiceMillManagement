import React, { useState, useEffect } from "react";
import ViewStock from "../../buttonGroups/viewStockBtns";
import Head from "../../Header/Header";
import axios from "axios";
import RiceV from "./RiceV";
import { Link } from "react-router-dom";
import { Button,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const URL = "http://localhost:5000/varieties";

const RiceVarieties = () => {
  const [varieties, setVarieties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        setVarieties(response.data.varieties);
      } catch (error) {
        console.error("Error fetching varieties:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Head />
      <ViewStock />
      <Link to="/add-rice">
        <Button variant="contained" color="primary">Add Rice variety</Button>
      </Link>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Variety Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {varieties.map((variety, i) => (
              <RiceV key={i} variety={variety} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RiceVarieties;
