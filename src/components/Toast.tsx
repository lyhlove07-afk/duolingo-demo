import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 transform transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in">
      <div className="bg-gray-950 text-white font-extrabold text-xs sm:text-sm px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-800">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
}
