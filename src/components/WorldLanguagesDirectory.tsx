import { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Search,
  Volume2,
  Check,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  ChevronDown,
  X,
  Play,
} from 'lucide-react';
import { WORLD_LANGUAGES, WorldCountryLanguage } from '../data/worldLanguages';
import { COURSES, Course } from '../data/courses';
import { sounds } from '../utils/audio';

interface WorldLanguagesDirectoryProps {
  onSelectCourse: (course: Course) => void;
  onStartLesson: (course: Course) => void;
  onToast: (msg: string) => void;
}

export function WorldLanguagesDirectory({
  onSelectCourse,
  onStartLesson,
  onToast,
}: WorldLanguagesDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<string>('all');
  const [showAll, setShowAll] = useState(false);
  const [selectedDetailCountry, setSelectedDetailCountry] = useState<WorldCountryLanguage | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('duo_bookmarked_languages');
    return saved ? JSON.parse(saved) : ['th', 'it', 'se'];
  });

  const continentFilters = [
    { id: 'all', label: '전체 국가' },
    { id: 'asia', label: '아시아' },
    { id: 'europe', label: '유럽' },
    { id: 'americas', label: '아메리카' },
    { id: 'mideast_africa', label: '중동·아프리카' },
  ];

  const filteredList = useMemo(() => {
    return WORLD_LANGUAGES.filter((item) => {
      const matchContinent =
        selectedContinent === 'all' || item.continent === selectedContinent;
      const query = searchQuery.trim().toLowerCase();
      const matchQuery =
        !query ||
        item.country.toLowerCase().includes(query) ||
        item.countryEn.toLowerCase().includes(query) ||
        item.language.toLowerCase().includes(query) ||
        item.languageEn.toLowerCase().includes(query) ||
        item.keyStrengths.some((s) => s.toLowerCase().includes(query));

      return matchContinent && matchQuery;
    });
  }, [searchQuery, selectedContinent]);

  const isFiltered = selectedContinent !== 'all' || searchQuery.trim().length > 0;
  const visibleList = isFiltered || showAll ? filteredList : filteredList.slice(0, 6);

  const toggleBookmark = (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    sounds.playClick();
    setBookmarkedIds((prev) => {
      let next: string[];
      if (prev.includes(id)) {
        next = prev.filter((i) => i !== id);
        onToast(`${name} 언어가 관심 목록에서 해제되었습니다.`);
      } else {
        next = [...prev, id];
        onToast(`${name} 언어가 관심 학습 목록에 저장되었습니다.`);
        confetti({
          particleCount: 25,
          spread: 40,
          origin: { y: 0.7 },
        });
      }
      localStorage.setItem('duo_bookmarked_languages', JSON.stringify(next));
      return next;
    });
  };

  const handlePlayAudio = (e: React.MouseEvent, phrase: string, langCode: string) => {
    e.stopPropagation();
    sounds.playClick();
    sounds.speak(phrase, langCode);
  };

  const handleStartPlayableCourse = (item: WorldCountryLanguage) => {
    sounds.playFanfare();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });

    const matched = COURSES.find(
      (c) =>
        c.langCode.slice(0, 2) === item.langCode.slice(0, 2) ||
        c.name.includes(item.language.slice(0, 2))
    );

    if (matched) {
      onSelectCourse(matched);
      onStartLesson(matched);
      onToast(`${matched.name} 정규 코스 레슨을 시작합니다.`);
    } else {
      onToast(`${item.language}가 관심 언어 목록에 저장되었습니다.`);
    }
  };

  return (
    <section id="world-languages" className="py-14 px-4 bg-white border-y border-duo-gray-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-6 gap-4">
          <div>
            <p className="text-xs font-bold text-sky-600 mb-1.5">
              글로벌 언어 백과 ({WORLD_LANGUAGES.length}개국)
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              국가별 언어 강점과 학습 혜택
            </h2>
            <p className="text-sm text-gray-500 font-normal mt-1">
              카드를 클릭하면 취업, 여행, 문화 분야별 상세 분석과 원어민 발음을 확인할 수 있습니다.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="국가 또는 언어 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-500 transition-colors bg-gray-50/60"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="검색어 지우기"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Continent Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-gray-100 rounded-xl border border-gray-200 mb-7 w-fit">
          {continentFilters.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playClick();
                setSelectedContinent(tab.id);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedContinent === tab.id
                  ? 'bg-white text-gray-900 shadow-xs font-bold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Compact At-a-Glance Grid */}
        {visibleList.length === 0 ? (
          <div className="py-12 text-center text-sm text-gray-500 border border-dashed border-gray-200 rounded-2xl">
            검색 조건에 맞는 국가나 언어가 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleList.map((item) => {
              const isBookmarked = bookmarkedIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedDetailCountry(item)}
                  className="bg-white border border-duo-gray-border hover:border-sky-400 rounded-2xl p-5 transition-all duration-150 hover:shadow-md flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Top: Flag, Title & Bookmark */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-3xl shrink-0 select-none">{item.flag}</span>
                        <div className="min-w-0">
                          <h3 className="font-bold text-base text-gray-900 group-hover:text-sky-600 transition-colors truncate">
                            {item.country} · {item.language}
                          </h3>
                          <div className="text-xs text-gray-500 font-medium flex items-center gap-1.5 tabular-nums mt-0.5">
                            <span>{item.speakers}</span>
                            <span aria-hidden="true">·</span>
                            <span>{item.difficultyForKorean}</span>
                            <span aria-hidden="true">·</span>
                            <span>{item.estimatedTime}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={(e) => toggleBookmark(e, item.id, item.country)}
                        title={isBookmarked ? '관심 목록 해제' : '관심 목록에 담기'}
                        aria-label={`${item.country} 북마크`}
                        className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                          isBookmarked
                            ? 'text-amber-500 bg-amber-50'
                            : 'text-gray-300 hover:text-amber-500 hover:bg-gray-50'
                        }`}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-4 h-4 fill-amber-500" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Concise Summary Lines */}
                    <div className="mt-3 pt-3 border-t border-gray-100 space-y-1.5 text-xs">
                      <p className="text-gray-700 font-medium leading-relaxed line-clamp-2">
                        <span className="font-bold text-gray-900">강점: </span>
                        {item.keyStrengths[0]}
                      </p>
                      <p className="text-gray-500 font-normal leading-relaxed line-clamp-2">
                        <span className="font-semibold text-gray-700">혜택: </span>
                        {item.learnBenefits.career}
                      </p>
                    </div>
                  </div>

                  {/* Clean Footer Row */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <button
                      onClick={(e) =>
                        handlePlayAudio(e, item.samplePhrase.foreign, item.langCode)
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-sky-600 transition-colors py-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>인사 듣기</span>
                    </button>

                    <span className="text-xs font-bold text-sky-600 flex items-center gap-0.5">
                      <span>상세 보기</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Expand / Collapse Toggle when viewing unfiltered list */}
        {!isFiltered && filteredList.length > 6 && (
          <div className="mt-7 text-center">
            <button
              onClick={() => {
                sounds.playClick();
                setShowAll((prev) => !prev);
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-xs transition-colors"
            >
              <span>
                {showAll
                  ? '간단히 보기 (6개국)'
                  : `전체 ${filteredList.length}개국 모두 보기`}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        )}
      </div>

      {/* Country Detail Modal */}
      {selectedDetailCountry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-duo-gray-border max-w-xl w-full shadow-2xl p-6 sm:p-7 overflow-y-auto max-h-[88vh] animate-in zoom-in-95 duration-150 space-y-5">
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedDetailCountry.flag}</span>
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900">
                    {selectedDetailCountry.country} · {selectedDetailCountry.language}
                  </h3>
                  <div className="text-xs text-gray-500 font-medium mt-0.5">
                    {selectedDetailCountry.countryEn} · {selectedDetailCountry.countriesUsed}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedDetailCountry(null)}
                aria-label="상세 창 닫기"
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <div className="text-gray-400 font-medium">전 세계 화자</div>
                <div className="font-bold text-gray-900 mt-0.5 tabular-nums">
                  {selectedDetailCountry.speakers}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <div className="text-gray-400 font-medium">한국인 난이도</div>
                <div className="font-bold text-emerald-600 mt-0.5">
                  {selectedDetailCountry.difficultyForKorean}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <div className="text-gray-400 font-medium">기초 완성 기간</div>
                <div className="font-bold text-sky-600 mt-0.5 tabular-nums">
                  {selectedDetailCountry.estimatedTime}
                </div>
              </div>
            </div>

            {/* Sample Phrase Audio */}
            <div className="p-3.5 bg-sky-50/60 border border-sky-100 rounded-2xl flex items-center justify-between gap-3">
              <div>
                <div className="font-bold text-sm text-gray-900">
                  {selectedDetailCountry.samplePhrase.foreign}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {selectedDetailCountry.samplePhrase.pronunciation} · {selectedDetailCountry.samplePhrase.korean}
                </div>
              </div>
              <button
                onClick={(e) =>
                  handlePlayAudio(
                    e,
                    selectedDetailCountry.samplePhrase.foreign,
                    selectedDetailCountry.langCode
                  )
                }
                aria-label="인사말 발음 듣기"
                className="p-2.5 rounded-xl bg-white text-sky-600 hover:bg-sky-100 border border-sky-200 shrink-0"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Key Strengths */}
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>핵심 강점</span>
              </h4>
              <ul className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-2 text-xs">
                {selectedDetailCountry.keyStrengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2 font-medium text-gray-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-gray-900">배우면 얻는 실질적 혜택</h4>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="font-bold text-emerald-800 mb-0.5">취업 &amp; 비즈니스</div>
                  <div className="text-gray-600 leading-relaxed">{selectedDetailCountry.learnBenefits.career}</div>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="font-bold text-sky-800 mb-0.5">자유여행 &amp; 현지 소통</div>
                  <div className="text-gray-600 leading-relaxed">{selectedDetailCountry.learnBenefits.travel}</div>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="font-bold text-purple-800 mb-0.5">문화 &amp; 콘텐츠</div>
                  <div className="text-gray-600 leading-relaxed">{selectedDetailCountry.learnBenefits.culture}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setSelectedDetailCountry(null)}
                className="w-1/3 py-3 rounded-xl border-2 border-duo-gray-border text-gray-700 font-bold hover:bg-gray-50 text-xs"
              >
                닫기
              </button>
              <button
                onClick={() => {
                  handleStartPlayableCourse(selectedDetailCountry);
                  setSelectedDetailCountry(null);
                }}
                className="btn-3d w-2/3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-duo-green text-xs flex items-center justify-center gap-1.5"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>
                  {selectedDetailCountry.duoAvailable ? '정규 레슨 시작하기' : '관심 언어로 등록하기'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
