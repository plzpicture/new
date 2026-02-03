import React from 'react';
import { DailyRecord } from '../types';

interface HistoryTabProps {
  records: DailyRecord[];
}

const HistoryTab: React.FC<HistoryTabProps> = ({ records }) => {
  const sortedRecords = [...records].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">History</h1>

      {sortedRecords.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-4">📅</p>
          <p>No records yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedRecords.map((record) => (
            <div
              key={record.date}
              className="bg-white rounded-2xl p-4 custom-shadow flex items-center gap-4"
            >
              <span className="text-3xl">{record.feeling.emoji}</span>
              <div className="flex-1">
                <p className="font-medium">{formatDate(record.date)}</p>
                <p className="text-sm text-gray-500">
                  Score: {record.score} | Movements: {record.stoolCount}
                </p>
                {record.memo && (
                  <p className="text-sm text-gray-400 mt-1 truncate">{record.memo}</p>
                )}
              </div>
              <div className="text-right">
                <span className={`text-sm font-semibold ${
                  record.score >= 70 ? 'text-green-500' :
                  record.score >= 40 ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {record.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryTab;
