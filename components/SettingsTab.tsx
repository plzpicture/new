import React from 'react';
import { UserProfile } from '../types';

interface SettingsTabProps {
  user: UserProfile;
  onEdit: () => void;
  onUpdateUser: (updates: Partial<UserProfile>) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ user, onEdit }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">⚙️ 설정</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-[#C5A572] flex items-center justify-center text-white text-2xl font-bold">
            {user.name ? user.name.charAt(0).toUpperCase() : '👤'}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.name || '사용자'}</h2>
            <p className="text-gray-500">레벨 {user.level}</p>
          </div>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C5A572] rounded-full"
            style={{ width: `${(user.exp % 500) / 500 * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2 text-right">{user.exp % 500}/500 XP</p>
      </div>

      {/* Settings List */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
        <SettingItem
          icon="🎯"
          label="목표"
          value={user.goal || '설정 안됨'}
        />
        <SettingItem
          icon="🚽"
          label="배변 빈도"
          value={user.frequency || '설정 안됨'}
        />
        <SettingItem
          icon="🩺"
          label="증상"
          value={user.symptoms.length > 0 ? user.symptoms.join(', ') : '없음'}
        />
      </div>

      {/* Actions */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
        <button className="w-full p-4 flex items-center gap-3 border-b border-gray-100">
          <span className="text-xl">🔔</span>
          <span className="flex-1 text-left">알림 설정</span>
          <span className="text-gray-400">›</span>
        </button>
        <button className="w-full p-4 flex items-center gap-3 border-b border-gray-100">
          <span className="text-xl">📊</span>
          <span className="flex-1 text-left">데이터 내보내기</span>
          <span className="text-gray-400">›</span>
        </button>
        <button className="w-full p-4 flex items-center gap-3">
          <span className="text-xl">❓</span>
          <span className="flex-1 text-left">도움말</span>
          <span className="text-gray-400">›</span>
        </button>
      </div>

      {/* Edit Profile Button */}
      <button
        onClick={onEdit}
        className="w-full p-4 rounded-2xl border-2 border-[#C5A572] text-[#C5A572] font-semibold"
      >
        프로필 다시 설정하기
      </button>

      {/* App Info */}
      <div className="text-center mt-6 text-gray-400 text-sm">
        <p>GutBuddy v1.0.0</p>
        <p>AI 장 건강 도우미</p>
      </div>
    </div>
  );
};

const SettingItem: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="p-4 flex items-center gap-3 border-b border-gray-100 last:border-b-0">
    <span className="text-xl">{icon}</span>
    <span className="flex-1">{label}</span>
    <span className="text-gray-500 text-sm">{value}</span>
  </div>
);

export default SettingsTab;
