import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [contacts, setContacts] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin-login'); // Agar token nahi hai toh login page par bhej dein
            return;
        }

        const fetchData = async () => {
            try {
                const headers = { 'Authorization': `Bearer ${token}` };

                // Fetch Contacts
                const contactRes = await fetch('http://localhost:5000/api/forms/contacts', { headers });
                const contactData = await contactRes.json();
                if (contactRes.ok) setContacts(contactData);

                // Fetch Appointments
                const appRes = await fetch('http://localhost:5000/api/forms/appointments', { headers });
                const appData = await appRes.json();
                if (appRes.ok) setAppointments(appData);

            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin-login');
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Admin Dashboard - Rex Medical Centre</h1>
                <button onClick={handleLogout} style={{ padding: '8px 15px', background: 'red', color: '#fff', border: 'none', borderRadius: '4px' }}>
                    Logout
                </button>
            </div>

            <hr style={{ margin: '20px 0' }} />

            {/* Appointments Table */}
            <h2>Booked Appointments</h2>
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                <thead>
                    <tr style={{ background: '#f4f4f4' }}>
                        <th>Patient Name</th>
                        <th>Phone</th>
                        <th>Department</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length > 0 ? appointments.map((item) => (
                        <tr key={item._id}>
                            <td>{item.patientName}</td>
                            <td>{item.phone}</td>
                            <td>{item.department}</td>
                            <td>{item.date}</td>
                            <td>{item.time}</td>
                            <td>{item.message || 'N/A'}</td>
                        </tr>
                    )) : <tr><td colSpan="6" style={{ textAlign: 'center' }}>No appointments found</td></tr>}
                </tbody>
            </table>

            {/* Contact Messages Table */}
            <h2>Contact Form Messages</h2>
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f4f4f4' }}>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.length > 0 ? contacts.map((item) => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.message}</td>
                        </tr>
                    )) : <tr><td colSpan="4" style={{ textAlign: 'center' }}>No contact messages found</td></tr>}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;