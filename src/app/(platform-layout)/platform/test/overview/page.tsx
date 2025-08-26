'use client';
import { useState, useRef } from "react";
import { BookOpen } from "lucide-react";
import { type DiagramData, type StepAction } from "geometry-diagram-renderer";
import Question from "@/app/(platform-layout)/platform/components/Question/Question";
import { QuestionsNavigatorGrid } from "@/app/(platform-layout)/platform/components/QuestionsNavigatorGrid/QuestionsNavigatorGrid";
import { useIsMobile, useIsSmallMobile } from "@/hooks/isMobile";
import AssessmentOverviewSidebar from "../../components/AssessmentPage/AssessmentOverviewSidebar";
import AssessmentOverviewMobileHeader from "../../components/AssessmentPage/AssessmentOverviewMobileHeader";
import type { Question as QuestionType } from "@/types"
import handleSidebarScroll from "../../components/AssessmentPage/utils/handleSidebarScroll";
import { getQuestionStatusOverview } from "../../components/AssessmentPage/utils/getQuestionStatus";
import { colors } from "../colors.config";

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
    ],
    [
        { type: "highlight", elementType: "point", id: "A", color: "blue" },
        { type: "highlight", elementType: "edge", id: { from: "A", to: "B" }, color: "orange" },
    ]
];

const TestOverviewPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [showMobileNav, setShowMobileNav] = useState(false);
    const isMobile = useIsMobile();
    const isSmallMobile = useIsSmallMobile();

    // Add ref for main content container
    const mainContentRef = useRef<HTMLDivElement>(null!)

    // Mock test results - in a real app, this would come from the backend
    const testResults = {
        totalQuestions: 25,
        correctAnswers: 20,
        incorrectAnswers: 5,
        score: 80, // percentage
        timeSpent: "78 minutes",
        testDate: "15 декември 2024"
    };

    // Mock questions with results - in a real app, this would come from the backend
    const questions: QuestionType[] = [
        {
            position: 1,
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
            solutionSteps: [
                { id: 1, title: "Общ знаменател", exerciseText: "Най-малкият общ знаменател на 3 и 6 е 6.", solutionText: "Най-малкият общ знаменател на 3 и 6 е 6." },
                { id: 2, title: "Приравняване", exerciseText: "$\\frac{2}{3} = \\frac{4}{6}$; $\\frac{1}{6}$ остава същото.", solutionText: "$\\frac{2}{3} = \\frac{4}{6}$; $\\frac{1}{6}$ остава същото." },
                { id: 3, title: "Събиране", exerciseText: "$\\frac{4}{6} + \\frac{1}{6} = \\frac{5}{6}$.", solutionText: "$\\frac{4}{6} + \\frac{1}{6} = \\frac{5}{6}$." },
                { id: 4, title: "Извод", exerciseText: "Отговор: $\\frac{5}{6}$.", solutionText: "Отговор: $\\frac{5}{6}$." }
            ]
        },
        {
            position: 2,
            statement: "В правоъгълник ABCD са построени точки K и M съгласно дадената конструкция. Докажете, че триъгълник DMK е равнобедрен и намерете мерките на ъглите му.",
            type: "text",
            correctAnswer: "Триъгълникът DMK е равнобедрен с ъгли 60°, 60°, 60°",
            userAnswer: "Триъгълникът DMK е равнобедрен с ъгли 60°, 60°, 60°",
            points: 1,
            solutionSteps: [
                { id: 1, title: "Добавяне на помощни елементи", exerciseText: "Построяваме точки D и K, свързваме ги с C и B чрез пунктирани линии и отбелязваме ъглите BDC и BKC.", solutionText: "Построяваме точки D и K, свързваме ги с C и B чрез пунктирани линии и отбелязваме ъглите BDC и BKC." },
                { id: 2, title: "Създаване на равни отсечки", exerciseText: "Построяваме точка M по BC, така че BM = MC, и отбелязваме отсечките като равни.", solutionText: "Построяваме точка M по BC, така че BM = MC, и отбелязваме отсечките като равни." },
                { id: 3, title: "Построяване на триъгълник", exerciseText: "Премахваме ъглите BDC и BKC и свързваме D, M и K с оцветени в синьо линии.", solutionText: "Премахваме ъглите BDC и BKC и свързваме D, M и K с оцветени в синьо линии." },
                { id: 4, title: "Отбелязване на нови ъгли", exerciseText: "Премахваме линията BK, отбелязваме ъглите DBM и BDM и добавяме страната DM.", solutionText: "Премахваме линията BK, отбелязваме ъглите DBM и BDM и добавяме страната DM." },
                { id: 5, title: "Подчертаване на важни елементи", exerciseText: "Маркираме точка A в синьо и страната AB в оранжево, за да акцентираме върху тях.", solutionText: "Маркираме точка A в синьо и страната AB в оранжево, за да акцентираме върху тях." }
            ],
            diagramData: baseDiagram,
            diagramSteps: exampleSteps
        },
        {
            position: 3,
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
                { id: 1, title: "Съкращаване на дробта", exerciseText: "$\\frac{x^3}{x^2} = x^{3-2} = x^1$.", solutionText: "$\\frac{x^3}{x^2} = x^{3-2} = x^1$." },
                { id: 2, title: "Прилагане на степента", exerciseText: "$(x^1)^{-6} = x^{-6}$.", solutionText: "$(x^1)^{-6} = x^{-6}$." },
                { id: 3, title: "Събиране на показателите", exerciseText: "$x^3 \\cdot x^{-6} = x^{3-6} = x^{-3}$.", solutionText: "$x^3 \\cdot x^{-6} = x^{3-6} = x^{-3}$." },
                { id: 4, title: "Замяна на $x$", exerciseText: "$(-3)^{-3} = \\frac{1}{(-3)^3} = \\frac{1}{-27}$.", solutionText: "$(-3)^{-3} = \\frac{1}{(-3)^3} = \\frac{1}{-27}$." },
            ]
        },
        {
            position: 4,
            statement: "Изчислете: 15 + 28 - 12 × 2",
            type: "text",
            correctAnswer: "19",
            userAnswer: "19",
            points: 1
        },
        {
            position: 5,
            statement: "Какъв е периметърът на квадрат с дължина на страната 6 cm?",
            type: "multiple",
            options: ["12 cm", "24 cm", "36 cm", "18 cm"],
            correctAnswer: "24 cm",
            userAnswer: "24 cm",
            points: 1
        },
        {
            position: 6,
            statement: "Опростете: 2(x + 3) - 4",
            type: "text",
            correctAnswer: "2x + 2",
            userAnswer: "2x + 2",
            points: 1
        },
        {
            position: 7,
            statement: "Преобразувайте 0.6 в дроб в най-ниската форма.",
            type: "text",
            correctAnswer: "3/5",
            userAnswer: "6/10",
            points: 1
        },
        {
            position: 8,
            statement: "Кой ъгъл е по-голям от 90°, но по-малък от 180°?",
            type: "multiple",
            options: ["Acute angle", "Right angle", "Obtuse angle", "Straight angle"],
            correctAnswer: "Obtuse angle",
            userAnswer: "Obtuse angle",
            points: 1
        },
        {
            position: 9,
            statement: "Намерете стойността на y: 2y - 5 = 11",
            type: "text",
            correctAnswer: "8",
            userAnswer: "8",
            points: 1
        },
        {
            position: 10,
            statement: "Колко е 25% от 80?",
            type: "text",
            correctAnswer: "20",
            userAnswer: "20",
            points: 1
        },
        {
            position: 11,
            statement: "Колко е стойността на π (пи) с точност до две десетични места?",
            type: "text",
            correctAnswer: "3.14",
            userAnswer: "3.14",
            points: 1
        },
        {
            position: 12,
            statement: "Кое от следните е просто число?",
            type: "multiple",
            options: ["15", "21", "23", "27"],
            correctAnswer: "23",
            userAnswer: "23",
            points: 1
        },
        {
            position: 13,
            statement: "Изчислете площта на кръг с радиус 4 cm.",
            type: "text",
            correctAnswer: "50.24 cm²",
            userAnswer: "50.24 cm²",
            points: 1
        },
        {
            position: 14,
            statement: "Колко е наклона на линията y = 2x + 3?",
            type: "text",
            correctAnswer: "2",
            userAnswer: "2",
            points: 1
        },
        {
            position: 15,
            statement: "Кое от следните е еквивалентно на 2/3?",
            type: "multiple",
            options: ["4/6", "6/9", "8/12", "All of the above"],
            correctAnswer: "All of the above",
            userAnswer: "All of the above",
            points: 1
        },
        {
            position: 16,
            statement: "Решете уравнението: 2x + 5 = 13",
            type: "text",
            correctAnswer: "4",
            userAnswer: "4",
            points: 1
        },
        {
            position: 17,
            statement: "Какъв е периметърът на правоъгълник с дължина 10 cm и ширина 6 cm?",
            type: "text",
            correctAnswer: "32 cm",
            userAnswer: "32 cm",
            points: 1
        },
        {
            position: 18,
            statement: "Кое от следните е делител на 24?",
            type: "multiple",
            options: ["5", "7", "8", "9"],
            correctAnswer: "8",
            userAnswer: "8",
            points: 1
        },
        {
            position: 19,
            statement: "Преобразувайте 3/5 в десетична дроб.",
            type: "text",
            correctAnswer: "0.6",
            userAnswer: "0.6",
            points: 1
        },
        {
            position: 20,
            statement: "Колко е стойността на x в уравнението: 3x - 7 = 8",
            type: "text",
            correctAnswer: "5",
            userAnswer: "5",
            points: 1
        },
        {
            position: 21,
            statement: "Кой от следните ъгли измерва 90 градуса?",
            type: "multiple",
            options: ["Acute angle", "Right angle", "Obtuse angle", "Straight angle"],
            correctAnswer: "Right angle",
            userAnswer: "Right angle",
            points: 1
        },
        {
            position: 22,
            statement: "Изчислете: 15 × 4 ÷ 2 + 7",
            type: "text",
            correctAnswer: "37",
            userAnswer: "37",
            points: 1
        },
        {
            position: 23,
            statement: "Колко е 20% от 150?",
            type: "text",
            correctAnswer: "30",
            userAnswer: "30",
            points: 1
        },
        {
            position: 24,
            statement: "Кое от следните е кратно на 6?",
            type: "multiple",
            options: ["14", "18", "22", "26"],
            correctAnswer: "18",
            userAnswer: "18",
            points: 1
        },
        {
            position: 25,
            statement: "Опростете израза: 2(x + 4) - 3x",
            type: "text",
            correctAnswer: "-x + 8",
            userAnswer: "-x + 8",
            points: 1
        }
    ];

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



    return (
        <div className="min-h-screen bg-gray-50 mx-auto">
            {/* Mobile Header - Outside scrollable container */}

            <AssessmentOverviewMobileHeader
                isMobile={isMobile}
                showMobileNav={showMobileNav}
                setShowMobileNav={setShowMobileNav}
                Icon={BookOpen}
                iconColor="text-[#6F58C9]"
                correctAnswers={testResults.correctAnswers}
                totalQuestions={testResults.totalQuestions}
            />


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
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">Преглед на теста</h1>
                                <p className="text-gray-600">Прегледайте вашите отговори и резултати</p>
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
                        title="Резултати от теста"
                        badge={{
                            icon: <BookOpen className="h-3.5 w-3.5" />,
                            label: "Тест",
                            bgColor: "bg-purple-100",
                            textColor: "text-purple-800",
                        }}
                        results={{
                            date: testResults.testDate,
                            timeSpent: testResults.timeSpent,
                            correctAnswers: testResults.correctAnswers,
                            totalQuestions: testResults.totalQuestions,
                            score: testResults.score,
                        }}
                        timeColor="text-purple-500"
                        timeTextColor="text-purple-700"
                    />


                    {/* Questions Navigator Grid - Centered */}
                    <div className={`${isMobile ? 'flex-1 overflow-y-auto' : 'flex-1'} flex items-start justify-center`}>
                        <QuestionsNavigatorGrid
                            answers={answers}
                            totalQuestions={questions.length}
                            getQuestionStatus={(questionNum) => getQuestionStatusOverview(questions, questionNum)}
                            currentQuestion={currentQuestion}
                            setShowMobileNav={setShowMobileNav}
                            navigatorColors={colors.navigator}
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

export default TestOverviewPage;
