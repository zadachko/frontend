'use client';

import type { Question as QuestionType } from "@/types";
import { useGetExamLiveQuery } from "@/gql/operations";
import AssessmentLive from "../../components/AssessmentPage/AssessmentLive";
import AssessmentLoading from "../../components/LoadingScreens/AssessmentLoading";
import AssessmentError from "../../components/ErrorScreens/AssessmentError";
import { colors } from "../colors.config";
const LiveExamPage = () => {
    const { data, loading, error } = useGetExamLiveQuery({
        variables: { examId: '7cc7462e-f307-4f0a-b418-fcfecd5dacfb' },
    });

    // Transform server data to match Question type
    const questions: QuestionType[] = data?.getExam?.examQuestions?.map((examQuestion, index: number) => ({
        position: index + 1,
        statement: examQuestion.question.statement,
        type: examQuestion.question.type === 'MULTIPLE' ? 'multiple' : 'text',
        options: examQuestion.question.options || [],
        points: examQuestion.question.points || 1,
    })) || [];

    return (
        <AssessmentLive
            questions={questions}
            title="Изпит"
            subtitle="Отговорете на всички въпроси в рамките на 90 минути"
            overviewRedirectUrl="/platform/exam/overview"
            colors={{
                ...colors,
                submitDialog: {
                    primary: "emerald-600",
                    primaryHover: "emerald-700"
                }
            }}
            loading={loading}
            error={error}
            LoadingComponent={AssessmentLoading}
            ErrorComponent={AssessmentError}
        />
    );
};

export default LiveExamPage;