"use client"

import ResultsLoader from "@/features/assessments/overview/components/ResultsLoader";
import { colors } from "../colors.config";
const ExamOverviewPage = () => {


    return <ResultsLoader colors={colors} />
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