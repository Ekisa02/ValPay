import React, { useState } from 'react';
import './ValentineFeatures.css';

const ValentineCard = () => {
  const [cardData, setCardData] = useState({
    to: '',
    from: '',
    message: '',
    style: 'romantic',
    includePhoto: false
  });

  const [showPreview, setShowPreview] = useState(false);

  const styles = [
    { id: 'romantic', icon: '🎀', label: 'Romantic', color: 'from-pink-400 to-rose-400' },
    { id: 'funny', icon: '😂', label: 'Funny', color: 'from-yellow-400 to-orange-400' },
    { id: 'elegant', icon: '✨', label: 'Elegant', color: 'from-purple-400 to-indigo-400' },
    { id: 'cute', icon: '🍰', label: 'Cute', color: 'from-pink-300 to-purple-300' }
  ];

  const randomMessages = {
    romantic: [
      "You make my heart skip a beat",
      "Every love story is beautiful, but ours is my favorite",
      "I love you more than pizza, and that's saying a lot",
      "You're the reason I believe in love"
    ],
    funny: [
      "I love you even when you steal the blankets",
      "You're the peanut butter to my jelly",
      "I'd share my dessert with you",
      "We go together like cake and ice cream"
    ],
    elegant: [
      "You are poetry in motion",
      "In a sea of people, my eyes always find you",
      "You are my greatest adventure",
      "My love for you is timeless"
    ],
    cute: [
      "You're my favorite notification",
      "I like you a latte",
      "You're the cheese to my macaroni",
      "I love you to the moon and back"
    ]
  };

  const generateRandomMessage = () => {
    const messages = randomMessages[cardData.style] || randomMessages.romantic;
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setCardData({...cardData, message: randomMsg});
  };

  return (
    <div className="valentine-card-container">
      <div className="card-header">
        <span className="card-header-icon">💌</span>
        <div>
          <h2 className="card-header-title">Digital Valentine Card</h2>
          <p className="card-header-subtitle">Create a memorable message</p>
        </div>
      </div>

      {/* Name Inputs */}
      <div className="name-inputs-grid">
        <div className="name-input-group">
          <label className="name-input-label">To:</label>
          <input
            type="text"
            className="name-input"
            placeholder="Your Valentine"
            value={cardData.to}
            onChange={(e) => setCardData({...cardData, to: e.target.value})}
          />
        </div>
        
        <div className="name-input-group">
          <label className="name-input-label">From:</label>
          <input
            type="text"
            className="name-input"
            placeholder="You"
            value={cardData.from}
            onChange={(e) => setCardData({...cardData, from: e.target.value})}
          />
        </div>
      </div>

      {/* Style Pills */}
      <div className="card-style-pills">
        {styles.map(style => (
          <button
            key={style.id}
            className={`style-pill ${cardData.style === style.id ? 'active' : ''}`}
            onClick={() => setCardData({...cardData, style: style.id})}
          >
            <span>{style.icon}</span>
            <span>{style.label}</span>
          </button>
        ))}
      </div>

      {/* Message Input */}
      <div className="message-input-section">
        <textarea
          className="message-input"
          placeholder="Write your message..."
          value={cardData.message}
          onChange={(e) => setCardData({...cardData, message: e.target.value})}
        />
        
        <div className="message-actions">
          <button className="random-message-btn" onClick={generateRandomMessage}>
            <span>🎲</span>
            Generate random message
          </button>
          
          <label className="photo-option">
            <input
              type="checkbox"
              checked={cardData.includePhoto}
              onChange={(e) => setCardData({...cardData, includePhoto: e.target.checked})}
            />
            <span>📷 Add photo</span>
          </label>
        </div>
      </div>

      {/* Preview Button */}
      <button className="preview-btn" onClick={() => setShowPreview(!showPreview)}>
        <span>{showPreview ? '👀 Hide' : '✨ Show'} Preview</span>
        <span>→</span>
      </button>

      {/* Card Preview */}
      {showPreview && (
        <div className={`card-preview ${cardData.style}`}>
          <div className="preview-content">
            <div className="preview-icon">
              {cardData.style === 'romantic' && '❤️'}
              {cardData.style === 'funny' && '😂'}
              {cardData.style === 'elegant' && '✨'}
              {cardData.style === 'cute' && '🥰'}
            </div>
            
            {cardData.to && (
              <p className="preview-to">Dear {cardData.to},</p>
            )}
            
            <p className={`preview-message ${cardData.style}`}>
              {cardData.message || "You make every day special"}
            </p>
            
            {cardData.includePhoto && (
              <div className="preview-photo">
                <span>📸</span>
              </div>
            )}
            
            {cardData.from && (
              <p className="preview-from">With love, {cardData.from}</p>
            )}
            
            <p className="text-xs text-gray-400 mt-4">💝 Made with ValPay</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValentineCard;