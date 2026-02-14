// ⭐ NEW FEATURE - Built at Build Bout Hackathon 2026 ⭐
// This feature lets you schedule surprise payments for later!

import React, { useState } from 'react';
import './ValentineFeatures.css'; // Import the same CSS for consistent styling

const SurpriseDelivery = ({ onScheduleComplete }) => {
  const [deliveryDate, setDeliveryDate] = useState('');
  const [isSurprise, setIsSurprise] = useState(false);
  const [surpriseType, setSurpriseType] = useState('hidden');
  const [revealTime, setRevealTime] = useState('delivery');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSchedule = (e) => {
    e.preventDefault();
    
    // Show confetti animation
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
    
    // Check if onScheduleComplete exists
    if (onScheduleComplete) {
      onScheduleComplete({ 
        deliveryDate: deliveryDate || '2026-02-14',
        isSurprise,
        surpriseType,
        revealTime,
        message: `🎁 Surprise scheduled for ${deliveryDate || 'Valentine\'s Day'}!`
      });
    } else {
      // Fallback for demo
      alert(`🎁 Surprise scheduled for ${deliveryDate || 'Valentine\'s Day'}! ${
        isSurprise ? 'Amount will be hidden!' : ''
      }`);
    }
  };

  return (
    <div className="schedule-container relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 20 + 10}px`,
                animation: `float ${Math.random() * 2 + 1}s ease-out`,
                color: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3'][Math.floor(Math.random() * 4)]
              }}
            >
              {['🎉', '🎊', '✨', '💝', '🎁'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="schedule-header">
        <span className="schedule-header-icon animate-bounce">🎁</span>
        <div>
          <h2 className="schedule-header-title">Surprise Delivery</h2>
          <p className="schedule-header-subtitle">
            <span>✨</span> Make it magical! <span>✨</span>
          </p>
        </div>
      </div>

      <form onSubmit={handleSchedule} className="space-y-6">
        {/* Date Picker */}
        <div className="date-picker-group">
          <div className="date-picker-label">
            <i>📅</i>
            <span>Choose Delivery Date</span>
          </div>
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="date-select"
            min="2026-02-14"
            max="2026-02-14"
            required
          />
          {deliveryDate === '2026-02-14' && (
            <div className="valentine-date-badge">
              💝 Perfect!
            </div>
          )}
          <p className="text-sm text-pink-500 mt-2 flex items-center gap-1">
            <span>❤️</span> Must be Valentine's Day (Feb 14, 2026)
          </p>
        </div>

        {/* Surprise Type Selection */}
        <div className="repeat-section">
          <div className="repeat-title">
            <span>🎭</span>
            <span>Type of Surprise</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'hidden', label: 'Hidden Amount', icon: '🙈', desc: 'Hide the amount' },
              { id: 'anonymous', label: 'Anonymous', icon: '🕵️', desc: 'Don\'t reveal sender' },
              { id: 'puzzle', label: 'Puzzle', icon: '🧩', desc: 'Solve to reveal' },
              { id: 'countdown', label: 'Countdown', icon: '⏳', desc: 'Reveal slowly' }
            ].map(type => (
              <label
                key={type.id}
                className={`
                  cursor-pointer p-4 rounded-xl border-2 transition-all duration-300
                  ${surpriseType === type.id 
                    ? 'border-pink-500 bg-gradient-to-r from-pink-50 to-red-50 shadow-lg scale-105' 
                    : 'border-gray-200 hover:border-pink-300 bg-white'
                  }
                `}
              >
                <input
                  type="radio"
                  name="surpriseType"
                  value={type.id}
                  checked={surpriseType === type.id}
                  onChange={(e) => setSurpriseType(e.target.value)}
                  className="hidden"
                />
                <div className="text-center">
                  <span className="text-3xl block mb-2">{type.icon}</span>
                  <span className="font-bold block text-sm">{type.label}</span>
                  <span className="text-xs text-gray-500">{type.desc}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Reveal Time */}
        <div className="time-picker-group">
          <div className="time-picker-header">
            <span>⏰</span>
            <h4>When to Reveal?</h4>
          </div>
          
          <div className="time-slots">
            {[
              { id: 'delivery', label: 'At Delivery', icon: '🎁' },
              { id: 'morning', label: 'Morning', icon: '🌅' },
              { id: 'midnight', label: 'Midnight', icon: '✨' },
              { id: 'countdown', label: 'Countdown', icon: '⏳' }
            ].map(time => (
              <button
                key={time.id}
                type="button"
                className={`time-slot ${revealTime === time.id ? 'selected' : ''} ${
                  time.id === 'midnight' ? 'midnight' : ''
                }`}
                onClick={() => setRevealTime(time.id)}
              >
                <span className="block text-xl mb-1">{time.icon}</span>
                <span>{time.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Surprise Options */}
        <div className="repeat-section">
          <div className="repeat-title">
            <span>🎪</span>
            <span>Surprise Settings</span>
          </div>
          
          <label className="reminder-section mb-3">
            <input
              type="checkbox"
              checked={isSurprise}
              onChange={(e) => setIsSurprise(e.target.checked)}
              className="reminder-checkbox"
            />
            <div className="reminder-content">
              <h4>🙈 Hide the amount</h4>
              <p>Recipient won't see how much until they open it</p>
            </div>
          </label>

          {isSurprise && (
            <div className="mt-3 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg animate-pulse">
              <p className="text-sm text-purple-600 flex items-center gap-2">
                <span>🎭</span>
                <span>They'll be so surprised! The amount is hidden!</span>
              </p>
            </div>
          )}
        </div>

        {/* Preview Card */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl border-2 border-dashed border-pink-300">
          <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span>👀</span>
            <span>Surprise Preview</span>
          </h4>
          
          <div className="bg-white p-4 rounded-lg text-center">
            <span className="text-6xl mb-3 block animate-bounce">
              {isSurprise ? '🙈' : '🎁'}
            </span>
            
            <p className="text-gray-600 mb-2">
              {isSurprise 
                ? 'Someone special sent you a mystery gift!' 
                : 'A gift is on its way!'}
            </p>
            
            {deliveryDate && (
              <p className="text-sm text-pink-500">
                📅 Arrives: {new Date(deliveryDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </p>
            )}
            
            {revealTime === 'midnight' && (
              <p className="text-sm text-purple-600 mt-2 flex items-center justify-center gap-1">
                <span>✨</span>
                <span>Magical midnight reveal!</span>
                <span>✨</span>
              </p>
            )}
          </div>
        </div>

        {/* Schedule Button */}
        <div className="schedule-actions">
          <button
            type="submit"
            className="schedule-btn group"
          >
            <span>🎁</span>
            Schedule Surprise
            <span className="group-hover:translate-x-1 transition-transform">✨</span>
          </button>
        </div>
      </form>

      {/* Fun Fact */}
      <div className="mt-4 text-center text-xs text-gray-400">
        <p>✨ Every surprise is wrapped with love ✨</p>
      </div>
    </div>
  );
};

export default SurpriseDelivery;