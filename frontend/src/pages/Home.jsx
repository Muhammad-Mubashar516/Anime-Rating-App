// frontend/src/pages/Home.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../store/authSlice';
import styles from "./Home.module.css";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:8000/api/users/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            
            dispatch(logout()); 
            alert('You are logged out successfully!'); 
            navigate('/login'); 
        } catch (error) {
            console.error('Logout failed:', error);
            alert('An error occurred during logout.');
        }
    };

    return (
        <div className={styles.d1}>
            {/* Navbar */}
            <nav className={styles.navbar}>
                <h2 className={styles.logo}>Anime Blogs</h2>
                <ul className={styles.navLinks}>
                    <li><Link to="/" className={styles.link}>Home</Link></li>
                    <li><Link to="/Signup" className={styles.link}>Signup</Link></li>
                    <li><Link to="/Login" className={styles.link}>Login</Link></li>
                </ul>
            </nav>

            {/* Content box */}
            <div className={styles.d2}>
                <h1 className={styles.h1}>Welcome to Anime Blogs Website</h1>
                {userInfo ? (
                    <div>
                        <p>Hello, {userInfo.name}!</p>
                        <button onClick={handleLogout} className={styles.b1}>Logout</button>
                    </div>
                ) : (
                    <p className={styles.p1}>Please log in to see content.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
