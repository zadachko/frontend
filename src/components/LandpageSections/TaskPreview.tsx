"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronRight, Clock, HelpCircle, Lightbulb, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Sample math problems with varying difficulty
const mathProblems = [
    {
        id: 1,
        question: "Колко е 7 + 8?",
        options: ["13", "15", "16", "14"],
        correctAnswer: "15",
        explanation: "7 + 8 = 15",
        difficulty: "easy",
    },
    {
        id: 2,
        question: "Ако x + 5 = 12, колко е x?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "7",
        explanation: "x + 5 = 12\nx = 12 - 5\nx = 7",
        difficulty: "easy",
    },
    {
        id: 3,
        question: "Колко е 25% от 80?",
        options: ["15", "20", "25", "40"],
        correctAnswer: "20",
        explanation: "25% = 25/100 = 1/4\n1/4 × 80 = 80 ÷ 4 = 20",
        difficulty: "easy",
    },
    {
        id: 4,
        question: "Лицето на правоъгълник със страни 6 см и 4 см е:",
        options: ["10 см²", "18 см²", "24 см²", "30 см²"],
        correctAnswer: "24 см²",
        explanation: "S = a × b = 6 см × 4 см = 24 см²",
        difficulty: "easy",
    },
    {
        id: 5,
        question: "Ако 3x - 7 = 14, колко е x?",
        options: ["5", "7", "9", "21"],
        correctAnswer: "7",
        explanation: "3x - 7 = 14\n3x = 14 + 7\n3x = 21\nx = 21 ÷ 3\nx = 7",
        difficulty: "easy",
    },
]

const TaskPreview = () => {
    const [currentProblem, setCurrentProblem] = useState(mathProblems[0])
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [showExplanation, setShowExplanation] = useState(false)
    const [timeLeft, setTimeLeft] = useState(30)
    const [isTimerActive, setIsTimerActive] = useState(true)
    const [problemsSolved, setProblemsSolved] = useState(0)
    const [streak, setStreak] = useState(0)
    const [showConfetti, setShowConfetti] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)

    // Reset state when changing problems
    const resetProblem = () => {
        setSelectedAnswer(null)
        setIsCorrect(null)
        setShowExplanation(false)
        setTimeLeft(30)
        setIsTimerActive(true)
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 500)
    }

    // Get a new random problem
    const getNewProblem = () => {
        const availableProblems = mathProblems.filter((p) => p.id !== currentProblem.id)
        const randomIndex = Math.floor(Math.random() * availableProblems.length)
        setCurrentProblem(availableProblems[randomIndex])
        resetProblem()
    }

    // Handle answer selection
    const handleAnswerSelect = (answer: string) => {
        if (selectedAnswer !== null) return // Prevent changing answer after submission

        setSelectedAnswer(answer)
        const correct = answer === currentProblem.correctAnswer
        setIsCorrect(correct)
        setIsTimerActive(false)

        if (correct) {
            setProblemsSolved((prev) => prev + 1)
            setStreak((prev) => prev + 1)
            setShowConfetti(true)
            setTimeout(() => setShowConfetti(false), 2000)
        } else {
            setStreak(0)
        }
    }

    // Timer effect
    useEffect(() => {
        if (!isTimerActive || timeLeft <= 0) return

        const timer = setTimeout(() => {
            setTimeLeft((prev) => prev - 1)
            if (timeLeft === 1) {
                setIsTimerActive(false)
                if (selectedAnswer === null) {
                    setSelectedAnswer("")
                    setIsCorrect(false)
                    setStreak(0)
                }
            }
        }, 1000)

        return () => clearTimeout(timer)
    }, [timeLeft, isTimerActive, selectedAnswer])

    return (
        <section
            ref={sectionRef}
            className="py-16 md:py-24 bg-gradient-to-b from-white to-primary-50 overflow-hidden relative border-y border-gray-200"
        >
            {/* Confetti effect when correct */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none z-50">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute top-0"
                            initial={{
                                left: `${Math.random() * 100}%`,
                                top: -20,
                                backgroundColor: [
                                    "#6F58C9",
                                    "#8A76D9",
                                    "#A594E5",
                                    "#BFB3EA",
                                    "#D5CCF1",
                                    "#EAE6F8",
                                    "#F0EBFC",
                                    "#F5F1FE",
                                    "#F9F7FE",
                                    "#FFFFFF",
                                ][Math.floor(Math.random() * 10)],
                                width: `${Math.random() * 10 + 5}px`,
                                height: `${Math.random() * 10 + 5}px`,
                                borderRadius: Math.random() > 0.5 ? "50%" : "0",
                            }}
                            animate={{
                                top: `${Math.random() * 100 + 100}%`,
                                left: `${Math.random() * 100}%`,
                                rotate: Math.random() * 360,
                                opacity: [1, 0.8, 0.6, 0.4, 0.2, 0],
                            }}
                            transition={{
                                duration: Math.random() * 2 + 1,
                                ease: "easeOut",
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="container">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5 }}
                        className="inline-block"
                    >
                        <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                            Изпробвай сега
                        </span>
                    </motion.div>
                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-700 mt-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Опитай нашата платформа
                    </motion.h2>
                    <motion.p
                        className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Реши няколко задачи и усети как Zadachko прави ученето забавно и ефективно
                    </motion.p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Left sidebar with stats - only on desktop */}
                        <motion.div
                            className="hidden md:block"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Card className="h-full">
                                <CardHeader className="bg-primary-50 pb-2">
                                    <CardTitle className="text-lg flex items-center">
                                        <Clock className="mr-2 h-5 w-5 text-primary-500" />
                                        Твоят прогрес
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Решени задачи</span>
                                            <span className="font-bold text-primary-600">{problemsSolved}</span>
                                        </div>
                                        <Progress value={(problemsSolved / 5) * 100} className="h-2" />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Поредица верни</span>
                                            <span className="font-bold text-primary-600">{streak}</span>
                                        </div>
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`h-2 flex-1 rounded-full ${i < streak ? "bg-green-500" : "bg-gray-200"}`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-4 bg-primary-50 rounded-lg">
                                        <h4 className="font-medium text-primary-700 mb-2">Знаеш ли, че?</h4>
                                        <p className="text-sm text-gray-600">
                                            Редовната практика на малки порции от по 15-20 минути е по-ефективна от дългите сесии веднъж
                                            седмично.
                                        </p>
                                    </div>

                                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                                        <h4 className="font-medium text-yellow-700 flex items-center mb-2">
                                            <Lightbulb className="h-4 w-4 mr-1 text-yellow-500" />
                                            Съвет
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Използвай бутона <span className="font-bold">Покажи решение</span> за да видиш подробно обяснение на всяка задача.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Main problem card */}
                        <motion.div
                            className="md:col-span-2"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Card className="shadow-lg border-primary-100">
                                <CardHeader className="bg-primary-50 pb-2 border-b">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg flex items-center">
                                            <span className="bg-primary-100 text-primary-700 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                                                {currentProblem.id}
                                            </span>
                                            Задача
                                        </CardTitle>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-5 w-5 text-primary-500" />
                                            <span className={`font-medium ${timeLeft < 10 ? "text-red-500" : ""}`}>{timeLeft}с</span>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="pt-6">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentProblem.id}
                                            initial={{ opacity: 0, x: isAnimating ? 20 : 0 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="mb-6">
                                                <h3 className="text-xl font-medium text-gray-800 mb-4">{currentProblem.question}</h3>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {currentProblem.options.map((option, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => handleAnswerSelect(option)}
                                                            disabled={selectedAnswer !== null}
                                                            className={`flex items-center p-4 border rounded-lg transition-all ${selectedAnswer === option
                                                                ? isCorrect
                                                                    ? "bg-green-50 border-green-300 text-green-700"
                                                                    : "bg-red-50 border-red-300 text-red-700"
                                                                : selectedAnswer !== null && option === currentProblem.correctAnswer
                                                                    ? "bg-green-50 border-green-300 text-green-700"
                                                                    : "hover:bg-gray-50 border-gray-200"
                                                                }`}
                                                        >
                                                            <div className="w-6 h-6 rounded-full border flex items-center justify-center mr-3">
                                                                {selectedAnswer === option ? (
                                                                    isCorrect ? (
                                                                        <Check className="h-4 w-4 text-green-500" />
                                                                    ) : (
                                                                        <X className="h-4 w-4 text-red-500" />
                                                                    )
                                                                ) : selectedAnswer !== null && option === currentProblem.correctAnswer ? (
                                                                    <Check className="h-4 w-4 text-green-500" />
                                                                ) : (
                                                                    <span className="text-sm">{String.fromCharCode(65 + index)}</span>
                                                                )}
                                                            </div>
                                                            <span>{option}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Explanation section */}
                                            {(showExplanation || (selectedAnswer !== null && !isTimerActive)) && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    transition={{ duration: 0.3 }}
                                                    className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100"
                                                >
                                                    <h4 className="font-medium text-blue-700 flex items-center mb-2">
                                                        <Lightbulb className="h-4 w-4 mr-1 text-blue-500" />
                                                        Решение
                                                    </h4>
                                                    <p className="text-gray-700 whitespace-pre-line">{currentProblem.explanation}</p>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </CardContent>

                                <CardFooter className="border-t pt-4 flex justify-between">
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowExplanation(!showExplanation)}
                                        disabled={!selectedAnswer && isTimerActive}
                                        className="rounded-xl"
                                    >
                                        {showExplanation ? (
                                            <>Скрий решението</>
                                        ) : (
                                            <>
                                                <HelpCircle className="mr-2 h-4 w-4" />
                                                Покажи решението
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        onClick={getNewProblem}
                                        disabled={isTimerActive && selectedAnswer === null}
                                        className="rounded-xl"
                                    >
                                        Следваща задача
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* Mobile stats bar */}
                            <div className="flex justify-between mt-4 md:hidden">
                                <div className="bg-white rounded-lg p-3 shadow-sm border flex-1 mr-2">
                                    <div className="text-xs text-gray-500">Решени задачи</div>
                                    <div className="font-bold text-primary-600 text-lg">{problemsSolved}</div>
                                </div>
                                <div className="bg-white rounded-lg p-3 shadow-sm border flex-1">
                                    <div className="text-xs text-gray-500">Поредица верни</div>
                                    <div className="font-bold text-primary-600 text-lg">{streak}</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default TaskPreview;