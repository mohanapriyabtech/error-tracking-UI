import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/ErrorDetailsPage.css';
import PostmanHit from './PostmanHit';

const ErrorDetailsPage = () => {
    const { id } = useParams();
    const [errorDetails, setErrorDetails] = useState(null);
    const [showHeaders, setShowHeaders] = useState(true);

    useEffect(() => {
        const fetchErrorDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/logs/get-error-log/${id}`);
                setErrorDetails(response.data.data);
            } catch (error) {
                console.error('Error fetching error details:', error);
            }
        };

        fetchErrorDetails();
    }, [id]);

    const toggleHeaders = () => {
        setShowHeaders(!showHeaders);
    };

    const copyToClipboard = (text) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    };
    

    return (
        <div className="box">
            <div className="error-details-container">
                <div className="error-details">
                    <h1>Error Details</h1>
                    {errorDetails && (
                        <div className="error-card">
                            <p><strong>UTC TIME:</strong> {errorDetails.created_at}</p>
                            <p><strong>LOCAL TIME:</strong> {new Date(errorDetails.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
                            <p><strong>URL:</strong> {errorDetails.request_url}</p>
                            <p><strong>Method:</strong> {errorDetails.method}</p>
                            <p><strong>Status Message:</strong> {errorDetails.status_message}</p>
                            <div className="details-section">
                                <h3>Headers:</h3>
                                <button onClick={toggleHeaders}>{showHeaders ? 'Hide' : 'Show'} Headers</button>
                                {showHeaders && (
                                    <ul>
                                        {Object.entries(errorDetails.headers).map(([key, value]) => (
                                            <li key={key}><strong>{key}:</strong> {value}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="details-section">
                                <h3>Body Params:</h3>
                                <textarea>{JSON.stringify(errorDetails.body_params, null, 2)}</textarea>
                                <button onClick={(e) => copyToClipboard(JSON.stringify(errorDetails.body_params, null, 2))}>Copy</button>
                            </div>
                            <div className="details-section">
                                <h3>Response:</h3>
                                <pre>{errorDetails.response.replace(/\\/g, '').split(',').map((item, index) => (
                                    `${item}\n`
                                ))}</pre>
                            </div>
                        </div>
                    )}
                </div>
                <div className="postman-hit">
                    <PostmanHit />
                </div>
            </div>
        </div>
    );
};

export default ErrorDetailsPage;
