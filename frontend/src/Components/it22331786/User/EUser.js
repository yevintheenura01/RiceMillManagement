import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Emnav from '../emnav/emnav';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
}));

function EUser(props) {
    const { user, className } = props;
    const navigate = useNavigate(); 

    if (!user) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    const { _id, username, name, NIC, Gender, Email, DOB, contactno } = user;
    
    const deleteHandler = async () => {
        try {
            await axios.delete(`http://localhost:5000/eusers/${_id}`);
            toast.success("User deleted successfully!");
            navigate("/ecreate");
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user. Please try again.");
        }
    };

    return (
        <Box className={className} p={3}>
            <Emnav />
            <Typography variant="h4" gutterBottom>
                User Details
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>User Name</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>NIC</StyledTableCell>
                            <StyledTableCell>Gender</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>DOB</StyledTableCell>
                            <StyledTableCell>Contact No</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                            <TableCell>{username}</TableCell>
                            <TableCell>{name}</TableCell>
                            <TableCell>{NIC}</TableCell>
                            <TableCell>{Gender}</TableCell>
                            <TableCell>{Email}</TableCell>
                            <TableCell>{DOB}</TableCell>
                            <TableCell>{contactno}</TableCell>
                            <TableCell>
                                <Box display="flex" gap={1}>
                                    <Link to={`/ecreate/${_id}`}>
                                        <Button variant="contained" color="primary">Update</Button>
                                    </Link>
                                    <Button variant="contained" color="error" onClick={deleteHandler}>Delete</Button>
                                </Box>
                            </TableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default EUser;
