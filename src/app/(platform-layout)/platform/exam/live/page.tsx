import type { Question as QuestionType } from "@/types";
import AssessmentLive from "@/features/assessments/live/components/AssessmentLive";
import { colors } from "../colors.config";
import { getClient } from "@/lib/apollo-rsc";
import { GetMyAssessmentDocument } from "@/services/gql/graphql";

// Server Component: fetches assessment data on the server via Apollo getClient()
const LiveExamPage = async () => {
    const assessmentId = process.env.NEXT_PUBLIC_ASSESSMENT_ID as string | undefined;

    let title = "Изпит";
    let questions: QuestionType[] = [];
    let derivedError: Error | null = null;

    if (!assessmentId) {
        derivedError = new Error("Missing NEXT_PUBLIC_ASSESSMENT_ID");
    } else {
        try {
            const { data } = await getClient().query({
                query: GetMyAssessmentDocument,
                variables: { assessmentId },
                fetchPolicy: "no-cache",
            });

            title = data?.getMyAssessment?.title ?? title;
            const items = data?.getMyAssessment?.questions ?? [];
            // Transform API response to the UI-friendly QuestionType expected by AssessmentLive
            questions = items.map((q: {
                position: number;
                question: {
                    statement: string;
                    type: 'MULTIPLE' | 'TEXT';
                    points?: number | null;
                    options?: string[] | null;
                };
            }) => ({
                position: q.position,
                statement: q.question.statement,
                type: q.question.type === 'MULTIPLE' ? 'multiple' : 'text',
                options: q.question.options ?? undefined,
                points: q.question.points ?? undefined,
            }));
        } catch (e) {
            derivedError = e as Error;
        }
    }
    console.error(derivedError);

    return (
        <AssessmentLive
            questions={questions}
            title={title}
            subtitle="Отговорете на всички въпроси в рамките на 90 минути"
            overviewRedirectUrl="/platform/exam/overview"
            colors={{
                ...colors,
                submitDialog: {
                    primary: "emerald-600",
                    primaryHover: "emerald-700"
                }
            }}
            loading={false}
        />
    );
};

export default LiveExamPage;