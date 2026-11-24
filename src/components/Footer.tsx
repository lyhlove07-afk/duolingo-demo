import { DuoOwl } from './DuoOwl';
import { sounds } from '../utils/audio';

interface FooterProps {
  onStartLesson: () => void;
  onToast: (msg: string) => void;
}

export function Footer({ onStartLesson, onToast }: FooterProps) {
  return (
    <div>
      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-emerald-500 text-white text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <DuoOwl mood="celebrate" size={88} className="mx-auto" />
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            오늘 첫 레슨을 시작하고 <br />
            매일 이어지는 언어 습관을 만들어보세요
          </h2>
          <p className="text-sm sm:text-base font-medium text-emerald-50 max-w-lg mx-auto">
            가입 없이 바로 무료로 시작할 수 있습니다. 지금 바로 첫 단어를 배워보세요.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                sounds.playClick();
                onStartLesson();
              }}
              className="btn-3d bg-white text-emerald-700 hover:bg-gray-50 font-bold text-base px-8 py-3.5 rounded-2xl shadow-duo-white"
            >
              지금 무료로 시작하기
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-duo-gray-border py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="text-emerald-600 font-extrabold text-base tracking-tight uppercase">
              duolingo
            </span>
            <span aria-hidden="true">·</span>
            <span>© 2026 Duolingo Renewal</span>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-gray-600">
            <button
              onClick={() => onToast('이용약관 안내입니다.')}
              className="hover:text-gray-900 transition-colors"
            >
              이용약관
            </button>
            <button
              onClick={() => onToast('개인정보 처리방침 안내입니다.')}
              className="hover:text-gray-900 transition-colors"
            >
              개인정보 처리방침
            </button>
            <button
              onClick={() => onToast('고객 지원 센터 안내입니다.')}
              className="hover:text-gray-900 transition-colors"
            >
              고객 센터
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
