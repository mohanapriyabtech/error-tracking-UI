import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../css/ErrorDetailsPage.css"

const ErrorDetailsPage = () => {
    const { id } = useParams();
    const [errorDetails, setErrorDetails] = useState(null);

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

    return (
        <div >
            <h1>Error Details</h1>
            {errorDetails && (
                <div className="error-card">
                    <p><strong>UTC TIME:</strong> {errorDetails.created_at}</p>
                    <p><strong>LOCAL TIME:</strong> {new Date(errorDetails.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
                    <p><strong>URL:</strong> {errorDetails.request_url}</p>
                    <p><strong>Method:</strong> {errorDetails.method}</p>
                    <p><strong>Status Message:</strong> {errorDetails.status_message}</p>
                </div>
            )}
        </div>
    );
};

export default ErrorDetailsPage;
