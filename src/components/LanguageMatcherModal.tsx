import { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Compass,
  Sparkles,
  ArrowRight,
  Plane,
  Briefcase,
  Film,
  Brain,
  Zap,
  Globe,
  Music,
  CheckCircle2,
  Clock,
  RotateCcw,
  BookOpen,
  Check,
} from 'lucide-react';
import { COURSES, Course } from '../data/courses';
import { DuoOwl } from './DuoOwl';
import { sounds } from '../utils/audio';

interface LanguageMatcherModalProps {
  onSelectCourse: (course: Course) => void;
  onStartLesson: (course: Course) => void;
  onClose: () => void;
  onEarnXP: (xp: number) => void;
  onToast: (msg: string) => void;
}

export function LanguageMatcherModal({
  onSelectCourse,
  onStartLesson,
  onClose,
  onEarnXP,
  onToast,
}: LanguageMatcherModalProps) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<string | null>(null);
  const [style, setStyle] = useState<string | null>(null);
  const [dailyTime, setDailyTime] = useState<string>('10분');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendedCourse, setRecommendedCourse] = useState<Course | null>(null);
  const [altCourse, setAltCourse] = useState<Course | null>(null);

  // Goal Options
  const goalOptions = [
    {
      id: 'travel',
      icon: <Plane className="w-5 h-5 text-sky-500" />,
      title: '해외 여행 & 현지인과의 소통',
      desc: '자유여행에서 식당 주문, 길 찾기, 현지 친구 사귀기를 원해요',
    },
    {
      id: 'career',
      icon: <Briefcase className="w-5 h-5 text-emerald-600" />,
      title: '취업, 이직 & 글로벌 커리어 스펙',
      desc: '외국계 기업, 해외 출장, 무역 및 이력서에 강력한 무기를 만들고 싶어요',
    },
    {
      id: 'culture',
      icon: <Film className="w-5 h-5 text-purple-500" />,
      title: '미드, 애니, 영화 & 취미 콘텐츠 원어 감상',
      desc: '자막 없이 영화와 애니를 즐기고 글로벌 팬덤과 교류하고 싶어요',
    },
    {
      id: 'challenge',
      icon: <Brain className="w-5 h-5 text-amber-500" />,
      title: '뇌 건강 & 자기계발을 위한 새로운 도전',
      desc: '새로운 문자 체계를 익히며 뇌를 깨우고 일상의 활력을 얻고 싶어요',
    },
  ];

  // Style Options
  const styleOptions = [
    {
      id: 'easy',
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      title: '한국어와 어순이 비슷해 가장 빠른 성과',
      desc: '어려운 문법 대신 3개월 만에 즉시 말이 트이는 성취감을 원해요',
      targetId: 'japanese',
    },
    {
      id: 'global',
      icon: <Globe className="w-5 h-5 text-emerald-500" />,
      title: '전 세계 어디서나 통하는 압도적 범용성',
      desc: '배워두면 평생 동안 어디서든 무조건 유용한 언어',
      targetId: 'english',
    },
    {
      id: 'vibrant',
      icon: <Sparkles className="w-5 h-5 text-orange-500" />,
      title: '읽기 쉬운 발음 & 유럽/남미 여행 가성비',
      desc: '철자 그대로 발음되는 경쾌함과 20개국 이상에서 통하는 여행 치트키',
      targetId: 'spanish',
    },
    {
      id: 'asian_biz',
      icon: <Briefcase className="w-5 h-5 text-red-500" />,
      title: '한자 문화권의 친숙함 & 막강한 아시아 경제력',
      desc: '단어 유추가 빠르고 글로벌 무역/비즈니스 시장에서 대체 불가능한 언어',
      targetId: 'chinese',
    },
    {
      id: 'romance',
      icon: <Music className="w-5 h-5 text-purple-500" />,
      title: '예술, 패션, 미식 & 매혹적인 낭만 발음',
      desc: '유럽 감성과 세련된 지적 교양을 한 단계 높이고 싶어요',
      targetId: 'french',
    },
  ];

  const handleNextStep1 = (id: string) => {
    sounds.playClick();
    setGoal(id);
    setStep(2);
  };

  const handleNextStep2 = (id: string) => {
    sounds.playClick();
    setStyle(id);
    setStep(3);
  };

  const handleAnalyze = (timeVal: string) => {
    sounds.playClick();
    setDailyTime(timeVal);
    setIsAnalyzing(true);
    setStep(4);

    // Calculate match algorithm
    setTimeout(() => {
      let mainId = 'spanish';
      let altId = 'english';

      if (style === 'easy' || goal === 'culture') {
        mainId = 'japanese';
        altId = goal === 'travel' ? 'spanish' : 'english';
      } else if (style === 'global' || goal === 'career') {
        mainId = 'english';
        altId = style === 'asian_biz' ? 'chinese' : 'spanish';
      } else if (style === 'vibrant' || goal === 'travel') {
        mainId = 'spanish';
        altId = 'japanese';
      } else if (style === 'asian_biz') {
        mainId = 'chinese';
        altId = 'english';
      } else if (style === 'romance') {
        mainId = 'french';
        altId = 'spanish';
      }

      const foundMain = COURSES.find((c) => c.id === mainId) || COURSES[0];
      const foundAlt = COURSES.find((c) => c.id === altId) || COURSES[1];

      setRecommendedCourse(foundMain);
      setAltCourse(foundAlt);
      setIsAnalyzing(false);

      sounds.playFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      onEarnXP(10);
      onToast('언어 진단 완료! 맞춤 추천 보너스 +10 XP를 획득했습니다! 🎉');
    }, 900);
  };

  const handleApplyCourse = (course: Course, startLesson: boolean = false) => {
    sounds.playClick();
    onSelectCourse(course);
    onToast(`${course.name} 코스가 내 메인 학습 언어로 설정되었습니다!`);
    if (startLesson) {
      onStartLesson(course);
    }
    onClose();
  };

  const handleReset = () => {
    sounds.playClick();
    setStep(1);
    setGoal(null);
    setStyle(null);
    setRecommendedCourse(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border-2 border-duo-gray-border max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150">
        {/* Modal Top Header */}
        <div className="p-5 border-b border-duo-gray-border flex items-center justify-between bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">나에게 맞는 언어 찾기</h3>
              <p className="text-[11px] font-bold text-emerald-800">
                1분 맞춤 진단으로 가장 높은 성공률의 언어를 추천해 드립니다.
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

        {/* Progress Bar (Steps 1 to 3) */}
        {step <= 3 && (
          <div className="px-6 pt-4 pb-1">
            <div className="flex justify-between items-center text-[11px] font-bold text-gray-400 mb-1.5">
              <span>질문 {step} / 3</span>
              <span>{step === 1 ? '학습 목적' : step === 2 ? '선호 스타일' : '투자 시간'}</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* STEP 1: 학습 목적 */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-bold text-gray-900 tracking-tight">
                  어떤 목표로 새로운 언어를 배우고 싶으신가요?
                </h4>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  가장 마음이 끌리는 1가지를 선택해주세요.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                {goalOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleNextStep1(opt.id)}
                    className="btn-3d w-full p-4 rounded-2xl border-2 border-duo-gray-border bg-white hover:border-emerald-500 hover:bg-emerald-50/30 text-left transition-all shadow-duo-white flex items-start gap-3.5 group"
                  >
                    <div className="p-2.5 rounded-xl bg-gray-100 group-hover:bg-white shrink-0 mt-0.5">
                      {opt.icon}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900 group-hover:text-emerald-700">
                        {opt.title}
                      </div>
                      <div className="text-xs text-gray-500 font-medium mt-0.5">
                        {opt.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: 선호 스타일 & 난이도 */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-bold text-gray-900 tracking-tight">
                  어떤 학습 경험과 장점을 가장 중요하게 생각하시나요?
                </h4>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  학습 난이도와 언어의 매력을 기준으로 골라보세요.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                {styleOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleNextStep2(opt.id)}
                    className="btn-3d w-full p-4 rounded-2xl border-2 border-duo-gray-border bg-white hover:border-emerald-500 hover:bg-emerald-50/30 text-left transition-all shadow-duo-white flex items-start gap-3.5 group"
                  >
                    <div className="p-2.5 rounded-xl bg-gray-100 group-hover:bg-white shrink-0 mt-0.5">
                      {opt.icon}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900 group-hover:text-emerald-700">
                        {opt.title}
                      </div>
                      <div className="text-xs text-gray-500 font-medium mt-0.5">
                        {opt.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: 하루 투자 가능 시간 */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-bold text-gray-900 tracking-tight">
                  하루에 언어 공부에 얼마 정도 투자하실 수 있나요?
                </h4>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  듀오링고는 하루 5분만으로도 확실한 습관을 만들어 드립니다.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { time: '5분', label: '가벼운 습관', sub: '출퇴근길 1개 레슨' },
                  { time: '10분', label: '추천 표준', sub: '하루 2개 레슨 완성', isBest: true },
                  { time: '20분+', label: '스피드 러너', sub: '빠른 유창성 완성' },
                ].map((item) => (
                  <button
                    key={item.time}
                    onClick={() => handleAnalyze(item.time)}
                    className={`btn-3d p-4 rounded-2xl border-2 text-center transition-all ${
                      item.isBest
                        ? 'border-emerald-500 bg-emerald-50/40 shadow-duo-green'
                        : 'border-duo-gray-border bg-white hover:bg-gray-50 shadow-duo-white'
                    }`}
                  >
                    {item.isBest && (
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full mb-2">
                        가장 인기
                      </span>
                    )}
                    <div className="text-2xl font-bold text-gray-900 font-mono">
                      {item.time}
                    </div>
                    <div className="text-xs font-bold text-gray-800 mt-1">{item.label}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: 분석 로딩 or 추천 결과 화면 */}
          {step === 4 && (
            <div>
              {isAnalyzing ? (
                <div className="text-center py-12 space-y-4">
                  <DuoOwl mood="thinking" size={90} className="mx-auto" />
                  <div className="text-lg font-bold text-gray-800">
                    선택하신 목표와 학습 스타일에 맞는 최적의 언어를 분석 중입니다...
                  </div>
                  <div className="w-48 bg-gray-100 h-2 rounded-full mx-auto overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full animate-pulse"></div>
                  </div>
                </div>
              ) : (
                recommendedCourse && (
                  <div className="space-y-6 animate-in fade-in zoom-in-95">
                    {/* Hero Match Header */}
                    <div className="text-center">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-3">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>맞춤 추천 1순위 언어 발견!</span>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-5xl">{recommendedCourse.flag}</span>
                        <div className="text-left">
                          <h4 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {recommendedCourse.name} ({recommendedCourse.englishName})
                          </h4>
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                            {recommendedCourse.badge}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Why this language fits you */}
                    <div className="bg-gray-50 border-2 border-duo-gray-border rounded-2xl p-4 sm:p-5 space-y-3">
                      <div className="text-xs font-bold uppercase text-gray-400 tracking-wider">
                        선택해야 하는 이유 & 실용성 분석
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                        <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                          <div className="text-gray-400 font-bold text-[10px]">한국인 체감 난이도</div>
                          <div className="font-bold text-emerald-600 text-sm mt-0.5">
                            {recommendedCourse.koreanDifficulty}
                          </div>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                          <div className="text-gray-400 font-bold text-[10px]">예상 습득 기간</div>
                          <div className="font-bold text-gray-900 text-sm mt-0.5">
                            {recommendedCourse.estimatedMonths}
                          </div>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-gray-200 col-span-2 sm:col-span-1">
                          <div className="text-gray-400 font-bold text-[10px]">전 세계 화자 수</div>
                          <div className="font-bold text-sky-600 text-sm mt-0.5">
                            {recommendedCourse.speakerCount}
                          </div>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed bg-white p-3 rounded-xl border border-gray-100">
                        {recommendedCourse.practicalBenefit}
                      </p>
                    </div>

                    {/* Alternative Match */}
                    {altCourse && (
                      <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{altCourse.flag}</span>
                          <div>
                            <span className="text-[10px] font-bold text-sky-600 uppercase">
                              2순위 대안 추천
                            </span>
                            <div className="font-bold text-gray-900">
                              {altCourse.name} 코스
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleApplyCourse(altCourse, false)}
                          className="px-3 py-1.5 rounded-xl border border-sky-300 font-bold text-sky-700 bg-white hover:bg-sky-100 text-xs"
                        >
                          이 언어로 선택
                        </button>
                      </div>
                    )}

                    {/* Primary Actions */}
                    <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                      <button
                        onClick={() => handleApplyCourse(recommendedCourse, true)}
                        className="btn-3d w-full sm:w-2/3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-duo-green text-sm flex items-center justify-center gap-2"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>이 언어로 첫 레슨 바로 시작하기</span>
                      </button>
                      <button
                        onClick={handleReset}
                        className="btn-3d w-full sm:w-1/3 bg-white border-2 border-duo-gray-border text-gray-700 font-bold py-4 rounded-2xl shadow-duo-white hover:bg-gray-50 text-xs flex items-center justify-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>다시 진단하기</span>
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
