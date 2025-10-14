// components/ResultsCard.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { ReactNode } from 'react';

interface AssessmentOverviewSidebarProps {
    title: string; // "Резултати от теста" / "Резултати от изпита"
    badge: {
        icon: ReactNode;
        label: string;
        bgColor: string; // e.g. "bg-purple-100"
        textColor: string; // e.g. "text-purple-800"
    };
    results: {
        date: string;
        timeSpent: string;
        correctAnswers: number;
        totalQuestions: number;
        score: number;
    };
    timeColor: string; // e.g. "text-purple-500"
    timeTextColor: string; // e.g. "text-purple-700"
}

export default function AssessmentOverviewSidebar({
    title,
    badge,
    results,
    timeColor,
    timeTextColor,
}: AssessmentOverviewSidebarProps) {
    return (
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-4 pt-0">
                {/* Title */}
                <div className="flex justify-center mb-4">
                    <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
                </div>

                <div className="flex items-center justify-between">
                    {/* Left Info */}
                    <div className="flex-1 min-w-0 pr-4">
                        <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${badge.bgColor} ${badge.textColor} mb-3`}
                        >
                            {badge.icon}
                            {badge.label}
                        </span>

                        <div className="flex flex-col gap-2 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-gray-500" />
                                <span>{results.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className={`w-3 h-3 ${timeColor}`} />
                                <span className={`${timeTextColor}`}>{results.timeSpent}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                <span className="text-green-700 font-medium">
                                    {results.correctAnswers}/{results.totalQuestions}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Circular Progress */}
                    <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
                        <svg className="w-16 h-16" viewBox="0 0 36 36">
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#e5e7eb"
                                strokeWidth="2"
                            />
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke={
                                    results.score >= 80
                                        ? '#10b981' // green
                                        : results.score >= 60
                                          ? '#f59e0b' // amber
                                          : '#ef4444' // red
                                }
                                strokeWidth="2"
                                strokeDasharray={`${results.score}, 100`}
                                strokeLinecap="round"
                                className="transition-all duration-500 origin-center"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-semibold text-gray-900">
                                {(2 + (results.score / 100) * 4).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
