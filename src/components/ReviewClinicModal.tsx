import { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, RotateCcw, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ReviewClinicModalProps {
  onRefillHeart: () => void;
  onEarnXP: (xp: number) => void;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export function ReviewClinicModal({
  onRefillHeart,
  onEarnXP,
  onClose,
  onToast,
}: ReviewClinicModalProps) {
  const [step, setStep] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const practiceItems = [
    {
      word: '¡Por favor!',
      koreanMeaning: '부탁합니다 / 제발요',
      options: ['부탁합니다 / 제발요', '고맙습니다', '미안합니다'],
      correctIdx: 0,
    },
    {
      word: '¿Cómo estás?',
      koreanMeaning: '어떻게 지내세요?',
      options: ['이름이 무엇인가요?', '어떻게 지내세요?', '어디 가세요?'],
      correctIdx: 1,
    },
    {
      word: 'De nada',
      koreanMeaning: '천만에요 / 괜찮아요',
      options: ['실례합니다', '안녕히 계세요', '천만에요 / 괜찮아요'],
      correctIdx: 2,
    },
  ];

  const current = practiceItems[step];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === current.correctIdx) {
      sounds.playCorrect();
    } else {
      sounds.playIncorrect();
    }
  };

  const handleNext = () => {
    sounds.playClick();
    if (step + 1 < practiceItems.length) {
      setStep((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setIsDone(true);
      sounds.playFanfare();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
      onRefillHeart();
      onEarnXP(15);
      onToast('오답 클리닉 완료! 하트 1개가 충전되고 +15 XP를 획득했습니다! ❤️');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border-2 border-duo-gray-border max-w-md w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-duo-gray-border flex items-center justify-between bg-emerald-50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">AI 맞춤 오답 클리닉</h3>
              <p className="text-[11px] font-bold text-emerald-700">
                자주 헷갈리는 표현 3문제를 복습하고 하트를 충전하세요!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isDone ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 mx-auto flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">클리닉 완료!</h4>
              <p className="text-xs text-gray-600 max-w-xs mx-auto">
                약점을 성공적으로 보완했습니다. 하트가 1개 충전되었습니다!
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 font-bold text-sm">
                <Heart className="w-5 h-5 fill-rose-500" />
                <span>하트 +1 충전 완료!</span>
              </div>
              <button
                onClick={onClose}
                className="btn-3d w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-2xl shadow-duo-green text-sm"
              >
                학습으로 돌아가기
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs font-bold text-gray-400">
                <span>진행 상황</span>
                <span>{step + 1} / {practiceItems.length}</span>
              </div>

              <div className="text-center py-3 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="text-xs text-gray-400 font-semibold mb-1">다음 표현의 올바른 뜻은?</div>
                <div className="text-2xl font-bold text-gray-900 tracking-wide">
                  "{current.word}"
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2">
                {current.options.map((opt, idx) => {
                  let style = 'bg-white border-2 border-duo-gray-border text-gray-800 hover:bg-gray-50 shadow-duo-white';
                  if (isAnswered) {
                    if (idx === current.correctIdx) {
                      style = 'bg-emerald-500 border-2 border-emerald-600 text-white shadow-duo-green';
                    } else if (selectedOpt === idx) {
                      style = 'bg-rose-500 border-2 border-rose-600 text-white shadow-none';
                    } else {
                      style = 'bg-gray-100 border-2 border-gray-200 text-gray-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelect(idx)}
                      className={`btn-3d w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-left transition-all ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="pt-2">
                  <button
                    onClick={handleNext}
                    className="btn-3d w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-duo-green text-xs flex items-center justify-center gap-1.5"
                  >
                    <span>{step + 1 < practiceItems.length ? '다음 문제' : '클리닉 완료'}</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
