'use client';

import { useState, useEffect, useRef } from "react";
import Question from "@/app/(platform-layout)/platform/components/Question/Question";
import { useRouter } from "next/navigation";
import { useIsMobile, useIsSmallMobile } from "@/hooks/isMobile";
import type { Question as QuestionType } from "@/types"
import AssessmentSubmitDialog from "../../components/AssessmentPage/AssessmentSubmitDialog";
import { AssessmentMobileHeader } from "../../components/AssessmentPage/AssessmentMobileHeader";
import AssessmentSidebar from "../../components/AssessmentPage/AssessmentSidebar";
import { useGetExamLiveQuery } from "@/gql/operations";
import handleSidebarScroll from "../../components/AssessmentPage/utils/handleSidebarScroll";
import { getQuestionStatusLive } from "../../components/AssessmentPage/utils/getQuestionStatus";
import { colors } from "./colors.config";

const LiveExamPage = () => {

    const { data, loading, error } = useGetExamLiveQuery({
        variables: { examId: '4b0c1676-a275-4ed9-9853-52a7cfcdb231' },
    });

    // console.log(data?.getExam?.examQuestions);

    const questions: QuestionType[] = data?.getExam?.examQuestions?.map((examQuestion, index: number) => ({
        id: index + 1,
        statement: examQuestion.question.statement,
        type: examQuestion.question.type === 'MULTIPLE' ? 'multiple' : 'text',
        options: examQuestion.question.options || [],
        points: examQuestion.question.points || 1,
    })) || [];

    const [timeLeft, setTimeLeft] = useState(90 * 60) // 90 minutes in seconds
    const [answers, setAnswers] = useState<{ [key: number]: string }>({})
    const [currentQuestion, setCurrentQuestion] = useState(1)
    const [showSubmitDialog, setShowSubmitDialog] = useState(false)
    const [showMobileNav, setShowMobileNav] = useState(false)
    const router = useRouter()
    const isMobile = useIsMobile()
    const isSmallMobile = useIsSmallMobile()

    // Add ref for main content container
    const mainContentRef = useRef<HTMLDivElement>(null!)


    const totalQuestions = questions.length;

    // Timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    // Format time display
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const handleAnswerChange = (questionId: number, value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: value,
        }))
    }

    const handleSubmitExam = () => {
        setShowSubmitDialog(true)
    }

    const confirmSubmit = () => {
        setShowSubmitDialog(false)
        router.push('/platform/exam/overview')
    }

    const cancelSubmit = () => {
        setShowSubmitDialog(false)
    }

    const toggleMobileNav = () => {
        setShowMobileNav(!showMobileNav)
    }

    // Add synchronized scrolling handler


    const questionsAnswered = Object.keys(answers).length

    // Handle loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center w-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Зареждане на въпросите...</p>
                </div>
            </div>
        );
    }

    // Handle error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center w-screen">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Грешка при зареждане на въпросите</p>
                    <p className="text-gray-600">{error.message}</p>
                </div>
            </div>
        );
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
                    toggleMobileNav={toggleMobileNav}
                    timeLeft={timeLeft}
                    formatTime={formatTime}
                    handleSubmitExam={handleSubmitExam}
                    clockColor="text-emerald-600"
                    buttonGradient={{
                        from: "emerald-500",
                        to: "teal-600",
                        hoverFrom: "emerald-600",
                        hoverTo: "teal-700",
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
                                <div key={question.id} id={`question-${question.id}`}>
                                    <Question question={question} answers={answers} handleAnswerChange={handleAnswerChange} isReviewMode={false} />
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
                    timeLeft={timeLeft}
                    formatTime={formatTime}
                    answers={answers}
                    totalQuestions={totalQuestions}
                    getQuestionStatus={(questionId) => getQuestionStatusLive(answers, questionId)}
                    currentQuestion={currentQuestion}
                    setShowMobileNav={setShowMobileNav}
                    handleSubmitExam={handleSubmitExam}
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
                cancelSubmit={cancelSubmit}
                confirmSubmit={confirmSubmit}
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