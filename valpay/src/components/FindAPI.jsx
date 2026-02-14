import React, { useState } from 'react';
import axios from 'axios';

const FindAPI = () => {
  const [results, setResults] = useState([]);
  const [testing, setTesting] = useState(false);

  const testEndpoints = async () => {
    setTesting(true);
    setResults([]);
    
    const authToken = "Basic MGM4amtkd3JLY0JLQwxmVYBXbjA6WldCTkIsaFNvWktLWZhZ0VjQ1BqSjLm0Fh4bExTY210cE1WNzNlSA==";
    
    // Common API base URLs to test
    const baseUrls = [
      "https://api.payhero.co.ke",
      "https://payhero.co.ke",
      "https://backend.payhero.co.ke",
      "https://app.payhero.co.ke",
      "https://api.payhero.africa",
      "https://payhero.africa"
    ];
    
    // Common API paths
    const paths = [
      "/api/v1/stkpush",
      "/api/v1/pay",
      "/v1/stkpush",
      "/v1/pay",
      "/api/stkpush",
      "/api/pay",
      "/stkpush",
      "/pay",
      "/mpesa/stkpush",
      "/api/mpesa/stkpush",
      "/v1/mpesa/stkpush"
    ];

    for (const baseUrl of baseUrls) {
      for (const path of paths) {
        const fullUrl = baseUrl + path;
        try {
          console.log(`Testing: ${fullUrl}`);
          
          const response = await axios.post(fullUrl, {
            // Simple test payload
            username: "0c8jkdwrKcBeAlfaPwn0",
            amount: "10",
            phone: "254712345678"
          }, {
            headers: {
              'Authorization': authToken,
              'Content-Type': 'application/json'
            },
            timeout: 5000
          });
          
          setResults(prev => [...prev, {
            url: fullUrl,
            status: '✅ WORKING',
            data: response.data
          }]);
          
        } catch (error) {
          if (error.response) {
            // Server responded with error - this means the URL exists!
            setResults(prev => [...prev, {
              url: fullUrl,
              status: `⚠️ EXISTS (${error.response.status})`,
              error: error.response.data
            }]);
          } else if (error.code === 'ECONNABORTED') {
            setResults(prev => [...prev, {
              url: fullUrl,
              status: '⏱️ Timeout',
              error: 'Connection timeout'
            }]);
          } else {
            setResults(prev => [...prev, {
              url: fullUrl,
              status: '❌ Not Found',
              error: error.message
            }]);
          }
        }
      }
    }
    
    setTesting(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🔍 Find PayHero API Endpoint</h2>
      
      <button 
        onClick={testEndpoints}
        disabled={testing}
        style={{
          padding: '10px 20px',
          background: '#ff6b6b',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        {testing ? 'Testing...' : 'Start Testing Endpoints'}
      </button>

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '10px'
      }}>
        {results.map((result, index) => (
          <div key={index} style={{
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            background: result.status.includes('✅') ? '#d4edda' : 
                       result.status.includes('⚠️') ? '#fff3cd' : '#f8f9fa'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              {result.status}
            </div>
            <div style={{ fontSize: '12px', wordBreak: 'break-all' }}>
              {result.url}
            </div>
            {result.error && (
              <div style={{ fontSize: '11px', color: '#666', marginTop: '5px' }}>
                {typeof result.error === 'object' ? JSON.stringify(result.error).substring(0, 100) : result.error}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindAPI;