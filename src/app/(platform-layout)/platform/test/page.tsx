"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TestTube, Calculator, Ruler, Hash, BarChart3, FileText, Sigma, Target, TrendingUp, BookOpen, Zap, Brain } from "lucide-react";
import { useState } from "react";
import PreviousResultsCard from "../components/AssessmentPage/PreviousResultsCard";
import AssessmentStartFlow from "../components/AssessmentPage/AssessmentStartFlow";

const Page = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

    // Purple color scheme matching the main platform page
    const purpleColors = {
        buttonGradient: "from-[#6F58C9] to-[#5A4BA3]",
        buttonHoverGradient: "hover:from-[#5A4BA3] hover:to-[#6F58C9]",
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600"
    };

    // Categories with mock subcategories and enhanced styling
    const categories = [
        {
            name: "Алгебра",
            icon: Calculator,
            problems: 324,
            bgColor: "bg-purple-100",
            iconColor: "text-purple-600",
            subcategories: [
                { name: "Линейни уравнения", icon: Target, difficulty: "Лесно", problems: 45 },
                { name: "Квадратни уравнения", icon: TrendingUp, difficulty: "Средно", problems: 38 },
                { name: "Системи уравнения", icon: Zap, difficulty: "Сложно", problems: 52 },
                { name: "Алгебрични изрази", icon: BookOpen, difficulty: "Лесно", problems: 67 },
                { name: "Факторизация", icon: Brain, difficulty: "Средно", problems: 41 }
            ]
        },
        {
            name: "Геометрия",
            icon: Ruler,
            problems: 267,
            bgColor: "bg-blue-100",
            iconColor: "text-blue-600",
            subcategories: [
                { name: "Площ и периметър", icon: Target, difficulty: "Лесно", problems: 58 },
                { name: "Обем и повърхнина", icon: TrendingUp, difficulty: "Средно", problems: 43 },
                { name: "Питагорова теорема", icon: Zap, difficulty: "Сложно", problems: 39 },
                { name: "Подобни триъгълници", icon: BookOpen, difficulty: "Средно", problems: 47 },
                { name: "Окръжности и кръгове", icon: Brain, difficulty: "Сложно", problems: 35 }
            ]
        },
        {
            name: "Дроби",
            icon: Hash,
            problems: 198,
            bgColor: "bg-green-100",
            iconColor: "text-green-600",
            subcategories: [
                { name: "Събиране и изваждане", icon: Target, difficulty: "Лесно", problems: 42 },
                { name: "Умножение и деление", icon: TrendingUp, difficulty: "Средно", problems: 38 },
                { name: "Смесени числа", icon: Zap, difficulty: "Сложно", problems: 31 },
                { name: "Десятични дроби", icon: BookOpen, difficulty: "Средно", problems: 45 },
                { name: "Проценти", icon: Brain, difficulty: "Сложно", problems: 28 }
            ]
        },
        {
            name: "Статистика",
            icon: BarChart3,
            problems: 145,
            bgColor: "bg-orange-100",
            iconColor: "text-orange-600",
            subcategories: [
                { name: "Средна стойност", icon: Target, difficulty: "Лесно", problems: 32 },
                { name: "Медиана и мода", icon: TrendingUp, difficulty: "Средно", problems: 28 },
                { name: "Графики и диаграми", icon: Zap, difficulty: "Сложно", problems: 35 },
                { name: "Вероятности", icon: BookOpen, difficulty: "Средно", problems: 25 },
                { name: "Данни и интерпретация", icon: Brain, difficulty: "Сложно", problems: 22 }
            ]
        },
        {
            name: "Текстови задачи",
            icon: FileText,
            problems: 289,
            bgColor: "bg-pink-100",
            iconColor: "text-pink-600",
            subcategories: [
                { name: "Движение и време", icon: Target, difficulty: "Лесно", problems: 55 },
                { name: "Работа и производителност", icon: TrendingUp, difficulty: "Средно", problems: 48 },
                { name: "Процентни задачи", icon: Zap, difficulty: "Сложно", problems: 42 },
                { name: "Геометрични задачи", icon: BookOpen, difficulty: "Средно", problems: 51 },
                { name: "Алгебрични задачи", icon: Brain, difficulty: "Сложно", problems: 45 }
            ]
        },
        {
            name: "Пре-алгебра",
            icon: Sigma,
            problems: 176,
            bgColor: "bg-teal-100",
            iconColor: "text-teal-600",
            subcategories: [
                { name: "Цели числа", icon: Target, difficulty: "Лесно", problems: 38 },
                { name: "Рационални числа", icon: TrendingUp, difficulty: "Средно", problems: 32 },
                { name: "Степенуване", icon: Zap, difficulty: "Сложно", problems: 29 },
                { name: "Коренуване", icon: BookOpen, difficulty: "Средно", problems: 35 },
                { name: "Алгебрични изрази", icon: Brain, difficulty: "Сложно", problems: 27 }
            ]
        }
    ];

    // Mock previous exam results
    const previousResults = [
        {
            id: 1,
            date: "15.12.2024",
            score: 85,
            totalQuestions: 25,
            correctAnswers: 21,
            timeSpent: "75 мин",
        },
        {
            id: 2,
            date: "08.12.2024",
            score: 72,
            totalQuestions: 25,
            correctAnswers: 18,
            timeSpent: "82 мин",
        },
        {
            id: 3,
            date: "01.12.2024",
            score: 68,
            totalQuestions: 25,
            correctAnswers: 17,
            timeSpent: "88 мин",
        }
    ];

    const handleStartExam = () => {
        setIsDialogOpen(true);
    };

    const handleConfirmExam = () => {
        setIsDialogOpen(false);
        // Navigate to the exam page
        window.location.href = "/platform/test/live";
    };

    const handleCategorySelect = (categoryName: string) => {
        setSelectedCategory(categoryName);
        setSelectedSubcategory(null); // Reset subcategory when category changes
    };

    const handleSubcategorySelect = (subcategoryName: string) => {
        setSelectedSubcategory(subcategoryName);
    };

    const selectedCategoryData = categories.find(cat => cat.name === selectedCategory);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Лесно":
                return "text-green-600 bg-green-50";
            case "Средно":
                return "text-yellow-600 bg-yellow-50";
            case "Сложно":
                return "text-red-600 bg-red-50";
            default:
                return "text-gray-600 bg-gray-50";
        }
    };

    return (

        <div className="min-h-screen bg-gray-50 w-screen flex items-center justify-center p-4 mx-auto">
            <div className="w-full max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Exam Card */}
                    <div className="lg:col-span-2">
                        <Card className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 shadow-sm h-full">
                            <CardContent className="p-8 text-center h-full flex flex-col justify-center">
                                <div className="mb-6">
                                    <div className="inline-flex p-3 rounded-full bg-[#6F58C9]/10 mb-4 group-hover:scale-105 transition-transform duration-300">
                                        <TestTube className="w-8 h-8 text-[#6F58C9]" />
                                    </div>
                                    <h1 className="text-3xl font-semibold text-gray-900 mb-3">Пробен Изпит</h1>
                                    <p className="text-gray-600 text-lg mb-6">Тествай знанията си по математика за 7-ми клас</p>
                                </div>

                                {/* Category Selection */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        {selectedCategory
                                            ? `Избери подкатегория от ${selectedCategory}:`
                                            : "Избери категория:"
                                        }
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {!selectedCategory ? (
                                            // Show categories when no category is selected
                                            categories.map((category) => (
                                                <button
                                                    key={category.name}
                                                    onClick={() => handleCategorySelect(category.name)}
                                                    className={`p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 cursor-pointer ${selectedCategory === category.name
                                                        ? 'border-[#6F58C9] bg-[#6F58C9]/5 shadow-md'
                                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'
                                                        }`}
                                                >
                                                    <div className={`inline-flex p-2 rounded-lg mb-2 ${category.bgColor} transition-transform duration-200`}>
                                                        <category.icon className={`w-5 h-5 ${category.iconColor}`} />
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                                    <div className="text-xs text-gray-500">{category.problems} задачи</div>
                                                </button>
                                            ))
                                        ) : (
                                            // Show subcategories when a category is selected
                                            selectedCategoryData?.subcategories.map((subcategory, index) => (
                                                <button
                                                    key={subcategory.name}
                                                    onClick={() => handleSubcategorySelect(subcategory.name)}
                                                    className={`p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 cursor-pointer ${selectedSubcategory === subcategory.name
                                                        ? 'border-[#6F58C9] bg-gradient-to-r from-[#6F58C9]/5 to-[#5A4BA3]/5 shadow-md'
                                                        : 'border-gray-200 hover:border-[#6F58C9]/30 hover:bg-gray-50 hover:shadow-sm'
                                                        }`}
                                                    style={{ animationDelay: `${index * 100}ms` }}
                                                >
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div className={`inline-flex p-2 rounded-lg ${selectedCategoryData.bgColor} transition-transform duration-200`}>
                                                            <subcategory.icon className={`w-4 h-4 ${selectedCategoryData.iconColor}`} />
                                                        </div>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(subcategory.difficulty)}`}>
                                                            {subcategory.difficulty}
                                                        </span>
                                                    </div>
                                                    <div className="text-left">
                                                        <div className="text-sm font-medium text-gray-900 mb-1">{subcategory.name}</div>
                                                        <div className="text-xs text-gray-500 flex items-center gap-1">
                                                            <Target className="w-3 h-3" />
                                                            {subcategory.problems} задачи
                                                        </div>
                                                    </div>
                                                </button>
                                            ))
                                        )}
                                    </div>

                                    {/* Back button when subcategories are shown */}
                                    {selectedCategory && (
                                        <div className="mt-8 text-center">
                                            <button
                                                onClick={() => {
                                                    setSelectedCategory(null);
                                                    setSelectedSubcategory(null);
                                                }}
                                                className="text-[#6F58C9] hover:text-[#5A4BA3] font-medium text-sm transition-colors duration-200 flex items-center justify-center gap-2 mx-auto cursor-pointer"
                                            >
                                                ← Назад към категориите
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Start Test Button - only show when both category and subcategory are selected */}
                                {selectedCategory && selectedSubcategory && (
                                    <div className="mt-2 animate-in slide-in-from-bottom-4 duration-500">
                                        <AssessmentStartFlow
                                            isDialogOpen={isDialogOpen}
                                            setIsDialogOpen={setIsDialogOpen}
                                            handleStartExam={handleStartExam}
                                            handleConfirmExam={handleConfirmExam}
                                            colors={purpleColors}
                                        />
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Previous Results Sidebar */}
                    <PreviousResultsCard
                        previousResults={previousResults}
                        colors={{
                            buttonGradient: "from-[#6F58C9] to-[#5A4BA3]",
                            buttonHoverGradient: "hover:from-[#5A4BA3] hover:to-[#6F58C9]"
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Page;