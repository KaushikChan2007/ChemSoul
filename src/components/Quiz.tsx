import React, { useState } from 'react';
import { Question } from '../types';
import { Check, X, RotateCcw, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

interface QuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleNext = () => {
    let newScore = score;
    if (selectedOption === currentQuestion.correctIndex) {
      newScore += 1;
      setScore(newScore);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      onComplete(newScore);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    const passed = score >= questions.length / 2;
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 text-center bg-white"
      >
        <div className={`w-16 h-16 rounded-full border-2 border-black flex items-center justify-center mx-auto mb-4 ${passed ? 'bg-[#c9f2c9]' : 'bg-[#ffd3d6]'} shadow-[2.5px_2.5px_0px_#1a1a1a]`}>
          <Trophy className="w-8 h-8 text-black" />
        </div>
        <h2 className="text-3xl font-display font-bold mb-2 text-black uppercase tracking-wider">Quiz Complete</h2>
        <p className="text-text-secondary font-bold text-lg mb-6">
          You scored <span className="text-black underline decoration-[#ffb703] decoration-4 font-extrabold">{score}</span> out of {questions.length}
        </p>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={resetQuiz}
            className="gold-btn flex items-center gap-2 px-6 py-2.5 rounded-xl border-2 border-black text-black font-bold"
          >
            <RotateCcw size={18} /> TRY AGAIN
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Progress Bar */}
      <div className="flex justify-between items-center gap-4">
        <span className="text-xs uppercase tracking-widest text-[#d48c00] font-bold">
          Q. {currentIndex + 1} of {questions.length}
        </span>
        <div className="h-4 w-32 bg-white border-2 border-black rounded-full overflow-hidden p-0.5 shadow-[1.5px_1.5px_0px_#1a1a1a] flex-shrink-0">
          <div 
            className="h-full bg-[#ffb703] rounded-full transition-all duration-500" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-xl font-bold font-display text-black leading-snug">{currentQuestion.text}</h3>

      {/* Option Cards */}
      <div className="grid gap-3">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = isAnswered && idx === currentQuestion.correctIndex;
          const isWrong = isAnswered && isSelected && idx !== currentQuestion.correctIndex;

          let btnBg = 'bg-white hover:bg-slate-50';
          let btnBorder = 'border-black';
          let shadow = 'shadow-[2.5px_2.5px_0px_#1a1a1a]';
          let textStyle = 'text-black font-semibold';

          if (isCorrect) {
            btnBg = 'bg-[#c9f2c9]';
            textStyle = 'text-black font-bold';
          } else if (isWrong) {
            btnBg = 'bg-[#ffd3d6]';
            textStyle = 'text-black font-bold';
          } else if (isSelected) {
            btnBg = 'bg-[#fff0a2]';
            textStyle = 'text-black font-bold';
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionSelect(idx)}
              disabled={isAnswered}
              className={`
                w-full p-4 text-left rounded-xl border-2 transition-all duration-150 flex items-center justify-between cursor-pointer
                ${btnBg} ${btnBorder} ${shadow}
                active:translate-y-0.5 active:shadow-[1px_1px_0px_#1a1a1a]
                disabled:cursor-default disabled:active:translate-y-0 disabled:active:shadow-[2.5px_2.5px_0px_#1a1a1a]
              `}
            >
              <span className={textStyle}>{option}</span>
              <div className="shrink-0 pl-3">
                {isCorrect && (
                  <div className="w-7 h-7 rounded-full border-2 border-black bg-white flex items-center justify-center shadow-[1px_1px_0px_#1a1a1a]">
                    <Check className="text-emerald-600 stroke-[3px]" size={16} />
                  </div>
                )}
                {isWrong && (
                  <div className="w-7 h-7 rounded-full border-2 border-black bg-white flex items-center justify-center shadow-[1px_1px_0px_#1a1a1a]">
                    <X className="text-red-500 stroke-[3px]" size={16} />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => {
          if (!isAnswered) setIsAnswered(true);
          else handleNext();
        }}
        disabled={selectedOption === null}
        className={`
          w-full py-3.5 border-2 border-black rounded-xl font-bold transition-all text-sm uppercase tracking-wider
          ${selectedOption === null 
            ? 'bg-slate-100 text-slate-400 border-slate-300 cursor-not-allowed shadow-none' 
            : 'bg-[#ffb703] text-black shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a1a1a] active:translate-y-0.5 active:shadow-[1px_1px_0px_#1a1a1a] cursor-pointer'
          }
        `}
      >
        {isAnswered ? (currentIndex === questions.length - 1 ? 'Finish' : 'Next Question') : 'Check Answer'}
      </button>
    </div>
  );
};
