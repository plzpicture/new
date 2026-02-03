import React from 'react';

const InsightsTab: React.FC = () => {
  const tips = [
    { icon: '💧', title: 'Stay Hydrated', desc: 'Drink 8 glasses of water daily' },
    { icon: '🥗', title: 'Eat Fiber', desc: '25-30g of fiber daily helps digestion' },
    { icon: '🚶', title: 'Stay Active', desc: 'Regular exercise promotes gut health' },
    { icon: '😴', title: 'Sleep Well', desc: '7-9 hours of sleep supports your gut' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Insights</h1>

      <div className="bg-white rounded-2xl p-5 mb-4 custom-shadow">
        <h3 className="font-semibold mb-3">Your Gut Health Score</h3>
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#f3f4f6"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#D4AF37"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${75 * 3.52} ${100 * 3.52}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-[#D4AF37]">75</span>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500 mt-3">Good! Keep it up!</p>
      </div>

      <div className="bg-white rounded-2xl p-5 custom-shadow">
        <h3 className="font-semibold mb-4">Tips for You</h3>
        <div className="space-y-3">
          {tips.map((tip) => (
            <div key={tip.title} className="flex items-center gap-3 p-3 bg-[#FFF9F0] rounded-xl">
              <span className="text-2xl">{tip.icon}</span>
              <div>
                <p className="font-medium text-sm">{tip.title}</p>
                <p className="text-xs text-gray-500">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsTab;
