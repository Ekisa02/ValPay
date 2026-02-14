import React, { useState } from 'react';
import { testPayHeroConnection, initiateSTKPush, validatePhoneNumber } from '../services/payhero';

const PayHeroTest = () => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('10');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTestConnection = async () => {
    setLoading(true);
    const res = await testPayHeroConnection();
    setResult(res);
    setLoading(false);
  };

  const handleSendSTK = async () => {
    setLoading(true);
    const res = await initiateSTKPush({
      amount: amount,
      phoneNumber: phone,
      transactionDesc: 'Test Payment'
    });
    setResult(res);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>🔧 PayHero Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleTestConnection}
          disabled={loading}
          style={{
            padding: '10px 20px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            marginRight: '10px',
            cursor: 'pointer'
          }}
        >
          Test Connection
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="tel"
          placeholder="Phone (0712345678)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            padding: '10px',
            width: '100%',
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd'
          }}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            padding: '10px',
            width: '100%',
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd'
          }}
        />
        <button 
          onClick={handleSendSTK}
          disabled={loading || !phone}
          style={{
            padding: '10px 20px',
            background: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            width: '100%',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Sending...' : 'Send STK Push'}
        </button>
      </div>

      {result && (
        <div style={{
          padding: '15px',
          background: result.success ? '#d4edda' : '#f8d7da',
          borderRadius: '5px',
          marginTop: '20px'
        }}>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PayHeroTest;