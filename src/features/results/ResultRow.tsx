'use client';

import { Card, CardContent } from '@/components/ui/card';
import { TestTube2, GraduationCap, Clock, CheckCircle2, CalendarDays, Dot } from 'lucide-react';
import type { TestResult } from '@/types';
import { useRouter } from 'next/navigation';

interface ResultRowProps {
    result: TestResult;
    onClick?: () => void;
    hideIcon?: boolean;
}

export const ResultRow = ({ result, onClick }: ResultRowProps) => {
    const router = useRouter();
    const isExam = result.type.toLowerCase() === 'exam';

    const getProgressColor = (score: number) => {
        if (score >= 80) return '#10b981';
        if (score >= 60) return '#f59e0b';
        return '#ef4444';
    };

    const getGrade = (percentage: number): string => {
        const grade = (2 + (percentage / 100) * 4).toFixed(2);
        return grade;
    };

    // tiny reusable chip (replaces the big square icon + loud badge)
    const TypeChip = () => (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                isExam ? 'bg-emerald-100 text-emerald-800' : 'bg-violet-100 text-violet-800'
            }`}
        >
            {isExam ? <GraduationCap className="h-3.5 w-3.5" /> : <TestTube2 className="h-3.5 w-3.5" />}
            {isExam ? 'Матура' : 'Тест'}
        </span>
    );

    const handleClick = () => {
        if (onClick) {
            onClick();
            return;
        }
        router.push(`/platform/exam/overview?assessmentId=${result.id}`);
    };

    return (
        <Card
            className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 bg-white border border-gray-200 cursor-pointer py-3 lg:py-4"
            onClick={handleClick}
        >
            <CardContent className="p-3 sm:px-6 sm:py-4">
                <div className="flex items-center justify-between gap-3 sm:gap-6">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 sm:gap-3 mb-0 sm:mb-1.5">
                            <TypeChip />
                            <h3 className="font-semibold text-gray-900 text-[15px] sm:text-[17px] leading-5 sm:leading-6 truncate">
                                {result.title}
                            </h3>
                        </div>

                        <div className="mt-2 flex items-center flex-wrap gap-x-1.5 sm:gap-x-1 gap-y-1 text-[12px] sm:text-sm text-gray-600">
                            <span className="inline-flex items-center gap-1.5">
                                <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                                {result.date}
                            </span>

                            <Dot className="w-4 h-4 sm:w-5 sm:h-5 -mx-1 text-gray-300" />
                            <span className="inline-flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span className="text-gray-700">{result.duration}</span>
                            </span>

                            <Dot className="w-4 h-4 sm:w-5 sm:h-5 -mx-1 text-gray-300" />
                            <span className="inline-flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span className="text-gray-700 font-medium">
                                    {result.correctAnswers}/{result.totalQuestions}
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#e5e7eb"
                                strokeWidth="2"
                            />
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke={getProgressColor(result.percentage)}
                                strokeWidth="2"
                                strokeDasharray={`${result.percentage}, 100`}
                                strokeLinecap="round"
                                className="transition-all duration-500 origin-center"
                            />
                        </svg>
                        <div className="absolute inset-0 grid place-items-center">
                            <span className="text-xs sm:text-[15px] font-semibold text-gray-900">
                                {getGrade(result.percentage)}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
