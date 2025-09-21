// src/pages/PaperDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/axios';

const PaperDetailPage = () => {
    // URL se paper ki ID nikalo (router.jsx mein humne iska naam ':id' rakha hai)
    const { id } = useParams(); 
    
    // States
    const [paper, setPaper] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Jab component load ho, to paper ka data fetch karo
    useEffect(() => {
        const fetchPaper = async () => {
            // Agar ID nahi hai to API call na bhejo
            if (!id) {
                setLoading(false);
                setError("Paper ID not found in URL.");
                return;
            }
            try {
                setLoading(true);
                // Backend ke /api/papers/:id endpoint ko call karo
                const response = await apiClient.get(`/api/papers/${id}`);
                setPaper(response.data);
            } catch (err) {
                setError('Failed to fetch the paper.');
                console.error("API Error in PaperDetail:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPaper();
    }, [id]); // Dependency array mein 'id' daalo

    // Conditional Rendering
    if (loading) return <div>Loading paper...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!paper) return <div>Paper not found.</div>;

    // UI
    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', background: '#fff' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{paper.title}</h1>
            <div style={{ display: 'flex', gap: '1rem', color: '#666', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                <span>By: {paper.author?.name || 'Unknown'}</span>
                <span style={{ background: '#f0f0f0', padding: '0.2rem 0.6rem', borderRadius: '10px', fontSize: '0.8rem' }}>
                    {paper.category}
                </span>
            </div>
            {/* 'whiteSpace: 'pre-wrap'' zaroori hai taaki line breaks (Enter) a a se dikhein */}
            <div style={{ fontSize: '1.1rem', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                {paper.content}
            </div>
        </div>
    );
};

export default PaperDetailPage;