import { Calendar } from 'lucide-react';
import React from 'react';

type PreviousResultProps = {
    result: {
        id: number;
        date: string;
        correctQuestions: number;
        totalQuestions: number;
        timeSpent: string;
        score: number;
    };
};
const PreviousResult = ({ result }: PreviousResultProps) => {
    const getProgressColor = (score: number) => {
        if (score >= 80) return '#10b981';
        if (score >= 60) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div
            key={result.id}
            className="p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100"
        >
            <div className="flex items-center justify-between mb-1 sm:mb-2">
                <div className="flex items-center gap-1 sm:gap-2">
                    <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-500" />
                    <span className="text-sm sm:text-base text-gray-600">{result.date}</span>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="text-sm sm:text-base text-gray-700 mb-0.5 sm:mb-1">
                        {result.correctQuestions}/{result.totalQuestions} правилни
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">{result.timeSpent}</div>
                </div>

                {/* Circular Progress */}
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14" viewBox="0 0 36 36">
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
                            stroke={getProgressColor(result.score)}
                            strokeWidth="2"
                            strokeDasharray={`${result.score}, 100`}
                            strokeLinecap="round"
                            className="transition-all duration-500 origin-center"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs sm:text-sm lg:text-base font-semibold text-gray-900">
                            {result.score}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviousResult;
