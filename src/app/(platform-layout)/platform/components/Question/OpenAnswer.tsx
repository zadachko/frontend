import { Input } from '@/components/ui/input';
import React from 'react'


type OpenAnswerProps = {
    answers: {
        [key: number]: string;
    };
    handleAnswerChange: (questionId: number, value: string) => void;
    questionNumber: number;
    // New props for review mode
    isReviewMode?: boolean;
    correctAnswer?: string;
    userAnswer?: string;
    isMobile?: boolean;
    isSmallMobile?: boolean;
}

const OpenAnswer = ({
    answers,
    handleAnswerChange,
    questionNumber,
    isReviewMode = false,
    correctAnswer,
    userAnswer,
    isMobile = false,
    isSmallMobile = false
}: OpenAnswerProps) => {
    if (isReviewMode) {
        const isCorrect = userAnswer && userAnswer === correctAnswer;

        return (
            <div className="space-y-3">
                <div className={`p-3 rounded border ${isCorrect
                    ? 'bg-green-50 border-green-200'
                    : userAnswer && userAnswer !== correctAnswer
                        ? 'bg-red-50 border-red-200'
                        : 'bg-gray-50'
                    }`}>
                    <span className={`${isSmallMobile ? 'text-xs' : isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>Вашият отговор: </span>
                    <span className={`${isSmallMobile ? 'text-xs' : isMobile ? 'text-xs' : 'text-sm'} font-medium ${isCorrect
                        ? 'text-green-800'
                        : userAnswer && userAnswer !== correctAnswer
                            ? 'text-red-800'
                            : ''
                        }`}>
                        {userAnswer || "Без отговор"}
                    </span>
                </div>
                {/* Only show correct answer if user got it wrong */}
                {userAnswer && userAnswer !== correctAnswer && (
                    <div className="p-3 rounded border bg-green-50 border-green-200">
                        <span className={`${isSmallMobile ? 'text-xs' : isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>Правилен отговор: </span>
                        <span className={`${isSmallMobile ? 'text-xs' : isMobile ? 'text-xs' : 'text-sm'} font-medium text-green-800`}>
                            {correctAnswer}
                        </span>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={`${isMobile ? 'w-full' : 'max-w-md'}`}>
            <label className={`block ${isSmallMobile ? 'text-xs' : isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-700 mb-2`}>
                Твоят отговор:
            </label>
            <Input
                value={answers[questionNumber] || ''}
                onChange={e =>
                    handleAnswerChange(
                        questionNumber,
                        e.target.value
                    )
                }
                className={`${isSmallMobile ? 'text-xs p-2 h-8' : isMobile ? 'text-xs p-3 h-10' : 'text-sm p-4 h-8'} focus:ring-emerald-500 focus:border-emerald-500 outline-none`}
            />
        </div>
    )
}

export default OpenAnswer