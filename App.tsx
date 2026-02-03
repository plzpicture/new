import React, { useState, useEffect } from 'react';
import { UserProfile, DailyRecord, Tab, Symptom } from './types';
import Onboarding from './components/Onboarding';
import HomeTab from './components/HomeTab';
import AnalysisTab from './components/AnalysisTab';
import DietTab from './components/DietTab';
import HistoryTab from './components/HistoryTab';
import SettingsTab from './components/SettingsTab';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile>({
    name: '',
    gender: null,
    goal: null,
    symptoms: [] as Symptom[],
    frequency: null,
    reminderTime: '09:00',
    onboarded: false,
    level: 3,
    exp: 450,
  });

  const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
  const [records, setRecords] = useState<DailyRecord[]>([]);

  useEffect(() => {
    const initialRecords: DailyRecord[] = [
      { date: '2025-05-10', feeling: { emoji: '😄', label: '좋음' }, score: 85, stoolCount: 1, memo: '컨디션 좋음!' },
      { date: '2025-05-11', feeling: { emoji: '😊', label: '보통' }, score: 76, stoolCount: 1, memo: '평범한 하루' },
    ];
    setRecords(initialRecords);
  }, []);

  const handleOnboardingComplete = (data: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...data, onboarded: true }));
    setActiveTab(Tab.Home);
  };

  const handleAddRecord = (record: DailyRecord) => {
    setRecords(prev => {
      const existing = prev.findIndex(r => r.date === record.date);
      if (existing !== -1) {
        const updated = [...prev];
        updated[existing] = record;
        return updated;
      }
      return [...prev, record];
    });
    setUser(prev => ({ ...prev, exp: prev.exp + 50 }));
  };

  const handleUpdateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const handleResetProfile = () => {
    setUser(prev => ({ ...prev, onboarded: false }));
  };

  if (!user.onboarded) {
    return (
      <div className="flex justify-center min-h-screen bg-[#FFF9F0]">
        <div className="w-full max-w-[430px] bg-[#FFF9F0]">
          <Onboarding onComplete={handleOnboardingComplete} initialUser={user} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen bg-[#FFF9F0]">
      <div className="w-full max-w-[430px] bg-[#FFF9F0] flex flex-col relative min-h-screen">
        <main className="flex-1 overflow-y-auto pb-24">
          {activeTab === Tab.Home && <HomeTab user={user} records={records} />}
          {activeTab === Tab.Analysis && <AnalysisTab onSave={handleAddRecord} />}
          {activeTab === Tab.Diet && <DietTab />}
          {activeTab === Tab.History && <HistoryTab records={records} />}
          {activeTab === Tab.Settings && <SettingsTab user={user} onEdit={handleResetProfile} onUpdateUser={handleUpdateUser} />}
        </main>

        <nav className="fixed bottom-0 w-full max-w-[430px] h-20 bg-white border-t border-gray-100 flex items-center justify-around z-50 rounded-t-[20px] shadow-lg">
          <TabButton icon="🏠" label="홈" active={activeTab === Tab.Home} onClick={() => setActiveTab(Tab.Home)} />
          <TabButton icon="💩" label="대변 분석" active={activeTab === Tab.Analysis} onClick={() => setActiveTab(Tab.Analysis)} />
          <TabButton icon="🥗" label="식단" active={activeTab === Tab.Diet} onClick={() => setActiveTab(Tab.Diet)} />
          <TabButton icon="📅" label="기록" active={activeTab === Tab.History} onClick={() => setActiveTab(Tab.History)} />
          <TabButton icon="⚙️" label="설정" active={activeTab === Tab.Settings} onClick={() => setActiveTab(Tab.Settings)} />
        </nav>
      </div>
    </div>
  );
};

const TabButton: React.FC<{ icon: string; label: string; active: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center transition-all px-2 ${active ? 'text-[#C5A572]' : 'text-gray-400'}`}
  >
    <span className="text-xl mb-1">{icon}</span>
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

export default App;
