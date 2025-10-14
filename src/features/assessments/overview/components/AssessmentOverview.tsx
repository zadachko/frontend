'use client';
import { useState, useRef } from "react";
import { LucideIcon } from "lucide-react";
import Question from "@/features/question/components/Question";
import { QuestionsNavigatorGrid } from "@/features/assessments/shared/components/QuestionsNavigatorGrid";
import { useIsMobile, useIsSmallMobile } from "@/hooks/isMobile";
import AssessmentOverviewSidebar from "./AssessmentOverviewSidebar";
import AssessmentOverviewMobileHeader from "./AssessmentOverviewMobileHeader";
import type { Question as QuestionType } from "@/types";
import handleSidebarScroll from "../../shared/utils/handleSidebarScroll";
// import { getQuestionStatusOverview } from "./utils/getQuestionStatus";
import { getQuestionStatus } from "@/features/assessments/overview/utils/getQuestionStatus";

export interface AssessmentResults {
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    score: number;
    timeSpent: string;
    testDate?: string;
    examDate?: string;
}

export interface AssessmentOverviewProps {
    questions: QuestionType[];
    results: AssessmentResults;
    title: string;
    subtitle: string;
    Icon: LucideIcon;
    iconColor: string;
    badge: {
        icon: React.ReactNode;
        label: string;
        bgColor: string;
        textColor: string;
    };
    timeColor: string;
    timeTextColor: string;
    navigatorColors: {
        primary: string;
        primaryLight: string;
        primaryHover: string;
        answeredBg: string;
        answeredBorder: string;
        answeredText: string;
        answeredHover: string;
    };
    loading?: boolean;
}

const AssessmentOverview = ({
    questions,
    results,
    title,
    subtitle,
    Icon,
    iconColor,
    badge,
    timeColor,
    timeTextColor,
    navigatorColors,
}: AssessmentOverviewProps) => {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [showMobileNav, setShowMobileNav] = useState(false);
    const isMobile = useIsMobile();
    const isSmallMobile = useIsSmallMobile();

    // Add ref for main content container
    const mainContentRef = useRef<HTMLDivElement>(null!);

    // Convert questions to the format expected by the Question component
    const questionsForDisplay = questions.map(q => ({
        position: q.position,
        statement: q.statement,
        type: q.type,
        options: q.options,
        diagramData: q.diagramData,
        diagramSteps: q.diagramSteps,
    }));

    // Create answers object for the Question component
    const answers = questions.reduce((acc, q) => {
        if (q.userAnswer) {
            acc[q.position] = q.userAnswer;
        }
        return acc;
    }, {} as { [key: number]: string });

    // Handle empty questions
    if (!questions.length) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center w-screen">
                <div className="text-center">
                    <p className="text-gray-600">Няма налични резултати</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 mx-auto">

            {isMobile &&
                <AssessmentOverviewMobileHeader
                    showMobileNav={showMobileNav}
                    setShowMobileNav={setShowMobileNav}
                    Icon={Icon}
                    iconColor={iconColor}
                    correctAnswers={results.correctAnswers}
                    totalQuestions={results.totalQuestions}
                />
            }

            <div className={`${isMobile ? 'flex flex-col' : 'flex'} ${isMobile ? 'h-[calc(100vh-64px)] -mt-[7px]' : 'h-screen'}`}>
                {/* Left Column - Questions */}
                <div
                    ref={mainContentRef}
                    className={`${isMobile ? 'flex-1 overflow-y-auto' : 'flex-1 overflow-y-auto'}`}
                >
                    <div className={`${isMobile ? 'p-4' : 'p-6 max-w-4xl mx-auto'} ${isSmallMobile ? 'px-2' : ''}`}>
                        {/* Header - Desktop only */}
                        {!isMobile && (
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
                                <p className="text-gray-600">{subtitle}</p>
                            </div>
                        )}

                        {/* Questions Review */}
                        <div className="space-y-8">
                            {questions.map((question) => (
                                <div key={question.position} id={`question-${question.position}`}>
                                    <Question
                                        question={questionsForDisplay.find(q => q.position === question.position)!}
                                        answers={answers}
                                        isReviewMode={true}
                                        correctAnswer={question.correctAnswer}
                                        userAnswer={question.userAnswer}
                                        solution={(question as QuestionType).solutionSteps}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Navigation */}
                <div
                    className={`${isMobile
                        ? `w-full fixed -mt-[7px] top-16 right-0 z-40 ${isSmallMobile ? 'w-full' : 'w-80'} bg-white border-l border-gray-200 transform transition-transform duration-300 ease-in-out ${showMobileNav ? 'translate-x-0' : 'translate-x-full'} flex flex-col h-[calc(100vh-64px)]`
                        : 'w-80 bg-white border-l border-gray-200 flex flex-col h-100vh'
                        }`}
                    onWheel={(event) => handleSidebarScroll(event, mainContentRef)}
                >
                    {/* Overview Data */}
                    <AssessmentOverviewSidebar
                        title={title}
                        badge={badge}
                        results={{
                            date: results.testDate || results.examDate || '',
                            timeSpent: results.timeSpent,
                            correctAnswers: results.correctAnswers,
                            totalQuestions: results.totalQuestions,
                            score: results.score,
                        }}
                        timeColor={timeColor}
                        timeTextColor={timeTextColor}
                    />

                    {/* Questions Navigator Grid - Centered */}
                    <div className={`${isMobile ? 'flex-1 overflow-y-auto' : 'flex-1'} flex items-start justify-center`}>
                        <QuestionsNavigatorGrid
                            answers={answers}
                            totalQuestions={questions.length}
                            getQuestionStatus={(questionNum) => getQuestionStatus(questions, questionNum)}
                            currentQuestion={currentQuestion}
                            setShowMobileNav={setShowMobileNav}
                            navigatorColors={navigatorColors}
                            reviewMode={true}
                            isMobile={isMobile}
                            isSmallMobile={isSmallMobile}
                            setCurrentQuestion={setCurrentQuestion}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssessmentOverview;
