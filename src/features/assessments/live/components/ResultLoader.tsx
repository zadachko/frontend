
import React from 'react';
import { getClient } from '@/lib/apollo-rsc';
import { GetMyAssessmentDocument } from '@/services/gql/graphql';
import AssessmentLoading from '@/components/common/AssessmentLoading';
import NoAssessment from '@/components/common/noAssessment';
import AssessmentLive from './AssessmentLive';
import { colors } from '@/app/(platform-layout)/platform/exam/colors.config';

const isAssessmentIdProvided = (assessmentId: string | null): assessmentId is string => {
    return typeof assessmentId === 'string' && assessmentId !== '';
};


const ResultLoader = async ({ searchParams }: { searchParams: { assessmentId: string } }) => {
    const { assessmentId } = await searchParams;

    const validAssessmentId = isAssessmentIdProvided(assessmentId);

    if (!validAssessmentId) {
        return <NoAssessment />;
    }
    try {
        const apolloClient = await getClient();

        const { data, loading, error } = await apolloClient.query({
            query: GetMyAssessmentDocument,
            variables: { assessmentId: assessmentId },
            fetchPolicy: 'no-cache',
        });


        if (loading) {
            return <AssessmentLoading text="Зареждане на резултатите..." />;
        }
        if (error) {
            console.error('GraphQL error:', error);
            throw error;
        }
        if (!data) {
            throw new Error('No data returned from the query');
        }

        const questions = data?.getMyAssessment?.questions?.map(
            (q: {
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
                type: q.question.type === 'MULTIPLE' ? 'multiple' : 'text' as 'multiple' | 'text',
                options: q.question.options ?? undefined,
                points: q.question.points ?? undefined,
            })
        ) ?? [];
        // return <div>ResultLoader</div>;
        return <AssessmentLive
            questions={questions}
            title={data?.getMyAssessment?.title ?? ''}
            subtitle="Отговорете на всички въпроси в рамките на 90 минути"
            overviewRedirectUrl="/platform/exam/overview"
            colors={{
                ...colors,
                submitDialog: {
                    primary: 'emerald-600',
                    primaryHover: 'emerald-700',
                },
            }}
            loading={false}
        />
    } catch (err) {
        console.error('Query failed:', err);
        return <NoAssessment />;
    }

};

export default ResultLoader;