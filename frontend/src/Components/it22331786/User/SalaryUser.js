import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Button, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function SalaryUser(props) {
    const { user, className } = props;
    const history = useNavigate();

    if (!user) {
        return <div>Loading...</div>;
    }

    const { _id, basicsalary, othours, AmountOTH, bonus, totalsalary } = user;

    const deleteHandler = async () => {
        try {
            await axios.delete(`http://localhost:5000/saddusers/${_id}`);
            toast.success("Successfully Deleted!");
            history("/screate");
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user. Please try again.");
        }
    };

    return (
        <div className={`user-details-table ${className}`}>
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                <Table>
                    <TableHead>
                    <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#2E86C1' } }}>                            <TableCell>Basic Salary</TableCell>
                            <TableCell>OT Hours</TableCell>
                            <TableCell>Amount for OT</TableCell>
                            <TableCell>Bonus</TableCell>
                            <TableCell>Total Salary</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{basicsalary}</TableCell>
                            <TableCell>{othours}</TableCell>
                            <TableCell>{AmountOTH}</TableCell>
                            <TableCell>{bonus}</TableCell>
                            <TableCell>{totalsalary}</TableCell>
                            <TableCell>
                                <Link to={`/screate/${_id}`} style={{ textDecoration: 'none', marginRight: '10px' }}>
                                    <Button variant="contained" color="primary" startIcon={<EditIcon />}>Update</Button>
                                </Link>
                                <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={deleteHandler}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

export default SalaryUser;
