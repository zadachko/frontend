// components/AssessmentSidebar.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuestionsNavigatorGrid } from '../../shared/components/QuestionsNavigatorGrid';
import { Clock } from '../../shared/components/Clock';
import { Calendar, Clock as ClockIcon, CheckCircle } from 'lucide-react';
import React from 'react';
import { colors as colorsConfig } from '../../../../app/(platform-layout)/platform/exam/colors.config';

type BaseProps = {
    // layout/behavior
    isMobile: boolean;
    isSmallMobile: boolean;
    showMobileNav: boolean;
    setShowMobileNav: (show: boolean) => void;
    handleSidebarScroll: (e: React.WheelEvent<HTMLDivElement>) => void;
    className?: string;
};

type LiveProps = BaseProps & {
    assessmentModeType: 'live';

    // navigator
    answers: Record<number, string>;
    totalQuestions: number;
    getQuestionStatus: (questionNum: number) => string;
    currentQuestion: number;

    // actions
    setShowSubmitDialog: (show: boolean) => void;
    setCurrentQuestion: (questionNum: number) => void;

    // theming
    colors: typeof colorsConfig;
};

type OverviewProps = BaseProps & {
    assessmentModeType: 'overview';

    title: string; // "Резултати от теста" / "Резултати от изпита"
    badge: {
        icon: React.ReactNode;
        label: string;
        bgColor: string;   // e.g. "bg-purple-100"
        textColor: string; // e.g. "text-purple-800"
    };
    results: {
        date: string;
        timeSpent: string;
        correctAnswers: number;
        totalQuestions: number;
        score: number; // 0..100
    };
    timeColor: string;     // e.g. "text-purple-500"
    timeTextColor: string; // e.g. "text-purple-700"
};

type AssessmentSidebarProps = LiveProps | OverviewProps;

export default function AssessmentSidebar(props: AssessmentSidebarProps) {
    const {
        isMobile,
        isSmallMobile,
        showMobileNav,
        setShowMobileNav,
        handleSidebarScroll,
        className,
    } = props;

    const wrapperClasses = isMobile
        ? `w-full fixed -mt-[7px] top-16 right-0 z-40 ${isSmallMobile ? 'w-full' : 'w-80'
        } bg-white border-l border-gray-200 transform transition-transform duration-300 ease-in-out ${showMobileNav ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col h-[calc(100vh-64px)]`
        : 'w-80 bg-white border-l border-gray-200 flex flex-col h-100vh';

    // LIVE MODE RENDER
    if (props.assessmentModeType === 'live') {
        const {
            answers,
            totalQuestions,
            getQuestionStatus,
            currentQuestion,
            setShowSubmitDialog,
            setCurrentQuestion,
            colors,
        } = props;

        const handleSubmitExam = () => setShowSubmitDialog(true);

        return (
            <div className={`${wrapperClasses} ${className ?? ''}`} onWheel={handleSidebarScroll}>
                {/* Timer - Desktop only */}
                {!isMobile && (
                    <div className="p-6 border-b border-gray-200">
                        <Card className={`bg-gradient-to-r ${colors.timer.gradientFrom} ${colors.timer.gradientTo} border-0 shadow-md`}>
                            <CardContent className="p-0 text-center">
                                <div className="flex items-center justify-center gap-2 text-white">
                                    <Clock mobile={isMobile} />
                                </div>
                                <p className={`${colors.timer.subTextClass} text-sm mt-1`}>Оставащо време</p>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Question Navigator */}
                <div className={isMobile ? 'flex-1 overflow-y-auto' : 'flex-1'}>
                    <QuestionsNavigatorGrid
                        answers={answers}
                        totalQuestions={totalQuestions}
                        getQuestionStatus={getQuestionStatus}
                        currentQuestion={currentQuestion}
                        setShowMobileNav={setShowMobileNav}
                        navigatorColors={colors.navigator}
                        isMobile={isMobile}
                        isSmallMobile={isSmallMobile}
                        setCurrentQuestion={setCurrentQuestion}
                    />
                </div>

                {/* Submit Button - Desktop only */}
                {!isMobile && (
                    <div className="p-6 border-t border-gray-200">
                        <Button
                            className={`w-full bg-gradient-to-br ${colors.button.gradientFrom} ${colors.button.gradientTo} text-white font-semibold text-lg py-3 h-12`}
                            onClick={handleSubmitExam}
                        >
                            Изпрати
                        </Button>
                    </div>
                )}
            </div>
        );
    }

    // OVERVIEW MODE RENDER
    const { title, badge, results, timeColor, timeTextColor } = props;

    const numericToDasharray = (score: number) =>
        `${Math.min(Math.max(score, 0), 100)}, 100`;

    const grade = (2 + (results.score / 100) * 4).toFixed(2); // 2.00 .. 6.00

    const progressColor =
        results.score >= 80 ? '#10b981' : results.score >= 60 ? '#f59e0b' : '#ef4444';

    return (
        <div className={`${wrapperClasses} ${className ?? ''}`} onWheel={handleSidebarScroll}>
            <Card className="m-4 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-4 pt-4">
                    {/* Title */}
                    <div className="flex justify-center mb-4">
                        <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
                    </div>

                    <div className="flex items-center justify-between">
                        {/* Left Info */}
                        <div className="flex-1 min-w-0 pr-4">
                            <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${badge.bgColor} ${badge.textColor} mb-3`}
                            >
                                {badge.icon}
                                {badge.label}
                            </span>

                            <div className="flex flex-col gap-2 text-xs text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3 text-gray-500" />
                                    <span>{results.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <ClockIcon className={`w-3 h-3 ${timeColor}`} />
                                    <span className={`${timeTextColor}`}>{results.timeSpent}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                    <span className="text-green-700 font-medium">
                                        {results.correctAnswers}/{results.totalQuestions}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Circular Progress */}
                        <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
                            <svg className="w-16 h-16" viewBox="0 0 36 36" aria-label="Score progress">
                                <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#e5e7eb"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke={progressColor}
                                    strokeWidth="2"
                                    strokeDasharray={numericToDasharray(results.score)}
                                    strokeLinecap="round"
                                    className="transition-all duration-500 origin-center"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-sm font-semibold text-gray-900">{grade}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
