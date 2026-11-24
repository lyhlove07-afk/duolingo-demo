import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Heart, Volume2, Snail, CheckCircle2, AlertCircle, ArrowRight, RotateCcw, ShieldAlert, Sparkles } from 'lucide-react';
import { Lesson, Question } from '../data/courses';
import { DuoOwl } from './DuoOwl';
import { sounds } from '../utils/audio';

interface LessonModalProps {
  lesson: Lesson;
  isSuper: boolean;
  hearts: number;
  onLoseHeart: () => void;
  onCompleteLesson: (lessonId: string, xpEarned: number) => void;
  onClose: () => void;
  onOpenSuperModal: () => void;
  onOpenReviewClinic: () => void;
}

export function LessonModal({
  lesson,
  isSuper,
  hearts,
  onLoseHeart,
  onCompleteLesson,
  onClose,
  onOpenSuperModal,
  onOpenReviewClinic,
}: LessonModalProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedWordBank, setSelectedWordBank] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const currentQuestion: Question | undefined = lesson.questions[currentIdx];

  // Initialize words for word-bank questions
  useEffect(() => {
    if (currentQuestion && currentQuestion.type === 'word-bank') {
      const words = currentQuestion.wordPool ? [...currentQuestion.wordPool] : [];
      setAvailableWords(words);
      setSelectedWordBank([]);
    } else {
      setSelectedOption(null);
    }
    setIsAnswerChecked(false);
    setIsCurrentCorrect(false);

    // Auto-pronounce if listening question
    if (currentQuestion && currentQuestion.type === 'listening') {
      setTimeout(() => {
        sounds.speak(currentQuestion.audioText, currentQuestion.langCode);
      }, 300);
    }
  }, [currentIdx, lesson]);

  if (!currentQuestion && !isFinished) {
    return null;
  }

  // Handle word bank interaction
  const handleSelectWord = (word: string, indexInAvailable: number) => {
    if (isAnswerChecked) return;
    sounds.playClick();
    setSelectedWordBank((prev) => [...prev, word]);
    setAvailableWords((prev) => prev.filter((_, idx) => idx !== indexInAvailable));
  };

  const handleRemoveWordFromBank = (word: string, indexInSelected: number) => {
    if (isAnswerChecked) return;
    sounds.playClick();
    setSelectedWordBank((prev) => prev.filter((_, idx) => idx !== indexInSelected));
    setAvailableWords((prev) => [...prev, word]);
  };

  // Play audio
  const handlePlayAudio = (rate: number = 0.9) => {
    sounds.playClick();
    if (currentQuestion) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(currentQuestion.audioText);
        utterance.lang = currentQuestion.langCode;
        utterance.rate = rate;
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  // Validate answer
  const handleCheckAnswer = () => {
    if (isAnswerChecked) return;

    let correct = false;
    if (currentQuestion.type === 'word-bank') {
      const userSentence = selectedWordBank.join(' ').trim().toLowerCase();
      const target = currentQuestion.correctAnswer.trim().toLowerCase();
      correct = userSentence === target;
    } else {
      correct = selectedOption === currentQuestion.correctAnswer;
    }

    setIsAnswerChecked(true);
    setIsCurrentCorrect(correct);

    if (correct) {
      sounds.playCorrect();
      setCorrectCount((prev) => prev + 1);
    } else {
      sounds.playIncorrect();
      if (!isSuper) {
        onLoseHeart();
      }
    }
  };

  // Advance to next question or finish
  const handleContinue = () => {
    sounds.playClick();
    if (currentIdx + 1 < lesson.questions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsFinished(true);
      sounds.playFanfare();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
      onCompleteLesson(lesson.id, lesson.xpReward);
    }
  };

  // Out of hearts check
  const isOutOfHearts = hearts <= 0 && !isSuper;

  // Answer readiness
  const isReadyToCheck =
    currentQuestion?.type === 'word-bank'
      ? selectedWordBank.length > 0
      : selectedOption !== null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col justify-between overflow-y-auto">
      {/* Top Header Bar */}
      <div className="px-4 py-4 sm:px-8 border-b border-duo-gray-border flex items-center justify-between max-w-5xl mx-auto w-full gap-4">
        <button
          onClick={() => setShowExitConfirm(true)}
          className="text-gray-400 hover:text-gray-700 p-2 rounded-xl"
          title="레슨 나가기"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress bar */}
        <div className="flex-1 max-w-xl mx-4">
          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{
                width: `${((currentIdx + (isAnswerChecked ? 1 : 0)) / lesson.questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Hearts Life counter */}
        <div className="flex items-center gap-1.5 text-rose-500 font-bold text-sm">
          <Heart className="w-5 h-5 fill-rose-500" />
          <span className="tabular-nums">{isSuper ? '∞' : hearts}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 flex flex-col justify-center">
        {/* Out of Hearts Modal View */}
        {isOutOfHearts ? (
          <div className="text-center py-8 space-y-5 animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-3xl bg-rose-100 mx-auto flex items-center justify-center text-rose-500">
              <ShieldAlert className="w-10 h-10" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
              하트를 모두 소진했습니다!
            </h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              오답 복습 클리닉에서 틀린 단어를 연습하고 하트를 충전하거나, Super Duolingo로 무제한 하트를 즐겨보세요!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <button
                onClick={onOpenReviewClinic}
                className="btn-3d bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-2xl shadow-duo-green text-sm flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>복습하고 하트 1개 충전하기</span>
              </button>
              <button
                onClick={onOpenSuperModal}
                className="btn-3d bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-duo-purple text-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Super Duolingo 무제한 하트 받기</span>
              </button>
            </div>
          </div>
        ) : isFinished ? (
          /* Finished Celebration Screen */
          <div className="text-center py-8 space-y-6 animate-in zoom-in-95">
            <DuoOwl mood="celebrate" size={120} className="mx-auto" />
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              레슨 완료! 정말 대단해요! 🎉
            </h3>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              오늘의 목표에 한 걸음 더 가까워졌습니다.
            </p>

            {/* Results Grid */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto py-2">
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 text-center">
                <div className="text-xs font-bold text-amber-700">총 획득 경험치</div>
                <div className="text-2xl font-bold text-amber-600 tabular-nums mt-1">
                  +{lesson.xpReward} XP
                </div>
              </div>
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 text-center">
                <div className="text-xs font-bold text-emerald-700">정답률</div>
                <div className="text-2xl font-bold text-emerald-600 tabular-nums mt-1">
                  {Math.round((correctCount / lesson.questions.length) * 100)}%
                </div>
              </div>
              <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4 text-center">
                <div className="text-xs font-bold text-sky-700">연속 콤보</div>
                <div className="text-2xl font-bold text-sky-600 tabular-nums mt-1">
                  {correctCount} Combo
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn-3d w-full max-w-sm mx-auto bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base py-4 rounded-2xl shadow-duo-green"
            >
              학습 완료하고 계속하기
            </button>
          </div>
        ) : (
          /* Active Question View */
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {currentQuestion.prompt}
              </h2>
              {currentQuestion.subPrompt && (
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                  {currentQuestion.subPrompt}
                </p>
              )}
            </div>

            {/* Audio Button Box */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handlePlayAudio(0.9)}
                className="btn-3d w-14 h-14 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white shadow-duo-blue flex items-center justify-center shrink-0"
                title="원어민 발음 듣기"
              >
                <Volume2 className="w-7 h-7" />
              </button>
              <button
                onClick={() => handlePlayAudio(0.6)}
                className="btn-3d w-11 h-11 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-700 shadow-duo-white flex items-center justify-center shrink-0"
                title="느린 속도로 듣기"
              >
                <Snail className="w-5 h-5" />
              </button>
              <div className="text-xl sm:text-2xl font-bold text-gray-800 tracking-wide pl-2">
                "{currentQuestion.audioText}"
              </div>
            </div>

            {/* Question Type 1 & 3: Multiple Choice */}
            {(currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'listening') && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentQuestion.options?.map((option, idx) => {
                  const isSelected = selectedOption === option;
                  let btnColor = 'bg-white border-2 border-duo-gray-border text-gray-800 shadow-duo-white hover:bg-gray-50';

                  if (isAnswerChecked) {
                    if (option === currentQuestion.correctAnswer) {
                      btnColor = 'bg-emerald-500 border-2 border-emerald-600 text-white shadow-duo-green';
                    } else if (isSelected) {
                      btnColor = 'bg-rose-500 border-2 border-rose-600 text-white shadow-none';
                    } else {
                      btnColor = 'bg-gray-100 border-2 border-gray-200 text-gray-400 opacity-50';
                    }
                  } else if (isSelected) {
                    btnColor = 'bg-sky-50 border-2 border-sky-500 text-sky-700 shadow-duo-blue';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerChecked}
                      onClick={() => {
                        sounds.playClick();
                        setSelectedOption(option);
                      }}
                      className={`btn-3d p-4 rounded-2xl font-bold text-sm sm:text-base text-left transition-all ${btnColor}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg border border-gray-300 flex items-center justify-center text-xs font-mono font-bold text-gray-500 shrink-0">
                          {idx + 1}
                        </span>
                        <span>{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Question Type 2: Word Bank Sentence Builder */}
            {currentQuestion.type === 'word-bank' && (
              <div className="space-y-6 pt-2">
                {/* Answer Construction Area */}
                <div className="min-h-20 p-4 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/70 flex flex-wrap gap-2 items-center">
                  {selectedWordBank.length === 0 ? (
                    <span className="text-xs text-gray-400 font-medium">
                      아래 단어들을 탭하여 순서대로 문장을 완성하세요.
                    </span>
                  ) : (
                    selectedWordBank.map((word, idx) => (
                      <button
                        key={idx}
                        disabled={isAnswerChecked}
                        onClick={() => handleRemoveWordFromBank(word, idx)}
                        className="btn-3d px-4 py-2 bg-white border-2 border-duo-gray-border rounded-xl font-bold text-sm text-gray-800 shadow-duo-white hover:border-rose-400"
                      >
                        {word}
                      </button>
                    ))
                  )}
                </div>

                {/* Available Word Pool */}
                <div className="flex flex-wrap gap-2 justify-center pt-2">
                  {availableWords.map((word, idx) => (
                    <button
                      key={idx}
                      disabled={isAnswerChecked}
                      onClick={() => handleSelectWord(word, idx)}
                      className="btn-3d px-4 py-2.5 bg-white border-2 border-duo-gray-border rounded-xl font-bold text-sm sm:text-base text-gray-800 shadow-duo-white hover:bg-gray-50"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Result / Action Sheet */}
      {!isOutOfHearts && !isFinished && (
        <div
          className={`border-t-2 p-4 sm:p-6 transition-all duration-200 ${
            isAnswerChecked
              ? isCurrentCorrect
                ? 'bg-emerald-100 border-emerald-300'
                : 'bg-rose-100 border-rose-300'
              : 'bg-white border-duo-gray-border'
          }`}
        >
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Feedback Message */}
            {isAnswerChecked ? (
              <div className="flex items-center gap-3.5 w-full sm:w-auto">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    isCurrentCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                  }`}
                >
                  {isCurrentCorrect ? (
                    <CheckCircle2 className="w-7 h-7" />
                  ) : (
                    <AlertCircle className="w-7 h-7" />
                  )}
                </div>
                <div>
                  <h4
                    className={`font-bold text-base sm:text-lg ${
                      isCurrentCorrect ? 'text-emerald-900' : 'text-rose-900'
                    }`}
                  >
                    {isCurrentCorrect ? '정답입니다! 🎉' : '아쉽네요! 오답입니다.'}
                  </h4>
                  {!isCurrentCorrect && (
                    <p className="text-xs sm:text-sm font-bold text-rose-800 mt-0.5">
                      정답: <strong>{currentQuestion.correctAnswer}</strong>
                    </p>
                  )}
                  {currentQuestion.explanation && (
                    <p className="text-xs text-gray-600 font-medium mt-0.5">
                      {currentQuestion.explanation}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden sm:block text-xs font-semibold text-gray-400">
                정답을 선택하고 확인 버튼을 누르세요.
              </div>
            )}

            {/* Action Button */}
            {isAnswerChecked ? (
              <button
                onClick={handleContinue}
                className={`btn-3d w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-white shadow-md flex items-center justify-center gap-2 ${
                  isCurrentCorrect
                    ? 'bg-emerald-500 hover:bg-emerald-600 shadow-duo-green'
                    : 'bg-rose-500 hover:bg-rose-600 shadow-duo-rose'
                }`}
              >
                <span>계속하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                disabled={!isReadyToCheck}
                onClick={handleCheckAnswer}
                className={`btn-3d w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm sm:text-base transition-all ${
                  isReadyToCheck
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-duo-green'
                    : 'bg-gray-200 text-gray-400 shadow-duo-gray cursor-not-allowed'
                }`}
              >
                정답 확인
              </button>
            )}
          </div>
        </div>
      )}

      {/* Exit Confirmation Dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-duo-gray-border p-6 max-w-sm w-full shadow-2xl text-center">
            <h4 className="text-xl font-bold text-gray-900">정말 나가시겠습니까?</h4>
            <p className="text-xs text-gray-500 font-medium mt-1">
              지금 나가면 이번 레슨의 진행 상황이 저장되지 않습니다.
            </p>
            <div className="flex gap-2.5 mt-6">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="w-1/2 py-3 rounded-xl border-2 border-duo-gray-border text-gray-700 font-bold hover:bg-gray-50 text-xs"
              >
                계속 학습하기
              </button>
              <button
                onClick={onClose}
                className="btn-3d w-1/2 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl shadow-duo-rose text-xs"
              >
                레슨 나가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
