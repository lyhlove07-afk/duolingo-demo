import { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Trophy, Medal, Sparkles, Heart } from 'lucide-react';
import { sounds } from '../utils/audio';

interface LeaderboardModalProps {
  userXP: number;
  onClose: () => void;
  onToast: (msg: string) => void;
}

interface Runner {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  isUser?: boolean;
}

export function LeaderboardModal({
  userXP,
  onClose,
  onToast,
}: LeaderboardModalProps) {
  const [cheeredMap, setCheeredMap] = useState<Record<string, boolean>>({});

  const runners: Runner[] = [
    { rank: 1, name: '김민수 (Minsu)', avatar: '🦊', xp: 1420 },
    { rank: 2, name: '이지현 (Jihyun)', avatar: '🐼', xp: 1210 },
    { rank: 3, name: '나 (YOU)', avatar: '🦉', xp: userXP, isUser: true },
    { rank: 4, name: 'Alexandre', avatar: '🦁', xp: 910 },
    { rank: 5, name: 'Sakura Tanaka', avatar: '🌸', xp: 880 },
    { rank: 6, name: 'Carlos Mendez', avatar: '🐯', xp: 750 },
    { rank: 7, name: 'Emma Watson', avatar: '🐨', xp: 690 },
    { rank: 8, name: '박서준 (Seojun)', avatar: '🐱', xp: 620 },
    { rank: 9, name: 'Liam Wilson', avatar: '🐻', xp: 580 },
    { rank: 10, name: 'Sofia Rossi', avatar: '🦄', xp: 510 },
  ];

  const handleCheer = (name: string) => {
    if (cheeredMap[name]) return;
    sounds.playClick();
    setCheeredMap((prev) => ({ ...prev, [name]: true }));
    onToast(`${name} 님에게 응원의 하트를 보냈습니다! ❤️`);
    confetti({
      particleCount: 20,
      spread: 45,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border-2 border-duo-gray-border max-w-md w-full shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-duo-gray-border flex items-center justify-between bg-sky-50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">루비 리그 (Ruby League)</h3>
              <p className="text-[11px] font-bold text-sky-700">상위 5명은 다음 주 다이아몬드 리그로 승급!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Promotion Countdown Notice */}
        <div className="px-5 py-2.5 bg-amber-50/70 border-b border-amber-200 text-xs font-bold text-amber-800 flex items-center justify-between">
          <span>⏰ 리그 종료까지: 3일 14시간</span>
          <span className="text-emerald-700 font-extrabold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> 승급 안정권
          </span>
        </div>

        {/* Runners List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {runners.map((r) => {
            const isTop3 = r.rank <= 3;
            const isUser = r.isUser;

            return (
              <div
                key={r.rank}
                className={`p-3 rounded-2xl border-2 flex items-center justify-between transition-all ${
                  isUser
                    ? 'bg-sky-50/80 border-sky-400 shadow-sm'
                    : isTop3
                    ? 'bg-white border-amber-200'
                    : 'bg-white border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 text-center font-mono font-bold text-sm ${
                      r.rank === 1
                        ? 'text-amber-500 text-base'
                        : r.rank === 2
                        ? 'text-slate-500'
                        : r.rank === 3
                        ? 'text-amber-700'
                        : 'text-gray-400'
                    }`}
                  >
                    {r.rank === 1 ? '🥇' : r.rank === 2 ? '🥈' : r.rank === 3 ? '🥉' : r.rank}
                  </div>

                  <div className="text-2xl select-none">{r.avatar}</div>

                  <div>
                    <div
                      className={`text-xs sm:text-sm font-bold ${
                        isUser ? 'text-sky-900 font-extrabold' : 'text-gray-900'
                      }`}
                    >
                      {r.name}
                    </div>
                    <div className="text-[11px] text-gray-400 font-semibold tabular-nums">
                      {r.xp} XP
                    </div>
                  </div>
                </div>

                {!isUser ? (
                  <button
                    onClick={() => handleCheer(r.name)}
                    disabled={cheeredMap[r.name]}
                    className={`text-xs font-bold px-2.5 py-1 rounded-xl transition-all flex items-center gap-1 ${
                      cheeredMap[r.name]
                        ? 'bg-gray-100 text-gray-400'
                        : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>{cheeredMap[r.name] ? '완료' : '응원'}</span>
                  </button>
                ) : (
                  <span className="text-xs font-bold text-sky-600 bg-sky-100 px-2.5 py-1 rounded-full">
                    나의 순위
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Close */}
        <div className="p-4 border-t border-duo-gray-border bg-gray-50">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl border-2 border-duo-gray-border text-gray-700 font-bold hover:bg-white text-xs"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
