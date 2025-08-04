"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Trophy, Clock, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import type { DiagramData } from "geometry-diagram-renderer";
import Question from "@/app/(platform-layout)/platform/components/Question/Question";

import type { Question as QuestionType } from "@/types"

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
    const router = useRouter();

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
    const questions: QuestionType[] = [
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

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-6">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => router.push('/platform')}
                        className="mb-4 flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Обратно към начало
                    </Button>
                    <h1 className="text-3xl font-bold text-gray-900">Резултати от изпита</h1>
                    <p className="text-gray-600 mt-2">Преглед на вашите отговори и резултати</p>
                </div>

                {/* Score Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-white">
                                <Trophy className="w-5 h-5" />
                                Общ резултат
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold mb-2">{examResults.score}%</div>
                            <p className="text-emerald-100">
                                {examResults.correctAnswers} от {examResults.totalQuestions} правилни отговора
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <Target className="w-4 h-4" />
                                Правилни отговори
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600 mb-1">
                                {examResults.correctAnswers}
                            </div>
                            <p className="text-sm text-gray-600">
                                От {examResults.totalQuestions} въпроса
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <Clock className="w-4 h-4" />
                                Време
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600 mb-1">
                                {examResults.timeSpent}
                            </div>
                            <p className="text-sm text-gray-600">
                                {examResults.examDate}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Questions Review */}

                <div className="space-y-6">
                    {questions.map((question) => (
                        <Question
                            key={question.id}
                            question={questionsForDisplay.find(q => q.id === question.id)!}
                            answers={answers}
                            handleAnswerChange={handleAnswerChange}
                            isReviewMode={true}
                            correctAnswer={question.correctAnswer}
                            userAnswer={question.userAnswer}
                            solution={question.solution}
                        />
                    ))}
                </div>


                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                    <Button
                        onClick={() => router.push('/platform/exam')}
                        className="bg-emerald-600 hover:bg-emerald-700"
                    >
                        Нов изпит
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => router.push('/platform')}
                    >
                        Към платформата
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ExamOverviewPage;