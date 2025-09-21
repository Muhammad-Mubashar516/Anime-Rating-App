import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import apiClient from '../api/axios';
import { Link } from 'react-router-dom';
import styles from './PapersPage.module.css';
const PaperPage=()=>{
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userInfo } = useSelector(state => state.auth);
useEffect(() => {
        const fetchPapers = async () => {
            try {
                const response = await apiClient.get('/api/papers');
                setPapers(response.data);
            } catch (error) {
                console.error("Failed to fetch papers", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPapers();
    }, []);
    const handleDelete = async (paperId) => {
        if (window.confirm('Are you sure you want to delete this paper?')) {
            try {
                await apiClient.delete(`/api/papers/${paperId}`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                });
                // List se paper hata do
                setPapers(papers.filter(p => p._id !== paperId));
            } catch (error) {
                alert('Failed to delete paper.');
            }
        }
    };
const handleLike = async (paper) => {
  try {
    const res = await apiClient.post(`/api/papers/${paper._id}/like`, {}, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    });
    // update state
    setPapers(papers.map(p => p._id === paper._id ? { ...p, likes: res.data.likes, unlikes: res.data.unlikes } : p));
  } catch (err) { console.error(err); }
};

const handleUnlike = async (paper) => {
  try {
    const res = await apiClient.post(`/api/papers/${paper._id}/unlike`, {}, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    });
    setPapers(papers.map(p => p._id === paper._id ? { ...p, likes: res.data.likes, unlikes: res.data.unlikes } : p));
  } catch (err) { console.error(err); }
};


    if (loading) return <div>Loading papers...</div>;
    return(
        <>
        <div className={styles.d1}>
            <div className={styles.d2}>
<h1 className={styles.h1}>
Stories Hub
</h1>
{
    userInfo && (
        <Link to="/papers/publish" className={styles.l1}>Publish your stories:</Link>
    )
}
            </div>
            <br />

            <div className={styles.d3}>
     {
        papers.map(paper=>(
            <Link to={`/papers/${paper._id}`} key={paper._id} className={styles.l2}>
                <div className={styles.d4}>
     {
        userInfo && paper.author?._id === userInfo._id && (
            <button className={styles.b1} onClick={(e)=>{
                e.preventDefault();
                e.stopPropagation();
                handleDelete(paper._id)
            }}>
         x
            </button>
        )
     }
      <h2 className={styles.t1}>Title : {paper.title}</h2>
                            <p className={styles.c0}> Category:  {paper.category}</p>
                            <p className={styles.a1}>By: {paper.author?.name || 'Unknown'}</p>
                            
                            <p className={styles.c2}> Content :
                                {paper.content.substring(0, 150)}...
                            </p>
                           <div className={styles.actions}>
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleLike(paper); }}>
            👍 {paper.likes}
          </button>
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleUnlike(paper); }}>
            👎 {paper.unlikes}
          </button>
          <span>👁️ {paper.views}</span>
        </div>
                </div>
            </Link>
            
        ))
     }
            </div>
        </div>
        </>
    )

};
export default PaperPage;