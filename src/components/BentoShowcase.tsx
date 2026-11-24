import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Flame, Trophy, Brain, Smartphone, Sparkles, ChevronRight, MessageSquare } from 'lucide-react';
import { sounds } from '../utils/audio';

interface BentoShowcaseProps {
  streak: number;
  xp: number;
  onBoostStreak: () => void;
  onOpenLeaderboard: () => void;
  onOpenReviewClinic: () => void;
  onOpenDialogue: () => void;
  onToast: (msg: string) => void;
}

export function BentoShowcase({
  streak,
  xp,
  onBoostStreak,
  onOpenLeaderboard,
  onOpenReviewClinic,
  onOpenDialogue,
  onToast,
}: BentoShowcaseProps) {
  const [studyHours, setStudyHours] = useState(15);
  const [cheeredUsers, setCheeredUsers] = useState<Record<string, boolean>>({});

  const handleBoost = () => {
    sounds.playFanfare();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 },
    });
    onBoostStreak();
    onToast('오늘의 연속 학습 불꽃이 채워졌습니다! +1일 연속 달성');
  };

  const handleCheer = (userId: string, name: string) => {
    if (cheeredUsers[userId]) return;
    sounds.playClick();
    setCheeredUsers((prev) => ({ ...prev, [userId]: true }));
    onToast(`${name} 님에게 응원의 하이파이브를 보냈습니다.`);
    confetti({
      particleCount: 25,
      spread: 40,
      origin: { y: 0.7 },
    });
  };

  return (
    <section className="py-14 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <p className="text-xs font-bold text-emerald-600 mb-1.5">
          게이미피케이션 학습 시스템
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          매일 이어지는 즐거운 학습 습관
        </h2>
        <p className="text-sm text-gray-500 font-normal mt-1">
          연속 학습 기록, 주간 리그 경쟁, 실전 대화가 하나로 연결됩니다.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Bento 1: Streak */}
        <div className="md:col-span-2 bg-gradient-to-br from-amber-50 via-orange-50/50 to-orange-100/30 border border-orange-200 rounded-3xl p-6 sm:p-7 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 mb-2">
                <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-flame" />
                <span>연속 학습 (Streak)</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                하루 5분씩 불꽃 이어가기
              </h3>
              <p className="text-gray-600 font-normal text-sm mt-1.5 max-w-md leading-relaxed">
                매일 1개 레슨만 완료해도 연속 학습 일수가 쌓이며, 스트릭 프리즈로 기록을 보호합니다.
              </p>
            </div>
            <div className="text-left sm:text-right bg-white/80 px-5 py-3 rounded-2xl border border-orange-200/80 shrink-0">
              <div className="text-3xl sm:text-5xl font-extrabold text-orange-500 tabular-nums tracking-tight">
                {streak}
              </div>
              <div className="text-xs font-semibold text-orange-700 mt-0.5">
                일 연속 달성
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white/90 rounded-2xl p-4 border border-orange-200/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                <Flame className="w-5 h-5 fill-orange-500" />
              </div>
              <div>
                <div className="font-bold text-sm text-gray-900">
                  오늘의 연속 학습 불꽃 보호 중
                </div>
                <div className="text-xs text-gray-500">
                  목표 달성 시 불꽃을 1일 더 연장할 수 있습니다.
                </div>
              </div>
            </div>
            <button
              onClick={handleBoost}
              className="btn-3d bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-duo-orange whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>불꽃 채우기</span>
            </button>
          </div>
        </div>

        {/* Bento 2: Leaderboard */}
        <div className="bg-white border border-duo-gray-border rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">주간 루비 리그</h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              학습자들과 주간 경험치(XP)를 겨루고 상위 리그로 승급하세요.
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
                <span>1위 김민수</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-amber-700 tabular-nums">1,420 XP</span>
                <button
                  onClick={() => handleCheer('minsu', '김민수')}
                  disabled={cheeredUsers['minsu']}
                  className="text-[11px] px-2 py-0.5 rounded-lg font-semibold bg-amber-200/70 hover:bg-amber-300 text-amber-900 disabled:opacity-50"
                >
                  {cheeredUsers['minsu'] ? '완료' : '응원'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                <span>2위 이지현</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-600 tabular-nums">1,210 XP</span>
                <button
                  onClick={() => handleCheer('jihyun', '이지현')}
                  disabled={cheeredUsers['jihyun']}
                  className="text-[11px] px-2 py-0.5 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 text-gray-800 disabled:opacity-50"
                >
                  {cheeredUsers['jihyun'] ? '완료' : '응원'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-sky-50 border border-sky-300">
              <span className="text-xs font-bold text-sky-900">3위 나 (YOU)</span>
              <span className="text-xs font-bold text-sky-700 tabular-nums">{xp} XP</span>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenLeaderboard();
              }}
              className="w-full pt-1.5 text-center text-xs font-bold text-sky-600 hover:underline flex items-center justify-center gap-1"
            >
              <span>전체 랭킹 보기</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bento 3: Proven Science Efficiency */}
        <div className="bg-white border border-duo-gray-border rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">입증된 학습 효과</h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              34시간의 집중 학습은 대학 1개 학기 분량의 어학 강의와 동등한 효과를 냅니다.
            </p>
          </div>

          <div className="mt-5 space-y-3 bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
              <span>목표 누적 시간</span>
              <span className="text-purple-700 font-bold tabular-nums">{studyHours}시간</span>
            </div>
            <input
              type="range"
              min="1"
              max="60"
              value={studyHours}
              onChange={(e) => setStudyHours(Number(e.target.value))}
              aria-label="목표 누적 학습 시간"
              className="w-full accent-purple-600 cursor-pointer h-2 bg-gray-200 rounded-lg"
            />
            <div className="text-xs font-medium text-purple-900">
              대학 어학 강의 약{' '}
              <strong className="font-bold tabular-nums">
                {(studyHours / 34).toFixed(1)}
              </strong>
              학기 수료 수준
            </div>
          </div>
        </div>

        {/* Bento 4: Quick Practice */}
        <div className="md:col-span-2 bg-white border border-duo-gray-border rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <p className="text-xs font-bold text-emerald-600">실전 회화 &amp; 맞춤 복습</p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              상황별 대화 연습과 약점 보완
            </h3>
            <p className="text-sm text-gray-500 font-normal max-w-md leading-relaxed">
              도쿄 라멘집, 뉴욕 카페 등 현지 상황을 미리 연습하고 틀린 표현은 오답 클리닉에서 복습하세요.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => {
                sounds.playClick();
                onOpenDialogue();
              }}
              className="btn-3d w-full sm:w-auto bg-amber-400 hover:bg-amber-500 text-gray-950 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-duo-yellow flex items-center justify-center gap-2 shrink-0 whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              <span>현지인 대화 연습</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onOpenReviewClinic();
              }}
              className="btn-3d w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-duo-green flex items-center justify-center gap-2 shrink-0 whitespace-nowrap"
            >
              <Smartphone className="w-4 h-4" />
              <span>AI 오답 클리닉</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
