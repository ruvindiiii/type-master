"use client";

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  wpm: number;
  accuracy: number;
  time: number;
  wordsTyped: number;
  onRestart: () => void;
  onNewText: () => void;
}

export default function ResultsModal({ 
  isOpen, 
  onClose, 
  wpm, 
  accuracy, 
  time, 
  wordsTyped,
  onRestart,
  onNewText
}: ResultsModalProps) {
  if (!isOpen) return null;

  const getPerformanceMessage = () => {
    if (wpm >= 80) return { text: "Outstanding! 🚀", color: "from-purple-500 to-pink-600" };
    if (wpm >= 60) return { text: "Excellent! 🌟", color: "from-blue-500 to-purple-600" };
    if (wpm >= 40) return { text: "Great Job! 💪", color: "from-green-500 to-emerald-600" };
    if (wpm >= 20) return { text: "Keep Going! 👍", color: "from-yellow-500 to-orange-600" };
    return { text: "Practice Makes Perfect! 🎯", color: "from-orange-500 to-red-600" };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass rounded-3xl shadow-2xl p-8 max-w-md w-full animate-fade-in">
        <h2 className={`text-4xl font-bold text-center mb-2 bg-gradient-to-r ${performance.color} bg-clip-text text-transparent`}>
          {performance.text}
        </h2>
        <p className="text-center text-gray-400 mb-8">Your typing session is complete!</p>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center py-3 border-b border-gray-700">
            <span className="text-gray-400">Speed</span>
            <span className="text-2xl font-bold text-blue-400">{wpm} WPM</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-700">
            <span className="text-gray-400">Accuracy</span>
            <span className="text-2xl font-bold text-green-400">{accuracy}%</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-700">
            <span className="text-gray-400">Time</span>
            <span className="text-2xl font-bold text-purple-400">
              {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-gray-400">Words Typed</span>
            <span className="text-2xl font-bold text-orange-400">{wordsTyped}</span>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onRestart}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold 
              hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Try Again
          </button>
          <button
            onClick={onNewText}
            className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-xl font-semibold 
              hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            New Text
          </button>
        </div>
      </div>
    </div>
  );
}