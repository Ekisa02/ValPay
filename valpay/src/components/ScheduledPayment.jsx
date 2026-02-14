import React, { useState } from 'react';
import './ValentineFeatures.css';

const ScheduledPayment = ({ onScheduleComplete }) => {
  const [scheduleData, setScheduleData] = useState({
    date: '',
    time: '',
    repeat: 'once',
    reminder: true
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const dates = [
    { value: '2026-02-10', label: 'Feb 10, 2026', isValentine: false },
    { value: '2026-02-11', label: 'Feb 11, 2026', isValentine: false },
    { value: '2026-02-12', label: 'Feb 12, 2026', isValentine: false },
    { value: '2026-02-13', label: 'Feb 13, 2026', isValentine: false },
    { value: '2026-02-14', label: '💘 VALENTINE\'S DAY! Feb 14, 2026', isValentine: true },
    { value: '2026-02-15', label: 'Feb 15, 2026', isValentine: false },
  ];

  const timeSlots = [
    { time: '00:00', label: '🕛 Midnight', isMidnight: true },
    { time: '06:00', label: '🌅 6:00 AM', isMidnight: false },
    { time: '08:00', label: '☀️ 8:00 AM', isMidnight: false },
    { time: '10:00', label: '🌤️ 10:00 AM', isMidnight: false },
    { time: '12:00', label: '☀️ 12:00 PM', isMidnight: false },
    { time: '14:00', label: '⛅ 2:00 PM', isMidnight: false },
    { time: '16:00', label: '🌆 4:00 PM', isMidnight: false },
    { time: '18:00', label: '🌇 6:00 PM', isMidnight: false },
    { time: '20:00', label: '🌙 8:00 PM', isMidnight: false },
    { time: '22:00', label: '🌜 10:00 PM', isMidnight: false },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if onScheduleComplete exists before calling it
    if (typeof onScheduleComplete === 'function') {
      const selectedDate = dates.find(d => d.value === scheduleData.date);
      onScheduleComplete({
        ...scheduleData,
        isValentines: selectedDate?.isValentine || false,
        deliveryDate: scheduleData.date,
        message: selectedDate?.isValentine ? '🎉 Valentine\'s Day Special!' : 'Gift Scheduled'
      });
    } else {
      console.warn('onScheduleComplete prop is missing or not a function');
      // Fallback - show alert for demo purposes
      alert('✅ Gift scheduled! (Demo mode)');
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTimeSlot(time);
    setScheduleData({...scheduleData, time});
  };

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <span className="schedule-header-icon">⏰</span>
        <div>
          <h2 className="schedule-header-title">Schedule Gift</h2>
          <p className="schedule-header-subtitle">
            <span>🎁</span> Plan your Valentine's surprise
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Date Picker */}
        <div className="date-picker-group">
          <div className="date-picker-label">
            <i>📅</i>
            <span>Pick Your Date</span>
          </div>
          <select
            value={scheduleData.date}
            onChange={(e) => setScheduleData({...scheduleData, date: e.target.value})}
            className="date-select"
            required
          >
            <option value="">Select a date</option>
            {dates.map(date => (
              <option key={date.value} value={date.value}>
                {date.label}
              </option>
            ))}
          </select>
          {scheduleData.date === '2026-02-14' && (
            <div className="valentine-date-badge">
              💝 Special Day!
            </div>
          )}
        </div>

        {/* Time Picker */}
        <div className="time-picker-group">
          <div className="time-picker-header">
            <span>⏲️</span>
            <h4>Choose Time</h4>
          </div>
          
          <div className="time-slots">
            {timeSlots.map(slot => (
              <button
                key={slot.time}
                type="button"
                className={`time-slot ${slot.isMidnight ? 'midnight' : ''} ${selectedTimeSlot === slot.time ? 'selected' : ''}`}
                onClick={() => handleTimeSelect(slot.time)}
              >
                {slot.label}
              </button>
            ))}
          </div>

          {selectedTimeSlot === '00:00' && (
            <div className="midnight-hint">
              <span>✨</span>
              <span>Midnight surprise! So romantic!</span>
              <span>✨</span>
            </div>
          )}
        </div>

        {/* Repeat Options */}
        <div className="repeat-section">
          <div className="repeat-title">
            <span>🔄</span>
            <span>Repeat Every Year?</span>
          </div>
          
          <div className="repeat-options">
            <div className="repeat-option">
              <input
                type="radio"
                id="once"
                name="repeat"
                value="once"
                checked={scheduleData.repeat === 'once'}
                onChange={(e) => setScheduleData({...scheduleData, repeat: e.target.value})}
              />
              <label htmlFor="once">
                <span>🎁</span>
                Just this once
              </label>
            </div>
            
            <div className="repeat-option">
              <input
                type="radio"
                id="yearly"
                name="repeat"
                value="yearly"
                checked={scheduleData.repeat === 'yearly'}
                onChange={(e) => setScheduleData({...scheduleData, repeat: e.target.value})}
              />
              <label htmlFor="yearly">
                <span>💑</span>
                Every year!
              </label>
            </div>
          </div>
        </div>

        {/* Reminder Checkbox */}
        <label className="reminder-section">
          <input
            type="checkbox"
            className="reminder-checkbox"
            checked={scheduleData.reminder}
            onChange={(e) => setScheduleData({...scheduleData, reminder: e.target.checked})}
          />
          <div className="reminder-content">
            <h4>💬 Send me a reminder</h4>
            <p>We'll text you before sending the gift</p>
          </div>
        </label>

        {/* Schedule Button */}
        <div className="schedule-actions">
          <button type="submit" className="schedule-btn">
            <span>⏰</span>
            Schedule Gift
            <span>🎁</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduledPayment;