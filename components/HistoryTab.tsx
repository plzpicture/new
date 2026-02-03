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
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">📅 기록</h1>
      <p className="text-gray-500 mb-6">지난 건강 기록을 확인하세요</p>

      {sortedRecords.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-4">📅</p>
          <p>아직 기록이 없습니다</p>
          <p className="text-sm mt-2">대변 분석 탭에서 기록을 시작하세요!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedRecords.map((record) => (
            <div
              key={record.date}
              className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4"
            >
              <span className="text-3xl">{record.feeling.emoji}</span>
              <div className="flex-1">
                <p className="font-medium">{formatDate(record.date)}</p>
                <p className="text-sm text-gray-500">
                  점수: {record.score} | 횟수: {record.stoolCount}회
                </p>
                {record.memo && (
                  <p className="text-sm text-gray-400 mt-1 truncate">{record.memo}</p>
                )}
              </div>
              <div className="text-right">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                  record.score >= 70 ? 'bg-green-400' :
                  record.score >= 40 ? 'bg-yellow-400' : 'bg-red-400'
                }`}>
                  {record.score}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Card */}
      {sortedRecords.length > 0 && (
        <div className="mt-6 bg-[#F5F9F0] rounded-2xl p-5">
          <h3 className="font-semibold mb-3">이번 주 요약</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#C5A572]">{sortedRecords.length}</p>
              <p className="text-xs text-gray-500">총 기록</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#C5A572]">
                {Math.round(sortedRecords.reduce((acc, r) => acc + r.score, 0) / sortedRecords.length)}
              </p>
              <p className="text-xs text-gray-500">평균 점수</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#C5A572]">
                {sortedRecords.reduce((acc, r) => acc + r.stoolCount, 0)}
              </p>
              <p className="text-xs text-gray-500">총 횟수</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryTab;
