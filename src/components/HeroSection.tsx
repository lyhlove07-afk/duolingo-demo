import { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, Compass, CheckCircle2, Volume2, RotateCcw, MessageSquare } from 'lucide-react';
import { DuoOwl } from './DuoOwl';
import { sounds } from '../utils/audio';

interface HeroSectionProps {
  onStartLesson: () => void;
  onOpenMatcher: () => void;
  onOpenDialogue: () => void;
  onEarnXP: (xp: number) => void;
  liveUsersCount: number;
}

export function HeroSection({
  onStartLesson,
  onOpenMatcher,
  onOpenDialogue,
  onEarnXP,
  liveUsersCount,
}: HeroSectionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const quizOptions = [
    { text: '감사합니다', isCorrect: false },
    { text: '안녕하세요!', isCorrect: true },
    { text: '잘 가요', isCorrect: false },
    { text: '미안해요', isCorrect: false },
  ];

  const handleOptionClick = (idx: number, correct: boolean) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      sounds.playCorrect();
      onEarnXP(10);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
      });
    } else {
      sounds.playIncorrect();
    }
  };

  const handleResetQuiz = () => {
    sounds.playClick();
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const playQuizAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClick();
    sounds.speak('¡Hola!', 'es-ES');
  };

  return (
    <section id="hero" className="relative py-10 lg:py-16 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Value Proposition */}
        <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
          {/* Clean unboxed metadata kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500">
            <span className="text-emerald-600 font-bold">2026 리뉴얼 에디션</span>
            <span aria-hidden="true">·</span>
            <span>
              현재 <strong className="text-gray-900 font-bold tabular-nums">{liveUsersCount.toLocaleString()}</strong>명 학습 중
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-gray-900 leading-[1.18] tracking-tight">
            하루 5분, <br className="hidden sm:inline" />
            <span className="text-emerald-600">게임처럼 즐기는</span> 언어 학습
          </h1>

          <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
            지루한 문법 암기 대신 짧은 퀴즈와 현지인 롤플레잉으로 자연스럽게 실력을 키워보세요.
            나에게 꼭 맞는 언어를 찾고 바로 첫 레슨을 시작할 수 있습니다.
          </p>

          {/* Hero CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
            <button
              onClick={() => {
                sounds.playClick();
                onStartLesson();
              }}
              className="btn-3d w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white text-sm sm:text-base font-bold px-7 py-3.5 rounded-2xl shadow-duo-green flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
            >
              <span>무료 학습 시작</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onOpenDialogue();
              }}
              className="btn-3d w-full sm:w-auto bg-amber-400 hover:bg-amber-500 text-gray-950 font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-duo-yellow flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
            >
              <MessageSquare className="w-4 h-4" />
              <span>현지인 대화 체험</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onOpenMatcher();
              }}
              className="w-full sm:w-auto px-4 py-3.5 rounded-2xl text-emerald-700 hover:bg-emerald-50 font-bold text-sm flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <Compass className="w-4 h-4" />
              <span>맞춤 언어 찾기</span>
            </button>
          </div>

          {/* Key Summary Metrics */}
          <div className="pt-6 border-t border-duo-gray-border grid grid-cols-3 gap-6 text-center lg:text-left max-w-md mx-auto lg:mx-0">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 tabular-nums">20+</div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">국가별 언어 백과</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 tabular-nums">100%</div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">무료 기본 학습</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-500 tabular-nums">4.8</div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">글로벌 평균 평점</div>
            </div>
          </div>
        </div>

        {/* Right Interactive Demo Quiz Card */}
        <div
          id="demo-quiz"
          className="lg:col-span-5 bg-white border-2 border-duo-gray-border rounded-3xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                <DuoOwl mood={isCorrect ? 'celebrate' : isAnswered ? 'thinking' : 'happy'} size={36} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base">10초 미니 퀴즈</h3>
                <p className="text-xs text-gray-500 font-medium">맞히면 첫 경험치 +10 XP 지급</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-gray-400">스페인어 · 입문</span>
          </div>

          {/* Quiz Prompt & Options */}
          <div className="bg-gray-50/80 border border-gray-200 rounded-2xl p-5 mb-4 space-y-4">
            <div className="text-center py-1">
              <div className="text-xs text-gray-500 mb-1.5 font-medium">다음 표현의 뜻은 무엇일까요?</div>
              <div className="inline-flex items-center justify-center gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  ¡Hola!
                </span>
                <button
                  onClick={playQuizAudio}
                  title="원어민 발음 듣기"
                  aria-label="원어민 발음 듣기"
                  className="p-2 rounded-full text-emerald-600 hover:bg-emerald-100 transition-colors"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {quizOptions.map((opt, idx) => {
                let btnStyle = 'bg-white border-2 border-duo-gray-border text-gray-800 shadow-duo-white hover:bg-gray-50';
                if (isAnswered) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-500 border-2 border-emerald-600 text-white shadow-duo-green';
                  } else if (selectedAnswer === idx) {
                    btnStyle = 'bg-rose-500 border-2 border-rose-600 text-white shadow-none';
                  } else {
                    btnStyle = 'bg-gray-100 border-2 border-gray-200 text-gray-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleOptionClick(idx, opt.isCorrect)}
                    className={`btn-3d py-3 px-3 rounded-xl font-bold text-xs sm:text-sm text-center transition-all ${btnStyle}`}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Banner */}
          {isAnswered ? (
            <div
              className={`rounded-2xl p-4 text-center transition-all animate-in fade-in zoom-in-95 duration-200 ${
                isCorrect
                  ? 'bg-emerald-50 border border-emerald-300 text-emerald-900'
                  : 'bg-rose-50 border border-rose-300 text-rose-900'
              }`}
            >
              {isCorrect ? (
                <>
                  <div className="font-bold text-sm flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>정답입니다! +10 XP 획득</span>
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onStartLesson();
                      }}
                      className="btn-3d bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-duo-green"
                    >
                      정규 레슨 시작하기
                    </button>
                    <button
                      onClick={handleResetQuiz}
                      className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 p-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>다시 풀기</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="font-bold text-sm text-rose-700">
                    ¡Hola!는 &ldquo;안녕하세요!&rdquo;라는 뜻입니다.
                  </div>
                  <button
                    onClick={handleResetQuiz}
                    className="mt-2 text-xs font-semibold text-rose-700 underline flex items-center justify-center gap-1 mx-auto"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>다시 시도하기</span>
                  </button>
                </>
              )}
            </div>
          ) : (
            <p className="text-center text-xs text-gray-400 font-medium">
              가입 없이 바로 체험해볼 수 있습니다.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
