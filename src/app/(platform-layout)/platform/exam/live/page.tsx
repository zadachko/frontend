'use client';

import { useState, useRef } from "react";
import Question from "@/app/(platform-layout)/platform/components/Question/Question";
import { useIsMobile, useIsSmallMobile } from "@/hooks/isMobile";
import type { Question as QuestionType } from "@/types"
import AssessmentSubmitDialog from "../../components/AssessmentPage/AssessmentSubmitDialog";
import { AssessmentMobileHeader } from "../../components/AssessmentPage/AssessmentMobileHeader";
import AssessmentSidebar from "../../components/AssessmentPage/AssessmentSidebar";
import { useGetExamLiveQuery } from "@/gql/operations";
import handleSidebarScroll from "../../components/AssessmentPage/utils/handleSidebarScroll";
import { getQuestionStatusLive } from "../../components/AssessmentPage/utils/getQuestionStatus";
import { colors } from "../colors.config";
import AssessmentLoading from "../../components/LoadingScreens/AssessmentLoading";
import AssessmentError from "../../components/ErrorScreens/AssessmentError";
const LiveExamPage = () => {

    const { data, loading, error } = useGetExamLiveQuery({
        variables: { examId: '7cc7462e-f307-4f0a-b418-fcfecd5dacfb' },
    });

    // console.log(data?.getExam?.examQuestions);

    const questions: QuestionType[] = data?.getExam?.examQuestions?.map((examQuestion, index: number) => ({
        position: index + 1,
        statement: examQuestion.question.statement,
        type: examQuestion.question.type === 'MULTIPLE' ? 'multiple' : 'text',
        options: examQuestion.question.options || [],
        points: examQuestion.question.points || 1,
    })) || [];

    const [answers, setAnswers] = useState<{ [key: number]: string }>({})
    const [currentQuestion, setCurrentQuestion] = useState(1)
    const [showSubmitDialog, setShowSubmitDialog] = useState(false)
    const [showMobileNav, setShowMobileNav] = useState(false)
    const isMobile = useIsMobile()
    const isSmallMobile = useIsSmallMobile()

    // Add ref for main content container
    const mainContentRef = useRef<HTMLDivElement>(null!)


    const totalQuestions = questions.length;


    const questionsAnswered = Object.keys(answers).length

    // Handle loading state
    if (loading) {
        return <AssessmentLoading text="Зареждане на въпросите..." />;
    }

    // Handle error state
    if (error) {
        return <AssessmentError error={error} />;
    }

    // Handle empty questions
    if (!questions.length) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center w-screen">
                <div className="text-center">
                    <p className="text-gray-600">Няма налични въпроси за този изпит</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 mx-auto">
            {/* Mobile Header - Outside scrollable container */}

            {isMobile &&
                <AssessmentMobileHeader
                    showMobileNav={showMobileNav}
                    setShowMobileNav={setShowMobileNav}
                    setShowSubmitDialog={setShowSubmitDialog}
                    clockColor={colors.assessmentMobileHeader.clockColor}
                    buttonGradient={{
                        from: colors.assessmentMobileHeader.buttonGradient.from,
                        to: colors.assessmentMobileHeader.buttonGradient.to,
                        hoverFrom: colors.assessmentMobileHeader.buttonGradient.hoverFrom,
                        hoverTo: colors.assessmentMobileHeader.buttonGradient.hoverTo,
                    }}
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
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">Изпит</h1>
                                <p className="text-gray-600">Отговорете на всички въпроси в рамките на 90 минути</p>
                            </div>
                        )}

                        {/* Questions List */}
                        <div className="space-y-6">
                            {questions.map((question) => (
                                <div key={question.position} id={`question-${question.position}`}>
                                    <Question question={question} answers={answers} setAnswers={setAnswers} isReviewMode={false} />
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
                    getQuestionStatus={(questionId) => getQuestionStatusLive(answers, questionId)}
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
                overviewRedirectUrl="/platform/exam/overview"
                colors={{
                    primary: "emerald-600",
                    primaryHover: "emerald-700"
                }}
                isMobile={isMobile}
                isSmallMobile={isSmallMobile}
            />

        </div >
    )
}

export default LiveExamPage;