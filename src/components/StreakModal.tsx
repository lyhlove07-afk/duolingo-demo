import confetti from 'canvas-confetti';
import { X, Flame, Shield, Calendar, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface StreakModalProps {
  streak: number;
  onBoost: () => void;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export function StreakModal({
  streak,
  onBoost,
  onClose,
  onToast,
}: StreakModalProps) {
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const todayIdx = 3; // e.g. Thursday

  const handleBoost = () => {
    sounds.playFanfare();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 },
    });
    onBoost();
    onToast('오늘의 스트릭이 성공적으로 연장되었습니다! 🔥');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border-2 border-duo-gray-border max-w-sm w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 text-center bg-gradient-to-b from-orange-50 to-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-20 h-20 rounded-3xl bg-orange-100 mx-auto flex items-center justify-center text-orange-500 mb-3 shadow-inner">
            <Flame className="w-10 h-10 fill-orange-500 animate-flame" />
          </div>

          <div className="text-4xl font-bold text-orange-500 tabular-nums">
            {streak} 일
          </div>
          <div className="text-xs font-bold text-orange-700 uppercase tracking-wider mt-0.5">
            연속 학습 달성 중!
          </div>
          <p className="text-xs text-gray-500 font-medium mt-2">
            매일 1개 이상의 레슨을 완료하여 연속 학습 불꽃을 꺼뜨리지 마세요!
          </p>
        </div>

        {/* Weekly Day Circles */}
        <div className="px-6 py-4 border-y border-duo-gray-border bg-gray-50/50">
          <div className="flex justify-between items-center text-center">
            {days.map((day, idx) => {
              const isPastOrToday = idx <= todayIdx;
              const isToday = idx === todayIdx;

              return (
                <div key={day} className="flex flex-col items-center gap-1.5">
                  <span className="text-[11px] font-bold text-gray-400">{day}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isPastOrToday
                        ? 'bg-orange-500 text-white shadow-duo-orange'
                        : 'bg-gray-200 text-gray-400'
                    } ${isToday ? 'ring-2 ring-orange-300 ring-offset-1 scale-105' : ''}`}
                  >
                    {isPastOrToday ? '🔥' : '·'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Streak Freeze Perk */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-900">
            <Shield className="w-5 h-5 text-sky-500 shrink-0" />
            <div>
              <div className="font-bold">스트릭 프리즈 1개 보유</div>
              <div className="text-[11px] text-sky-700 font-medium">
                하루를 깜빡해도 불꽃이 꺼지지 않도록 자동 보호됩니다.
              </div>
            </div>
          </div>

          <button
            onClick={handleBoost}
            className="btn-3d w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-2xl shadow-duo-orange text-sm flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>오늘 불꽃 수동 활성화 (+1일)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
