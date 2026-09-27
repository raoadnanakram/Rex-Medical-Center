import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, password })
            });

            const data = await response.json();

            if (response.ok) {
                // JWT Token ko localStorage mein save karein
                localStorage.setItem('adminToken', data.token);
                alert('Login Successful!');
                navigate('/admin-dashboard'); // Dashboard par redirect karein
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            console.error(err);
            setError('Server error. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <form onSubmit={handleLogin} style={{ padding: '30px', border: '1px solid #ccc', borderRadius: '8px', width: '300px' }}>
                <h2>Admin Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div style={{ marginBottom: '15px' }}>
                    <label>Phone Number:</label>
                    <input 
                        type="text" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;