"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Clock, CheckCircle, Flag } from "lucide-react"

type Question = {
    id: number
    statement: string
    type: "text" | "multiple"
    options?: string[]
}

const LiveExamPage = () => {
    const [timeLeft, setTimeLeft] = useState(90 * 60) // 90 minutes in seconds
    const [answers, setAnswers] = useState<{ [key: number]: string }>({})
    const [currentQuestion, setCurrentQuestion] = useState(1)

    // Sample questions data
    const questions: Question[] = [
        {
            id: 1,
            statement: "Решете за x: 3x + 7 = 22",
            type: "text",
        },
        {
            id: 2,
            statement: "Каква е площта на правоъгълник с дължина 8 cm и ширина 5 cm?",
            type: "text",
        },
        {
            id: 3,
            statement: "Кое от следните е еквивалентно на 3/4?",
            type: "multiple",
            options: ["0.75", "0.34", "4/3", "7.5"],
        },
        {
            id: 4,
            statement: "Изчислете: 15 + 28 - 12 × 2",
            type: "text",
        },
        {
            id: 5,
            statement: "Какъв е периметърът на квадрат с дължина на страната 6 cm?",
            type: "multiple",
            options: ["12 cm", "24 cm", "36 cm", "18 cm"],
        },
        {
            id: 6,
            statement: "Опростете: 2(x + 3) - 4",
            type: "text",
        },
        {
            id: 7,
            statement: "Преобразувайте 0.6 в дроб в най-ниската форма.",
            type: "text",
        },
        {
            id: 8,
            statement: "Кой ъгъл е по-голям от 90°, но по-малък от 180°?",
            type: "multiple",
            options: ["Acute angle", "Right angle", "Obtuse angle", "Straight angle"],
        },
        {
            id: 9,
            statement: "Намерете стойността на y: 2y - 5 = 11",
            type: "text",
        },
        {
            id: 10,
            statement: "Колко е 25% от 80?",
            type: "text",
        },
        // Additional questions to reach 25
        {
            id: 11,
            statement: "Колко е стойността на π (пи) с точност до две десетични места?",
            type: "text",
        },
        {
            id: 12,
            statement: "Кое от следните е просто число?",
            type: "multiple",
            options: ["15", "21", "23", "27"],
        },
        {
            id: 13,
            statement: "Изчислете площта на кръг с радиус 4 cm.",
            type: "text",
        },
        {
            id: 14,
            statement: "Колко е наклона на линията y = 2x + 3?",
            type: "text",
        },
        {
            id: 15,
            statement: "Кое от следните е еквивалентно на 2/3?",
            type: "multiple",
            options: ["4/6", "6/9", "8/12", "All of the above"],
        },
        {
            id: 16,
            statement: "Решете уравнението: 2x + 5 = 13",
            type: "text",
        },
        {
            id: 17,
            statement: "Какъв е периметърът на правоъгълник с дължина 10 cm и ширина 6 cm?",
            type: "text",
        },
        {
            id: 18,
            statement: "Кое от следните е делител на 24?",
            type: "multiple",
            options: ["5", "7", "8", "9"],
        },
        {
            id: 19,
            statement: "Преобразувайте 3/5 в десетична дроб.",
            type: "text",
        },
        {
            id: 20,
            statement: "Колко е стойността на x в уравнението: 3x - 7 = 8",
            type: "text",
        },
        {
            id: 21,
            statement: "Кой от следните ъгли измерва 90 градуса?",
            type: "multiple",
            options: ["Acute angle", "Right angle", "Obtuse angle", "Straight angle"],
        },
        {
            id: 22,
            statement: "Изчислете: 15 × 4 ÷ 2 + 7",
            type: "text",
        },
        {
            id: 23,
            statement: "Колко е 20% от 150?",
            type: "text",
        },
        {
            id: 24,
            statement: "Кое от следните е кратно на 6?",
            type: "multiple",
            options: ["14", "18", "22", "26"],
        },
        {
            id: 25,
            statement: "Опростете израза: 2(x + 4) - 3x",
            type: "text",
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
    }

    const getQuestionStatus = (questionId: number) => {
        if (answers[questionId]) return "answered"
        return "unanswered"
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex h-screen">
                {/* Left Column - Questions */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-6 max-w-4xl mx-auto">
                        {/* Header */}
                        {/* Questions List */}
                        <div className="space-y-8">
                            {questions.map((question) => (
                                <Card
                                    key={question.id}
                                    className={`bg-white border-0 shadow-md transition-all duration-300 ${currentQuestion === question.id ? "ring-2 ring-emerald-500 shadow-lg" : ""
                                        }`}
                                >
                                    <CardContent className="p-8">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="flex-shrink-0">
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${answers[question.id]
                                                        ? "bg-emerald-600 text-white"
                                                        : currentQuestion === question.id
                                                            ? "bg-emerald-100 text-emerald-800 ring-2 ring-emerald-500"
                                                            : "bg-gray-100 text-gray-600"
                                                        }`}
                                                >
                                                    {question.id}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-base font-semibold text-gray-900 leading-relaxed mb-6">
                                                    {question.statement}
                                                </h3>

                                                {/* Answer Input */}
                                                {question.type === "text" ? (
                                                    <div className="max-w-md">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Твоят отговор:</label>
                                                        <Input
                                                            value={answers[question.id] || ""}
                                                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                                            placeholder="Enter your answer..."
                                                            className="text-lg p-4 h-12 focus:ring-emerald-500 focus:border-emerald-500"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="space-y-3">
                                                        <label className="block text-sm font-medium text-gray-700 mb-3">Изберете своя отговор:</label>
                                                        {question.options?.map((option: string, index: number) => {
                                                            const optionLetter = String.fromCharCode(97 + index) // a, b, c, d
                                                            const isSelected = answers[question.id] === optionLetter
                                                            return (
                                                                <button
                                                                    key={index}
                                                                    onClick={() => handleAnswerChange(question.id, optionLetter)}
                                                                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${isSelected
                                                                        ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                                                                        : "border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50"
                                                                        }`}
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <div
                                                                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-emerald-500 bg-emerald-500" : "border-gray-300"
                                                                                }`}
                                                                        >
                                                                            {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                                                                        </div>
                                                                        <span className="font-medium text-gray-700">{optionLetter})</span>
                                                                        <span className="text-gray-900">{option}</span>
                                                                    </div>
                                                                </button>
                                                            )
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div className="h-20"></div> {/* Bottom spacing */}
                    </div>
                </div>

                {/* Right Sidebar - Navigation */}
                <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
                    {/* Timer */}
                    <div className="p-6 border-b border-gray-200">
                        <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 border-0 shadow-md">
                            <CardContent className="p-4 text-center">
                                <div className="flex items-center justify-center gap-2 text-white">
                                    <Clock className="w-5 h-5" />
                                    <span className="font-mono text-2xl font-bold">{formatTime(timeLeft)}</span>
                                </div>
                                <p className="text-emerald-100 text-sm mt-1">Оставащо време</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Question Navigator */}
                    <div className="flex-1 p-6">
                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <Flag className="w-4 h-4 text-emerald-600" />
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
                                            ? "border-emerald-500 bg-emerald-500 text-white shadow-md"
                                            : status === "answered"
                                                ? "border-green-200 bg-green-100 text-green-800 hover:bg-green-200"
                                                : "border-gray-200 bg-gray-50 text-gray-600 hover:border-emerald-300 hover:bg-emerald-50"
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
                                <div className="w-4 h-4 rounded bg-emerald-500"></div>
                                <span className="text-gray-600">Текущ въпрос</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-200"></div>
                                <span className="text-gray-600">Отговорен</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded bg-gray-50 border-2 border-gray-200"></div>
                                <span className="text-gray-600">Неотговорен</span>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="p-6 border-t border-gray-200">
                        <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 border-0 shadow-md cursor-pointer hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-4">
                                <Button className="w-full bg-white text-emerald-600 hover:bg-gray-100 font-semibold text-lg py-3 h-12">
                                    Изпрати
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Low Time Warning */}
            {timeLeft < 600 && (
                <div className="fixed bottom-4 left-4 z-50">
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