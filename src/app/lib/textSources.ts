export interface TextSource {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  getText: () => Promise<string>;
}

const easyTexts = [
  "The quick brown fox jumps over the lazy dog. This pangram contains all letters of the alphabet.",
  "A journey of a thousand miles begins with a single step. Practice makes perfect.",
  "To be or not to be, that is the question. Whether it is nobler in the mind to suffer.",
  "All that glitters is not gold. Sometimes the most valuable things are hidden from view.",
  "The early bird catches the worm. Success comes to those who prepare well and put in effort.",
];

const mediumTexts = [
  "In the beginning was the Word, and the Word was with God, and the Word was God. All things were made through him, and without him was not any thing made that was made.",
  "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity.",
  "To improve is to change; to be perfect is to change often. We make a living by what we get, but we make a life by what we give.",
  "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.",
];

const programmingTexts = [
  "function fibonacci(n) { if (n <= 1) return n; return fibonacci(n - 1) + fibonacci(n - 2); }",
  "const fetchData = async (url) => { try { const response = await fetch(url); return await response.json(); } catch (error) { console.error('Error:', error); } };",
  "class Rectangle { constructor(width, height) { this.width = width; this.height = height; } getArea() { return this.width * this.height; } }",
  "import React, { useState, useEffect } from 'react'; export default function Component() { const [data, setData] = useState(null); return <div>{data}</div>; }",
];

export const textSources: TextSource[] = [
  {
    id: 'easy',
    name: 'Easy Mode',
    description: 'Simple sentences with common words',
    difficulty: 'easy',
    getText: async () => {
      return easyTexts[Math.floor(Math.random() * easyTexts.length)];
    }
  },
  {
    id: 'medium',
    name: 'Medium Mode',
    description: 'Longer passages with varied vocabulary',
    difficulty: 'medium',
    getText: async () => {
      return mediumTexts[Math.floor(Math.random() * mediumTexts.length)];
    }
  },
  {
    id: 'programming',
    name: 'Code Mode',
    description: 'Practice typing code snippets',
    difficulty: 'hard',
    getText: async () => {
      return programmingTexts[Math.floor(Math.random() * programmingTexts.length)];
    }
  },
  {
    id: 'api',
    name: 'Random Text',
    description: 'Fetch random paragraphs from API',
    difficulty: 'medium',
    getText: async () => {
      const { getParagraph } = await import('./apiClients');
      const result = await getParagraph();
      return result.text;
    }
  }
];