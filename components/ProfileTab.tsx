import React from 'react';
import { UserProfile, DailyRecord } from '../types';

interface ProfileTabProps {
  user: UserProfile;
  records: DailyRecord[];
  onEdit: () => void;
  onUpdateUser: (updates: Partial<UserProfile>) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ user, records, onEdit }) => {
  const totalLogs = records.length;
  const avgScore = records.length > 0
    ? Math.round(records.reduce((acc, r) => acc + r.score, 0) / records.length)
    : 0;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="bg-white rounded-2xl p-5 mb-4 custom-shadow text-center">
        <div className="w-20 h-20 rounded-full bg-[#D4AF37] mx-auto mb-3 flex items-center justify-center text-white text-3xl">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-500">Level {user.level}</p>
      </div>

      <div className="bg-white rounded-2xl p-5 mb-4 custom-shadow">
        <h3 className="font-semibold mb-4">Stats</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-[#FFF9F0] rounded-xl">
            <p className="text-xl font-bold text-[#D4AF37]">{totalLogs}</p>
            <p className="text-xs text-gray-500">Total Logs</p>
          </div>
          <div className="text-center p-3 bg-[#FFF9F0] rounded-xl">
            <p className="text-xl font-bold text-[#D4AF37]">{avgScore}</p>
            <p className="text-xs text-gray-500">Avg Score</p>
          </div>
          <div className="text-center p-3 bg-[#FFF9F0] rounded-xl">
            <p className="text-xl font-bold text-[#D4AF37]">{user.exp}</p>
            <p className="text-xs text-gray-500">Total XP</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 mb-4 custom-shadow">
        <h3 className="font-semibold mb-4">Settings</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <span className="text-gray-600">Gender</span>
            <span className="font-medium">{user.gender || 'Not set'}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <span className="text-gray-600">Goal</span>
            <span className="font-medium text-sm">{user.goal || 'Not set'}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <span className="text-gray-600">Frequency</span>
            <span className="font-medium">{user.frequency || 'Not set'}</span>
          </div>
        </div>
      </div>

      <button
        onClick={onEdit}
        className="w-full p-4 rounded-xl border border-[#D4AF37] text-[#D4AF37] font-semibold"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileTab;
