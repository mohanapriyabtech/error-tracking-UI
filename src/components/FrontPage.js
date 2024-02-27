import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../css/FrontPage.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';


const FrontPage = () => {
    const [items, setItems] = useState([]);
    const [names, setNames] = useState([]);
    const [error, setError] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedName, setSelectedName] = useState('');
    const [showApiList, setShowApiList] = useState(true);
    const [selectedError, setSelectedError] = useState(null);
    const [showCard, setShowCard] = useState(false);
    const tableRef = useRef(null);
    const errorAlertRef = useRef(null);
    const [selectedErrorDetails, setSelectedErrorDetails] = useState(null);


 

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
              !tableRef.current?.contains(event.target) &&
              !errorAlertRef.current?.contains(event.target)
            ) {
              setShowApiList(false);
              setIsOpen(false);
            }
          };
          
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchAllLogs = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/logs/get-all-logs/${selectedName}`);
                setItems(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (selectedName) {
            fetchAllLogs();
        }
    }, [selectedName]);

    const authToken = "3803465cdf10d8aeb501dffab5d00217:1ae25952e0870e8e3ddd9972f604c3ec3255800b7ac02072e948caaa1151409c085f0a61c01c79a8ca7c5c6f6865cacf0d0a8d80fb068ca8cc40f42f3122e4c804105f8bec56060a7f46235f0dd7d02707e8255bfd1d1bb95a1dbc72ff94002028e42019bbccacbb5407c237724f6dd6f4f28c75b2:2da5b80f983616cff7737acb438eb5d3";

    useEffect(() => {
        const fetchNames = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/admin/list-users', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                setNames(response.data.data);
            } catch (error) {
                console.error('Error fetching names:', error);
            }
        };

        fetchNames();
    }, []);

    const handleViewErrorAlerts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/logs/get-error-logs');
            setError(response.data.data);
            setIsOpen(true);
            setShowApiList(false);
        } catch (error) {
            console.error('Error fetching error logs:', error);
        }
    };

    const handleViewApiList = () => {
        setShowApiList(true);
        setIsOpen(false);
    };

    const handleViewDetails = (item) => {
       console.log("view button")
    }

    return (
        <div className="error-dashboard">
            <h1>Error Tracking Dashboard</h1>

            <div className="button-container">
                <button onClick={handleViewApiList}>API List</button>
                <button onClick={handleViewErrorAlerts}>Error Alert</button>
            </div>

            <div className="content-container">
                {showApiList && (
                    <div ref={tableRef}>
                        <select className="name-select" onChange={(e) => setSelectedName(e.target.value)}>
                            <option value="">Select a name...</option>
                            {names.map(name => (
                                <option key={name._id} value={name._id}>{name.name}</option>
                            ))}
                        </select>
                        {selectedName && (
                            <div className="selected-name">
                                <h2>Selected Name:</h2>
                                <p>
                                    {names.find(name => name._id === selectedName)?.name || 'Unknown'}
                                </p>
                            </div>
                        )}
                        <table className="error-table">
                            <thead>
                                <tr>
                                    <th>UTC Time</th>
                                    <th>Local Time</th>
                                    <th>Api Url</th>
                                    <th>Status Code</th>
                                    <th>Method</th>
                                    <th>Status Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.created_at}</td>
                                        <td>{new Date(item.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
                                        <td>{item.request_url}</td>
                                        <td>{item.status_code}</td>
                                        <td>{item.method}</td>
                                        <td>{item.status_message}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {isOpen && (
                    <div className="error-alerts" ref={errorAlertRef}>
                        <h3>Error Alerts</h3>
                        <table className="error-table">
                            <thead>
                                <tr>
                                    <th>UTC TIME</th>
                                    <th>LOCAL TIME</th>
                                    <th>URL</th>
                                    <th>Method</th>
                                    <th>Status Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {error.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.created_at}</td>
                                        <td>{new Date(item.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
                                        <td>{item.request_url}</td>
                                        <td>{item.method}</td>
                                        <td><Link to={`/error-details-page/${item._id}`} onClick={() => handleViewDetails(item)}>View</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

               
            </div>
        </div>
    );
};

export default FrontPage;
