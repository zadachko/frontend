"use client"

import { GraduationCap } from "lucide-react";
import { useGetExamOverviewQuery } from "@/gql/operations";
import type { Question as QuestionType } from "@/types";
import AssessmentOverview, { type AssessmentResults } from "../../components/AssessmentPage/AssessmentOverview";
import AssessmentLoading from "../../components/LoadingScreens/AssessmentLoading";
import AssessmentError from "../../components/ErrorScreens/AssessmentError";
import { colors } from "../colors.config";
const ExamOverviewPage = () => {
    const { data, loading, error } = useGetExamOverviewQuery({
        variables: { getExamId: '943abe29-d104-4322-9239-f0afd8938541' },
    });

    // Transform server data to match Question type
    const questions: QuestionType[] = data?.getExam?.examQuestions?.map((examQuestion, index: number) => ({
        position: index + 1,
        statement: examQuestion.question.statement,
        type: examQuestion.question.type === 'MULTIPLE' ? 'multiple' : 'text',
        options: examQuestion.question.options || [],
        correctAnswer: examQuestion.question.correctAnswer || '12',
        userAnswer: '11',
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
    const examResults: AssessmentResults = {
        totalQuestions: questions.length,
        correctAnswers: questions.filter(q => q.userAnswer === q.correctAnswer).length,
        incorrectAnswers: questions.filter(q => q.userAnswer && q.userAnswer !== q.correctAnswer).length,
        score: questions.length > 0 ? Math.round((questions.filter(q => q.userAnswer === q.correctAnswer).length / questions.length) * 100) : 0,
        timeSpent: "85 минути", // This would come from the backend
        examDate: "15 декември 2024" // This would come from the backend
    };

    // Handle loading state
    if (loading) {
        return <AssessmentLoading text="Зареждане на резултатите..." />;
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
                    <p className="text-gray-600">Няма налични резултати за този изпит</p>
                </div>
            </div>
        );
    }

    return (
        <AssessmentOverview
            questions={questions}
            results={examResults}
            title="Преглед на изпита"
            subtitle="Прегледайте вашите отговори и резултати"
            Icon={GraduationCap}
            iconColor="text-emerald-600"
            badge={{
                icon: <GraduationCap className="h-3.5 w-3.5" />,
                label: "Матура",
                bgColor: "bg-emerald-100",
                textColor: "text-emerald-800",
            }}
            timeColor="text-blue-500"
            timeTextColor="text-blue-700"
            navigatorColors={colors.navigator}
            loading={loading}
            error={error}
            LoadingComponent={AssessmentLoading}
            ErrorComponent={AssessmentError}
        />
    );
};

export default ExamOverviewPage;