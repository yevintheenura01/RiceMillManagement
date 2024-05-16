import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import User from "../User/EUser";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Button, TextField, Typography, Grid } from '@mui/material'; // Import Material-UI components
import banner from '../UserDetails/logo.jpg';
import Emnav from '../emnav/emnav';
import Eheader from '../eheader/eheader';

const URL = "http://localhost:5000/eusers";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
}

function EUsers() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchHandler().then((data) => setUsers(data.users));
    }, [])

    const ComponentsRef = useRef();

    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);

    const handleSearch = () => {
        fetchHandler().then((data) => {
            const filteredUsers = data.users.filter((user) =>
                Object.values(user).some((field) =>
                    field.toString().toLowerCase().includes(searchQuery.toLowerCase())
                ))
            setUsers(filteredUsers);
            setNoResults(filteredUsers.length === 0);
        });
    }

    const generatePDF = async () => {
        const doc = new jsPDF();

        
        const logoImg = new Image();
        logoImg.src = banner;

        try {
            await new Promise((resolve, reject) => {
                logoImg.onload = () => {
                    const imgWidth = 210; 
                    const imgHeight = 60;
                    doc.addImage(logoImg, 'JPEG', 0, 0, imgWidth, imgHeight);

                    const today = new Date();
                    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                    doc.setFontSize(10);
                    doc.text("Date: " + date, 10, 70);

                    doc.setTextColor("black");
                    doc.setFontSize(20);
                    doc.setFont("bold");
                    doc.text("Employee Details Report", 105, 85, { align: "center" });

                    const headers = ['User Name', 'Name', 'NIC', 'Gender', 'Email', 'DOB', 'Password', 'Contact No'];
                    const tableOptions = {
                        startY: 100,
                        head: [headers],
                        styles: {
                            cellPadding: 5,
                            fontSize: 6,
                            valign: 'middle',
                            halign: 'center',
                            textColor: [0, 0, 0],
                            fillColor: [211, 211, 211]
                        },
                    };

                    const userData = users.map((user, index) => [
                        user.username,
                        user.name,
                        user.NIC,
                        user.Gender,
                        user.Email,
                        user.DOB,
                        user.password,
                        user.contactno,
                    ]);
                    tableOptions.body = userData;

                    doc.autoTable(tableOptions);

                    // Resolve the promise when PDF generation is complete
                    resolve();
                };
                logoImg.onerror = reject;
            });
            doc.save("employee_report.pdf");
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div>
            <Eheader />
            <Emnav />
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={12} sm={8} md={6}>
                    <TextField
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type='text'
                        name='search'
                        fullWidth
                        placeholder='Search...'
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={2}>
                    <Button fullWidth variant="contained" color="success" onClick={handleSearch}>Search</Button>
                </Grid>
            </Grid>

            {noResults ? (
                <Typography variant="body1" align="center">No Production details found</Typography>
            ) : (
                <div ref={ComponentsRef}>
                    {users && users.map((user, i) => (
                        <div key={i}>
                            <User user={user} />
                        </div>
                    ))}
                </div>
            )}
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={12} sm={8} md={6}>
                    <Button fullWidth variant="contained" color="success" onClick={generatePDF}>Generate Report</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default EUsers;
