"use client"

import { useState, useRef } from "react";
import { GraduationCap } from "lucide-react";
import Question from "@/app/(platform-layout)/platform/components/Question/Question";
import { QuestionsNavigatorGrid } from "@/app/(platform-layout)/platform/components/QuestionsNavigatorGrid/QuestionsNavigatorGrid";
import { useIsMobile, useIsSmallMobile } from "@/hooks/isMobile";
import AssessmentOverviewSidebar from "../../components/AssessmentPage/AssessmentOverviewSidebar";
import AssessmentOverviewMobileHeader from "../../components/AssessmentPage/AssessmentOverviewMobileHeader";
import { useGetExamOverviewQuery } from "@/gql/operations";
import handleSidebarScroll from "../../components/AssessmentPage/utils/handleSidebarScroll";
import type { Question as QuestionType } from "@/types"
import { getQuestionStatusOverview } from "../../components/AssessmentPage/utils/getQuestionStatus";

const ExamOverviewPage = () => {
    const { data, loading, error } = useGetExamOverviewQuery({
        variables: { getExamId: '4b0c1676-a275-4ed9-9853-52a7cfcdb231' },
    });

    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [showMobileNav, setShowMobileNav] = useState(false);
    const isMobile = useIsMobile();
    const isSmallMobile = useIsSmallMobile();

    // Add ref for main content container
    const mainContentRef = useRef<HTMLDivElement>(null!)

    // Transform server data to match Question type
    const questions: QuestionType[] = data?.getExam?.examQuestions?.map((examQuestion, index: number) => ({
        id: index + 1,
        statement: examQuestion.question.statement,
        type: examQuestion.question.type === 'MULTIPLE' ? 'multiple' : 'text',
        options: examQuestion.question.options || [],
        correctAnswer: examQuestion.question.correctAnswer || '12',
        userAnswer: examQuestion.question.userAnswer || '11',
        points: examQuestion.question.points || 1,
        solutionSteps: examQuestion.question.solutionSteps?.map((step, stepIndex) => ({
            id: stepIndex + 1,
            title: step.action,
            exerciseText: step.explanation || '',
            solutionText: step.result,
        })) || [],
        diagramData: examQuestion.question.diagramData ? {
            points: examQuestion.question.diagramData.reduce((acc, point) => {
                acc[point.id] = { x: point.x, y: point.y };
                return acc;
            }, {} as { [key: string]: { x: number; y: number } }),
            edges: [],
            sides: [],
            angles: []
        } : undefined,
        diagramSteps: undefined, // TODO: Map diagramSteps properly if needed
    })) || [];

    // Calculate exam results from the data
    const examResults = {
        totalQuestions: questions.length,
        correctAnswers: questions.filter(q => q.userAnswer === q.correctAnswer).length,
        incorrectAnswers: questions.filter(q => q.userAnswer && q.userAnswer !== q.correctAnswer).length,
        score: questions.length > 0 ? Math.round((questions.filter(q => q.userAnswer === q.correctAnswer).length / questions.length) * 100) : 0,
        timeSpent: "85 минути", // This would come from the backend
        examDate: "15 декември 2024" // This would come from the backend
    };

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



    // Function to handle navigation to a specific question
    const goToQuestion = (questionNum: number) => {
        setCurrentQuestion(questionNum);
        // Scroll to the question element
        const questionElement = document.getElementById(`question-${questionNum}`);
        if (questionElement) {
            questionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Close mobile nav when navigating to a question
        if (isMobile) {
            setShowMobileNav(false);
        }
    };

    const toggleMobileNav = () => {
        setShowMobileNav(!showMobileNav);
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

    // Handle loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center w-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Зареждане на резултатите...</p>
                </div>
            </div>
        );
    }

    // Handle error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center w-screen">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Грешка при зареждане на резултатите</p>
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
                    <p className="text-gray-600">Няма налични резултати за този изпит</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 mx-auto">
            {/* Mobile Header - Outside scrollable container */}

            <AssessmentOverviewMobileHeader
                isMobile={isMobile}
                showMobileNav={showMobileNav}
                toggleMobileNav={toggleMobileNav}
                Icon={GraduationCap}
                iconColor="text-emerald-600"
                correctAnswers={examResults.correctAnswers}
                totalQuestions={examResults.totalQuestions}
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
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">Преглед на изпита</h1>
                                <p className="text-gray-600">Прегледайте вашите отговори и резултати</p>
                            </div>
                        )}

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
                    <div className="p-6 border-b border-gray-200">
                        <div className="space-y-4">
                            {/* Main Score Card - Similar to ResultRow */}

                            <AssessmentOverviewSidebar
                                title="Резултати от изпита"
                                badge={{
                                    icon: <GraduationCap className="h-3.5 w-3.5" />,
                                    label: "Матура",
                                    bgColor: "bg-emerald-100",
                                    textColor: "text-emerald-800",
                                }}
                                results={{
                                    date: examResults.examDate,
                                    timeSpent: examResults.timeSpent,
                                    correctAnswers: examResults.correctAnswers,
                                    totalQuestions: examResults.totalQuestions,
                                    score: examResults.score,
                                }}
                                timeColor="text-blue-500"
                                timeTextColor="text-blue-700"
                            />

                        </div>
                    </div>

                    {/* Questions Navigator Grid - Centered */}
                    <div className={`${isMobile ? 'flex-1 overflow-y-auto' : 'flex-1'} flex items-start justify-center`}>
                        <QuestionsNavigatorGrid
                            answers={answers}
                            totalQuestions={questions.length}
                            getQuestionStatus={(questionNum) => getQuestionStatusOverview(questions, questionNum)}
                            currentQuestion={currentQuestion}
                            goToQuestion={goToQuestion}
                            setShowMobileNav={setShowMobileNav}
                            colors={navigatorColors}
                            reviewMode={true}
                            isMobile={isMobile}
                            isSmallMobile={isSmallMobile}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamOverviewPage;