import React from 'react';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const logoutAuth = () => {
        googleLogout();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <h1>Hey pookie! You have successfully logged in. Now you can sleep peacefully! RIP</h1>
            <button onClick={logoutAuth} style={{ marginTop: "2rem" }} className='logout-btn'>Go back to Hell</button>
        </div>
    );
};

export default HomePage;
