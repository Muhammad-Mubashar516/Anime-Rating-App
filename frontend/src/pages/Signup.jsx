import React ,{useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { setCredentials } from '../store/authSlice';
import apiClient from '../api/axios';
import styles from "./Signup.module.css"; // CSS Module ko import kiya

const Signup=()=>{
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [role,setRole]=useState('');
    const [loading,setLoading]=useState('');
    const [error,setError]=useState('');
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        if (!name || !email || !password || !role){
            setError("fill all the fileds");
            return;
        }
        setLoading(true);
        setError('');
        try{
            const dataToSubmit={name,email,password,role};
            console.log("submittimg to backend",dataToSubmit);
            const response=await apiClient.post("/api/users/register",dataToSubmit);
            dispatch(setCredentials(response.data));
            navigate("/");
        }catch(err){
            setError(err.response?.data?.message || "An error occured during signup");
            console.error("Signup error",err);
        }finally{
            setLoading(false)
        }
    }
    return(
        <>
        <div className={styles.don1}>
        <div className={styles.d1}>
            <h1 className={styles.k1}>Create Acount</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.d2}>
                    <label htmlFor="name" className={styles.l1}>Your Name</label>
                    <br />
                    <input type="text" className={styles.i1} value={name} onChange={(e)=>setName(e.target.value)} required />
                </div>
                <div className={styles.d3}>
                    <label htmlFor="email" className={styles.l2}>Your Email</label>
                    <br />
                    <input type="email" className={styles.i2} value={email} onChange={(e)=>setEmail(e.target.value)} required />
                </div>
                <div className={styles.d4}>
                    <label htmlFor="password" className={styles.l3}>Your Password</label>
                    <br />
                    <input type="password" className={styles.i3} value={password} onChange={(e)=>setPassword(e.target.value)} required />
                </div>
                <div className={styles.d4a}>
                    <label className={styles.l4}>I am :</label>
                    <div className={styles.d5}>
                        <label style={{cursor:"pointer"}}> <input type="radio" value="writer" name="role" checked={role==="writer"} onChange={(e)=>setRole(e.target.value)} className={styles.w1} />Writer </label>
                        <label style={{cursor:"pointer"}}> <input type="radio" value="visitor" name="role" checked={role==="visitor"} onChange={(e)=>setRole(e.target.value)} className={styles.v1} />visitor </label>
                    </div>
                </div>
                {error && <p className={styles.p1}>{error}</p>}
                <button type="submit" disabled={loading} className={styles.b1}>
                    {loading ? "Creating Acount...":"Sign up"}
                </button>
            </form>
            <p className={styles.par1}>
                Already Have An Acount? <Link to="/login" className={styles.lin1}>Login</Link>
            </p>
        </div>
        </div>
        </>
    );
};
export default Signup;