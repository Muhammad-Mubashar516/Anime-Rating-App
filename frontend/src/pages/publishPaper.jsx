import React,{useState} from "react";
import apiClient from "../api/axios";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import styles from './PublishPaperPage.module.css';
const publishPaper=()=>{
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [category,setCategory]=useState("Action");
    const [loading,setLoading]=useState(false);
const {userInfo}=useSelector(state=>state.auth);
    const navigate=useNavigate();
const handleSubmit=async(e)=>{
e.preventDefault();
setLoading(true);
try{
    await apiClient.post("/api/papers",
        {
            title,content,category
        },
        {
            headers:{Authorization:`Bearer ${userInfo.token}`}
        }
    );
    alert("Your story publish sucessfully");
    navigate("/papers");

}catch(error){
    alert("title cannot be less than 10 words,,and content cannot be,,,less than 200 words");
    console.error(error);
}finally{
    setLoading(false);
}
};
return(
    <>
    <div className={styles.d0}>
 <div className={styles.d1}>
            <h1>Publish Your Stories </h1>
            <form onSubmit={handleSubmit} className={styles.f1}>
                
                
                <div className={styles.d2}>
                   <h2><label htmlFor="title">Title :</label></h2> 
                    <input 
                        type="text" 
                        id="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                        className={styles.i1}
                    />
                </div>
<br />
                
                <div className={styles.d3}>
                   <h2> <label htmlFor="category">Category :</label></h2>
                    <select 
                        id="category" 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} className={styles.s1}
                    >
                        <option value="Action">Action</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Sports">Sports</option>
                        <option value="love">love</option>
                        <option value="Hot">Hot</option>
                       <option value="Huntair">Huntai</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
<br />
                
                <div className={styles.d4}>
                   <h2> <label htmlFor="content">Content</label></h2>
                    <textarea 
                        id="content" 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        required 
                        rows="15"
                        className={styles.t1}
                    />
                </div>
<br />
                <button className={styles.b1} type="submit" disabled={loading}>
                    {loading ? 'Publishing...' : 'Publish Paper'}
                </button>
            </form>
        </div>

    </div>
    </>
)
};
export default publishPaper;