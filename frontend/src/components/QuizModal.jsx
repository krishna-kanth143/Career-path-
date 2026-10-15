import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaArrowRight, FaTrophy } from 'react-icons/fa';

const QuizModal = ({ skill, onClose, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    // Mock Questions - In a real app, these would come from the backend linked to the skill
    const questions = [
        {
            q: `What is a primary concept of ${skill.name}?`,
            options: ["Scalability", "Syntax sugar", "Documentation", "Version control"],
            correct: 0
        },
        {
            q: `Which tool is most commonly used with ${skill.name}?`,
            options: ["Browser", "Compiler", "IDE", "All of the above"],
            correct: 3
        },
        {
            q: `Is ${skill.name} used for professional software development?`,
            options: ["Yes", "No", "Only for hobbies", "Never"],
            correct: 0
        }
    ];

    const handleAnswer = (index) => {
        setSelectedAnswer(index);
        if (index === questions[currentStep].correct) {
            setScore(prev => prev + 1);
        }
    };

    const nextQuestion = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
            setSelectedAnswer(null);
        } else {
            setShowResults(true);
        }
    };

    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#282828] border border-[#3e3e3e] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
                {!showResults ? (
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-xl font-bold text-[#eff2f6] mb-1">{skill.name} Assessment</h2>
                                <p className="text-xs text-gray-400">Step {currentStep + 1} of {questions.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                                {currentStep + 1}
                            </div>
                        </div>

                        <div className="mb-8">
                            <p className="text-lg text-[#eff2f6] leading-relaxed font-medium">
                                {questions[currentStep].q}
                            </p>
                        </div>

                        <div className="space-y-3 mb-10">
                            {questions[currentStep].options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 font-medium ${selectedAnswer === idx
                                            ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(255,161,22,0.1)]'
                                            : 'bg-[#1a1a1a] border-[#3e3e3e] text-gray-400 hover:border-gray-500'
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center mr-3 text-xs">
                                            {String.fromCharCode(65 + idx)}
                                        </span>
                                        {option}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={selectedAnswer === null}
                            onClick={nextQuestion}
                            className="w-full bg-primary text-black py-4 rounded-xl font-bold hover:bg-opacity-90 disabled:opacity-50 transition-all flex items-center justify-center"
                        >
                            {currentStep < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                            <FaArrowRight className="ml-2" />
                        </button>
                    </div>
                ) : (
                    <div className="p-10 text-center">
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg border-4 ${passed ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                            }`}>
                            {passed ? <FaTrophy /> : <FaTimesCircle />}
                        </div>

                        <h2 className="text-3xl font-bold text-[#eff2f6] mb-2">
                            {passed ? 'Skill Authenticated!' : 'Keep Practicing'}
                        </h2>
                        <p className="text-gray-400 mb-8 italic">
                            {passed
                                ? "You've successfully validated your knowledge. Great job!"
                                : "You didn't pass this time. Review the material and try again."}
                        </p>

                        <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#3e3e3e] mb-10">
                            <div className="text-4xl font-black text-primary mb-1">{percentage}%</div>
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Your Score</div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={onClose}
                                className="flex-1 bg-[#3e3e3e] text-[#eff2f6] py-4 rounded-xl font-bold hover:bg-[#4e4e4e] transition-all"
                            >
                                {passed ? 'Close' : 'Try Again Later'}
                            </button>
                            {passed && (
                                <button
                                    onClick={() => onComplete(percentage)}
                                    className="flex-1 bg-primary text-black py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg"
                                >
                                    Save Result
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizModal;
