import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Check, X, Sparkles, ShieldCheck } from 'lucide-react';
import { sounds } from '../utils/audio';

interface PricingSectionProps {
  isSuper: boolean;
  onActivateSuper: () => void;
  onToast: (msg: string) => void;
}

export function PricingSection({
  isSuper,
  onActivateSuper,
  onToast,
}: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const handleToggleBilling = (cycle: 'monthly' | 'yearly') => {
    sounds.playClick();
    setBillingCycle(cycle);
  };

  const handleStartTrial = () => {
    sounds.playFanfare();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    onActivateSuper();
    onToast('Super Duolingo 14일 무료 체험이 활성화되었습니다. 무제한 하트를 이용하세요!');
  };

  return (
    <section className="py-14 px-4 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-xs font-bold text-purple-600 mb-1.5">
          Super Duolingo 멤버십
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          기본은 평생 무료, 더 빠른 성장은 Super
        </h2>
        <p className="text-sm text-gray-500 font-normal mt-1.5">
          모든 정규 코스는 무료로 이용할 수 있으며, 실수 걱정 없이 연습하려면 Super를 체험해 보세요.
        </p>

        {/* Billing Cycle Switcher */}
        <div className="mt-6 inline-flex items-center bg-gray-100 border border-gray-200 rounded-xl p-1 gap-1">
          <button
            onClick={() => handleToggleBilling('monthly')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            월간 결제
          </button>
          <button
            onClick={() => handleToggleBilling('yearly')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              billingCycle === 'yearly'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            연간 결제 (42% 할인)
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Free Plan Card */}
        <div className="bg-white border-2 border-duo-gray-border rounded-3xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-lg font-extrabold text-gray-900">Duolingo Basic</div>
            <div className="text-3xl font-extrabold text-gray-900 mt-2 tabular-nums">
              ₩0 <span className="text-xs text-gray-400 font-medium">/ 평생 무료</span>
            </div>
            <p className="text-xs text-gray-500 font-normal mt-2">
              핵심 언어 코스를 매일 부담 없이 즐기려는 학습자
            </p>

            <ul className="mt-6 space-y-3 text-sm font-medium text-gray-600">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                <span>모든 정규 언어 코스 무제한 이용</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                <span>퀴즈 레슨 및 현지인 대화 시뮬레이터</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                <span>연속 학습 기록 및 주간 리그 참여</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400">
                <X className="w-4 h-4 text-gray-300 shrink-0" />
                <span>무제한 하트 (기본 5개 제공)</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400">
                <X className="w-4 h-4 text-gray-300 shrink-0" />
                <span>AI 맞춤 집중 오답 클리닉</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-100">
            <div className="w-full text-center py-3 rounded-2xl border border-gray-200 text-gray-500 font-bold text-xs sm:text-sm bg-gray-50">
              현재 이용 중 (기본 플랜)
            </div>
          </div>
        </div>

        {/* Super Duolingo Plan Card */}
        <div className="bg-gradient-to-b from-purple-50/50 via-white to-white border-2 border-purple-500 rounded-3xl p-7 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-700 font-extrabold text-lg">
                <Sparkles className="w-5 h-5" />
                <span>Super Duolingo</span>
              </div>
              <span className="text-xs font-bold text-purple-600">추천 플랜</span>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900 tabular-nums">
                {billingCycle === 'yearly' ? '₩7,400' : '₩12,900'}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {billingCycle === 'yearly' ? '/ 월 (연간 결제)' : '/ 월 (월간 결제)'}
              </span>
            </div>
            <p className="text-xs text-gray-500 font-normal mt-2">
              하트 제한 없이 자유롭게 연습하고 빠르게 실력을 높이고 싶은 분
            </p>

            <ul className="mt-6 space-y-3 text-sm font-medium text-gray-800">
              <li className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
                <span>
                  <strong className="text-purple-700 font-bold">무제한 하트</strong> (오답에도 중단 없음)
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-purple-600 shrink-0 stroke-[2.5]" />
                <span>광고 없는 집중 학습 환경</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-purple-600 shrink-0 stroke-[2.5]" />
                <span>AI 맞춤 오답 트레이닝 클리닉</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-purple-600 shrink-0 stroke-[2.5]" />
                <span>주간 리그 경험치(XP) 부스트 혜택</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-purple-100">
            {isSuper ? (
              <div className="w-full text-center py-3.5 rounded-2xl bg-purple-100 text-purple-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                <span>Super 14일 무료 체험 이용 중</span>
              </div>
            ) : (
              <button
                onClick={handleStartTrial}
                className="btn-3d w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-2xl shadow-duo-purple text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>14일 무료 체험 시작하기</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
