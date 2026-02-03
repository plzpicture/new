export type Gender = '남성' | '여성' | '기타' | null;
export type Goal = '변비 완화' | '설사 관리' | '규칙적인 배변' | '전반적인 장 건강' | '복부 팽만감 감소' | null;
export type Frequency = '하루 2회 이상' | '하루 1회' | '2일마다' | '일주일에 1-2회' | null;
export type Symptom = '복부 팽만' | '가스 참' | '통증' | '불규칙함' | '없음';

export interface UserProfile {
  name: string;
  gender: Gender;
  goal: Goal;
  symptoms: Symptom[];
  frequency: Frequency;
  reminderTime: string;
  onboarded: boolean;
  level: number;
  exp: number;
  profileImage?: string;
}

export interface DailyRecord {
  date: string;
  feeling: { emoji: string; label: string };
  score: number;
  stoolCount: number;
  memo: string;
}

export interface NutritionData {
  calories: number;
  carbs: { current: number; target: number };
  protein: { current: number; target: number };
  fat: { current: number; target: number };
  fiber: { current: number; target: number };
}

export enum Tab {
  Home = '홈',
  Analysis = '대변 분석',
  Diet = '식단',
  History = '기록',
  Settings = '설정'
}
