import React from 'react';
import { UserProfile, DailyRecord } from '../types';

interface HomeTabProps {
  user: UserProfile;
  records: DailyRecord[];
}

const HomeTab: React.FC<HomeTabProps> = ({ user, records }) => {
  const todayRecord = records.find(r => r.date === new Date().toISOString().split('T')[0]);
  const avgScore = records.length > 0
    ? Math.round(records.reduce((acc, r) => acc + r.score, 0) / records.length)
    : 0;

  const expToNextLevel = 500;
  const expProgress = (user.exp % expToNextLevel) / expToNextLevel * 100;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Hello, {user.name}!</h1>
        <p className="text-gray-500">How's your gut feeling today?</p>
      </div>

      <div className="bg-white rounded-2xl p-5 mb-4 custom-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500">Level {user.level}</span>
          <span className="text-sm text-[#D4AF37] font-semibold">{user.exp % expToNextLevel}/{expToNextLevel} XP</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#D4AF37] rounded-full transition-all"
            style={{ width: `${expProgress}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 mb-4 custom-shadow">
        <h3 className="font-semibold mb-3">Today's Status</h3>
        {todayRecord ? (
          <div className="flex items-center gap-4">
            <span className="text-4xl">{todayRecord.feeling.emoji}</span>
            <div>
              <p className="font-medium">{todayRecord.feeling.label}</p>
              <p className="text-sm text-gray-500">Score: {todayRecord.score}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">No log yet. Tap "Log" to record!</p>
        )}
      </div>

      <div className="bg-white rounded-2xl p-5 custom-shadow">
        <h3 className="font-semibold mb-3">Weekly Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-[#FFF9F0] rounded-xl">
            <p className="text-2xl font-bold text-[#D4AF37]">{records.length}</p>
            <p className="text-xs text-gray-500">Logs</p>
          </div>
          <div className="text-center p-3 bg-[#FFF9F0] rounded-xl">
            <p className="text-2xl font-bold text-[#D4AF37]">{avgScore}</p>
            <p className="text-xs text-gray-500">Avg Score</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
