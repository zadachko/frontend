'use client';
import { useState, useRef } from 'react';
import Question from '@/features/question/components/Question';
import { useIsMobile, useIsSmallMobile } from '@/hooks/isMobile';
import AssessmentSubmitDialog from './AssessmentSubmitDialog';
import AssessmentMobileHeader from '../../shared/components/AssessmentMobileHeader';
import AssessmentSidebar from './AssessmentSidebar';
import type { Question as QuestionType } from '@/types';
import handleSidebarScroll from '../../shared/utils/handleSidebarScroll';
import { getQuestionStatus } from '@/features/assessments/live/utils/getQuestionStatus';

export interface AssessmentLiveProps {
    questions: QuestionType[];
    title: string;
    subtitle: string;
    overviewRedirectUrl: string;
    colors: {
        timer: {
            gradientFrom: string;
            gradientTo: string;
            subTextClass: string;
        };
        button: {
            gradientFrom: string;
            gradientTo: string;
        };
        navigator: {
            primary: string;
            primaryLight: string;
            primaryHover: string;
            answeredBg: string;
            answeredBorder: string;
            answeredText: string;
            answeredHover: string;
        };
        assessmentMobileHeader: {
            clockColor: string;
            buttonGradient: {
                from: string;
                to: string;
                hoverFrom: string;
                hoverTo: string;
            };
        };
        submitDialog: {
            primary: string;
            primaryHover: string;
        };
    };
    loading?: boolean;
    error?: Error | null;
    LoadingComponent?: React.ComponentType<{ text: string }>;
    ErrorComponent?: React.ComponentType<{ error: Error }>;
}

const AssessmentLive = ({
    questions,
    title,
    subtitle,
    overviewRedirectUrl,
    colors,
    loading = false,
    error = null,
    LoadingComponent,
    ErrorComponent,
}: AssessmentLiveProps) => {
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [showSubmitDialog, setShowSubmitDialog] = useState(false);
    const [showMobileNav, setShowMobileNav] = useState(false);
    const isMobile = useIsMobile();
    const isSmallMobile = useIsSmallMobile();

    // Add ref for main content container
    const mainContentRef = useRef<HTMLDivElement>(null!);

    const totalQuestions = questions.length;
    const questionsAnswered = Object.keys(answers).length;

    // Handle loading state
    if (loading && LoadingComponent) {
        return <LoadingComponent text="Зареждане на въпросите..." />;
    }

    // Handle error state
    if (error && ErrorComponent) {
        return <ErrorComponent error={error} />;
    }

    // Handle empty questions
    if (!questions.length) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center w-screen">
                <div className="text-center">
                    <p className="text-gray-600">Няма налични въпроси</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 mx-auto">
            {/* Mobile Header - Outside scrollable container */}
            {isMobile && (
                <AssessmentMobileHeader
                    assessmentModeType="live"
                    showMobileNav={showMobileNav}
                    setShowMobileNav={setShowMobileNav}
                    setShowSubmitDialog={setShowSubmitDialog}
                    clockColor={colors.assessmentMobileHeader.clockColor}
                    submitBtnClasses={{
                        base: `bg-gradient-to-r from-${colors.assessmentMobileHeader.buttonGradient.from} to-${colors.assessmentMobileHeader.buttonGradient.to} text-white`,
                        hover: `hover:from-${colors.assessmentMobileHeader.buttonGradient.hoverFrom} hover:to-${colors.assessmentMobileHeader.buttonGradient.hoverTo}`,
                    }}
                />

            )}

            <div
                className={`${isMobile ? 'flex flex-col' : 'flex'} ${isMobile ? 'h-[calc(100vh-64px)] -mt-[7px]' : 'h-screen'}`}
            >
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

                        {/* Questions List */}
                        <div className="space-y-6">
                            {questions.map((question) => (
                                <div key={question.position} id={`question-${question.position}`}>
                                    <Question
                                        question={question}
                                        answers={answers}
                                        setAnswers={setAnswers}
                                        isReviewMode={false}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Navigation */}
                <AssessmentSidebar
                    isMobile={isMobile}
                    isSmallMobile={isSmallMobile}
                    showMobileNav={showMobileNav}
                    handleSidebarScroll={(event) => handleSidebarScroll(event, mainContentRef)}
                    answers={answers}
                    totalQuestions={totalQuestions}
                    getQuestionStatus={(questionId) => getQuestionStatus(answers, questionId)}
                    currentQuestion={currentQuestion}
                    setShowMobileNav={setShowMobileNav}
                    setShowSubmitDialog={setShowSubmitDialog}
                    colors={colors}
                    setCurrentQuestion={setCurrentQuestion}
                />
            </div>

            {/* Submit Confirmation Dialog */}
            <AssessmentSubmitDialog
                showSubmitDialog={showSubmitDialog}
                setShowSubmitDialog={setShowSubmitDialog}
                questionsAnswered={questionsAnswered}
                totalQuestions={totalQuestions}
                overviewRedirectUrl={overviewRedirectUrl}
                colors={{
                    primary: colors.submitDialog.primary,
                    primaryHover: colors.submitDialog.primaryHover,
                }}
                isMobile={isMobile}
                isSmallMobile={isSmallMobile}
            />
        </div>
    );
};

export default AssessmentLive;
