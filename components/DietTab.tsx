import React, { useState } from 'react';

interface Meal {
  id: string;
  type: '아침' | '점심' | '저녁' | '간식';
  name: string;
  calories: number;
  time: string;
}

const DietTab: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([
    { id: '1', type: '아침', name: '오트밀과 바나나', calories: 350, time: '08:00' },
    { id: '2', type: '점심', name: '닭가슴살 샐러드', calories: 450, time: '12:30' },
    { id: '3', type: '간식', name: '그릭 요거트', calories: 150, time: '15:00' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newMeal, setNewMeal] = useState({ type: '아침' as const, name: '', calories: '' });

  const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);
  const targetCalories = 2000;

  const handleAddMeal = () => {
    if (!newMeal.name || !newMeal.calories) return;

    const meal: Meal = {
      id: Date.now().toString(),
      type: newMeal.type,
      name: newMeal.name,
      calories: parseInt(newMeal.calories),
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMeals([...meals, meal]);
    setNewMeal({ type: '아침', name: '', calories: '' });
    setShowAddModal(false);
  };

  const mealTypeEmoji = {
    '아침': '🌅',
    '점심': '☀️',
    '저녁': '🌙',
    '간식': '🍎',
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">🥗 식단 기록</h1>
      <p className="text-gray-500 mb-6">오늘 먹은 음식을 기록하세요</p>

      {/* Calorie Summary */}
      <div className="bg-gradient-to-br from-[#A8D5A2] to-[#8BC78B] rounded-2xl p-5 mb-6 text-white">
        <p className="text-sm opacity-80">오늘 섭취 칼로리</p>
        <p className="text-3xl font-bold">{totalCalories.toLocaleString()} kcal</p>
        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span>목표</span>
            <span>{targetCalories.toLocaleString()} kcal</span>
          </div>
          <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${Math.min((totalCalories / targetCalories) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Meals List */}
      <div className="space-y-3 mb-6">
        {meals.map((meal) => (
          <div key={meal.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
            <span className="text-2xl">{mealTypeEmoji[meal.type]}</span>
            <div className="flex-1">
              <p className="font-medium">{meal.name}</p>
              <p className="text-sm text-gray-500">{meal.type} · {meal.time}</p>
            </div>
            <span className="text-[#C5A572] font-semibold">{meal.calories} kcal</span>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="w-full p-4 rounded-2xl bg-[#C5A572] text-white text-lg font-semibold"
      >
        + 식사 추가하기
      </button>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white w-full max-w-[430px] rounded-t-3xl p-6 animate-slideUp">
            <h2 className="text-xl font-bold mb-4">식사 추가</h2>

            <div className="mb-4">
              <label className="text-sm text-gray-500 mb-2 block">식사 유형</label>
              <div className="flex gap-2">
                {(['아침', '점심', '저녁', '간식'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setNewMeal({ ...newMeal, type })}
                    className={`flex-1 p-3 rounded-xl text-sm ${
                      newMeal.type === type
                        ? 'bg-[#C5A572] text-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    {mealTypeEmoji[type]} {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-500 mb-2 block">음식 이름</label>
              <input
                type="text"
                value={newMeal.name}
                onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                placeholder="예: 현미밥과 된장찌개"
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#C5A572] focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="text-sm text-gray-500 mb-2 block">칼로리 (kcal)</label>
              <input
                type="number"
                value={newMeal.calories}
                onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
                placeholder="예: 500"
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#C5A572] focus:outline-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 p-4 rounded-xl border border-gray-200"
              >
                취소
              </button>
              <button
                onClick={handleAddMeal}
                className="flex-1 p-4 rounded-xl bg-[#C5A572] text-white font-semibold"
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietTab;
