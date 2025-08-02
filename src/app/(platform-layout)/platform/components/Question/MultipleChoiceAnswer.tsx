import { Check } from 'lucide-react';
import React from 'react'
import { renderWithMath } from '@/app/(platform-layout)/platform/common/utilities/renderWithMath';

type MultipleChoiceAnswerProps = {
    question: {
        id: number;
        options: string[];
    };
    answers: {
        [key: number]: string;
    };
    handleAnswerChange: (questionId: number, value: string) => void;
    // New props for review mode
    isReviewMode?: boolean;
    isCorrect?: boolean;
    correctAnswer?: string;
    userAnswer?: string;
}

const MultipleChoiceAnswer = ({
    question,
    answers,
    handleAnswerChange,
    isReviewMode = false,
    isCorrect,
    correctAnswer,
    userAnswer
}: MultipleChoiceAnswerProps) => {
    const optionLetters = ['а', 'б', 'в', 'г', 'д', 'е'];

    if (isReviewMode) {
        return (
            <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700 mb-2">
                    Преглед на отговорите:
                </p>
                {question.options?.map((option: string, index: number) => {
                    const optionLetter = optionLetters[index];
                    const isCorrectAnswer = option === correctAnswer;
                    const isUserAnswer = option === userAnswer;
                    const isWrongUserAnswer = isUserAnswer && !isCorrect;

                    return (
                        <div
                            key={index}
                            className={`p-3 rounded-lg border-2 ${isCorrectAnswer
                                ? "bg-green-50 border-green-200"
                                : isWrongUserAnswer
                                    ? "bg-red-50 border-red-200"
                                    : "bg-gray-50 border-gray-200"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isCorrectAnswer
                                    ? "border-green-500 bg-green-500"
                                    : isWrongUserAnswer
                                        ? "border-red-500 bg-red-500"
                                        : "border-gray-300"
                                    }`}>
                                    {(isCorrectAnswer || isWrongUserAnswer) && (
                                        <Check className="w-4 h-4 text-white" />
                                    )}
                                </div>
                                <span className="font-medium text-gray-700">
                                    {`${optionLetter})`}
                                </span>
                                <span className="text-gray-900">
                                    {renderWithMath(option, 'text-sm')}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 mb-3">
                Изберете своя отговор:
            </label>
            {question.options?.map(
                (option: string, index: number) => {
                    const optionLetter = optionLetters[index];
                    const isSelected =
                        answers[question.id] === optionLetter;
                    return (
                        <button
                            key={index}
                            onClick={() =>
                                handleAnswerChange(
                                    question.id,
                                    optionLetter
                                )
                            }
                            className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${isSelected
                                ? 'border-emerald-500 text-emerald-900'
                                : 'border-gray-200 bg-white hover:bg-gray-100/70'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected
                                        ? 'border-emerald-500 bg-emerald-500'
                                        : 'border-gray-300'
                                        }`}
                                >
                                    {isSelected && (
                                        <Check className="w-4 h-4 text-white" />
                                    )}
                                </div>
                                <span className="font-medium text-gray-700">
                                    {`${optionLetter})`}
                                </span>
                                <span className="text-gray-900">
                                    {renderWithMath(
                                        option,
                                        'text-sm'
                                    )}
                                </span>
                            </div>
                        </button>
                    );
                }
            )}
        </div>
    )
}

export default MultipleChoiceAnswer