'use client';

import { colors } from '../colors.config';
import ResultsLoader from '@/features/assessments/overview/components/ResultsLoader';
import { Suspense } from 'react';

const TestOverviewPage = () => {
    return (
        <Suspense fallback={<div className="p-6">Зареждане...</div>}>
            <ResultsLoader colors={colors} />
        </Suspense>
    );
};
{
    /* <AssessmentOverview
    questions={questions}
    results={testResults}
    title="Преглед на теста"
    subtitle="Прегледайте вашите отговори и резултати"
    Icon={BookOpen}
    iconColor="text-[#6F58C9]"
    badge={{
        icon: <BookOpen className="h-3.5 w-3.5" />,
        label: "Тест",
        bgColor: "bg-purple-100",
        textColor: "text-purple-800",
    }}
    timeColor="text-purple-500"
    timeTextColor="text-purple-700"
    navigatorColors={colors.navigator}
/> */
}

export default TestOverviewPage;
