'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Clock, FileText, AlertCircle, CheckCircle, Play, Target } from 'lucide-react';
import ExamRule from '@/components/common/ExamRule';
import { useState } from 'react';
import PreviousResultsCard from '@/features/assessments/resource-choice/components/PreviousResultsCard';
import AssessmentStartFlow from '@/features/assessments/resource-choice/components/AssessmentStartFlow';
import { useCreateAssessmentMutation } from '@/services/gql/operations';

const Page = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [createAssessment, { loading: createAssessmentLoading }] = useCreateAssessmentMutation();

    // Green color scheme for exam page
    const greenColors = {
        buttonGradient: 'from-emerald-500 to-teal-600',
        buttonHoverGradient: 'hover:from-emerald-600 hover:to-teal-700',
        iconBg: 'bg-amber-50',
        iconColor: 'text-amber-600',
    };

    const examRules = [
        {
            icon: Clock,
            text: '90 минути време с видим таймер',
        },
        {
            icon: FileText,
            text: '25 въпроса с избираем отговор покриващи всички теми',
        },
        {
            icon: AlertCircle,
            text: 'Няма връщане назад - отговорите са финални след подаване',
        },
        {
            icon: CheckCircle,
            text: 'Автоматично подаване при изтичане на времето',
        },
    ];

    // Mock previous exam results
    const previousResults = [
        {
            id: 1,
            date: '15.12.2024',
            score: 85,
            totalQuestions: 25,
            correctQuestions: 21,
            timeSpent: '75 мин',
        },
        {
            id: 2,
            date: '08.12.2024',
            score: 72,
            totalQuestions: 25,
            correctQuestions: 18,
            timeSpent: '82 мин',
        },
        {
            id: 3,
            date: '01.12.2024',
            score: 68,
            totalQuestions: 25,
            correctQuestions: 17,
            timeSpent: '88 мин',
        },
    ];

    const handleStartExam = () => {
        setIsDialogOpen(true);
    };

    const HandleConfirmExam = async () => {
        try {
            const result = await createAssessment({
                variables: {
                    input: {
                        title: 'Пробен Изпит',
                        type: 'TONI',
                    },
                },
            });

            if (result.errors) {
                throw new Error('Create assessment error: ' + result.errors[0].message);
            }

            if (!result.data) {
                throw new Error('The server did not return a valid assessment response');
            }

            console.log('Create assessment data:', result.data);
            setIsDialogOpen(false);
            window.location.href = '/platform/exam/live?assessmentId=' + result.data.createAssessment.id;
        } catch (error) {
            console.error('Error creating assessment:', error);
            // Handle error appropriately - maybe show a toast or error message
        }

    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-2 sm:p-4 mx-auto">
            <div className="w-full max-w-7xl">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                    {/* Main Exam Card */}
                    <div className="xl:col-span-2">
                        <Card className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 shadow-sm h-full">
                            <CardContent className="p-4 sm:p-6 lg:p-8 text-center h-full flex flex-col justify-center">
                                <div className="mb-4 sm:mb-6">
                                    <div className="inline-flex p-2 sm:p-3 rounded-full bg-emerald-50 mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-300">
                                        <Play className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                                    </div>
                                    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2 sm:mb-3">
                                        Пробен Изпит
                                    </h1>
                                    <p className="text-gray-600 text-base sm:text-lg mb-4 sm:mb-6">
                                        Тествай знанията си по математика за 7-ми клас
                                    </p>
                                </div>

                                {/* Rules */}
                                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 lg:p-5 mb-4 sm:mb-6 border border-gray-100">
                                    <h2 className="text-lg sm:text-xl font-medium text-gray-900 mb-3 sm:mb-4 flex items-center justify-center gap-2">
                                        <Target className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                                        Правила на Изпита
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-left">
                                        {examRules.map((rule, index) => (
                                            <ExamRule key={index} rule={rule} index={index} />
                                        ))}
                                    </div>
                                </div>

                                <AssessmentStartFlow
                                    isDialogOpen={isDialogOpen}
                                    setIsDialogOpen={setIsDialogOpen}
                                    handleStartExam={handleStartExam}
                                    handleConfirmExam={HandleConfirmExam}
                                    colors={greenColors}
                                    loading={createAssessmentLoading}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Previous Results Sidebar */}
                    <PreviousResultsCard previousResults={previousResults} color="#10B981" />
                </div>
            </div>
        </div>
    );
};

export default Page;
