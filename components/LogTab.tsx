import React, { useState } from 'react';
import { DailyRecord } from '../types';

interface LogTabProps {
  onSave: (record: DailyRecord) => void;
}

const feelings = [
  { emoji: '😄', label: 'Great' },
  { emoji: '😊', label: 'Good' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '😕', label: 'Not great' },
  { emoji: '😣', label: 'Bad' },
];

const LogTab: React.FC<LogTabProps> = ({ onSave }) => {
  const [feeling, setFeeling] = useState<{ emoji: string; label: string } | null>(null);
  const [score, setScore] = useState(50);
  const [stoolCount, setStoolCount] = useState(1);
  const [memo, setMemo] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!feeling) return;

    const record: DailyRecord = {
      date: new Date().toISOString().split('T')[0],
      feeling,
      score,
      stoolCount,
      memo,
    };
    onSave(record);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Daily Log</h1>

      <div className="bg-white rounded-2xl p-5 mb-4 custom-shadow">
        <h3 className="font-semibold mb-4">How do you feel?</h3>
        <div className="flex justify-between">
          {feelings.map((f) => (
            <button
              key={f.label}
              onClick={() => setFeeling(f)}
              className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                feeling?.label === f.label ? 'bg-[#FFF9F0] scale-110' : ''
              }`}
            >
              <span className="text-3xl mb-1">{f.emoji}</span>
              <span className="text-[10px] text-gray-500">{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 mb-4 custom-shadow">
        <h3 className="font-semibold mb-4">Gut Health Score</h3>
        <input
          type="range"
          min="0"
          max="100"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          className="w-full accent-[#D4AF37]"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>0</span>
          <span className="font-semibold text-[#D4AF37]">{score}</span>
          <span>100</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 mb-4 custom-shadow">
        <h3 className="font-semibold mb-4">Bowel Movements</h3>
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => setStoolCount(Math.max(0, stoolCount - 1))}
            className="w-10 h-10 rounded-full bg-gray-100 text-xl"
          >
            -
          </button>
          <span className="text-3xl font-bold text-[#D4AF37]">{stoolCount}</span>
          <button
            onClick={() => setStoolCount(stoolCount + 1)}
            className="w-10 h-10 rounded-full bg-gray-100 text-xl"
          >
            +
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 mb-4 custom-shadow">
        <h3 className="font-semibold mb-4">Notes</h3>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="Any notes about today..."
          className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:outline-none resize-none h-24"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={!feeling}
        className="w-full p-4 rounded-xl bg-[#D4AF37] text-white font-semibold disabled:opacity-50"
      >
        {saved ? 'Saved!' : 'Save Log'}
      </button>
    </div>
  );
};

export default LogTab;
