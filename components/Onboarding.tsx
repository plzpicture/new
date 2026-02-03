import React, { useState } from 'react';
import { UserProfile, Goal, Frequency, Symptom } from '../types';

interface OnboardingProps {
  onComplete: (data: Partial<UserProfile>) => void;
  initialUser: UserProfile;
}

const goals: { value: Goal; label: string; emoji: string }[] = [
  { value: '변비 완화', label: '변비 완화', emoji: '💪' },
  { value: '설사 관리', label: '설사 관리', emoji: '💊' },
  { value: '규칙적인 배변', label: '규칙적인 배변', emoji: '🎯' },
  { value: '전반적인 장 건강', label: '전반적인 장 건강', emoji: '🌟' },
  { value: '복부 팽만감 감소', label: '복부 팽만감 감소', emoji: '🎈' },
];

const frequencies: { value: Frequency; label: string; emoji: string }[] = [
  { value: '하루 2회 이상', label: '하루 2회 이상', emoji: '🔥' },
  { value: '하루 1회', label: '하루 1회', emoji: '👍' },
  { value: '2일마다', label: '2일마다', emoji: '😐' },
  { value: '일주일에 1-2회', label: '일주일에 1-2회', emoji: '😰' },
];

const symptoms: { value: Symptom; label: string; emoji: string }[] = [
  { value: '복부 팽만', label: '복부 팽만', emoji: '🎈' },
  { value: '가스 참', label: '가스 참', emoji: '💨' },
  { value: '통증', label: '통증', emoji: '😣' },
  { value: '불규칙함', label: '불규칙함', emoji: '📊' },
  { value: '없음', label: '없음', emoji: '✅' },
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, initialUser }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState(initialUser.name);
  const [selectedGoal, setSelectedGoal] = useState<Goal>(initialUser.goal);
  const [selectedFrequency, setSelectedFrequency] = useState<Frequency>(initialUser.frequency);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>(initialUser.symptoms as Symptom[]);

  const handleSymptomToggle = (symptom: Symptom) => {
    if (symptom === '없음') {
      setSelectedSymptoms(['없음']);
    } else {
      setSelectedSymptoms(prev => {
        const filtered = prev.filter(s => s !== '없음');
        if (filtered.includes(symptom)) {
          return filtered.filter(s => s !== symptom);
        }
        return [...filtered, symptom];
      });
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete({
        name,
        goal: selectedGoal,
        frequency: selectedFrequency,
        symptoms: selectedSymptoms,
      });
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0: return name.trim().length > 0;
      case 1: return selectedGoal !== null;
      case 2: return selectedFrequency !== null;
      case 3: return selectedSymptoms.length > 0;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] p-6 flex flex-col">
      {/* Progress indicator */}
      <div className="flex gap-2 mb-8">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all ${
              i <= step ? 'bg-[#C5A572]' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      <div className="flex-1">
        {/* Step 0: Name */}
        {step === 0 && (
          <div className="animate-fadeIn">
            <h1 className="text-2xl font-bold mb-2">
              안녕하세요! 👋
            </h1>
            <p className="text-gray-500 mb-8">이름을 알려주세요</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름 입력"
              className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#C5A572] focus:outline-none text-lg bg-white"
            />
          </div>
        )}

        {/* Step 1: Goal */}
        {step === 1 && (
          <div className="animate-fadeIn">
            <h1 className="text-2xl font-bold mb-8">
              주요 목표가 무엇인가요? 🎯
            </h1>
            <div className="space-y-3">
              {goals.map(({ value, label, emoji }) => (
                <button
                  key={value}
                  onClick={() => setSelectedGoal(value)}
                  className={`w-full p-4 rounded-2xl text-left flex items-center justify-between transition-all ${
                    selectedGoal === value
                      ? 'bg-[#FFF9E6] border-2 border-[#C5A572]'
                      : 'bg-white border-2 border-gray-100'
                  }`}
                >
                  <span className="text-lg">
                    {label} {emoji}
                  </span>
                  {selectedGoal === value && (
                    <span className="text-[#C5A572]">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Frequency */}
        {step === 2 && (
          <div className="animate-fadeIn">
            <h1 className="text-2xl font-bold mb-8">
              배변 빈도는 어떤가요? 🚽
            </h1>
            <div className="space-y-3">
              {frequencies.map(({ value, label, emoji }) => (
                <button
                  key={value}
                  onClick={() => setSelectedFrequency(value)}
                  className={`w-full p-4 rounded-2xl text-left flex items-center justify-between transition-all ${
                    selectedFrequency === value
                      ? 'bg-[#FFF9E6] border-2 border-[#C5A572]'
                      : 'bg-white border-2 border-gray-100'
                  }`}
                >
                  <span className="text-lg">
                    {label} {emoji}
                  </span>
                  {selectedFrequency === value && (
                    <span className="text-[#C5A572]">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Symptoms */}
        {step === 3 && (
          <div className="animate-fadeIn">
            <h1 className="text-2xl font-bold mb-8">
              현재 증상이 있으신가요? 🩺
            </h1>
            <div className="space-y-3">
              {symptoms.map(({ value, label, emoji }) => (
                <button
                  key={value}
                  onClick={() => handleSymptomToggle(value)}
                  className={`w-full p-4 rounded-2xl text-left flex items-center justify-between transition-all ${
                    selectedSymptoms.includes(value)
                      ? 'bg-[#FFF9E6] border-2 border-[#C5A572]'
                      : 'bg-white border-2 border-gray-100'
                  }`}
                >
                  <span className="text-lg">
                    {label} {emoji}
                  </span>
                  {selectedSymptoms.includes(value) && (
                    <span className="text-[#C5A572]">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={!canProceed()}
        className={`w-full p-4 rounded-2xl text-white text-lg font-semibold transition-all mt-8 ${
          canProceed()
            ? 'bg-[#C5A572]'
            : 'bg-gray-300'
        }`}
      >
        다음으로
      </button>
    </div>
  );
};

export default Onboarding;
