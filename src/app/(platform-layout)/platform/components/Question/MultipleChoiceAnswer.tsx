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
}

const MultipleChoiceAnswer = ({ question, answers, handleAnswerChange }: MultipleChoiceAnswerProps) => {
    const optionLetters = ['а', 'б', 'в', 'г', 'д', 'е'];

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