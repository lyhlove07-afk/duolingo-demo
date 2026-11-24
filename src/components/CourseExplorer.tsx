import { useState } from 'react';
import confetti from 'canvas-confetti';
import { ChevronRight, Check } from 'lucide-react';
import { COURSES, Course, CourseTag } from '../data/courses';
import { sounds } from '../utils/audio';

interface CourseExplorerProps {
  currentCourseId: string;
  onSelectCourse: (course: Course) => void;
  onToast: (msg: string) => void;
}

export function CourseExplorer({
  currentCourseId,
  onSelectCourse,
  onToast,
}: CourseExplorerProps) {
  const [activeFilter, setActiveFilter] = useState<CourseTag>('all');

  const filterTabs: { id: CourseTag; label: string }[] = [
    { id: 'all', label: '전체 8개국' },
    { id: 'travel', label: '여행 회화' },
    { id: 'career', label: '취업·커리어' },
    { id: 'easy', label: '입문 추천' },
    { id: 'global', label: '세계 공용어' },
  ];

  const filteredCourses = COURSES.filter((c) => {
    if (activeFilter === 'all') return true;
    return c.tags.includes(activeFilter);
  });

  const handleSelect = (course: Course) => {
    sounds.playClick();
    onSelectCourse(course);
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.6 },
    });
    onToast(`${course.name} (${course.englishName}) 코스가 선택되었습니다.`);

    const target = document.getElementById('learning-path');
    if (target) {
      const headerOffset = 76;
      const pos = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: pos - headerOffset, behavior: 'smooth' });
    }
  };

  return (
    <section id="courses" className="py-14 px-4 max-w-7xl mx-auto">
      {/* Header & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <p className="text-xs font-bold text-sky-600 mb-1.5">
            정규 학습 커리큘럼
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            8개국 정규 코스 한눈에 보기
          </h2>
          <p className="text-sm text-gray-500 font-normal mt-1">
            원하는 언어를 클릭하면 아래 학습 로드맵이 즉시 전환됩니다.
          </p>
        </div>

        {/* Clean Segmented Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-gray-100 rounded-xl border border-gray-200 self-start md:self-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playClick();
                setActiveFilter(tab.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeFilter === tab.id
                  ? 'bg-white text-gray-900 shadow-xs font-bold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4-Column Compact Course Grid (Fits 8 courses in 2 clean rows) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredCourses.map((course) => {
          const isSelected = course.id === currentCourseId;

          return (
            <button
              key={course.id}
              onClick={() => handleSelect(course)}
              className={`text-left rounded-2xl p-5 transition-all duration-150 group flex flex-col justify-between border-2 ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50/30 shadow-sm'
                  : 'border-duo-gray-border bg-white hover:border-emerald-400 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl select-none">{course.flag}</span>
                  {isSelected ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>학습 중</span>
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-gray-400">
                      {course.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-lg text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {course.name}
                  <span className="text-xs font-medium text-gray-400 ml-1.5">
                    {course.englishName}
                  </span>
                </h3>

                {/* Clean Unboxed Metadata */}
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mt-1 tabular-nums">
                  <span>{course.koreanDifficulty}</span>
                  <span aria-hidden="true">·</span>
                  <span>{course.estimatedMonths}</span>
                  <span aria-hidden="true">·</span>
                  <span>{course.learnerCount}</span>
                </div>

                <p className="mt-3 text-xs text-gray-600 font-normal leading-relaxed line-clamp-2">
                  {course.bestFor}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-xs font-bold text-emerald-600">
                <span>{isSelected ? '로드맵 보기' : '코스 선택'}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
