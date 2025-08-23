import { Flag } from 'lucide-react'
import React from 'react'

interface QuestionsNavigatorGridProps {
    answers: { [key: number]: string };
    totalQuestions: number;
    getQuestionStatus: (questionNum: number) => string;
    currentQuestion: number;
    setShowMobileNav: (show: boolean) => void;
    navigatorColors: {
        primary: string;
        primaryLight: string;
        primaryHover: string;
        answeredBg: string;
        answeredBorder: string;
        answeredText: string;
        answeredHover: string;
    };
    reviewMode?: boolean;
    isMobile?: boolean;
    isSmallMobile?: boolean;
    setCurrentQuestion: (questionNum: number) => void;
}

export const QuestionsNavigatorGrid = ({
    answers,
    totalQuestions,
    getQuestionStatus,
    currentQuestion,
    setShowMobileNav,
    navigatorColors,
    reviewMode = false,
    isMobile = false,
    isSmallMobile = false,
    setCurrentQuestion,
}: QuestionsNavigatorGridProps) => {

    const handleQuestionClick = (questionNum: number) => {
        const questionElement = document.getElementById(`question-${questionNum}`);
        if (questionElement) {
            questionElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile nav when scrolling to a question
        if (isMobile) {
            setShowMobileNav(false);
        }

        setCurrentQuestion(questionNum)
    };

    return (
        <div className={`${isMobile ? 'flex-1 p-4 max-w-80 m-auto' : 'flex-1 p-6'} ${isSmallMobile ? 'p-2' : ''}`}>
            {/* Mobile Header */}
            {isMobile && (
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                    <h3 className={`font-semibold text-gray-900 flex items-center gap-2 ${isSmallMobile ? 'text-sm' : ''}`}>
                        <Flag className={`${isSmallMobile ? 'w-3 h-3' : 'w-4 h-4'} ${navigatorColors.primary.startsWith('[') ? `text-${navigatorColors.primary}` : `text-${navigatorColors.primary}-600`}`} />
                        Въпроси
                    </h3>
                </div>
            )}

            {/* Desktop Header */}
            {!isMobile && (
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Flag className={`w-4 h-4 ${navigatorColors.primary.startsWith('[') ? `text-${navigatorColors.primary}` : `text-${navigatorColors.primary}-600`}`} />
                        Въпроси
                    </h3>
                    <p className="text-sm text-gray-600">
                        {Object.keys(answers).length} от {totalQuestions} отговорени
                    </p>
                </div>
            )}

            {/* Mobile Progress */}
            {isMobile && (
                <div className="mb-4">
                    <p className={`text-gray-600 mb-2 ${isSmallMobile ? 'text-xs' : 'text-sm'}`}>
                        {Object.keys(answers).length} от {totalQuestions} отговорени
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(Object.keys(answers).length / totalQuestions) * 100}%` }}
                        />
                    </div>
                </div>
            )}

            <div className={`grid gap-2 mb-6 m-auto ${isSmallMobile ? 'grid-cols-5 gap-0.5 w-fit' : isMobile ? 'grid-cols-5 gap-0.5' : 'grid-cols-5 gap-0.5'}`}>
                {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((questionNum) => {
                    const status = getQuestionStatus(questionNum)
                    const isCurrent = !reviewMode && currentQuestion === questionNum
                    return (
                        <button
                            key={questionNum}
                            onClick={() => handleQuestionClick(questionNum)}
                            className={`${isSmallMobile ? 'w-12 h-12 text-xs' : isMobile ? 'w-12 h-12 text-xs' : 'w-12 h-12 text-sm'} rounded-lg font-semibold transition-all duration-200 border-2 ${isCurrent
                                ? `border-${navigatorColors.primary} bg-${navigatorColors.primary} text-white shadow-md`
                                : status === "correct"
                                    ? `border-green-500 bg-green-100 text-green-800 hover:bg-green-200`
                                    : status === "incorrect"
                                        ? `border-red-500 bg-red-100 text-red-800 hover:bg-red-200`
                                        : status === "answered"
                                            ? `border-${navigatorColors.answeredBorder} bg-${navigatorColors.answeredBg} text-${navigatorColors.answeredText} hover:bg-${navigatorColors.answeredHover}`
                                            : `border-gray-200 bg-gray-50 text-gray-600 hover:border-${navigatorColors.primaryHover} hover:bg-${navigatorColors.primaryLight}`
                                }`}
                            aria-label={`Go to question ${questionNum}`}
                        >
                            {questionNum}
                        </button>
                    )
                })}
            </div>

            {/* Legend */}
            <div className={`space-y-3 text-sm mb-6 ${isSmallMobile ? 'text-xs space-y-2' : isMobile ? 'text-xs' : ''}`}>
                {!reviewMode && (
                    <div className="flex items-center gap-3">
                        <div className={`${isSmallMobile ? 'w-3 h-3' : 'w-4 h-4'} rounded bg-${navigatorColors.primary}`}></div>
                        <span className="text-gray-600">Текущ въпрос</span>
                    </div>
                )}
                {!reviewMode && (
                    <div className="flex items-center gap-3">
                        <div className={`${isSmallMobile ? 'w-3 h-3' : 'w-4 h-4'} rounded bg-${navigatorColors.answeredBg} border-2 border-${navigatorColors.answeredBorder} text-${navigatorColors.answeredText}`}></div>
                        <span className="text-gray-600">Отговорен</span>
                    </div>
                )}
                {reviewMode && (
                    <div className="flex items-center gap-3">
                        <div className={`${isSmallMobile ? 'w-3 h-3' : 'w-4 h-4'} rounded bg-green-100 border-2 border-green-500`}></div>
                        <span className="text-gray-600">Правилен въпрос</span>
                    </div>
                )}
                {reviewMode && (
                    <div className="flex items-center gap-3">
                        <div className={`${isSmallMobile ? 'w-3 h-3' : 'w-4 h-4'} rounded bg-red-100 border-2 border-red-500`}></div>
                        <span className="text-gray-600">Грешен въпрос</span>
                    </div>
                )}
                {!reviewMode && (
                    <div className="flex items-center gap-3">
                        <div className={`${isSmallMobile ? 'w-3 h-3' : 'w-4 h-4'} rounded bg-gray-50 border-2 border-gray-200`}></div>
                        <span className="text-gray-600">Неотговорен</span>
                    </div>
                )}
            </div>

        </div >
    )
}
