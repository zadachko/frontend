'use client';

import React, { useState } from 'react';
import {
    BookOpen,
    CheckCircle2,
    Clock,
    Target,
    Brain,
    Timer,
    PieChart,
    LineChart,
    Activity
} from 'lucide-react';

const StatisticsPage = () => {
    // Mock data for statistics
    const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

    const overallStats = {
        totalProblems: 156,
        accuracy: 78,
        timeSpent: '24.5',
        streak: 7
    };

    const categoryProgress = [
        { name: 'Алгебра', progress: 65, total: 156, completed: 102 },
        { name: 'Геометрия', progress: 42, total: 98, completed: 41 },
        { name: 'Тригонометрия', progress: 30, total: 75, completed: 23 },
        { name: 'Функции', progress: 55, total: 64, completed: 35 },
        { name: 'Уравнения', progress: 70, total: 89, completed: 62 },
        { name: 'Неравенства', progress: 40, total: 45, completed: 18 },
        { name: 'Вероятности', progress: 25, total: 32, completed: 8 },
        { name: 'Статистика', progress: 15, total: 28, completed: 4 }
    ];

    const accuracyTrend = [
        { date: '01.03', accuracy: 65 },
        { date: '08.03', accuracy: 70 },
        { date: '15.03', accuracy: 68 },
        { date: '22.03', accuracy: 75 },
        { date: '29.03', accuracy: 78 }
    ];

    const timeSpentTrend = [
        { date: '01.03', hours: 2.5 },
        { date: '08.03', hours: 3.2 },
        { date: '15.03', hours: 2.8 },
        { date: '22.03', hours: 3.5 },
        { date: '29.03', hours: 4.0 }
    ];

    const recentActivity = [
        { id: 1, category: 'Алгебра', problem: 'Квадратни уравнения', time: '2 часа', accuracy: '100%' },
        { id: 2, category: 'Геометрия', problem: 'Правоъгълен триъгълник', time: '5 часа', accuracy: '80%' },
        { id: 3, category: 'Тригонометрия', problem: 'Тригонометрични функции', time: '1 ден', accuracy: '60%' },
        { id: 4, category: 'Функции', problem: 'Линейни функции', time: '1 ден', accuracy: '90%' },
        { id: 5, category: 'Уравнения', problem: 'Диференциални уравнения', time: '2 дни', accuracy: '70%' }
    ];

    return (
        <div className="p-8">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Статистика</h1>
                <p className="text-gray-600 mt-2">Преглед на вашия прогрес и постижения</p>

                {/* Time Range Selector */}
                <div className="flex mt-4 space-x-2">
                    <button
                        onClick={() => setTimeRange('week')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${timeRange === 'week'
                            ? 'bg-[#6F58C9] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Седмица
                    </button>
                    <button
                        onClick={() => setTimeRange('month')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${timeRange === 'month'
                            ? 'bg-[#6F58C9] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Месец
                    </button>
                    <button
                        onClick={() => setTimeRange('year')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${timeRange === 'year'
                            ? 'bg-[#6F58C9] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Година
                    </button>
                </div>
            </div>

            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-[#6F58C9]/10 rounded-lg">
                            <BookOpen className="w-6 h-6 text-[#6F58C9]" />
                        </div>
                        <span className="text-sm text-gray-500">Общо</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{overallStats.totalProblems}</h3>
                    <p className="text-gray-600">Решени задачи</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-[#6F58C9]/10 rounded-lg">
                            <CheckCircle2 className="w-6 h-6 text-[#6F58C9]" />
                        </div>
                        <span className="text-sm text-gray-500">Общо</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{overallStats.accuracy}%</h3>
                    <p className="text-gray-600">Точност</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-[#6F58C9]/10 rounded-lg">
                            <Clock className="w-6 h-6 text-[#6F58C9]" />
                        </div>
                        <span className="text-sm text-gray-500">Общо</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{overallStats.timeSpent}ч</h3>
                    <p className="text-gray-600">Време за обучение</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-[#6F58C9]/10 rounded-lg">
                            <Target className="w-6 h-6 text-[#6F58C9]" />
                        </div>
                        <span className="text-sm text-gray-500">Общо</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{overallStats.streak}</h3>
                    <p className="text-gray-600">Дни подред</p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Category Progress */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">Прогрес по категории</h2>
                            <div className="p-2 bg-[#6F58C9]/10 rounded-lg">
                                <PieChart className="w-5 h-5 text-[#6F58C9]" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            {categoryProgress.map((category) => (
                                <div key={category.name} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">{category.name}</span>
                                        <span className="text-sm text-gray-500">{category.completed}/{category.total}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className="bg-[#6F58C9] h-2.5 rounded-full"
                                            style={{ width: `${category.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Accuracy Trend */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">Тенденция на точността</h2>
                            <div className="p-2 bg-[#6F58C9]/10 rounded-lg">
                                <LineChart className="w-5 h-5 text-[#6F58C9]" />
                            </div>
                        </div>
                        <div className="h-64 flex items-end justify-between">
                            {accuracyTrend.map((data) => (
                                <div key={data.date} className="flex flex-col items-center">
                                    <div
                                        className="w-8 bg-[#6F58C9] rounded-t-md"
                                        style={{ height: `${data.accuracy}%` }}
                                    ></div>
                                    <span className="text-xs mt-2 text-gray-500">{data.date}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-center">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-[#6F58C9] rounded-full mr-2"></div>
                                <span className="text-sm text-gray-600">Точност (%)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Time Spent and Recent Activity */}
                <div className="space-y-8">
                    {/* Time Spent Trend */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">Време за обучение</h2>
                            <div className="p-2 bg-[#6F58C9]/10 rounded-lg">
                                <Timer className="w-5 h-5 text-[#6F58C9]" />
                            </div>
                        </div>
                        <div className="h-64 flex items-end justify-between">
                            {timeSpentTrend.map((data) => (
                                <div key={data.date} className="flex flex-col items-center">
                                    <div
                                        className="w-8 bg-[#6F58C9]/70 rounded-t-md"
                                        style={{ height: `${data.hours * 15}%` }}
                                    ></div>
                                    <span className="text-xs mt-2 text-gray-500">{data.date}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-center">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-[#6F58C9]/70 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-600">Часове</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Последна активност</h2>
                            <div className="p-2 bg-[#6F58C9]/10 rounded-lg">
                                <Activity className="w-5 h-5 text-[#6F58C9]" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="p-2 bg-[#6F58C9]/10 rounded-lg">
                                        <Brain className="w-5 h-5 text-[#6F58C9]" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">{activity.category}: {activity.problem}</p>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span>{activity.time}</span>
                                            <span>•</span>
                                            <span>Точност: {activity.accuracy}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;