"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Menu, X } from "lucide-react";
import Question from "@/app/(platform-layout)/platform/components/Question/Question";
import type { DiagramData } from "geometry-diagram-renderer";
import { useRouter } from "next/navigation";
import { useIsMobile, useIsSmallMobile } from "@/hooks/isMobile";

import type { Question } from "@/types"
import { QuestionsNavigatorGrid } from "@/app/(platform-layout)/platform/components/QuestionsNavigatorGrid/QuestionsNavigatorGrid";
import AssessmentSubmitDialog from "../../components/AssessmentPage/AssessmentSubmitDialog";

const sampleTriangleData: DiagramData = {
    points: {
        A: { x: 20, y: 80 },
        B: { x: 30, y: 70 },
        C: { x: 10, y: 70 }
    },
    edges: [
        { from: 'A', to: 'B' },
        { from: 'B', to: 'C' },
        { from: 'C', to: 'A' }
    ],
    sides: [
        { from: 'A', to: 'B' },
        { from: 'B', to: 'C' },
        { from: 'C', to: 'A' }
    ],
    angles: [
        { name: 'ABC', showValue: true },
        { name: 'BCA', showValue: true },
        { name: 'CAB', showValue: true }
    ],
};

const LiveExamPage = () => {
    const [timeLeft, setTimeLeft] = useState(90 * 60) // 90 minutes in seconds
    const [answers, setAnswers] = useState<{ [key: number]: string }>({})
    const [currentQuestion, setCurrentQuestion] = useState(1)
    const [showSubmitDialog, setShowSubmitDialog] = useState(false)
    const [showMobileNav, setShowMobileNav] = useState(false)
    const router = useRouter()
    const isMobile = useIsMobile()
    const isSmallMobile = useIsSmallMobile()

    // Sample questions data
    const questions: Question[] = [
        {
            id: 1,
            statement: "Решете: $\\displaystyle \\frac{2}{3} + \\frac{1}{6}$",
            type: "multiple",
            options: [
                "$\\displaystyle \\frac{1}{2}$",
                "$\\displaystyle \\frac{5}{6}$",
                "$\\displaystyle 1$",
                "$\\displaystyle \\frac{2}{3}$"
            ],
            points: 1
        },
        {
            id: 2,
            statement: "Каква е площта на правоъгълник с дължина 8 cm и ширина 5 cm?",
            type: "text",
            diagramData: sampleTriangleData,
            points: 1
        },
        {
            id: 3,
            statement: "Кое от следните е еквивалентно на 3/4?",
            type: "multiple",
            options: ["0.75", "0.34", "4/3", "7.5"],
            points: 1
        },
        {
            id: 4,
            statement: "Изчислете: 15 + 28 - 12 × 2",
            type: "text",
            points: 1
        },
        {
            id: 5,
            statement: "Какъв е периметърът на квадрат с дължина на страната 6 cm?",
            type: "multiple",
            options: ["12 cm", "24 cm", "36 cm", "18 cm"],
            points: 1
        },
        {
            id: 6,
            statement: "Опростете: 2(x + 3) - 4",
            type: "text",
            points: 1
        },
        {
            id: 7,
            statement: "Преобразувайте 0.6 в дроб в най-ниската форма.",
            type: "text",
            points: 1
        },
        {
            id: 8,
            statement: "Кой ъгъл е по-голям от 90°, но по-малък от 180°?",
            type: "multiple",
            options: ["Acute angle", "Right angle", "Obtuse angle", "Straight angle"],
            points: 1
        },
        {
            id: 9,
            statement: "Намерете стойността на y: 2y - 5 = 11",
            type: "text",
            points: 1
        },
        {
            id: 10,
            statement: "Колко е 25% от 80?",
            type: "text",
            points: 1
        },
        // Additional questions to reach 25
        {
            id: 11,
            statement: "Колко е стойността на π (пи) с точност до две десетични места?",
            type: "text",
            points: 1
        },
        {
            id: 12,
            statement: "Кое от следните е просто число?",
            type: "multiple",
            options: ["15", "21", "23", "27"],
            points: 1
        },
        {
            id: 13,
            statement: "Изчислете площта на кръг с радиус 4 cm.",
            type: "text",
            points: 1
        },
        {
            id: 14,
            statement: "Колко е наклона на линията y = 2x + 3?",
            type: "text",
            points: 1
        },
        {
            id: 15,
            statement: "Кое от следните е еквивалентно на 2/3?",
            type: "multiple",
            options: ["4/6", "6/9", "8/12", "All of the above"],
            points: 1
        },
        {
            id: 16,
            statement: "Решете уравнението: 2x + 5 = 13",
            type: "text",
            points: 1
        },
        {
            id: 17,
            statement: "Какъв е периметърът на правоъгълник с дължина 10 cm и ширина 6 cm?",
            type: "text",
            points: 1
        },
        {
            id: 18,
            statement: "Кое от следните е делител на 24?",
            type: "multiple",
            options: ["5", "7", "8", "9"],
            points: 1
        },
        {
            id: 19,
            statement: "Преобразувайте 3/5 в десетична дроб.",
            type: "text",
            points: 1
        },
        {
            id: 20,
            statement: "Колко е стойността на x в уравнението: 3x - 7 = 8",
            type: "text",
            points: 1
        },
        {
            id: 21,
            statement: "Кой от следните ъгли измерва 90 градуса?",
            type: "multiple",
            options: ["Acute angle", "Right angle", "Obtuse angle", "Straight angle"],
            points: 1
        },
        {
            id: 22,
            statement: "Изчислете: 15 × 4 ÷ 2 + 7",
            type: "text",
            points: 1
        },
        {
            id: 23,
            statement: "Колко е 20% от 150?",
            type: "text",
            points: 1
        },
        {
            id: 24,
            statement: "Кое от следните е кратно на 6?",
            type: "multiple",
            options: ["14", "18", "22", "26"],
            points: 1
        },
        {
            id: 25,
            statement: "Опростете израза: 2(x + 4) - 3x",
            type: "text",
            points: 1
        },
    ]

    const totalQuestions = 25

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

    const goToQuestion = (questionId: number) => {
        setCurrentQuestion(questionId)
        // Close mobile nav when navigating to a question
        if (isMobile) {
            setShowMobileNav(false)
        }
    }

    const scrollToQuestion = (questionId: number) => {
        const questionElement = document.getElementById(`question-${questionId}`);
        if (questionElement) {
            questionElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile nav when scrolling to a question
        if (isMobile) {
            setShowMobileNav(false)
        }
    }

    const getQuestionStatus = (questionId: number) => {
        if (answers[questionId]) return "answered"
        return "unanswered"
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

    const questionsAnswered = Object.keys(answers).length

    return (
        <div className="min-h-screen bg-gray-50 mx-auto">
            {/* Mobile Header */}
            {isMobile && (
                <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleMobileNav}
                            className="p-2"
                        >
                            {showMobileNav ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#6F58C9]" />
                            <span className="font-mono text-lg font-bold text-[#6F58C9]">
                                {formatTime(timeLeft)}
                            </span>
                        </div>
                    </div>
                    <Button
                        size="sm"
                        className="bg-gradient-to-r from-[#6F58C9] to-[#5A4BA3] text-white hover:from-[#5A4BA3] hover:to-[#4A3B93]"
                        onClick={handleSubmitExam}
                    >
                        Изпрати
                    </Button>
                </div>
            )}

            <div className={`${isMobile ? 'flex flex-col' : 'flex'} h-screen`}>
                {/* Left Column - Questions */}
                <div className={`${isMobile ? 'flex-1' : 'flex-1 overflow-y-auto'}`}>
                    <div className={`${isMobile ? 'p-4' : 'p-6 max-w-4xl mx-auto'} ${isSmallMobile ? 'px-2' : ''}`}>
                        {/* Header - Desktop only */}
                        {!isMobile && (
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">Тест</h1>
                                <p className="text-gray-600">Отговорете на всички въпроси в рамките на 90 минути</p>
                            </div>
                        )}

                        {/* Questions List */}
                        <div className="space-y-6">
                            {questions.map((question) => (
                                <div key={question.id} id={`question-${question.id}`}>
                                    <Question question={question} answers={answers} handleAnswerChange={handleAnswerChange} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Navigation */}
                <div className={`${isMobile
                    ? `w-full fixed inset-y-0 right-0 z-40 ${isSmallMobile ? 'w-full' : 'w-80'} bg-white border-l border-gray-200 transform transition-transform duration-300 ease-in-out ${showMobileNav ? 'translate-x-0' : 'translate-x-full'} flex flex-col`
                    : 'w-80 bg-white border-l border-gray-200 flex flex-col h-[calc(100vh-100px)]'
                    }`}>
                    {/* Timer - Desktop only */}
                    {!isMobile && (
                        <div className="p-6 border-b border-gray-200">
                            <Card className="bg-gradient-to-r from-[#6F58C9] to-[#5A4BA3] border-0 shadow-md">
                                <CardContent className="p-0 text-center">
                                    <div className="flex items-center justify-center gap-2 text-white">
                                        <Clock className="w-5 h-5" />
                                        <span className="font-mono text-2xl font-bold">{formatTime(timeLeft)}</span>
                                    </div>
                                    <p className="text-purple-100 text-sm mt-1">Оставащо време</p>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Question Navigator */}
                    <div className={`${isMobile ? 'flex-1 overflow-y-auto' : 'flex-1'}`}>
                        <QuestionsNavigatorGrid
                            answers={answers}
                            totalQuestions={totalQuestions}
                            getQuestionStatus={getQuestionStatus}
                            currentQuestion={currentQuestion}
                            goToQuestion={goToQuestion}
                            scrollToQuestion={scrollToQuestion}
                            colors={{
                                primary: "[#6F58C9]",
                                primaryLight: "[#6F58C91A]",
                                primaryHover: "[#6F58C94D]",
                                answeredBg: "[#6F58C933]",
                                answeredBorder: "[#6F58C966]",
                                answeredText: "[#6F58C9]",
                                answeredHover: "[#6F58C94D]"
                            }}
                            isMobile={isMobile}
                            isSmallMobile={isSmallMobile}
                            onClose={isMobile ? toggleMobileNav : undefined}
                        />
                    </div>

                    {/* Submit Button - Desktop only */}
                    {!isMobile && (
                        <div className="p-6 border-t border-gray-200">
                            <Button
                                className="w-full bg-gradient-to-br from-[#6F58C9] to-[#5A4BA3] text-white hover:bg-gray-100 font-semibold text-lg py-3 h-12"
                                onClick={handleSubmitExam}
                            >
                                Изпрати
                            </Button>
                        </div>
                    )}
                </div>

                {/* Mobile Overlay */}
                {isMobile && showMobileNav && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30"
                        onClick={toggleMobileNav}
                    />
                )}
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
                    primary: "[#6F58C9]",
                    primaryHover: "[#5A4BA3]"
                }}
                isMobile={isMobile}
                isSmallMobile={isSmallMobile}
            />

            {/* Low Time Warning */}
            {timeLeft < 600 && (
                <div className={`fixed z-50 ${isMobile ? 'bottom-4 left-4 right-4' : 'bottom-4 left-4'}`}>
                    <Card className="bg-red-50 border-red-200 shadow-lg">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 text-red-800">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm font-medium">По-малко от 10 минути останала!</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}

export default LiveExamPage;