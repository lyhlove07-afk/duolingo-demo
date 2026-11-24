import { useState, useEffect, useRef } from 'react';
import {
  Flame,
  Heart,
  Gem,
  Volume2,
  VolumeX,
  Trophy,
  ChevronDown,
  Menu,
  X,
  Map,
  Compass,
  Globe2,
  MessageSquare,
  Check,
  RotateCcw,
  BookOpen,
  Play,
  Shield,
} from 'lucide-react';
import { DuoOwl } from './DuoOwl';
import { sounds } from '../utils/audio';
import { COURSES, Course } from '../data/courses';

interface HeaderProps {
  streak: number;
  hearts: number;
  gems: number;
  xp: number;
  isSuper: boolean;
  currentCourse: Course;
  completedLessonIds: string[];
  onSelectCourse: (course: Course) => void;
  onOpenStreak: () => void;
  onOpenLeaderboard: () => void;
  onOpenReviewClinic: () => void;
  onOpenDialogue: () => void;
  onStartLesson: () => void;
}

type ActiveSection = 'hero' | 'language-matcher' | 'courses' | 'world-languages' | 'learning-path' | 'pricing';

export function Header({
  streak,
  hearts,
  gems,
  xp,
  isSuper,
  currentCourse,
  completedLessonIds,
  onSelectCourse,
  onOpenStreak,
  onOpenLeaderboard,
  onOpenReviewClinic,
  onOpenDialogue,
  onStartLesson,
}: HeaderProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [openMenu, setOpenMenu] = useState<'explore' | 'course' | 'stats' | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  const navContainerRef = useRef<HTMLDivElement>(null);

  // Scroll-spy & scroll progress indicator
  useEffect(() => {
    const sections: ActiveSection[] = [
      'hero',
      'language-matcher',
      'courses',
      'world-languages',
      'learning-path',
      'pricing',
    ];

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setScrollProgress(progress);

      const offset = scrollTop + 140;
      let current: ActiveSection = 'hero';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= offset) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setIsMobileDrawerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileDrawerOpen]);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sounds.setMuted(next);
    if (!next) {
      sounds.playClick();
    }
  };

  const scrollToSection = (id: string) => {
    sounds.playClick();
    setOpenMenu(null);
    setIsMobileDrawerOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 76;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth',
      });
    }
  };

  const handleCoursePick = (course: Course) => {
    sounds.playClick();
    onSelectCourse(course);
    setOpenMenu(null);
  };

  const getCourseCompletedCount = (course: Course) => {
    const allLessonIds = course.units.flatMap((u) => u.lessons.map((l) => l.id));
    const doneCount = allLessonIds.filter((id) => completedLessonIds.includes(id)).length;
    return { doneCount, totalCount: allLessonIds.length };
  };

  const isExploreActive =
    activeSection === 'language-matcher' ||
    activeSection === 'courses' ||
    activeSection === 'world-languages';

  return (
    <>
      <header
        ref={navContainerRef}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-duo-gray-border px-4 lg:px-8 transition-all"
      >
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between gap-4 lg:gap-8">
          {/* Zone 1: Clean Brand Wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              sounds.playClick();
              setOpenMenu(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl px-1"
          >
            <DuoOwl mood={isSuper ? 'super' : 'happy'} size={34} />
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-600 uppercase font-sans">
              duolingo
            </span>
          </a>

          {/* Zone 2: Desktop Navigation (5 Clean Single-Line Controls with Scroll-Spy & Rich Popover) */}
          <nav
            aria-label="주요 메뉴"
            className="hidden lg:flex items-center gap-6 text-sm font-bold text-gray-600"
          >
            {/* 1. 학습 경로 */}
            <button
              onClick={() => scrollToSection('learning-path')}
              className={`relative py-2 whitespace-nowrap shrink-0 transition-colors hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg px-1 ${
                activeSection === 'learning-path' ? 'text-emerald-600 font-bold' : ''
              }`}
            >
              <span>학습 경로</span>
              {activeSection === 'learning-path' && (
                <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-emerald-500 rounded-full" />
              )}
            </button>

            {/* 2. 언어·코스 (Interactive Mega Dropdown) */}
            <div className="relative">
              <button
                aria-expanded={openMenu === 'explore'}
                aria-haspopup="true"
                onClick={() => {
                  sounds.playClick();
                  setOpenMenu(openMenu === 'explore' ? null : 'explore');
                }}
                className={`relative py-2 whitespace-nowrap shrink-0 flex items-center gap-1 transition-colors hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg px-1 ${
                  isExploreActive || openMenu === 'explore' ? 'text-emerald-600 font-bold' : ''
                }`}
              >
                <span>언어 탐색</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-150 ${
                    openMenu === 'explore' ? 'rotate-180' : ''
                  }`}
                />
                {isExploreActive && (
                  <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-emerald-500 rounded-full" />
                )}
              </button>

              {/* Mega Popover */}
              {openMenu === 'explore' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[560px] bg-white rounded-3xl border-2 border-duo-gray-border shadow-2xl p-5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="grid grid-cols-12 gap-5">
                    {/* Left: Discovery Tools */}
                    <div className="col-span-6 space-y-2 border-r border-gray-100 pr-4">
                      <div className="text-xs font-bold text-gray-400 px-2 mb-2">
                        나에게 맞는 언어 찾기
                      </div>

                      <button
                        onClick={() => scrollToSection('language-matcher')}
                        className="w-full p-2.5 rounded-2xl hover:bg-emerald-50 text-left transition-colors flex items-start gap-3 group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                          <Compass className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-700">
                            단계별 맞춤 언어 찾기
                          </div>
                          <div className="text-[11px] text-gray-500 font-medium mt-0.5">
                            4단계 조건으로 TOP 3 후보 추천
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => scrollToSection('courses')}
                        className="w-full p-2.5 rounded-2xl hover:bg-sky-50 text-left transition-colors flex items-start gap-3 group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900 group-hover:text-sky-700">
                            정규 코스 탐색기
                          </div>
                          <div className="text-[11px] text-gray-500 font-medium mt-0.5">
                            8개국 실전 커리큘럼 비교
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => scrollToSection('world-languages')}
                        className="w-full p-2.5 rounded-2xl hover:bg-purple-50 text-left transition-colors flex items-start gap-3 group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                          <Globe2 className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900 group-hover:text-purple-700">
                            국가별 강점 백과
                          </div>
                          <div className="text-[11px] text-gray-500 font-medium mt-0.5">
                            20+ 국가 언어 강점 &amp; 혜택
                          </div>
                        </div>
                      </button>
                    </div>

                    {/* Right: Quick Course Switch */}
                    <div className="col-span-6">
                      <div className="text-xs font-bold text-gray-400 px-2 mb-2">
                        정규 코스 바로 전환
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {COURSES.map((c) => {
                          const isCurrent = c.id === currentCourse.id;
                          return (
                            <button
                              key={c.id}
                              onClick={() => {
                                handleCoursePick(c);
                                scrollToSection('learning-path');
                              }}
                              className={`px-2.5 py-2 rounded-xl text-left flex items-center gap-2 transition-colors border ${
                                isCurrent
                                  ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold'
                                  : 'bg-white border-transparent hover:bg-gray-50 text-gray-700 font-bold'
                              }`}
                            >
                              <span className="text-lg shrink-0">{c.flag}</span>
                              <span className="text-xs truncate">{c.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. 현지인 대화 */}
            <button
              onClick={() => {
                sounds.playClick();
                setOpenMenu(null);
                onOpenDialogue();
              }}
              className="py-2 whitespace-nowrap shrink-0 transition-colors hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg px-1"
            >
              현지인 대화
            </button>

            {/* 4. 주간 리그 */}
            <button
              onClick={() => {
                sounds.playClick();
                setOpenMenu(null);
                onOpenLeaderboard();
              }}
              className="py-2 whitespace-nowrap shrink-0 transition-colors hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg px-1"
            >
              주간 리그
            </button>

            {/* 5. 슈퍼 플랜 */}
            <button
              onClick={() => scrollToSection('pricing')}
              className={`relative py-2 whitespace-nowrap shrink-0 transition-colors hover:text-purple-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg px-1 ${
                activeSection === 'pricing' ? 'text-purple-600 font-bold' : ''
              }`}
            >
              <span>{isSuper ? 'Super 이용 중' : '슈퍼 플랜'}</span>
              {activeSection === 'pricing' && (
                <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-purple-500 rounded-full" />
              )}
            </button>
          </nav>

          {/* Zone 3: Active Course Switcher, Gamification HUD, Primary Action & Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Active Course Flag Switcher Dropdown */}
            <div className="relative">
              <button
                aria-expanded={openMenu === 'course'}
                aria-haspopup="true"
                aria-label={`현재 학습 코스: ${currentCourse.name}. 클릭하여 언어 변경`}
                onClick={() => {
                  sounds.playClick();
                  setOpenMenu(openMenu === 'course' ? null : 'course');
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border-2 border-gray-200 hover:border-emerald-400 bg-white transition-colors text-xs font-bold text-gray-800 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <span className="text-base leading-none">{currentCourse.flag}</span>
                <span className="hidden xl:inline">{currentCourse.name}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
                    openMenu === 'course' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openMenu === 'course' && (
                <div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-3xl border-2 border-duo-gray-border shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2 py-1.5 text-xs font-bold text-gray-400 flex items-center justify-between">
                    <span>학습 코스 전환</span>
                    <span className="text-emerald-600">{COURSES.length}개 언어</span>
                  </div>
                  <div className="mt-1 space-y-1 max-h-72 overflow-y-auto">
                    {COURSES.map((c) => {
                      const isCurrent = c.id === currentCourse.id;
                      const { doneCount, totalCount } = getCourseCompletedCount(c);
                      return (
                        <button
                          key={c.id}
                          onClick={() => handleCoursePick(c)}
                          className={`w-full px-3 py-2.5 rounded-2xl flex items-center justify-between transition-colors text-left ${
                            isCurrent
                              ? 'bg-emerald-50 border border-emerald-300 text-emerald-900'
                              : 'hover:bg-gray-50 text-gray-800 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl">{c.flag}</span>
                            <div>
                              <div className="text-xs font-bold">{c.name}</div>
                              <div className="text-[10px] text-gray-400 font-semibold tabular-nums">
                                완료 {doneCount}/{totalCount} 레슨
                              </div>
                            </div>
                          </div>
                          {isCurrent && <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => scrollToSection('language-matcher')}
                      className="w-full py-2 px-3 rounded-xl bg-gray-50 hover:bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>맞춤 언어 진단으로 찾기</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sound Toggle (Desktop) */}
            <button
              onClick={toggleMute}
              title={isMuted ? '음소거 해제' : '음소거'}
              aria-label={isMuted ? '음소거 해제' : '음소거'}
              className="hidden sm:inline-flex p-2 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-600" />
              )}
            </button>

            {/* Streak Badge */}
            <button
              onClick={() => {
                sounds.playClick();
                setOpenMenu(null);
                onOpenStreak();
              }}
              className="flex items-center gap-1 px-2 py-1.5 rounded-xl hover:bg-orange-50 text-orange-600 transition-colors font-bold text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              title="연속 학습 일수"
            >
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-flame" />
              <span className="tabular-nums">{streak}</span>
            </button>

            {/* Gems & XP Popover Badge */}
            <div className="relative hidden md:block">
              <button
                aria-expanded={openMenu === 'stats'}
                onClick={() => {
                  sounds.playClick();
                  setOpenMenu(openMenu === 'stats' ? null : 'stats');
                }}
                className="flex items-center gap-1 px-2 py-1.5 rounded-xl hover:bg-sky-50 text-sky-500 transition-colors font-bold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                title="보석 및 경험치 현황"
              >
                <Gem className="w-4 h-4 fill-sky-400 text-sky-500" />
                <span className="tabular-nums">{gems}</span>
              </button>

              {openMenu === 'stats' && (
                <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-3xl border-2 border-duo-gray-border shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-3">
                  <div className="text-xs font-bold text-gray-900 flex items-center justify-between">
                    <span>나의 학습 리소스</span>
                    <span className="text-emerald-600 tabular-nums">{xp} XP</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-100">
                      <div className="text-[10px] font-bold text-sky-700">보유 보석</div>
                      <div className="font-bold text-sky-600 tabular-nums text-sm mt-0.5">
                        💎 {gems}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100">
                      <div className="text-[10px] font-bold text-amber-700">누적 XP</div>
                      <div className="font-bold text-amber-600 tabular-nums text-sm mt-0.5">
                        ⚡ {xp}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setOpenMenu(null);
                      onOpenReviewClinic();
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>오답 클리닉으로 XP/하트 얻기</span>
                  </button>
                </div>
              )}
            </div>

            {/* Hearts Life Badge */}
            <button
              onClick={() => {
                sounds.playClick();
                setOpenMenu(null);
                if (hearts < 5 && !isSuper) {
                  onOpenReviewClinic();
                } else if (!isSuper) {
                  scrollToSection('pricing');
                }
              }}
              className="flex items-center gap-1 px-2 py-1.5 rounded-xl hover:bg-rose-50 text-rose-500 transition-colors font-bold text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
              title={isSuper ? '무제한 하트 (Super)' : '하트 (부족 시 클리닉에서 충전)'}
            >
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span className="tabular-nums">{isSuper ? '∞' : hearts}</span>
            </button>

            {/* Primary CTA Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setOpenMenu(null);
                onStartLesson();
              }}
              className="hidden sm:inline-flex btn-3d bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-duo-green whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              학습 시작
            </button>

            {/* Mobile / Tablet Menu Drawer Trigger */}
            <button
              onClick={() => {
                sounds.playClick();
                setOpenMenu(null);
                setIsMobileDrawerOpen(true);
              }}
              aria-label="전체 메뉴 열기"
              aria-expanded={isMobileDrawerOpen}
              className="lg:hidden p-2 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scroll Progress Hairline */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent pointer-events-none">
          <div
            className="h-full bg-emerald-500 origin-left transition-transform duration-75"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
      </header>

      {/* Mobile & Tablet Slide-Over Navigation Drawer */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileDrawerOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
          />

          {/* Drawer Panel */}
          <aside
            aria-label="모바일 전체 메뉴"
            className="relative z-10 w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
          >
            {/* Drawer Header */}
            <div>
              <div className="px-5 py-4 border-b border-duo-gray-border flex items-center justify-between bg-gray-50/70">
                <div className="flex items-center gap-2">
                  <DuoOwl mood={isSuper ? 'super' : 'happy'} size={30} />
                  <span className="text-lg font-bold text-emerald-600 uppercase">duolingo</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? '음소거 해제' : '음소거'}
                    className="p-2 rounded-xl text-gray-500 hover:bg-gray-200/70 min-w-[40px] min-h-[40px] flex items-center justify-center"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-emerald-600" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsMobileDrawerOpen(false)}
                    aria-label="메뉴 닫기"
                    className="p-2 rounded-xl text-gray-500 hover:bg-gray-200/70 min-w-[40px] min-h-[40px] flex items-center justify-center"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* User Summary Stats Strip */}
              <div className="p-4 border-b border-gray-100 grid grid-cols-4 gap-2 text-center bg-white">
                <button
                  onClick={() => {
                    setIsMobileDrawerOpen(false);
                    onOpenStreak();
                  }}
                  className="p-2 rounded-xl bg-orange-50/70 border border-orange-100"
                >
                  <div className="text-xs font-bold text-orange-600 tabular-nums">
                    🔥 {streak}
                  </div>
                  <div className="text-[10px] font-bold text-gray-500 mt-0.5">연속 일수</div>
                </button>
                <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-100">
                  <div className="text-xs font-bold text-amber-600 tabular-nums">
                    ⚡ {xp}
                  </div>
                  <div className="text-[10px] font-bold text-gray-500 mt-0.5">누적 XP</div>
                </div>
                <div className="p-2 rounded-xl bg-sky-50/70 border border-sky-100">
                  <div className="text-xs font-bold text-sky-600 tabular-nums">
                    💎 {gems}
                  </div>
                  <div className="text-[10px] font-bold text-gray-500 mt-0.5">보석</div>
                </div>
                <button
                  onClick={() => {
                    setIsMobileDrawerOpen(false);
                    onOpenReviewClinic();
                  }}
                  className="p-2 rounded-xl bg-rose-50/70 border border-rose-100"
                >
                  <div className="text-xs font-bold text-rose-600 tabular-nums">
                    ❤️ {isSuper ? '∞' : hearts}
                  </div>
                  <div className="text-[10px] font-bold text-gray-500 mt-0.5">하트</div>
                </button>
              </div>

              {/* Active Course Quick Switcher */}
              <div className="p-4 border-b border-gray-100">
                <div className="text-xs font-bold text-gray-400 mb-2.5">
                  학습 중인 언어 ({currentCourse.name})
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {COURSES.map((c) => {
                    const isCur = c.id === currentCourse.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => {
                          handleCoursePick(c);
                          scrollToSection('learning-path');
                        }}
                        className={`py-2 px-1 rounded-xl border text-center transition-colors ${
                          isCur
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold'
                            : 'bg-gray-50 border-gray-200 text-gray-700 font-bold hover:bg-gray-100'
                        }`}
                      >
                        <div className="text-xl leading-none">{c.flag}</div>
                        <div className="text-[10px] mt-1 truncate">{c.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Main Navigation Links */}
              <nav className="p-4 space-y-1.5">
                <div className="text-xs font-bold text-gray-400 px-2 mb-1">
                  학습 메뉴
                </div>

                <button
                  onClick={() => scrollToSection('learning-path')}
                  className="w-full px-3 py-3 rounded-2xl hover:bg-gray-50 flex items-center gap-3 text-left transition-colors min-h-[48px]"
                >
                  <Map className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-gray-900">단계별 학습 경로</div>
                    <div className="text-[11px] text-gray-500 font-medium">
                      {currentCourse.name} 유닛 이어하기
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    setIsMobileDrawerOpen(false);
                    onOpenDialogue();
                  }}
                  className="w-full px-3 py-3 rounded-2xl bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200/80 flex items-center gap-3 text-left transition-colors min-h-[48px]"
                >
                  <MessageSquare className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-gray-900">현지인 실전 대화</div>
                    <div className="text-[11px] text-amber-800 font-semibold">
                      도쿄·바르셀로나·뉴욕 롤플레잉
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => scrollToSection('language-matcher')}
                  className="w-full px-3 py-3 rounded-2xl hover:bg-gray-50 flex items-center gap-3 text-left transition-colors min-h-[48px]"
                >
                  <Compass className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-gray-900">단계별 맞춤 언어 찾기</div>
                    <div className="text-[11px] text-gray-500 font-medium">
                      4단계 조건으로 TOP 3 후보 추천
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => scrollToSection('courses')}
                  className="w-full px-3 py-3 rounded-2xl hover:bg-gray-50 flex items-center gap-3 text-left transition-colors min-h-[48px]"
                >
                  <BookOpen className="w-5 h-5 text-sky-600 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-gray-900">정규 코스 탐색</div>
                    <div className="text-[11px] text-gray-500 font-medium">
                      8개국 커리큘럼 &amp; 난이도 비교
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => scrollToSection('world-languages')}
                  className="w-full px-3 py-3 rounded-2xl hover:bg-gray-50 flex items-center gap-3 text-left transition-colors min-h-[48px]"
                >
                  <Globe2 className="w-5 h-5 text-purple-600 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-gray-900">국가별 언어 강점 백과</div>
                    <div className="text-[11px] text-gray-500 font-medium">
                      전 세계 20+ 국가 강점 및 혜택
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    setIsMobileDrawerOpen(false);
                    onOpenLeaderboard();
                  }}
                  className="w-full px-3 py-3 rounded-2xl hover:bg-gray-50 flex items-center gap-3 text-left transition-colors min-h-[48px]"
                >
                  <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-gray-900">주간 루비 리그</div>
                    <div className="text-[11px] text-gray-500 font-medium">
                      실시간 경험치 순위 &amp; 응원
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    setIsMobileDrawerOpen(false);
                    onOpenReviewClinic();
                  }}
                  className="w-full px-3 py-3 rounded-2xl hover:bg-gray-50 flex items-center gap-3 text-left transition-colors min-h-[48px]"
                >
                  <RotateCcw className="w-5 h-5 text-rose-500 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-gray-900">AI 오답 복습 클리닉</div>
                    <div className="text-[11px] text-gray-500 font-medium">
                      약점 복습 &amp; 하트 충전
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => scrollToSection('pricing')}
                  className="w-full px-3 py-3 rounded-2xl hover:bg-purple-50 flex items-center gap-3 text-left transition-colors min-h-[48px]"
                >
                  <Shield className="w-5 h-5 text-purple-600 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-gray-900">
                      {isSuper ? 'Super Duolingo 이용 중' : 'Super Duolingo 안내'}
                    </div>
                    <div className="text-[11px] text-gray-500 font-medium">
                      무제한 하트 &amp; 광고 없는 학습
                    </div>
                  </div>
                </button>
              </nav>
            </div>

            {/* Sticky Drawer Bottom CTA */}
            <div className="p-4 border-t border-duo-gray-border bg-white sticky bottom-0">
              <button
                onClick={() => {
                  sounds.playClick();
                  setIsMobileDrawerOpen(false);
                  onStartLesson();
                }}
                className="btn-3d w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm py-3.5 rounded-2xl shadow-duo-green flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{currentCourse.name} 레슨 바로 시작</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
