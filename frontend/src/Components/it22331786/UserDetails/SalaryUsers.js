import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import User from "../User/SalaryUser";
import { useReactToPrint } from "react-to-print";
import { toast } from 'react-toastify';
import { Button, TextField, Typography, CircularProgress } from '@mui/material';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import banner from '../UserDetails/logo.jpg';
import Emnav from '../emnav/emnav';
import Eheader from '../eheader/eheader';

const URL = "http://localhost:5000/saddusers";

const fetchHandler = async () => {
    try {
        const res = await axios.get(URL);
        return res.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return { users: [] };
    }
}

function SalaryUsers() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHandler().then((data) => {
            setUsers(data.users);
            setFilteredUsers(data.users);
            setLoading(false);
        });
    }, [])

    const ComponentsRef = useRef();

    const handleSearch = () => {
        const filteredUsers = users.filter((user) =>
            Object.values(user).some((field) =>
                field.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setFilteredUsers(filteredUsers);
        setNoResults(filteredUsers.length === 0);
    }

    const generatePDF = async () => {
        const doc = new jsPDF();
    
        // Replace with the correct source path for your logo
        const logoImg = new Image();
        logoImg.src = banner;
    
        try {
            await new Promise((resolve, reject) => {
                logoImg.onload = () => {
                    const imgWidth = 210; // Adjust the width of the logo as needed
                    const imgHeight = 60;
                    doc.addImage(logoImg, 'JPEG', 0, 0, imgWidth, imgHeight);
    
                    const today = new Date();
                    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                    doc.setFontSize(10);
                    doc.text("Date: " + date, 10, 70);
    
                    doc.setTextColor("black");
                    doc.setFontSize(20);
                    doc.setFont("bold");
                    doc.text("Salary report", 105, 85, { align: "center" });
    
                    const headers = ['basicsalary', 'othours', 'AmountOTH','bonus','totalsalary'];
                    const tableOptions = {
                        startY: 100,
                        head: [headers],
                        styles: {
                            cellPadding: 5,
                            fontSize: 10,
                            valign: 'middle',
                            halign: 'center',
                            textColor: [0, 0, 0],
                            fillColor: [211, 211, 211]
                        },
                    };
    
                    const userData = users.map((user, index) => [
                        user.basicsalary,
                        user.othours,
                        user.AmountOTH,
                        user.bonus,
                        user.totalsalary,
                       
                        
                    ]);
                    tableOptions.body = userData;
    
                    doc.autoTable(tableOptions);
    
                    // Resolve the promise when PDF generation is complete
                    resolve();
                };
                logoImg.onerror = reject;
            });
            doc.save("salary_report.pdf");
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div><Eheader />
            <Emnav />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <TextField
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type='text'
                    name='search'
                    placeholder='Search...'
                    variant="outlined"
                    size="small"
                    style={{ marginRight: '10px' }}
                />
                <Button variant="contained" color="success" onClick={handleSearch}>Search</Button>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                    <CircularProgress />
                </div>
            ) : noResults ? (
                <div>
                    <Typography variant="body1">No Production details found</Typography>
                </div>
            ) : (
                <div ref={ComponentsRef}>
                    {filteredUsers && filteredUsers.map((user, i) => (
                        <div key={i}>
                            <User user={user} />
                        </div>
                    ))}
                </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button variant="contained" color="success" onClick={generatePDF}>Generate Report</Button>
            </div>
        </div>
    )
}

export default SalaryUsers;
