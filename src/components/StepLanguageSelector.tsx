import { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Check,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';
import { COURSES, Course } from '../data/courses';
import { sounds } from '../utils/audio';

interface StepLanguageSelectorProps {
  currentCourseId: string;
  onSelectCourse: (course: Course) => void;
  onStartLesson: (course: Course) => void;
  onToast: (msg: string) => void;
}

interface OptionItem {
  id: string;
  label: string;
  desc: string;
}

export function StepLanguageSelector({
  currentCourseId,
  onSelectCourse,
  onStartLesson,
  onToast,
}: StepLanguageSelectorProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedPurpose, setSelectedPurpose] = useState<string>('travel');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('very_easy');
  const [selectedRegion, setSelectedRegion] = useState<string>('asia');
  const [selectedPriority, setSelectedPriority] = useState<string>('travel_utility');

  const purposeOptions: OptionItem[] = [
    { id: 'travel', label: '해외 여행 & 현지 소통', desc: '식당 주문, 길 찾기, 현지인과의 편안한 대화' },
    { id: 'career', label: '취업, 이직 & 커리어', desc: '이력서 스펙, 비즈니스 미팅, 글로벌 협업' },
    { id: 'culture', label: '콘텐츠 & 취미 감상', desc: '영화, 애니메이션, 음악, 드라마 원어 감상' },
    { id: 'brain', label: '두뇌 훈련 & 자기계발', desc: '새로운 문자와 어휘 체계로 지적 활력 얻기' },
  ];

  const difficultyOptions: OptionItem[] = [
    { id: 'very_easy', label: '가장 빠른 성취 (입문 추천)', desc: '한국어와 어순이 같거나 문법 구조가 유사함' },
    { id: 'easy', label: '읽기 쉬운 발음 & 규칙성', desc: '철자 그대로 소리 나는 규칙적 발음 체계' },
    { id: 'any', label: '난이도 무관 (실용성 최우선)', desc: '다소 어렵더라도 전 세계에서 가장 널리 쓰임' },
    { id: 'challenge', label: '도전적 & 체계적인 문법', desc: '격변화와 논리적 구조를 차근차근 정복' },
  ];

  const regionOptions: OptionItem[] = [
    { id: 'asia', label: '아시아권', desc: '일본, 중국, 베트남 등 가깝고 친숙한 교류국' },
    { id: 'europe', label: '유럽권', desc: '스페인, 프랑스, 독일, 이탈리아 등 유럽 대륙' },
    { id: 'americas', label: '아메리카권', desc: '미국, 캐나다 및 중남미 스페인어권 국가' },
    { id: 'global', label: '전 세계 공용', desc: '대륙 구분 없이 어디서나 통용되는 언어' },
  ];

  const priorityOptions: OptionItem[] = [
    { id: 'travel_utility', label: '여행 만족도 극대화', desc: '현지에서 가장 환영받고 실용적인 회화' },
    { id: 'career_boost', label: '커리어 & 비즈니스 경쟁력', desc: '글로벌 산업과 무역 시장에서의 기회' },
    { id: 'fast_intake', label: '3개월 단기 완성', desc: '부담 없이 빠르게 첫 대화를 트고 싶음' },
    { id: 'cultural_charm', label: '문화적 매력 & 예술', desc: '미식, 패션, 영화, 인문학적 감성' },
  ];

  const candidates = useMemo(() => {
    const scored = COURSES.map((course) => {
      let score = 50;
      const matchReasons: string[] = [];

      if (selectedPurpose === 'travel') {
        if (course.id === 'spanish') {
          score += 30;
          matchReasons.push('21개국 여행에 통하는 높은 효율');
        } else if (course.id === 'japanese') {
          score += 28;
          matchReasons.push('한국인 자유여행 방문 1위 국가');
        } else if (course.id === 'english') {
          score += 25;
          matchReasons.push('전 세계 공항·호텔 기본 공용어');
        } else if (course.id === 'italian') {
          score += 24;
          matchReasons.push('유럽 미식·예술 여행에 최적화');
        } else if (course.id === 'vietnamese') {
          score += 22;
          matchReasons.push('동남아 여행 현지 소통에 유리');
        }
      } else if (selectedPurpose === 'career') {
        if (course.id === 'english') {
          score += 35;
          matchReasons.push('글로벌 취업·이직 필수 역량');
        } else if (course.id === 'chinese') {
          score += 30;
          matchReasons.push('아시아 무역·제조 비즈니스 강점');
        } else if (course.id === 'german') {
          score += 28;
          matchReasons.push('유럽 공학·경제 중심 국가 언어');
        } else if (course.id === 'japanese') {
          score += 20;
          matchReasons.push('IT·콘텐츠 대일 협업 활발');
        }
      } else if (selectedPurpose === 'culture') {
        if (course.id === 'japanese') {
          score += 35;
          matchReasons.push('애니·게임·콘텐츠 원어 감상');
        } else if (course.id === 'english') {
          score += 30;
          matchReasons.push('글로벌 영화·음악 무자막 감상');
        } else if (course.id === 'french') {
          score += 28;
          matchReasons.push('프랑스 영화·문학·미식 문화');
        } else if (course.id === 'italian') {
          score += 25;
          matchReasons.push('오페라·예술·디자인 본고장');
        }
      } else if (selectedPurpose === 'brain') {
        if (course.id === 'german') {
          score += 30;
          matchReasons.push('논리적 문법 체계로 사고력 자극');
        } else if (course.id === 'chinese') {
          score += 28;
          matchReasons.push('성조와 한자 구조 학습');
        } else if (course.id === 'spanish') {
          score += 25;
          matchReasons.push('규칙적 라틴 어휘 확장');
        }
      }

      if (selectedDifficulty === 'very_easy') {
        if (course.id === 'japanese') {
          score += 25;
          matchReasons.push('한국어와 동일한 어순·조사 체계');
        } else if (course.id === 'spanish' || course.id === 'italian') {
          score += 15;
          matchReasons.push('규칙적인 알파벳 발음');
        }
      } else if (selectedDifficulty === 'easy') {
        if (course.id === 'spanish' || course.id === 'italian') {
          score += 25;
          matchReasons.push('철자 그대로 읽혀 발음 장벽이 낮음');
        } else if (course.id === 'japanese') {
          score += 20;
          matchReasons.push('초반 회화 습득 속도가 빠름');
        }
      } else if (selectedDifficulty === 'any') {
        if (course.id === 'english') {
          score += 25;
          matchReasons.push('압도적인 실생활 활용 빈도');
        } else if (course.id === 'spanish') {
          score += 18;
          matchReasons.push('미국 내 제2언어');
        }
      } else if (selectedDifficulty === 'challenge') {
        if (course.id === 'german') {
          score += 25;
          matchReasons.push('체계적인 명사 성·격변화 구조');
        } else if (course.id === 'french') {
          score += 22;
          matchReasons.push('섬세한 발음과 정교한 문법');
        }
      }

      if (selectedRegion === 'asia') {
        if (course.id === 'japanese' || course.id === 'chinese' || course.id === 'vietnamese') score += 20;
      } else if (selectedRegion === 'europe') {
        if (['spanish', 'french', 'german', 'italian'].includes(course.id)) score += 20;
      } else if (selectedRegion === 'americas') {
        if (course.id === 'english' || course.id === 'spanish') score += 20;
      } else if (selectedRegion === 'global') {
        if (course.id === 'english') score += 25;
        if (course.id === 'spanish') score += 18;
      }

      if (selectedPriority === 'travel_utility') {
        if (['spanish', 'japanese', 'italian', 'vietnamese'].includes(course.id)) score += 15;
      } else if (selectedPriority === 'career_boost') {
        if (course.id === 'english') score += 20;
        if (course.id === 'chinese' || course.id === 'german') score += 15;
      } else if (selectedPriority === 'fast_intake') {
        if (course.id === 'japanese') score += 20;
        if (course.id === 'spanish' || course.id === 'italian') score += 15;
      } else if (selectedPriority === 'cultural_charm') {
        if (course.id === 'french' || course.id === 'italian') score += 20;
        if (course.id === 'spanish') score += 15;
      }

      const matchPercent = Math.min(99, Math.max(74, Math.round((score / 130) * 100)));

      return {
        course,
        score,
        matchPercent,
        reasons: matchReasons.slice(0, 2),
      };
    });

    return scored.sort((a, b) => b.score - a.score).slice(0, 3);
  }, [selectedPurpose, selectedDifficulty, selectedRegion, selectedPriority]);

  const handleSelectCandidate = (course: Course, startLesson: boolean = false) => {
    sounds.playFanfare();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
    onSelectCourse(course);
    onToast(`${course.name} 코스가 선택되었습니다.`);

    if (startLesson) {
      onStartLesson(course);
    } else {
      const el = document.getElementById('learning-path');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlayAudio = (e: React.MouseEvent, foreignText: string, langCode: string) => {
    e.stopPropagation();
    sounds.playClick();
    sounds.speak(foreignText, langCode);
  };

  const handleReset = () => {
    sounds.playClick();
    setCurrentStep(1);
    setSelectedPurpose('travel');
    setSelectedDifficulty('very_easy');
    setSelectedRegion('asia');
    setSelectedPriority('travel_utility');
    onToast('선택 조건이 초기화되었습니다.');
  };

  const stepConfigs = [
    { num: 1, title: '학습 목적', heading: '어떤 목표로 언어를 배우시나요?', options: purposeOptions, selected: selectedPurpose, setter: setSelectedPurpose },
    { num: 2, title: '난이도', heading: '선호하는 난이도와 속도는?', options: difficultyOptions, selected: selectedDifficulty, setter: setSelectedDifficulty },
    { num: 3, title: '관심 지역', heading: '관심 있는 지역이나 문화권은?', options: regionOptions, selected: selectedRegion, setter: setSelectedRegion },
    { num: 4, title: '핵심 가치', heading: '가장 중요하게 생각하는 가치는?', options: priorityOptions, selected: selectedPriority, setter: setSelectedPriority },
  ];

  const activeConfig = stepConfigs[currentStep - 1];

  return (
    <section id="language-matcher" className="py-14 px-4 bg-white border-y border-duo-gray-border">
      <div className="max-w-7xl mx-auto">
        {/* Clean Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs font-bold text-emerald-600 mb-1.5">
              단계별 맞춤 추천
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              나에게 맞는 언어 찾기
            </h2>
            <p className="text-sm text-gray-500 font-normal mt-1">
              4가지 조건을 선택하면 어울리는 상위 3개 언어 후보가 오른쪽에 바로 표시됩니다.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="self-start md:self-end flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>초기화</span>
          </button>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: 4-Step Wizard (7 Cols) */}
          <div className="lg:col-span-7 bg-gray-50/70 border border-duo-gray-border rounded-3xl p-5 sm:p-6 space-y-5">
            {/* Clean Segmented Step Bar */}
            <div className="grid grid-cols-4 gap-1.5 p-1 bg-white rounded-2xl border border-gray-200">
              {stepConfigs.map((step) => {
                const isActive = currentStep === step.num;
                return (
                  <button
                    key={step.num}
                    onClick={() => {
                      sounds.playClick();
                      setCurrentStep(step.num);
                    }}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-colors truncate ${
                      isActive
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {step.num}. {step.title}
                  </button>
                );
              })}
            </div>

            {/* Active Step Options */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-gray-900">
                  {activeConfig.heading}
                </h3>
                <span className="text-xs font-semibold text-gray-400 tabular-nums">
                  {currentStep} / 4
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeConfig.options.map((opt) => {
                  const isSelected = activeConfig.selected === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        sounds.playClick();
                        activeConfig.setter(opt.id);
                      }}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        isSelected
                          ? 'border-emerald-500 bg-white shadow-sm'
                          : 'border-gray-200 bg-white/80 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-bold text-sm ${isSelected ? 'text-emerald-700' : 'text-gray-900'}`}>
                          {opt.label}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />}
                      </div>
                      <p className="text-xs text-gray-500 font-normal leading-relaxed">
                        {opt.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Step Navigation */}
              <div className="pt-2 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setCurrentStep((prev) => prev - 1);
                    }}
                    className="px-3 py-2 text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>이전 단계</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setCurrentStep((prev) => prev + 1);
                    }}
                    className="btn-3d px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-duo-green flex items-center gap-1"
                  >
                    <span>다음 단계</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="text-xs font-semibold text-emerald-700">
                    모든 조건이 반영되었습니다
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Top 3 Real-Time Candidates (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-bold text-sm text-gray-900">추천 언어 후보 TOP 3</h3>
              <span className="text-xs text-emerald-600 font-semibold">실시간 반영</span>
            </div>

            <div className="space-y-3">
              {candidates.map((cand, idx) => {
                const isTop1 = idx === 0;
                const isSelected = cand.course.id === currentCourseId;

                return (
                  <div
                    key={cand.course.id}
                    className={`rounded-2xl p-4 border-2 transition-all ${
                      isTop1
                        ? 'bg-white border-emerald-500 shadow-sm'
                        : 'bg-white border-duo-gray-border'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-3xl shrink-0 select-none">{cand.course.flag}</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                            <span className={isTop1 ? 'text-emerald-700 font-bold' : 'text-gray-600 font-semibold'}>
                              {isTop1 ? '1위 추천' : `${idx + 1}위 후보`}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums font-bold text-gray-900">
                              적합도 {cand.matchPercent}%
                            </span>
                          </div>
                          <h4 className="font-bold text-base text-gray-900 truncate">
                            {cand.course.name}
                            <span className="text-xs text-gray-400 font-medium ml-1.5">
                              {cand.course.koreanDifficulty} · {cand.course.estimatedMonths}
                            </span>
                          </h4>
                        </div>
                      </div>

                      <button
                        onClick={(e) =>
                          handlePlayAudio(
                            e,
                            cand.course.greetingExample.foreign,
                            cand.course.langCode
                          )
                        }
                        title="원어민 발음 듣기"
                        aria-label={`${cand.course.name} 인사 발음 듣기`}
                        className="p-2 rounded-xl text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors shrink-0"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {cand.reasons.length > 0 && (
                      <p className="text-xs text-gray-600 mt-2.5 pt-2.5 border-t border-gray-100 leading-relaxed">
                        {cand.reasons.join(' · ')}
                      </p>
                    )}

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => handleSelectCandidate(cand.course, true)}
                        className={`btn-3d flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 ${
                          isTop1
                            ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-duo-green'
                            : 'bg-white border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 shadow-duo-white'
                        }`}
                      >
                        <span>첫 레슨 시작</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleSelectCandidate(cand.course, false)}
                        className={`px-3.5 py-2.5 rounded-xl font-semibold text-xs border transition-colors ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {isSelected ? '선택됨' : '코스 선택'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
