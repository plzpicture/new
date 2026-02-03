import React, { useState } from 'react';
import { UserProfile, Gender, Goal, Frequency } from '../types';

interface OnboardingProps {
  onComplete: (data: Partial<UserProfile>) => void;
  initialUser: UserProfile;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, initialUser }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState(initialUser.name);
  const [gender, setGender] = useState<Gender>(initialUser.gender);
  const [goal, setGoal] = useState<Goal>(initialUser.goal);
  const [frequency, setFrequency] = useState<Frequency>(initialUser.frequency);

  const goals: Goal[] = ['Relieve constipation', 'Manage diarrhea', 'Regular bowel movements', 'Overall gut health', 'Reduce bloating'];
  const frequencies: Frequency[] = ['2+ daily', 'Once daily', 'Every 2 days', '1-2 weekly'];

  const handleComplete = () => {
    onComplete({ name, gender, goal, frequency });
  };

  return (
    <div className="min-h-screen p-6 flex flex-col">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-[#D4AF37] mb-2">GutBuddy</h1>
        <p className="text-gray-500 mb-8">Your AI Gut Health Companion</p>

        {step === 0 && (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">What's your name?</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:outline-none"
            />
          </div>
        )}

        {step === 1 && (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">What's your gender?</h2>
            <div className="space-y-3">
              {(['Male', 'Female', 'Other'] as Gender[]).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    gender === g ? 'border-[#D4AF37] bg-[#FFF9F0]' : 'border-gray-200'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">What's your main goal?</h2>
            <div className="space-y-3">
              {goals.map((g) => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    goal === g ? 'border-[#D4AF37] bg-[#FFF9F0]' : 'border-gray-200'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">How often do you go?</h2>
            <div className="space-y-3">
              {frequencies.map((f) => (
                <button
                  key={f}
                  onClick={() => setFrequency(f)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    frequency === f ? 'border-[#D4AF37] bg-[#FFF9F0]' : 'border-gray-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-8">
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="flex-1 p-4 rounded-xl border border-gray-200"
          >
            Back
          </button>
        )}
        <button
          onClick={() => (step < 3 ? setStep(step + 1) : handleComplete())}
          disabled={step === 0 && !name}
          className="flex-1 p-4 rounded-xl bg-[#D4AF37] text-white font-semibold disabled:opacity-50"
        >
          {step < 3 ? 'Next' : 'Get Started'}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
