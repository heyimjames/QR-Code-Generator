import React from 'react';
import { QRCodeData } from './QRCodeGenerator';

interface QRHistoryProps {
  history: QRCodeData[];
  onSelect: (item: QRCodeData) => void;
}

export const QRHistory: React.FC<QRHistoryProps> = ({ history, onSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">History</h2>
      <div className="space-y-4">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="w-full text-left p-4 rounded-lg border hover:bg-gray-50 transition-colors"
          >
            <p className="font-medium truncate">{item.content}</p>
            <p className="text-sm text-gray-500">
              {new Date(item.timestamp).toLocaleDateString()}
            </p>
          </button>
        ))}
        {history.length === 0 && (
          <p className="text-gray-500 text-center">No history yet</p>
        )}
      </div>
    </div>
  );
};