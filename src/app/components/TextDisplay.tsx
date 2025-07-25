"use client";

interface TextDisplayProps {
  text: string;
  typedText: string;
  currentIndex: number;
}

export default function TextDisplay({ text, typedText, currentIndex }: TextDisplayProps) {
  const renderCharacter = (char: string, index: number) => {
    let className = "text-xl sm:text-2xl leading-relaxed transition-all duration-100 inline-block ";
    
    if (index < typedText.length) {
      if (typedText[index] === char) {
        className += "text-green-400 ";
      } else {
        className += "text-red-400 bg-red-900/30 rounded px-0.5 ";
      }
    } else if (index === currentIndex) {
      className += "bg-blue-500/30 text-white rounded px-1 animate-pulse-glow ";
    } else {
      className += "text-gray-500 dark:text-gray-400 ";
    }
    
    // Handle spaces
    if (char === ' ') {
      if (index < typedText.length) {
        if (typedText[index] === char) {
          return <span key={index} className={className}>·</span>;
        } else {
          return <span key={index} className={className + " bg-red-900/50"}>·</span>;
        }
      } else if (index === currentIndex) {
        return <span key={index} className={className}>_</span>;
      }
    }
    
    return (
      <span key={index} className={className}>
        {char}
      </span>
    );
  };

  return (
    <div className="glass rounded-2xl p-8 mb-6 max-w-4xl mx-auto hover:shadow-2xl transition-shadow duration-300">
      <div className="font-mono tracking-wide break-words whitespace-pre-wrap overflow-hidden">
        {text.split('').map((char, index) => renderCharacter(char, index))}
      </div>
    </div>
  );
}