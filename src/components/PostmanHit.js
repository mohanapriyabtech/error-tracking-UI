import React, { useState } from 'react';
import '../css/PostmanHit.css';

function PostmanHit() {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [token, setToken] = useState('');
  const [params, setParams] = useState({});
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      };

      if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
        options.body = JSON.stringify(params);
      }

      const response = await fetch(url, options);
      const data = await response.json();
      setResponse(data);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="App">
      <h1>API Hit</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <br />
        <label htmlFor="method">Method:</label>
        <select id="method" name="method" value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
        <br />
        <label htmlFor="token">Token (optional):</label>
        <input
          type="text"
          id="token"
          name="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <br />
        <label htmlFor="params">Input Parameters (JSON format):</label>
        <textarea
          id="params"
          name="params"
          value={JSON.stringify(params, null, 2)}
          onChange={(e) => {
            try {
              setParams(JSON.parse(e.target.value));
            } catch (error) {
              console.warn('Invalid JSON format:', error);
            }
          }}
        />
        <br />
        <button type="submit">Send Request</button>
      </form>
      {response && <pre className="response">{JSON.stringify(response, null, 2)}</pre>}
      {error && <div className="error">Error: {error}</div>}
    </div>
  );
}

export default PostmanHit;