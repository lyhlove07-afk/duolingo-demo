import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BentoShowcase } from './components/BentoShowcase';
import { CourseExplorer } from './components/CourseExplorer';
import { LearningPath } from './components/LearningPath';
import { PricingSection } from './components/PricingSection';
import { Footer } from './components/Footer';
import { LessonModal } from './components/LessonModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { ReviewClinicModal } from './components/ReviewClinicModal';
import { StreakModal } from './components/StreakModal';
import { StepLanguageSelector } from './components/StepLanguageSelector';
import { LanguageMatcherModal } from './components/LanguageMatcherModal';
import { DialoguePracticeModal } from './components/DialoguePracticeModal';
import { WorldLanguagesDirectory } from './components/WorldLanguagesDirectory';
import { Toast } from './components/Toast';
import { COURSES, Course, Lesson } from './data/courses';

export default function App() {
  // Gamification state
  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem('duo_xp');
    return saved ? Number(saved) : 980;
  });

  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem('duo_streak');
    return saved ? Number(saved) : 128;
  });

  const [hearts, setHearts] = useState<number>(() => {
    const saved = localStorage.getItem('duo_hearts');
    return saved ? Number(saved) : 5;
  });

  const [gems, setGems] = useState<number>(() => {
    const saved = localStorage.getItem('duo_gems');
    return saved ? Number(saved) : 450;
  });

  const [isSuper, setIsSuper] = useState<boolean>(() => {
    const saved = localStorage.getItem('duo_super');
    return saved === 'true';
  });

  const [currentCourse, setCurrentCourse] = useState<Course>(COURSES[0]); // Spanish or Japanese
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('duo_completed_lessons');
    return saved ? JSON.parse(saved) : ['es-u1-l1'];
  });

  const [openedChestIds, setOpenedChestIds] = useState<string[]>([]);
  
  // Modals & Drawers state
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isReviewClinicOpen, setIsReviewClinicOpen] = useState(false);
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  const [isMatcherOpen, setIsMatcherOpen] = useState(false);
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live user counter simulation
  const [liveUsersCount, setLiveUsersCount] = useState(312890);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsersCount((prev) => {
        const delta = Math.floor(Math.random() * 15) - 7;
        return Math.max(300000, prev + delta);
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Save states to local storage
  useEffect(() => {
    localStorage.setItem('duo_xp', xp.toString());
    localStorage.setItem('duo_streak', streak.toString());
    localStorage.setItem('duo_hearts', hearts.toString());
    localStorage.setItem('duo_gems', gems.toString());
    localStorage.setItem('duo_super', isSuper.toString());
    localStorage.setItem('duo_completed_lessons', JSON.stringify(completedLessonIds));
  }, [xp, streak, hearts, gems, isSuper, completedLessonIds]);

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Handlers
  const handleEarnXP = (amount: number) => {
    setXp((prev) => prev + amount);
  };

  const handleBoostStreak = () => {
    setStreak((prev) => prev + 1);
  };

  const handleLoseHeart = () => {
    setHearts((prev) => Math.max(0, prev - 1));
  };

  const handleRefillHeart = () => {
    setHearts((prev) => Math.min(5, prev + 1));
  };

  const handleCompleteLesson = (lessonId: string, xpEarned: number) => {
    if (!completedLessonIds.includes(lessonId)) {
      setCompletedLessonIds((prev) => [...prev, lessonId]);
    }
    setXp((prev) => prev + xpEarned);
    setGems((prev) => prev + 10);
    showToast(`레슨 완료! +${xpEarned} XP 및 +10 보석을 획득했습니다! 💎`);
  };

  const handleOpenChest = () => {
    const chestId = `chest-${currentCourse.units[0]?.id || '1'}`;
    setOpenedChestIds((prev) => [...prev, chestId]);
    setGems((prev) => prev + 50);
    showToast('보물상자를 열었습니다! 보석 +50 획득! 🎁💎');
  };

  const handleActivateSuper = () => {
    setIsSuper(true);
    setHearts(5);
  };

  // Start the first incomplete lesson or the first lesson
  const handleStartDefaultLesson = (targetCourse: Course = currentCourse) => {
    const unit1 = targetCourse.units[0];
    if (unit1 && unit1.lessons.length > 0) {
      const nextLesson =
        unit1.lessons.find((l) => !completedLessonIds.includes(l.id)) ||
        unit1.lessons[0];
      setActiveLesson(nextLesson);
    }
  };

  return (
    <div id="top" className="min-h-screen bg-[#f8fafc] text-gray-900 selection:bg-emerald-200 selection:text-emerald-900">
      {/* Top sticky navigation bar */}
      <Header
        streak={streak}
        hearts={hearts}
        gems={gems}
        xp={xp}
        isSuper={isSuper}
        currentCourse={currentCourse}
        completedLessonIds={completedLessonIds}
        onSelectCourse={(course) => {
          setCurrentCourse(course);
          showToast(`${course.name} (${course.englishName}) 코스로 전환되었습니다!`);
        }}
        onOpenStreak={() => setIsStreakModalOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenReviewClinic={() => setIsReviewClinicOpen(true)}
        onOpenDialogue={() => setIsDialogueOpen(true)}
        onStartLesson={() => handleStartDefaultLesson(currentCourse)}
      />

      <main>
        {/* Section 1: Hero & 10s Demo Quiz */}
        <HeroSection
          onStartLesson={() => handleStartDefaultLesson(currentCourse)}
          onOpenMatcher={() => {
            const el = document.getElementById('language-matcher');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else setIsMatcherOpen(true);
          }}
          onOpenDialogue={() => setIsDialogueOpen(true)}
          onEarnXP={handleEarnXP}
          liveUsersCount={liveUsersCount}
        />

        {/* Section 2: Step-by-Step Language Selector with Real-time Candidates */}
        <StepLanguageSelector
          currentCourseId={currentCourse.id}
          onSelectCourse={(course) => setCurrentCourse(course)}
          onStartLesson={(course) => {
            setCurrentCourse(course);
            handleStartDefaultLesson(course);
          }}
          onToast={showToast}
        />

        {/* Section 3: Gamification Bento Grid */}
        <BentoShowcase
          streak={streak}
          xp={xp}
          onBoostStreak={handleBoostStreak}
          onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
          onOpenReviewClinic={() => setIsReviewClinicOpen(true)}
          onOpenDialogue={() => setIsDialogueOpen(true)}
          onToast={showToast}
        />

        {/* Section 3: Interactive Course Explorer */}
        <CourseExplorer
          currentCourseId={currentCourse.id}
          onSelectCourse={(course) => setCurrentCourse(course)}
          onToast={showToast}
        />

        {/* Section 4: Global Country & Language Encyclopedia with Strengths & Benefits */}
        <WorldLanguagesDirectory
          onSelectCourse={(course) => setCurrentCourse(course)}
          onStartLesson={(course) => {
            setCurrentCourse(course);
            handleStartDefaultLesson(course);
          }}
          onToast={showToast}
        />

        {/* Section 5: Authentic Duolingo Snake Learning Path */}
        <LearningPath
          course={currentCourse}
          onSelectCourse={(course) => {
            setCurrentCourse(course);
            showToast(`${course.name} (${course.englishName}) 코스로 전환되었습니다.`);
          }}
          completedLessonIds={completedLessonIds}
          onStartLesson={(lesson) => setActiveLesson(lesson)}
          onOpenChest={handleOpenChest}
          openedChestIds={openedChestIds}
        />

        {/* Section 5: Super Duolingo & Pricing Switcher */}
        <div id="pricing">
          <PricingSection
            isSuper={isSuper}
            onActivateSuper={handleActivateSuper}
            onToast={showToast}
          />
        </div>
      </main>

      {/* Footer & Final Call to action */}
      <Footer
        onStartLesson={() => handleStartDefaultLesson(currentCourse)}
        onToast={showToast}
      />

      {/* Interactive Modal: Language Matcher Diagnostic */}
      {isMatcherOpen && (
        <LanguageMatcherModal
          onSelectCourse={(course) => setCurrentCourse(course)}
          onStartLesson={(course) => {
            setCurrentCourse(course);
            handleStartDefaultLesson(course);
          }}
          onClose={() => setIsMatcherOpen(false)}
          onEarnXP={handleEarnXP}
          onToast={showToast}
        />
      )}

      {/* Interactive Modal: Native Speaker Dialogue Simulator */}
      {isDialogueOpen && (
        <DialoguePracticeModal
          onClose={() => setIsDialogueOpen(false)}
          onEarnXP={handleEarnXP}
          onToast={showToast}
        />
      )}

      {/* Interactive Modal: Active Lesson Player */}
      {activeLesson && (
        <LessonModal
          lesson={activeLesson}
          isSuper={isSuper}
          hearts={hearts}
          onLoseHeart={handleLoseHeart}
          onCompleteLesson={handleCompleteLesson}
          onClose={() => setActiveLesson(null)}
          onOpenSuperModal={() => {
            setActiveLesson(null);
            handleActivateSuper();
          }}
          onOpenReviewClinic={() => {
            setActiveLesson(null);
            setIsReviewClinicOpen(true);
          }}
        />
      )}

      {/* Interactive Modal: Weekly Leaderboard */}
      {isLeaderboardOpen && (
        <LeaderboardModal
          userXP={xp}
          onClose={() => setIsLeaderboardOpen(false)}
          onToast={showToast}
        />
      )}

      {/* Interactive Modal: Review Clinic */}
      {isReviewClinicOpen && (
        <ReviewClinicModal
          onRefillHeart={handleRefillHeart}
          onEarnXP={handleEarnXP}
          onClose={() => setIsReviewClinicOpen(false)}
          onToast={showToast}
        />
      )}

      {/* Interactive Modal: Streak Details */}
      {isStreakModalOpen && (
        <StreakModal
          streak={streak}
          onBoost={handleBoostStreak}
          onClose={() => setIsStreakModalOpen(false)}
          onToast={showToast}
        />
      )}

      {/* Floating Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
}
