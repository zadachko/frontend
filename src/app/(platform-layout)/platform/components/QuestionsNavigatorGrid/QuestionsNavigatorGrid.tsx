import { Flag } from 'lucide-react'
import React from 'react'

interface QuestionsNavigatorGridProps {
    answers: { [key: number]: string };
    totalQuestions: number;
    getQuestionStatus: (questionNum: number) => string;
    currentQuestion: number;
    goToQuestion: (questionNum: number) => void;
    colors: {
        primary: string;
        primaryLight: string;
        primaryHover: string;
        answeredBg: string;
        answeredBorder: string;
        answeredText: string;
        answeredHover: string;
    };
}

export const QuestionsNavigatorGrid = ({
    answers,
    totalQuestions,
    getQuestionStatus,
    currentQuestion,
    goToQuestion,
    colors
}: QuestionsNavigatorGridProps) => {
    return (
        <div className="flex-1 p-6">
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Flag className={`w-4 h-4 ${colors.primary.startsWith('[') ? `text-${colors.primary}` : `text-${colors.primary}-600`}`} />
                    Въпроси
                </h3>
                <p className="text-sm text-gray-600">
                    {Object.keys(answers).length} от {totalQuestions} отговорени
                </p>
            </div>

            <div className="grid grid-cols-5 gap-2 mb-6">
                {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((questionNum) => {
                    const status = getQuestionStatus(questionNum)
                    const isCurrent = currentQuestion === questionNum
                    return (
                        <button
                            key={questionNum}
                            onClick={() => goToQuestion(questionNum)}
                            className={`w-12 h-12 rounded-lg text-sm font-semibold transition-all duration-200 border-2 ${isCurrent
                                ? `border-${colors.primary} bg-${colors.primary} text-white shadow-md`
                                : status === "answered"
                                    ? `border-${colors.answeredBorder} bg-${colors.answeredBg} text-${colors.answeredText} hover:bg-${colors.answeredHover}`
                                    : `border-gray-200 bg-gray-50 text-gray-600 hover:border-${colors.primaryHover} hover:bg-${colors.primaryLight}`
                                }`}
                            aria-label={`Go to question ${questionNum}`}
                        >
                            {questionNum}
                        </button>
                    )
                })}
            </div>

            {/* Legend */}
            <div className="space-y-3 text-sm mb-6">
                <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded bg-${colors.primary}`}></div>
                    <span className="text-gray-600">Текущ въпрос</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded bg-${colors.answeredBg} border-2 border-${colors.answeredBorder}`}></div>
                    <span className="text-gray-600">Отговорен</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded bg-gray-50 border-2 border-gray-200"></div>
                    <span className="text-gray-600">Неотговорен</span>
                </div>
            </div>

        </div>
    )
}
