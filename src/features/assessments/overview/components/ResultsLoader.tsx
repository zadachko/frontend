'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import AssessmentLoading from '@/components/common/AssessmentLoading';
import noAssessment from '@/components/common/noAssessment';
import { GraduationCap } from 'lucide-react';
import { useGetMyAssessmentQuery } from '@/services/gql/operations';
import { Question as QuestionType } from '@/types';
import { AssessmentResults } from '@/features/assessments/overview/components/AssessmentOverview';
import AssessmentOverview from '@/features/assessments/overview/components/AssessmentOverview';
import type * as ExamColors from '@/app/(platform-layout)/platform/exam/colors.config';
import type * as TestColors from '@/app/(platform-layout)/platform/test/colors.config';

type AssessmentColors = typeof ExamColors.colors | typeof TestColors.colors;

const isAssessmentIdProvided = (assessmentId: string | null): assessmentId is string => {
    return typeof assessmentId === 'string' && assessmentId !== '';
};

const ResultsLoader = ({ colors }: { colors: AssessmentColors }) => {
    const searchParams = useSearchParams();
    const assessmentId = searchParams.get('assessmentId');

    const validAssessmentId = isAssessmentIdProvided(assessmentId);

    const { data, loading, error } = useGetMyAssessmentQuery({
        variables: validAssessmentId ? { assessmentId } : undefined,
        skip: !validAssessmentId,
    });

    if (!validAssessmentId) return noAssessment();

    if (loading) {
        return <AssessmentLoading text="Зареждане на резултатите..." />;
    }

    // Handle error state
    if (error || !data) {
        return noAssessment();
    }

    const questions: QuestionType[] =
        data?.getMyAssessment?.questions?.map((assessmentQuestion) => ({
            position: assessmentQuestion.position,
            statement: assessmentQuestion.question.statement,
            type: assessmentQuestion.question.type === 'MULTIPLE' ? 'multiple' : 'text',
            options: assessmentQuestion.question.options || [],
            correctAnswer: '12', // This would come from the backend
            userAnswer: '11', // This would come from user's submission
            points: assessmentQuestion.question.points || 1,
            solutionSteps: [], // This would come from the backend
            diagramData: undefined, // This would come from the backend
            diagramSteps: undefined, // This would come from the backend
        })) || [];

    // Calculate exam results from the data
    const examResults: AssessmentResults = {
        totalQuestions: questions.length,
        correctAnswers: questions.filter((q) => q.userAnswer === q.correctAnswer).length,
        incorrectAnswers: questions.filter((q) => q.userAnswer && q.userAnswer !== q.correctAnswer).length,
        score:
            questions.length > 0
                ? Math.round(
                    (questions.filter((q) => q.userAnswer === q.correctAnswer).length / questions.length) * 100
                )
                : 0,
        timeSpent: '85 минути', // This would come from the backend
        examDate: '15 декември 2024', // This would come from the backend
    };

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
                label: 'Матура',
                bgColor: 'bg-emerald-100',
                textColor: 'text-emerald-800',
            }}
            timeColor="text-blue-500"
            timeTextColor="text-blue-700"
            navigatorColors={colors.navigator}
        />
    );
};

export default ResultsLoader;
