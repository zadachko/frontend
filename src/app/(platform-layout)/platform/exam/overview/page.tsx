"use client"

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Clock, Calendar, CheckCircle, GraduationCap } from "lucide-react";
import { type DiagramData, type StepAction } from "geometry-diagram-renderer";
import Question from "@/app/(platform-layout)/platform/components/Question/Question";
import { QuestionsNavigatorGrid } from "@/app/(platform-layout)/platform/components/QuestionsNavigatorGrid/QuestionsNavigatorGrid";
import { Badge } from "@/components/ui/badge";

import type { Question as QuestionType } from "@/types"
// StepAction is imported from the package above

const baseDiagram: DiagramData = {
    points: {
        A: { x: 0, y: 0 },
        B: { x: 4.46, y: 0 },
        C: { x: 1.635, y: 2.83 },
    },
    edges: [
        { from: "A", to: "B" },
        { from: "B", to: "C" },
        { from: "A", to: "C" },
    ],
    sides: [],
    angles: []
};
const exampleSteps: StepAction[][] = [
    [
        { type: "add", elementType: "point", data: { id: "D", x: 1.635, y: 0 } },
        { type: "add", elementType: "point", data: { id: "K", x: 1.117, y: 1.932 } },
        { type: "add", elementType: "edge", data: { from: "C", to: "D", dashed: true } },
        { type: "add", elementType: "edge", data: { from: "B", to: "K", dashed: true } },
        { type: "add", elementType: "angle", data: { name: "BDC" } },
        { type: "add", elementType: "angle", data: { name: "BKC" } },
    ],
    [
        { type: "add", elementType: "point", data: { id: "M", x: 3.048, y: 1.415 } },
        { type: "add", elementType: "side", data: { from: "B", to: "M" } },
        { type: "add", elementType: "edge", data: { from: "B", to: "M", equalGroup: "G2" } },
        { type: "add", elementType: "edge", data: { from: "M", to: "C", equalGroup: "G2" } },
        { type: "add", elementType: "side", data: { from: "M", to: "C" } },
        // { type: "remove", elementType: "edge", id: { from: "B", to: "C" } },
    ],
    [
        { type: "remove", elementType: "angle", id: "BDC" },
        { type: "remove", elementType: "angle", id: "BKC" },
        { type: "add", elementType: "edge", data: { from: "D", to: "M", color: "blue" } },
        { type: "add", elementType: "edge", data: { from: "M", to: "K", color: "blue" } },
        { type: "add", elementType: "edge", data: { from: "K", to: "D", color: "blue" } },
    ],
    [
        { type: "remove", elementType: "edge", id: { from: "B", to: "K" } },
        { type: "add", elementType: "angle", data: { name: "DBM", showValue: true } },
        { type: "add", elementType: "angle", data: { name: "BDM", showValue: true } },
        { type: "add", elementType: "side", data: { from: "D", to: "M" } },
        // { type: "highlight", elementType: "angle", id: "BDC" },
    ],
    [
        { type: "highlight", elementType: "point", id: "A", color: "blue" },
        { type: "highlight", elementType: "edge", id: { from: "A", to: "B" }, color: "orange" },
    ]
];

const ExamOverviewPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(1);

    const [stepIndex, setStepIndex] = useState(3);

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
            // NEW: multi-step version (you can remove the old `solution` if you want)
            solutionSteps: [
                { id: 1, title: "Общ знаменател", content: "Най-малкият общ знаменател на 3 и 6 е 6." },
                { id: 2, title: "Приравняване", content: "$\\frac{2}{3} = \\frac{4}{6}$; $\\frac{1}{6}$ остава същото." },
                { id: 3, title: "Събиране", content: "$\\frac{4}{6} + \\frac{1}{6} = \\frac{5}{6}$." },
                { id: 4, title: "Извод", content: "Отговор: $\\frac{5}{6}$." }
            ]
        },
        {
            id: 2,
            statement: "В правоъгълник ABCD са построени точки K и M съгласно дадената конструкция. Докажете, че триъгълник DMK е равнобедрен и намерете мерките на ъглите му.",
            type: "text",
            correctAnswer: "40 cm²",
            userAnswer: "35 cm²",
            points: 1,
            solutionSteps: [
                { id: 1, title: "Добавяне на помощни елементи", content: "Построяваме точки D и K, свързваме ги с C и B чрез пунктирани линии и отбелязваме ъглите BDC и BKC." },
                { id: 2, title: "Създаване на равни отсечки", content: "Построяваме точка M по BC, така че BM = MC, и отбелязваме отсечките като равни." },
                { id: 3, title: "Построяване на триъгълник", content: "Премахваме ъглите BDC и BKC и свързваме D, M и K с оцветени в синьо линии." },
                { id: 4, title: "Отбелязване на нови ъгли", content: "Премахваме линията BK, отбелязваме ъглите DBM и BDM и добавяме страната DM." },
                { id: 5, title: "Подчертаване на важни елементи", content: "Маркираме точка A в синьо и страната AB в оранжево, за да акцентираме върху тях." }
            ],
            diagramData: baseDiagram,
            diagramSteps: exampleSteps
        },
        {
            id: 3,
            statement: "Стойността на израза $x^3 \\cdot \\left( \\frac{x^3}{x^2} \\right)^{-6}$ при $x = -3$ е:",
            type: "multiple",
            options: [
                "$\\displaystyle -9$",
                "$\\displaystyle -\\frac{1}{27}$",
                "$\\displaystyle \\frac{1}{27}$",
                "$\\displaystyle 9$"
            ],
            correctAnswer: "$\\displaystyle -\\frac{1}{27}$",
            userAnswer: "$\\displaystyle \\frac{1}{27}$",
            points: 1,
            solutionSteps: [
                { id: 1, title: "Съкращаване на дробта", content: "$\\frac{x^3}{x^2} = x^{3-2} = x^1$." },
                { id: 2, title: "Прилагане на степента", content: "$(x^1)^{-6} = x^{-6}$." },
                { id: 3, title: "Събиране на показателите", content: "$x^3 \\cdot x^{-6} = x^{3-6} = x^{-3}$." },
                { id: 4, title: "Замяна на $x$", content: "$(-3)^{-3} = \\frac{1}{(-3)^3} = \\frac{1}{-27}$." },
                { id: 5, title: "Съкращаване на дробта", content: "$\\frac{x^3}{x^2} = x^{3-2} = x^1$." },
                { id: 6, title: "Прилагане на степента", content: "$(x^1)^{-6} = x^{-6}$." },
                { id: 7, title: "Събиране на показателите", content: "$x^3 \\cdot x^{-6} = x^{3-6} = x^{-3}$." },
                { id: 8, title: "Замяна на $x$", content: "$(-3)^{-3} = \\frac{1}{(-3)^3} = \\frac{1}{-27}$." },
            ]
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
        },
        {
            id: 11,
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
            id: 12,
            statement: "Каква е площта на правоъгълник с дължина 8 cm и ширина 5 cm?",
            type: "text",
            diagramData: baseDiagram,
            correctAnswer: "40 cm²",
            userAnswer: "35 cm²",
            points: 1,
            solution: "<p><strong>Решение:</strong></p><p>Площта на правоъгълник се изчислява по формулата: <strong>Площ = дължина × ширина</strong></p><p>В нашия случай:</p><p>Дължина = 8 cm</p><p>Ширина = 5 cm</p><p>Площ = 8 cm × 5 cm = 40 cm²</p><p><strong>Отговор: 40 cm²</strong></p>"
        },
        {
            id: 13,
            statement: "Кое от следните е еквивалентно на 3/4?",
            type: "multiple",
            options: ["0.75", "0.34", "4/3", "7.5"],
            correctAnswer: "0.75",
            userAnswer: "0.75",
            points: 1
        },
        {
            id: 14,
            statement: "Изчислете: 15 + 28 - 12 × 2",
            type: "text",
            correctAnswer: "19",
            userAnswer: "12",
            points: 1
        },
        {
            id: 15,
            statement: "Какъв е периметърът на квадрат с дължина на страната 6 cm?",
            type: "multiple",
            options: ["12 cm", "24 cm", "36 cm", "18 cm"],
            correctAnswer: "24 cm",
            userAnswer: "12 cm",
            points: 1
        },
        {
            id: 16,
            statement: "Опростете: 2(x + 3) - 4",
            type: "text",
            correctAnswer: "2x + 2",
            userAnswer: "2x + 2",
            points: 1
        },
        {
            id: 17,
            statement: "Преобразувайте 0.6 в дроб в най-ниската форма.",
            type: "text",
            correctAnswer: "3/5",
            userAnswer: "6/10",
            points: 1
        },
        {
            id: 18,
            statement: "Кой ъгъл е по-голям от 90°, но по-малък от 180°?",
            type: "multiple",
            options: ["Acute angle", "Right angle", "Obtuse angle", "Straight angle"],
            correctAnswer: "Obtuse angle",
            userAnswer: "Obtuse angle",
            points: 1
        },
        {
            id: 19,
            statement: "Намерете стойността на y: 2y - 5 = 11",
            type: "text",
            correctAnswer: "8",
            userAnswer: "8",
            points: 1
        },
        {
            id: 20,
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
        diagramData: q.diagramData,
        diagramSteps: q.diagramSteps,
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
                                        solution={(question as any).solutionSteps ?? question.solution}
                                        showRobotBadge={true}
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
                            {/* Main Score Card - Similar to ResultRow */}
                            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                                <CardContent className="p-4 pt-0">
                                    <div className="flex justify-center mb-4">
                                        <h3 className="font-semibold text-gray-900 text-md">Резултати от изпита</h3>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        {/* Left Side - Info */}
                                        <div className="flex-1 min-w-0 pr-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 mb-3">
                                                <GraduationCap className="h-3.5 w-3.5" />
                                                Матура
                                            </span>

                                            <div className="flex flex-col gap-2 text-xs text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3 text-gray-500" />
                                                    <span>{examResults.examDate}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3 text-blue-500" />
                                                    <span className="text-blue-700">{examResults.timeSpent}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                                    <span className="text-green-700 font-medium">
                                                        {examResults.correctAnswers}/{examResults.totalQuestions}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side - Circular Progress */}
                                        <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-16 h-16" viewBox="0 0 36 36">
                                                <path
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke="#e5e7eb"
                                                    strokeWidth="2"
                                                />
                                                <path
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke={examResults.score >= 80 ? "#10b981" : examResults.score >= 60 ? "#f59e0b" : "#ef4444"}
                                                    strokeWidth="2"
                                                    strokeDasharray={`${examResults.score}, 100`}
                                                    strokeLinecap="round"
                                                    className="transition-all duration-500 origin-center"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {(2 + (examResults.score / 100) * 4).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                        </div>
                    </div>

                    {/* Questions Navigator Grid - Centered */}
                    <div className="flex-1 flex items-start justify-center">
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