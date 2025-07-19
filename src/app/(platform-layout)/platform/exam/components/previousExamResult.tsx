import { Calendar } from 'lucide-react'
import React from 'react'

type PreviousExamResultProps = {
    exam: {
        id: number;
        date: string;
        correctAnswers: number;
        totalQuestions: number;
        timeSpent: string;
        score: number;
    };
}
const PreviousExamResult = ({ exam }: PreviousExamResultProps) => {
    const getProgressColor = (score: number) => {
        if (score >= 80) return "#10b981";
        if (score >= 60) return "#f59e0b";
        return "#ef4444";
    };

    return (
        <div key={exam.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-gray-500" />
                    <span className="text-base text-gray-600">{exam.date}</span>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="text-base text-gray-700 mb-1">
                        {exam.correctAnswers}/{exam.totalQuestions} правилни
                    </div>
                    <div className="text-sm text-gray-500">
                        {exam.timeSpent}
                    </div>
                </div>

                {/* Circular Progress */}
                <div className="relative w-14 h-14 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 36 36">
                        {/* Background circle */}
                        <path
                            d="M18 2.0845
                                                                    a 15.9155 15.9155 0 0 1 0 31.831
                                                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="2"
                        />
                        {/* Progress circle */}
                        <path
                            d="M18 2.0845
                                                                    a 15.9155 15.9155 0 0 1 0 31.831
                                                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={getProgressColor(exam.score)}
                            strokeWidth="2"
                            strokeDasharray={`${exam.score}, 100`}
                            strokeLinecap="round"
                            className="transition-all duration-500 origin-center"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-base font-semibold text-gray-900">
                            {exam.score}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreviousExamResult;