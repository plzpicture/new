import React from 'react';
import { UserProfile, DailyRecord, NutritionData } from '../types';

interface HomeTabProps {
  user: UserProfile;
  records: DailyRecord[];
}

const HomeTab: React.FC<HomeTabProps> = ({ user, records }) => {
  const avgScore = records.length > 0
    ? Math.round(records.reduce((acc, r) => acc + r.score, 0) / records.length)
    : 72;

  const nutrition: NutritionData = {
    calories: 1650,
    carbs: { current: 180, target: 250 },
    protein: { current: 65, target: 80 },
    fat: { current: 45, target: 60 },
    fiber: { current: 18, target: 30 },
  };

  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (avgScore / 100) * circumference;

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#A8D5A2] to-[#8BC78B] rounded-b-3xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-white">
          👋 안녕, {user.name || '친구'}!
        </h1>
        <p className="text-white/80">오늘도 활기찬 하루 되세요!</p>
      </div>

      <div className="px-4">
        {/* Gut Score */}
        <div className="bg-[#F5F9F0] rounded-3xl p-6 mb-4">
          <div className="flex justify-center">
            <div className="relative">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#E5E5E5"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#C5A572"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">{avgScore}%</span>
                <span className="text-[#C5A572] font-medium">Gut Score</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Advice */}
        <div className="bg-[#F5F9F0] rounded-2xl p-4 mb-4 flex items-start gap-3">
          <span className="text-2xl">🤖</span>
          <p className="text-gray-700 text-sm leading-relaxed">
            오늘 식이섬유 섭취량이 아주 좋아요! 장이 편안해하는 게 느껴지네요. 훌륭합니다!
          </p>
        </div>

        {/* Nutrition */}
        <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-500 text-sm">오늘의 영양</p>
              <p className="text-2xl font-bold">{nutrition.calories.toLocaleString()} kcal</p>
            </div>
            <span className="text-3xl">🥗</span>
          </div>

          <div className="space-y-3">
            <NutritionBar
              label="탄수화물 (Carbs)"
              current={nutrition.carbs.current}
              target={nutrition.carbs.target}
              color="bg-blue-400"
            />
            <NutritionBar
              label="단백질 (Protein)"
              current={nutrition.protein.current}
              target={nutrition.protein.target}
              color="bg-red-400"
            />
            <NutritionBar
              label="지방 (Fat)"
              current={nutrition.fat.current}
              target={nutrition.fat.target}
              color="bg-yellow-400"
            />
            <NutritionBar
              label="식이섬유 (Fiber)"
              current={nutrition.fiber.current}
              target={nutrition.fiber.target}
              color="bg-green-400"
            />
          </div>
        </div>

        {/* Quick Analysis Button */}
        <button className="w-full bg-[#C5A572] text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2">
          🚽 빠른 대변 분석
        </button>
      </div>
    </div>
  );
};

const NutritionBar: React.FC<{
  label: string;
  current: number;
  target: number;
  color: string;
}> = ({ label, current, target, color }) => {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="text-gray-500">{current}g / {target}g</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default HomeTab;
