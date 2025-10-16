import { colors } from '../colors.config';
// import { colors } from '@/app/(platform-layout)/platform/exam/colors.config';
import ResultLoader from '@/features/assessments/live/components/ResultLoader';
import { Suspense } from 'react';
import AssessmentLoading from '@/components/common/AssessmentLoading';

const LiveExamPage = async ({ searchParams }: { searchParams: { assessmentId: string } }) => {
    return (
        <Suspense fallback={<AssessmentLoading text="Зареждане на изпита..." />}>
            <ResultLoader colors={colors} searchParams={searchParams} />
        </Suspense>
    );
};

export default LiveExamPage;
