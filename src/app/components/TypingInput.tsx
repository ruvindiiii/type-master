"use client";

import React, { useRef, useEffect } from "react";

interface TypingInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export default function TypingInput({ 
  value, 
  onChange, 
  onKeyDown,
  disabled = false,
  placeholder = "Start typing...",
  className = ""
}: TypingInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative max-w-4xl mx-auto mb-6">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-6 py-4 text-xl font-mono tracking-wide rounded-2xl glass
          border border-gray-700 dark:border-gray-600
          focus:border-blue-500 dark:focus:border-blue-400 
          focus:outline-none focus:ring-2 focus:ring-blue-500/20
          transition-all duration-300
          text-gray-700 dark:text-gray-300
          placeholder-gray-500 dark:placeholder-gray-400
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
          ${className}`}
      />
      {!disabled && !value && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 animate-pulse">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2z" />
          </svg>
        </div>
      )}
    </div>
  );
}