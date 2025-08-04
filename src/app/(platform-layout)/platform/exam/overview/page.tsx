"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Target, Clock } from "lucide-react";
import type { DiagramData } from "geometry-diagram-renderer";
import Question from "@/app/(platform-layout)/platform/components/Question/Question";
import { QuestionsNavigatorGrid } from "@/app/(platform-layout)/platform/components/QuestionsNavigatorGrid/QuestionsNavigatorGrid";

type Question = {
    id: number
    statement: string
    type: "text" | "multiple"
    options?: string[]
    diagramData?: DiagramData
    correctAnswer: string
    userAnswer?: string
    isCorrect?: boolean
    points?: number
    solution?: string
}

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

const ExamOverviewPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(1);

    // Mock exam results - in a real app, this would come from the backend
    const examResults = {
        totalQuestions: 25,
        correctAnswers: 18,
        incorrectAnswers: 7,
        score: 72, // percentage
        timeSpent: "85 minutes",
        examDate: "15 декември 2024"
    };

    // Mock questions with results - in a real app, this would come from the backen
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
            correctAnswer: "$\\displaystyle \\frac{5}{6}$",
            userAnswer: "$\\displaystyle \\frac{5}{6}$",
            points: 1,
            solution: "<p><strong>Решение:</strong></p><p>За да съберем дробите $\\frac{2}{3}$ и $\\frac{1}{6}$, първо трябва да намерим общ знаменател.</p><p>Най-малкият общ знаменател на 3 и 6 е 6.</p><p>$\\frac{2}{3} = \\frac{2 \\times 2}{3 \\times 2} = \\frac{4}{6}$</p><p>$\\frac{1}{6}$ вече има знаменател 6.</p><p>Сега можем да съберем: $\\frac{4}{6} + \\frac{1}{6} = \\frac{5}{6}$</p><p><strong>Отговор: $\\frac{5}{6}$</strong></p>"
        },
        {
            id: 2,
            statement: "Каква е площта на правоъгълник с дължина 8 cm и ширина 5 cm?",
            type: "text",
            diagramData: sampleTriangleData,
            correctAnswer: "40 cm²",
            userAnswer: "35 cm²",
            points: 1,
            solution: "<p><strong>Решение:</strong></p><p>Площта на правоъгълник се изчислява по формулата: <strong>Площ = дължина × ширина</strong></p><p>В нашия случай:</p><p>Дължина = 8 cm</p><p>Ширина = 5 cm</p><p>Площ = 8 cm × 5 cm = 40 cm²</p><p><strong>Отговор: 40 cm²</strong></p>"
        },
        {
            id: 3,
            statement: "Кое от следните е еквивалентно на 3/4?",
            type: "multiple",
            options: ["0.75", "0.34", "4/3", "7.5"],
            correctAnswer: "0.75",
            userAnswer: "0.75",
            points: 1
        },
        {
            id: 4,
            statement: "Изчислете: 15 + 28 - 12 × 2",
            type: "text",
            correctAnswer: "19",
            userAnswer: "12",
            points: 1
        },
        {
            id: 5,
            statement: "Какъв е периметърът на квадрат с дължина на страната 6 cm?",
            type: "multiple",
            options: ["12 cm", "24 cm", "36 cm", "18 cm"],
            correctAnswer: "24 cm",
            userAnswer: "12 cm",
            points: 1
        },
        {
            id: 6,
            statement: "Опростете: 2(x + 3) - 4",
            type: "text",
            correctAnswer: "2x + 2",
            userAnswer: "2x + 2",
            points: 1
        },
        {
            id: 7,
            statement: "Преобразувайте 0.6 в дроб в най-ниската форма.",
            type: "text",
            correctAnswer: "3/5",
            userAnswer: "6/10",
            points: 1
        },
        {
            id: 8,
            statement: "Кой ъгъл е по-голям от 90°, но по-малък от 180°?",
            type: "multiple",
            options: ["Acute angle", "Right angle", "Obtuse angle", "Straight angle"],
            correctAnswer: "Obtuse angle",
            userAnswer: "Obtuse angle",
            points: 1
        },
        {
            id: 9,
            statement: "Намерете стойността на y: 2y - 5 = 11",
            type: "text",
            correctAnswer: "8",
            userAnswer: "8",
            points: 1
        },
        {
            id: 10,
            statement: "Колко е 25% от 80?",
            type: "text",
            correctAnswer: "20",
            userAnswer: "20",
            points: 1
        }
    ];

    // Convert questions to the format expected by the Question component
    const questionsForDisplay = questions.map(q => ({
        id: q.id,
        statement: q.statement,
        type: q.type,
        options: q.options,
        diagramData: q.diagramData
    }));

    // Create answers object for the Question component
    const answers = questions.reduce((acc, q) => {
        if (q.userAnswer) {
            acc[q.id] = q.userAnswer;
        }
        return acc;
    }, {} as { [key: number]: string });

    const handleAnswerChange = () => {
        // This is read-only, so we don't need to handle changes
    };

    // Function to get question status for the navigator grid
    const getQuestionStatus = (questionNum: number) => {
        const question = questions.find(q => q.id === questionNum);
        if (!question || !question.userAnswer) return "unanswered";

        const isCorrect = question.userAnswer === question.correctAnswer;
        return isCorrect ? "correct" : "incorrect";
    };

    // Function to handle navigation to a specific question
    const goToQuestion = (questionNum: number) => {
        setCurrentQuestion(questionNum);
        // Scroll to the question element
        const questionElement = document.getElementById(`question-${questionNum}`);
        if (questionElement) {
            questionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Colors for the navigator grid
    const navigatorColors = {
        primary: "emerald",
        primaryLight: "emerald-50",
        primaryHover: "emerald-400",
        answeredBg: "green-100",
        answeredBorder: "green-500",
        answeredText: "green-800",
        answeredHover: "green-200"
    };

    return (
        <div className="min-h-screen bg-gray-50 mx-auto">
            <div className="flex h-screen">
                {/* Left Column - Questions */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-6 max-w-4xl mx-auto">
                        {/* Questions Review */}
                        <div className="space-y-8">
                            {questions.map((question) => (
                                <div key={question.id} id={`question-${question.id}`}>
                                    <Question
                                        question={questionsForDisplay.find(q => q.id === question.id)!}
                                        answers={answers}
                                        handleAnswerChange={handleAnswerChange}
                                        isReviewMode={true}
                                        correctAnswer={question.correctAnswer}
                                        userAnswer={question.userAnswer}
                                        solution={question.solution}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Navigation */}
                <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-[calc(100vh-100px)]">
                    {/* Overview Data */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="space-y-4">
                            <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-md">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-white text-sm">
                                        <Trophy className="w-4 h-4" />
                                        Общ резултат
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div className="text-3xl font-bold mb-1">{examResults.score}%</div>
                                    <p className="text-emerald-100 text-xs">
                                        {examResults.correctAnswers} от {examResults.totalQuestions} правилни отговора
                                    </p>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-2 gap-3">
                                <Card className="border-0 shadow-sm">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="flex items-center gap-2 text-xs">
                                            <Target className="w-3 h-3" />
                                            Правилни
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-3">
                                        <div className="text-lg font-bold text-green-600">
                                            {examResults.correctAnswers}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-sm">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="flex items-center gap-2 text-xs">
                                            <Clock className="w-3 h-3" />
                                            Време
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-3">
                                        <div className="text-lg font-bold text-blue-600">
                                            {examResults.timeSpent}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* Questions Navigator Grid - Centered */}
                    <div className="flex-1 flex items-center justify-center">
                        <QuestionsNavigatorGrid
                            answers={answers}
                            totalQuestions={questions.length}
                            getQuestionStatus={getQuestionStatus}
                            currentQuestion={currentQuestion}
                            goToQuestion={goToQuestion}
                            colors={navigatorColors}
                            reviewMode={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamOverviewPage; 