import React from 'react';

const TransactionHistory = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-12 bg-pink-50 rounded-xl">
        <span className="text-6xl mb-4 block">💔</span>
        <p className="text-gray-500 text-lg">No gifts sent yet</p>
        <p className="text-sm text-gray-400">Send your first Valentine's gift!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((t, index) => (
        <div
          key={t.id || index}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border-l-8 border-pink-400 transform hover:-translate-y-1"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl animate-heartbeat">❤️</span>
                <h3 className="font-bold text-xl text-gray-800">
                  To: {t.recipientName || 'My Valentine'}
                </h3>
              </div>
              
              <p className="text-gray-600 mb-2 italic">
                "{t.message || 'Happy Valentine\'s Day!'}"
              </p>
              
              <div className="flex gap-4 text-sm text-gray-500">
                <span>💰 KSh {t.amount || '??'}</span>
                <span>📱 {t.recipientPhone || 'No phone'}</span>
              </div>
              
              {t.cardType && (
                <span className="inline-block mt-2 px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs">
                  🎨 {t.cardType} card
                </span>
              )}
            </div>
            
            <div className="text-right">
              <span className="text-green-500 font-bold text-sm">
                ✅ Sent
              </span>
              <p className="text-xs text-gray-400 mt-1">
                {t.timestamp || new Date().toLocaleString()}
              </p>
              {t.transactionId && (
                <p className="text-xs text-gray-300 mt-1">
                  ID: {t.transactionId.slice(0, 8)}...
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionHistory;