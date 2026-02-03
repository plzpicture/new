
import React, { useState, useEffect } from 'react';
import { UserProfile, DailyRecord, Tab } from './types';
import Onboarding from './components/Onboarding';
import HomeTab from './components/HomeTab';
import LogTab from './components/LogTab';
import HistoryTab from './components/HistoryTab';
import InsightsTab from './components/InsightsTab';
import ProfileTab from './components/ProfileTab';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile>({
    name: '',
    gender: null,
    goal: null,
    symptoms: [],
    frequency: null,
    reminderTime: '09:00',
    onboarded: false,
    level: 3,
    exp: 450,
  });

  const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
  const [records, setRecords] = useState<DailyRecord[]>([]);

  useEffect(() => {
    // Initial dummy data
    const initialRecords: DailyRecord[] = [
      { date: '2025-05-10', feeling: { emoji: '😄', label: 'Great' }, score: 85, stoolCount: 1, memo: 'Energized day!' },
      { date: '2025-05-11', feeling: { emoji: '😊', label: 'Good' }, score: 76, stoolCount: 1, memo: 'Normal day.' },
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
    // Level up simulation
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
      <div className="w-full max-w-[430px] bg-white flex flex-col relative custom-shadow min-h-screen">
        <main className="flex-1 overflow-y-auto pb-20 bg-[#FFF9F0]">
          {activeTab === Tab.Home && <HomeTab user={user} records={records} />}
          {activeTab === Tab.Log && <LogTab onSave={handleAddRecord} />}
          {activeTab === Tab.History && <HistoryTab records={records} />}
          {activeTab === Tab.Insights && <InsightsTab />}
          {activeTab === Tab.Profile && <ProfileTab user={user} records={records} onEdit={handleResetProfile} onUpdateUser={handleUpdateUser} />}
        </main>

        <nav className="fixed bottom-0 w-full max-w-[430px] h-20 bg-white border-t border-gray-100 flex items-center justify-around z-50 rounded-t-[20px] custom-shadow">
          <TabButton icon="🏠" label="Home" active={activeTab === Tab.Home} onClick={() => setActiveTab(Tab.Home)} />
          <TabButton icon="🍽️" label="Log" active={activeTab === Tab.Log} onClick={() => setActiveTab(Tab.Log)} />
          <TabButton icon="📅" label="History" active={activeTab === Tab.History} onClick={() => setActiveTab(Tab.History)} />
          <TabButton icon="📊" label="Insights" active={activeTab === Tab.Insights} onClick={() => setActiveTab(Tab.Insights)} />
          <TabButton icon="👤" label="Profile" active={activeTab === Tab.Profile} onClick={() => setActiveTab(Tab.Profile)} />
        </nav>
      </div>
    </div>
  );
};

const TabButton: React.FC<{ icon: string; label: string; active: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center transition-all ${active ? 'text-[#D4AF37] scale-110' : 'text-gray-400 opacity-60'}`}
  >
    <span className="text-2xl mb-1">{icon}</span>
    <span className="text-[10px] font-bold">{label}</span>
  </button>
);

export default App;
