"use client";

interface TypingStatsProps {
  wpm: number;
  accuracy: number;
  time: number;
  wordsTyped: number;
}

export default function TypingStats({ wpm, accuracy, time, wordsTyped }: TypingStatsProps) {
  const stats = [
    { label: "WPM", value: wpm, color: "from-blue-500 to-purple-600", icon: "⚡" },
    { label: "Accuracy", value: `${accuracy}%`, color: "from-green-500 to-emerald-600", icon: "🎯" },
    { label: "Time", value: `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`, color: "from-purple-500 to-pink-600", icon: "⏱️" },
    { label: "Words", value: wordsTyped, color: "from-orange-500 to-red-600", icon: "📝" },
  ];

  return (
    <div className="flex justify-center gap-4 mb-8 flex-wrap">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="glass rounded-2xl p-6 min-w-[140px] hover:scale-105 transition-all duration-300 animate-slide-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider">{stat.label}</h3>
            <span className="text-lg">{stat.icon}</span>
          </div>
          <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}