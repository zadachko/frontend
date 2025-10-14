"use client"

import ResultsLoader from "@/features/assessments/overview/components/ResultsLoader";
import { colors } from "../colors.config";
import { Suspense } from "react";
const ExamOverviewPage = () => {


    return (
        <Suspense fallback={<div className="p-6">Зареждане...</div>}>
            <ResultsLoader colors={colors} />
        </Suspense>
    );
    // return (
    // <AssessmentOverview
    //     questions={questions}
    //     results={examResults}
    //     title="Преглед на изпита"
    //     subtitle="Прегледайте вашите отговори и резултати"
    //     Icon={GraduationCap}
    //     iconColor="text-emerald-600"
    //     badge={{
    //         icon: <GraduationCap className="h-3.5 w-3.5" />,
    //         label: "Матура",
    //         bgColor: "bg-emerald-100",
    //         textColor: "text-emerald-800",
    //     }}
    //     timeColor="text-blue-500"
    //     timeTextColor="text-blue-700"
    //     navigatorColors={colors.navigator}
    //     loading={loading}
    //     error={error}
    //     LoadingComponent={AssessmentLoading}
    //     ErrorComponent={AssessmentError}
    // />
    // );
};

export default ExamOverviewPage;