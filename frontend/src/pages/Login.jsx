import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import apiClients from "../api/axios";
import styles from "./Login.module.css"; // CSS Module ko import kiya

const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError("");
        try{
            const response=await apiClients.post("/api/users/login",{
                email,
                password,
            });
            dispatch(setCredentials(response.data));
            setLoading(false);
            navigate("/");
        }catch(err){
            setLoading(false);
            setError(err.response?.data?.message || "An error occured.please try agin ");
        };
    };
    return(
        <>
        <div className={styles.don}>
        <div className={styles.loginContainer}>
            <h1 className={styles.loginHeader}>Login Account</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.loginGroup}>
                    <label htmlFor="email" className={styles.loginLabel} >Enter your Email</label>
                    <br />
                    <input type="email" value={email} className={styles.loginInput} onChange={(e)=>setEmail(e.target.value)} required />
                </div>
                <div className={styles.loginGroup}>
                    <label htmlFor="password" className={styles.loginLabel}>Password</label>
                    <br />
                    <input type="password" className={styles.loginInput} value={password} onChange={(e)=>setPassword(e.target.value)} required />
                </div>
                <br />
                <button type="submit" className={styles.loginButton}>Login</button>
            </form>
            <p className={styles.loginPara}> Do not have a acount so please signup ? <Link to="/signup" className={styles.loginLink}>signup</Link> </p>
        </div>
        </div>
        </>
    );
};
export default Login;