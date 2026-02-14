import React, { useState, useEffect } from 'react';
import PaymentForm from './components/PaymentForm';
import ScheduledPayment from './components/ScheduledPayment';
import SurpriseDelivery from './components/SurpriseDelivery';
import TransactionHistory from './components/TransactionHistory';
import ValentineCard from './components/ValentineCard';
import './App.css';
import PayHeroTest from './components/PayHeroTest';

// Add this in your return statement
<PayHeroTest />

function App() {
  const [showSurprise, setShowSurprise] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Check if it's Valentine's Day
  const isValentinesDay = currentTime.getMonth() === 1 && currentTime.getDate() === 14;

  const handlePaymentComplete = (paymentData) => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const newTransaction = {
        id: Date.now(),
        ...paymentData,
        timestamp: new Date().toLocaleString(),
        status: 'completed'
      };
      setTransactions([newTransaction, ...transactions]);
      setLoading(false);
      
      // Show success message
      alert('❤️ Payment sent successfully! Happy Valentine\'s Day! ❤️');
    }, 1500);
  };

  const handleScheduleComplete = (scheduleData) => {
    alert(`🎁 Surprise scheduled for ${scheduleData.deliveryDate || 'Valentine\'s Day'}!`);
  };

  // Calculate days until Valentine's
  const daysUntilValentine = Math.ceil((new Date(2026, 1, 14) - currentTime) / (1000 * 60 * 60 * 24));

  return (
    <div className="valentine-container">
      {/* Floating hearts background */}
      <div className="floating-hearts">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="heart">❤️</div>
        ))}
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Header Section */}
        <div className="header-section">
          <h1 className="main-title">
            ValPay
          </h1>
          <p className="tagline">
            Send love, send money, make memories ❤️
          </p>
          
          {/* Valentine's Day Special Banner */}
          {isValentinesDay && (
            <div className="valentine-banner">
              🎉 HAPPY VALENTINE'S DAY! Special Gifts Today! 🎉
            </div>
          )}

          {/* Countdown timer */}
          {!isValentinesDay && (
            <div className="countdown-timer">
              ⏰ {daysUntilValentine} days until Valentine's!
            </div>
          )}
        </div>

        {/* Main Grid Layout */}
        <div className="grid-layout">
          {/* Left Column - Payment Form */}
          <div className="space-y-6">
            <div className="valentine-card">
              <div className="card-header">
                <span className="card-header-icon animate-heartbeat">💳</span>
                <div>
                  <h2 className="card-header-title">Send Gift</h2>
                  <p className="card-header-subtitle">Send love with money</p>
                </div>
              </div>
              <PaymentForm 
                onPaymentComplete={handlePaymentComplete} 
                loading={loading}
              />
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h3 className="quick-actions-title">
                <span>⚡</span> Quick Actions
              </h3>
              <div className="quick-actions-grid">
                <button 
                  onClick={() => setShowSurprise(!showSurprise)}
                  className="quick-action-btn purple"
                >
                  <span>🎁</span>
                  {showSurprise ? 'Hide' : 'Show'} Surprise Options
                </button>
                <button 
                  onClick={() => setShowHistory(!showHistory)}
                  className="quick-action-btn pink"
                >
                  <span>📜</span>
                  {showHistory ? 'Hide' : 'View'} History
                </button>
              </div>
            </div>

            {/* PayHero Badge */}
            <div className="payhero-badge">
              <span>🔒</span>
              <span>Secured by PayHero · M-Pesa Integration</span>
              <span className="animate-sparkle">✨</span>
            </div>
          </div>

          {/* Right Column - Special Features */}
          <div className="space-y-6">
            {/* Surprise Delivery Section */}
            {showSurprise && (
              <div className="special-features animate-slideIn">
                <div className="special-features-title">
                  <span className="animate-bounce">🎁</span>
                  <span>Surprise Delivery</span>
                </div>
                <div className="schedule-section">
                  <SurpriseDelivery onScheduleComplete={handleScheduleComplete} />
                </div>
              </div>
            )}

            {/* Scheduled Payment Feature */}
            <div className="valentine-card">
              <div className="card-header">
                <span className="card-header-icon">⏰</span>
                <div>
                  <h2 className="card-header-title">Schedule Gift</h2>
                  <p className="card-header-subtitle">Plan your Valentine's surprise</p>
                </div>
              </div>
              <div className="schedule-section">
                <ScheduledPayment onScheduleComplete={handleScheduleComplete} />
              </div>
            </div>

            {/* Valentine Card Generator */}
            <div className="valentine-card" style={{ background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)' }}>
              <div className="card-header">
                <span className="card-header-icon animate-float">💌</span>
                <div>
                  <h3 className="card-header-title">Digital Valentine Card</h3>
                  <p className="card-header-subtitle">Create a memorable message</p>
                </div>
              </div>
              <ValentineCard />
            </div>
          </div>
        </div>

        {/* Transaction History Section */}
        {showHistory && (
          <div className="mt-8 animate-slideIn">
            {transactions.length > 0 ? (
              <div className="valentine-card">
                <div className="card-header">
                  <span className="card-header-icon">📜</span>
                  <div>
                    <h2 className="card-header-title">Your Gift History</h2>
                    <p className="card-header-subtitle">All your Valentine's moments</p>
                  </div>
                </div>
                <TransactionHistory transactions={transactions} />
              </div>
            ) : (
              <div className="valentine-card text-center py-12">
                <span className="text-6xl mb-4 block animate-float">💔</span>
                <h3 className="text-2xl font-bold text-gray-600 mb-2">No gifts yet</h3>
                <p className="text-gray-500">Send your first Valentine's gift! 💝</p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="footer">
          <p>
            Made with <span className="footer-heart">❤️</span> at Build Bout Hackathon 2026
          </p>
          <p className="text-sm mt-2 opacity-75">
            Powered by PayHero • Spread love, not just money
          </p>
          <div className="mt-4 flex justify-center gap-4 text-sm">
            <span className="cursor-pointer hover:text-white transition">About</span>
            <span className="cursor-pointer hover:text-white transition">Terms</span>
            <span className="cursor-pointer hover:text-white transition">Privacy</span>
            <span className="cursor-pointer hover:text-white transition">Help</span>
          </div>
        </footer>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center animate-pulse-slow">
            <span className="text-6xl mb-4 block animate-heartbeat">💝</span>
            <p className="text-xl font-bold text-pink-600">Processing your gift...</p>
            <p className="text-gray-500 mt-2">Just a moment, love is on the way!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;