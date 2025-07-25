"use client";

import { useEffect, useState } from "react";
import TextDisplay from "./components/TextDisplay";
import TypingInput from "./components/TypingInput";
import TypingStats from "./components/TypingStats";
import ResultsModal from "./components/ResultsModal";
import TextSourceSelector from "./components/TextSourceSelector";
import ThemeToggle from "./components/ThemeToggle";
import { textSources } from "./lib/textSources";

export default function Home() {
  const [text, setText] = useState<string>(
    "The quick brown fox jumps over the lazy dog. This is a sample text to practice your typing skills. Keep your fingers on the home row and try to type as accurately as possible."
  );
  const [selectedSource, setSelectedSource] = useState<string>("easy");
  const [typedText, setTypedText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Stats
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [wordsTyped, setWordsTyped] = useState<number>(0);

  // Loading state
  const [loading, setLoading] = useState<boolean>(false);

  // Calculate WPM and accuracy
  useEffect(() => {
    if (started && !finished && typedText.length > 0) {
      const timeInMinutes = elapsedTime / 60;
      const wordsCount = typedText.trim().split(/\s+/).length;
      const calculatedWpm =
        timeInMinutes > 0 ? Math.round(wordsCount / timeInMinutes) : 0;
      setWpm(calculatedWpm);
      setWordsTyped(wordsCount);

      // Calculate accuracy
      let errorCount = 0;
      for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] !== text[i]) {
          errorCount++;
        }
      }
      const accuracyPercentage =
        typedText.length > 0
          ? Math.round(
              ((typedText.length - errorCount) / typedText.length) * 100
            )
          : 100;
      setAccuracy(accuracyPercentage);
    }
  }, [typedText, elapsedTime, started, finished, text]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (started && !finished) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [started, finished, startTime]);

  // Check if finished
  useEffect(() => {
    if (typedText.length === text.length && started && !finished) {
      setFinished(true);
      setShowResults(true);
    }
  }, [typedText, text, started, finished]);

  const handleInputChange = (value: string) => {
    if (!started && value.length > 0) {
      setStarted(true);
      setStartTime(Date.now());
    }

    // Only allow typing if it matches the text up to that point
    if (value.length <= text.length) {
      setTypedText(value);
      setCurrentIndex(value.length);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent backspace if it would delete a correct character
    if (e.key === "Backspace" && typedText.length > 0) {
      const lastIndex = typedText.length - 1;
      if (typedText[lastIndex] === text[lastIndex]) {
        e.preventDefault();
      }
    }
  };

  // Global keyboard shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Escape key to restart
      if (e.key === "Escape") {
        e.preventDefault();
        handleRestart();
      }
      // Ctrl/Cmd + Enter for new text
      else if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        fetchNewText();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const fetchNewText = async () => {
    setLoading(true);
    try {
      const source = textSources.find((s) => s.id === selectedSource);
      if (source) {
        const newText = await source.getText();
        setText(newText);
        resetTest();
      }
    } catch (error) {
      console.error("Failed to fetch new text:", error);
      if (selectedSource === "api") {
        alert(
          "Failed to fetch new text. Please check your NEXT_PUBLIC_RAPIDAPI_KEY in .env.local"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSourceChange = async (sourceId: string) => {
    setSelectedSource(sourceId);
    const source = textSources.find((s) => s.id === sourceId);
    if (source) {
      setLoading(true);
      try {
        const newText = await source.getText();
        setText(newText);
        resetTest();
      } catch (error) {
        console.error("Failed to fetch text:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const resetTest = () => {
    setTypedText("");
    setCurrentIndex(0);
    setStarted(false);
    setFinished(false);
    setShowResults(false);
    setStartTime(0);
    setElapsedTime(0);
    setWpm(0);
    setAccuracy(100);
    setWordsTyped(0);
  };

  const handleRestart = () => {
    resetTest();
  };

  const handleNewText = async () => {
    await fetchNewText();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="min-h-screen bg-gradient-to-br from-transparent via-blue-500/5 to-purple-500/5">
        <ThemeToggle />

        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-12 animate-slide-up">
            <h1 className="text-6xl font-bold mb-4">
              <span className="gradient-text">TypeMaster</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Elevate your typing skills with our modern practice platform
            </p>
          </header>

          <TextSourceSelector
            sources={textSources}
            selectedSource={selectedSource}
            onSourceChange={handleSourceChange}
            disabled={started || loading}
          />

          <TypingStats
            wpm={wpm}
            accuracy={accuracy}
            time={elapsedTime}
            wordsTyped={wordsTyped}
          />

          <TextDisplay
            text={text}
            typedText={typedText}
            currentIndex={currentIndex}
          />

          <TypingInput
            value={typedText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={finished || loading}
            placeholder={started ? "" : "Click here and start typing..."}
          />

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={handleRestart}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold
                hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                disabled:hover:scale-100"
              disabled={!started || loading}
            >
              Restart
            </button>
            <button
              onClick={fetchNewText}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold
                hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                disabled:hover:scale-100"
              disabled={loading}
            >
              {loading ? "Loading..." : "New Text"}
            </button>
          </div>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              <kbd className="px-2 py-1 glass rounded text-xs">Esc</kbd> Restart
              <span className="mx-2">•</span>
              <kbd className="px-2 py-1 glass rounded text-xs">
                Ctrl+Enter
              </kbd>{" "}
              New Text
            </p>
          </div>

          <ResultsModal
            isOpen={showResults}
            onClose={() => setShowResults(false)}
            wpm={wpm}
            accuracy={accuracy}
            time={elapsedTime}
            wordsTyped={wordsTyped}
            onRestart={handleRestart}
            onNewText={handleNewText}
          />
        </div>
      </div>
    </div>
  );
}
