import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Star, Check, Gift, Trophy, BookOpen, Play, Lock } from 'lucide-react';
import { COURSES, Course, Lesson, Unit } from '../data/courses';
import { DuoOwl } from './DuoOwl';
import { sounds } from '../utils/audio';

interface LearningPathProps {
  course: Course;
  onSelectCourse: (course: Course) => void;
  completedLessonIds: string[];
  onStartLesson: (lesson: Lesson) => void;
  onOpenChest: () => void;
  openedChestIds: string[];
}

export function LearningPath({
  course,
  onSelectCourse,
  completedLessonIds,
  onStartLesson,
  onOpenChest,
  openedChestIds,
}: LearningPathProps) {
  const [activePreviewLesson, setActivePreviewLesson] = useState<Lesson | null>(null);

  const handleNodeClick = (lesson: Lesson, isLocked: boolean) => {
    sounds.playClick();
    if (isLocked) {
      return;
    }
    setActivePreviewLesson(lesson);
  };

  const handleStartFromPreview = () => {
    if (activePreviewLesson) {
      sounds.playClick();
      onStartLesson(activePreviewLesson);
      setActivePreviewLesson(null);
    }
  };

  const getOffsetClass = (index: number) => {
    const cycle = index % 4;
    if (cycle === 0) return 'translate-x-0';
    if (cycle === 1) return 'translate-x-10';
    if (cycle === 2) return 'translate-x-0';
    return '-translate-x-10';
  };

  return (
    <section id="learning-path" className="py-14 px-4 bg-gray-50/70 border-b border-duo-gray-border">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6">
          <p className="text-xs font-bold text-emerald-600 mb-1.5">
            {course.flag} {course.name} 커리큘럼
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            단계별 학습 로드맵
          </h2>
          <p className="text-sm text-gray-500 font-normal mt-1">
            노드를 눌러 레슨을 진행하고, 다른 언어로 바로 전환할 수 있습니다.
          </p>
        </div>

        {/* Clean Quick Course Switcher Strip */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8">
          {COURSES.map((c) => {
            const isCur = c.id === course.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  sounds.playClick();
                  onSelectCourse(c);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                  isCur
                    ? 'bg-emerald-500 border-emerald-600 text-white font-bold shadow-xs'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'
                }`}
              >
                <span>{c.flag}</span>
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>

        {/* Units Loop */}
        <div className="space-y-10">
          {course.units.map((unit: Unit) => {
            const unitColorClasses =
              unit.color === 'blue'
                ? {
                    header: 'bg-sky-500 border-sky-600',
                    nodeActive: 'bg-sky-500 shadow-duo-blue text-white',
                  }
                : unit.color === 'purple'
                ? {
                    header: 'bg-purple-500 border-purple-600',
                    nodeActive: 'bg-purple-500 shadow-duo-purple text-white',
                  }
                : {
                    header: 'bg-emerald-500 border-emerald-600',
                    nodeActive: 'bg-emerald-500 shadow-duo-green text-white',
                  };

            return (
              <div key={unit.id} className="relative">
                {/* Unit Header Banner */}
                <div
                  className={`rounded-3xl p-5 text-white border-b-4 ${unitColorClasses.header} shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
                >
                  <div>
                    <div className="text-xs font-bold text-white/90">
                      섹션 1 · 유닛 {unit.number}
                    </div>
                    <h3 className="text-xl font-extrabold tracking-tight mt-0.5">
                      {unit.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-normal text-white/85 mt-1 max-w-xl">
                      {unit.subtitle}
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    <DuoOwl mood="happy" size={50} />
                  </div>
                </div>

                {/* Snake Path Nodes */}
                <div className="flex flex-col items-center space-y-6 relative py-3">
                  {unit.lessons.map((lesson, idx) => {
                    const isCompleted = completedLessonIds.includes(lesson.id);
                    const isUnlocked = idx === 0 || completedLessonIds.includes(unit.lessons[idx - 1]?.id);
                    const isCurrent = isUnlocked && !isCompleted;
                    const offset = getOffsetClass(idx);

                    return (
                      <div
                        key={lesson.id}
                        className={`relative transition-transform duration-200 ${offset}`}
                      >
                        {isCurrent && (
                          <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white border-2 border-emerald-500 text-emerald-700 font-bold text-xs px-3 py-1 rounded-xl shadow-sm animate-bounce z-10">
                            <span>시작하기</span>
                            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-r-2 border-b-2 border-emerald-500 rotate-45"></div>
                          </div>
                        )}

                        <button
                          onClick={() => handleNodeClick(lesson, !isUnlocked)}
                          disabled={!isUnlocked}
                          aria-label={lesson.title}
                          className={`btn-3d w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-bold transition-all ${
                            isCompleted
                              ? 'bg-amber-400 text-white shadow-duo-yellow hover:bg-amber-500'
                              : isCurrent
                              ? `${unitColorClasses.nodeActive} ring-4 ring-emerald-300 ring-offset-2 scale-105`
                              : 'bg-gray-200 text-gray-400 border-2 border-gray-300 shadow-duo-gray cursor-not-allowed'
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="w-8 h-8 stroke-[3]" />
                          ) : isCurrent ? (
                            <Star className="w-8 h-8 fill-white stroke-[2.5]" />
                          ) : (
                            <Lock className="w-6 h-6 text-gray-400" />
                          )}
                        </button>
                        <div className="text-center mt-2 text-xs font-semibold text-gray-600">
                          {lesson.title}
                        </div>
                      </div>
                    );
                  })}

                  {/* Chest Bonus Node */}
                  <div className="relative transition-transform duration-200 translate-x-6 pt-1 text-center">
                    {openedChestIds.includes(`chest-${unit.id}`) ? (
                      <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-emerald-600 mx-auto">
                        <Check className="w-7 h-7 stroke-[3]" />
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          sounds.playFanfare();
                          confetti({
                            particleCount: 70,
                            spread: 60,
                            origin: { y: 0.6 },
                          });
                          onOpenChest();
                        }}
                        aria-label="보물상자 열기"
                        className="btn-3d w-16 h-16 rounded-full bg-amber-400 hover:bg-amber-500 text-white shadow-duo-yellow flex items-center justify-center mx-auto"
                        title="보물상자 열기 (+50 보석)"
                      >
                        <Gift className="w-7 h-7 animate-wiggle" />
                      </button>
                    )}
                    <div className="text-[11px] font-medium text-gray-400 mt-1.5">보너스 상자</div>
                  </div>

                  {/* Unit Trophy Checkpoint */}
                  <div className="pt-1">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-amber-300 to-amber-500 text-white shadow-duo-yellow flex items-center justify-center border-2 border-amber-600">
                      <Trophy className="w-7 h-7" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lesson Preview Modal */}
      {activePreviewLesson && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-duo-gray-border p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 mx-auto flex items-center justify-center text-emerald-600 mb-3">
                <BookOpen className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-extrabold text-gray-900">
                {activePreviewLesson.title}
              </h4>
              <p className="text-xs text-gray-500 font-normal mt-1">
                {activePreviewLesson.desc}
              </p>

              <div className="my-5 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-around text-xs font-bold text-emerald-800">
                <div>
                  <div className="text-gray-400 font-medium text-[11px]">보상</div>
                  <div className="tabular-nums">+{activePreviewLesson.xpReward} XP</div>
                </div>
                <div className="w-px h-6 bg-emerald-200"></div>
                <div>
                  <div className="text-gray-400 font-medium text-[11px]">문제 수</div>
                  <div className="tabular-nums">{activePreviewLesson.questions.length} 문항</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setActivePreviewLesson(null)}
                  className="w-1/2 py-3 rounded-xl border-2 border-duo-gray-border text-gray-700 font-bold hover:bg-gray-50 text-xs"
                >
                  닫기
                </button>
                <button
                  onClick={handleStartFromPreview}
                  className="btn-3d w-1/2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-duo-green text-xs flex items-center justify-center gap-1.5"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>레슨 시작</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
