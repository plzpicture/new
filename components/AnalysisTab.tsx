import React, { useState } from 'react';
import { DailyRecord } from '../types';

interface AnalysisTabProps {
  onSave: (record: DailyRecord) => void;
}

const feelings = [
  { emoji: '😄', label: '아주 좋음' },
  { emoji: '😊', label: '좋음' },
  { emoji: '😐', label: '보통' },
  { emoji: '😟', label: '별로' },
  { emoji: '😫', label: '나쁨' },
];

const AnalysisTab: React.FC<AnalysisTabProps> = ({ onSave }) => {
  const [selectedFeeling, setSelectedFeeling] = useState<{ emoji: string; label: string } | null>(null);
  const [stoolCount, setStoolCount] = useState(1);
  const [memo, setMemo] = useState('');

  const handleSave = () => {
    if (!selectedFeeling) return;

    const today = new Date().toISOString().split('T')[0];
    const score = feelings.findIndex(f => f.emoji === selectedFeeling.emoji);
    const calculatedScore = Math.max(0, 100 - score * 20);

    onSave({
      date: today,
      feeling: selectedFeeling,
      score: calculatedScore,
      stoolCount,
      memo,
    });

    setSelectedFeeling(null);
    setStoolCount(1);
    setMemo('');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">💩 대변 분석</h1>
      <p className="text-gray-500 mb-6">오늘의 상태를 기록하세요</p>

      {/* Feeling Selection */}
      <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
        <h3 className="font-semibold mb-4">오늘 기분이 어때요?</h3>
        <div className="flex justify-between">
          {feelings.map((feeling) => (
            <button
              key={feeling.emoji}
              onClick={() => setSelectedFeeling(feeling)}
              className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                selectedFeeling?.emoji === feeling.emoji
                  ? 'bg-[#FFF9E6] border-2 border-[#C5A572] scale-110'
                  : 'border-2 border-transparent'
              }`}
            >
              <span className="text-3xl mb-1">{feeling.emoji}</span>
              <span className="text-xs text-gray-500">{feeling.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stool Count */}
      <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
        <h3 className="font-semibold mb-4">오늘 몇 번 보셨나요?</h3>
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => setStoolCount(Math.max(0, stoolCount - 1))}
            className="w-12 h-12 rounded-full bg-gray-100 text-2xl font-bold"
          >
            -
          </button>
          <span className="text-4xl font-bold text-[#C5A572]">{stoolCount}</span>
          <button
            onClick={() => setStoolCount(stoolCount + 1)}
            className="w-12 h-12 rounded-full bg-gray-100 text-2xl font-bold"
          >
            +
          </button>
        </div>
      </div>

      {/* Memo */}
      <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
        <h3 className="font-semibold mb-4">메모</h3>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="특이사항이 있으면 적어주세요..."
          className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#C5A572] focus:outline-none resize-none h-24"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={!selectedFeeling}
        className={`w-full p-4 rounded-2xl text-white text-lg font-semibold transition-all ${
          selectedFeeling ? 'bg-[#C5A572]' : 'bg-gray-300'
        }`}
      >
        기록 저장하기
      </button>
    </div>
  );
};

export default AnalysisTab;
