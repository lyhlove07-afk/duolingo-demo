import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Volume2,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  MessageCircle,
} from 'lucide-react';
import { DIALOGUE_SCENARIOS, DialogueScenario, DialogueChoice } from '../data/dialogues';
import { sounds } from '../utils/audio';

interface DialoguePracticeModalProps {
  initialScenarioId?: string;
  onClose: () => void;
  onEarnXP: (xp: number) => void;
  onToast: (msg: string) => void;
}

interface ChatMessage {
  sender: 'character' | 'user';
  name: string;
  avatar: string;
  foreignText: string;
  koreanText: string;
  langCode: string;
}

export function DialoguePracticeModal({
  initialScenarioId,
  onClose,
  onEarnXP,
  onToast,
}: DialoguePracticeModalProps) {
  const [selectedScenario, setSelectedScenario] = useState<DialogueScenario>(() => {
    const found = DIALOGUE_SCENARIOS.find((s) => s.id === initialScenarioId);
    return found || DIALOGUE_SCENARIOS[0];
  });

  const [currentTurnIdx, setCurrentTurnIdx] = useState(0);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isTurnDone, setIsTurnDone] = useState(false);
  const [isScenarioFinished, setIsScenarioFinished] = useState(false);
  const [characterMood, setCharacterMood] = useState<'happy' | 'smile' | 'amazed'>('smile');

  const currentTurn = selectedScenario.turns[currentTurnIdx];

  // Initialize or reset conversation when scenario changes
  useEffect(() => {
    setCurrentTurnIdx(0);
    setIsTurnDone(false);
    setIsScenarioFinished(false);
    setCharacterMood('smile');

    const firstTurn = selectedScenario.turns[0];
    if (firstTurn) {
      setChatHistory([
        {
          sender: 'character',
          name: firstTurn.speaker,
          avatar: firstTurn.speakerAvatar,
          foreignText: firstTurn.foreignSpeech,
          koreanText: firstTurn.koreanTranslation,
          langCode: firstTurn.langCode,
        },
      ]);
      // Play initial character speech
      setTimeout(() => {
        sounds.speak(firstTurn.audioText, firstTurn.langCode);
      }, 350);
    }
  }, [selectedScenario]);

  // Handle user picking a choice
  const handleSelectChoice = (choice: DialogueChoice) => {
    if (isTurnDone || isScenarioFinished) return;
    setIsTurnDone(true);
    sounds.playCorrect();

    // 1. Add user message
    const userMsg: ChatMessage = {
      sender: 'user',
      name: '나 (YOU)',
      avatar: '🦉',
      foreignText: choice.foreignText,
      koreanText: choice.koreanText,
      langCode: selectedScenario.langCode,
    };

    setChatHistory((prev) => [...prev, userMsg]);
    sounds.speak(choice.audioText, selectedScenario.langCode);

    // 2. Character reacts
    setTimeout(() => {
      setCharacterMood(choice.reactionMood);
      sounds.playClick();

      // Next turn or finish
      if (currentTurnIdx + 1 < selectedScenario.turns.length) {
        const nextTurn = selectedScenario.turns[currentTurnIdx + 1];
        const replyMsg: ChatMessage = {
          sender: 'character',
          name: nextTurn.speaker,
          avatar: nextTurn.speakerAvatar,
          foreignText: nextTurn.foreignSpeech,
          koreanText: nextTurn.koreanTranslation,
          langCode: nextTurn.langCode,
        };

        setChatHistory((prev) => [...prev, replyMsg]);
        setCurrentTurnIdx((prev) => prev + 1);
        setIsTurnDone(false);

        setTimeout(() => {
          sounds.speak(nextTurn.audioText, nextTurn.langCode);
        }, 300);
      } else {
        // Conversation complete!
        setIsScenarioFinished(true);
        sounds.playFanfare();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
        onEarnXP(selectedScenario.xpReward);
        onToast(`현지인 실전 대화 완료! +${selectedScenario.xpReward} XP를 획득했습니다! 🎉`);
      }
    }, 1100);
  };

  const handleReplayAudio = (text: string, langCode: string) => {
    sounds.playClick();
    sounds.speak(text, langCode);
  };

  const handleRestart = () => {
    sounds.playClick();
    setCurrentTurnIdx(0);
    setIsTurnDone(false);
    setIsScenarioFinished(false);
    const firstTurn = selectedScenario.turns[0];
    if (firstTurn) {
      setChatHistory([
        {
          sender: 'character',
          name: firstTurn.speaker,
          avatar: firstTurn.speakerAvatar,
          foreignText: firstTurn.foreignSpeech,
          koreanText: firstTurn.koreanTranslation,
          langCode: firstTurn.langCode,
        },
      ]);
      sounds.speak(firstTurn.audioText, firstTurn.langCode);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl border-2 border-duo-gray-border max-w-2xl w-full shadow-2xl flex flex-col h-[90vh] overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-duo-gray-border bg-gradient-to-r from-emerald-50 via-teal-50 to-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{selectedScenario.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                  현지인 롤플레잉 회화
                </span>
                <span className="text-xs text-gray-400 font-bold">
                  {selectedScenario.location}
                </span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-gray-900 leading-tight mt-0.5">
                {selectedScenario.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTranslation((prev) => !prev)}
              className="p-2 rounded-xl text-xs font-bold text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors flex items-center gap-1 border border-gray-200"
              title="한국어 번역 힌트 토글"
            >
              {showTranslation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-emerald-600" />}
              <span className="hidden sm:inline">{showTranslation ? '번역 숨김' : '번역 힌트'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scenario Picker Carousel Tabs */}
        <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/70 flex items-center gap-2 overflow-x-auto shrink-0">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap pl-1">
            상황 선택:
          </span>
          {DIALOGUE_SCENARIOS.map((scen) => {
            const isCur = scen.id === selectedScenario.id;
            return (
              <button
                key={scen.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedScenario(scen);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isCur
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{scen.flag}</span>
                <span>{scen.characterName.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Chat Stream History Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50/30">
          {chatHistory.map((msg, idx) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={idx}
                className={`flex gap-3 items-start animate-in fade-in duration-200 ${
                  isUser ? 'flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0 select-none shadow-xs ${
                    isUser
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white border-2 border-emerald-300'
                  }`}
                >
                  {msg.avatar}
                </div>

                {/* Speech Bubble */}
                <div
                  className={`max-w-[82%] sm:max-w-[70%] rounded-2xl p-4 shadow-sm relative group ${
                    isUser
                      ? 'bg-emerald-500 text-white rounded-tr-none'
                      : 'bg-white border-2 border-duo-gray-border text-gray-900 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`text-[11px] font-bold ${
                        isUser ? 'text-emerald-100' : 'text-gray-400'
                      }`}
                    >
                      {msg.name}
                    </span>
                    <button
                      onClick={() => handleReplayAudio(msg.foreignText, msg.langCode)}
                      title="발음 다시 듣기"
                      className={`p-1 rounded-full transition-colors ${
                        isUser
                          ? 'hover:bg-emerald-600 text-emerald-100'
                          : 'hover:bg-gray-100 text-gray-400 hover:text-emerald-600'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Foreign Text */}
                  <div className="font-bold text-sm sm:text-base leading-snug tracking-wide">
                    {msg.foreignText}
                  </div>

                  {/* Korean Translation */}
                  {showTranslation && (
                    <div
                      className={`mt-1.5 pt-1.5 border-t text-xs font-semibold ${
                        isUser
                          ? 'border-emerald-400/50 text-emerald-100'
                          : 'border-gray-100 text-gray-500'
                      }`}
                    >
                      {msg.koreanText}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator if waiting for character */}
          {isTurnDone && !isScenarioFinished && (
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 pl-14 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{selectedScenario.characterName} 님이 응답 중...</span>
            </div>
          )}
        </div>

        {/* Bottom Interactive Response Section */}
        <div className="p-4 sm:p-5 border-t-2 border-duo-gray-border bg-white shrink-0">
          {isScenarioFinished ? (
            /* Celebration Screen */
            <div className="text-center py-2 space-y-3 animate-in zoom-in-95">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>대화 미션 성공!</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-gray-900">
                현지인과 실전 대화를 무사히 마쳤습니다! 🎉
              </h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                자연스러운 문맥 선택으로 +{selectedScenario.xpReward} XP를 획득했습니다.
              </p>
              <div className="flex gap-2.5 justify-center pt-2">
                <button
                  onClick={handleRestart}
                  className="px-4 py-3 rounded-xl border-2 border-duo-gray-border text-gray-700 font-bold hover:bg-gray-50 text-xs flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>대화 다시 해보기</span>
                </button>
                <button
                  onClick={onClose}
                  className="btn-3d px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-duo-green text-xs"
                >
                  완료하고 학습으로 돌아가기
                </button>
              </div>
            </div>
          ) : currentTurn ? (
            /* Active Turn Options */
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-700 flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>어떻게 대답하시겠습니까? (답변 선택)</span>
                </span>
                <span className="text-gray-400 font-bold">
                  진행 {currentTurnIdx + 1} / {selectedScenario.turns.length}
                </span>
              </div>

              <div className="space-y-2">
                {currentTurn.choices.map((choice) => (
                  <button
                    key={choice.id}
                    disabled={isTurnDone}
                    onClick={() => handleSelectChoice(choice)}
                    className="btn-3d w-full p-3.5 sm:p-4 rounded-2xl border-2 border-duo-gray-border bg-white hover:border-emerald-500 hover:bg-emerald-50/20 text-left transition-all shadow-duo-white group disabled:opacity-60"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-emerald-700 leading-snug">
                        "{choice.foreignText}"
                      </div>
                      <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">
                        +{choice.scoreReward} XP
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500 font-medium mt-1">
                      {choice.koreanText}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
