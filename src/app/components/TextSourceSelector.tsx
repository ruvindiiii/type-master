"use client";

import { TextSource } from "../lib/textSources";

interface TextSourceSelectorProps {
  sources: TextSource[];
  selectedSource: string;
  onSourceChange: (sourceId: string) => void;
  disabled?: boolean;
}

export default function TextSourceSelector({ 
  sources, 
  selectedSource, 
  onSourceChange,
  disabled = false 
}: TextSourceSelectorProps) {
  return (
    <div className="flex justify-center mb-6">
      <div className="glass rounded-2xl p-2 flex gap-2">
        {sources.map((source) => {
          const isSelected = source.id === selectedSource;
          const difficultyGradients = {
            easy: 'from-green-500 to-emerald-600',
            medium: 'from-yellow-500 to-orange-600',
            hard: 'from-red-500 to-pink-600'
          };
          
          return (
            <button
              key={source.id}
              onClick={() => onSourceChange(source.id)}
              disabled={disabled}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300
                ${isSelected 
                  ? `bg-gradient-to-r ${difficultyGradients[source.difficulty]} text-white shadow-lg scale-105` 
                  : 'hover:bg-white/10 text-gray-400 hover:text-white'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              title={source.description}
            >
              {source.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}