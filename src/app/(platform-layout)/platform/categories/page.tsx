'use client';

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Search,
    Filter,
    BookOpen,
    Clock,
    Target,
    Star,
    Brain,
    Calculator,
    Bookmark,
    TrendingUp,
    Award,
    ChevronDown
} from 'lucide-react'
import ProblemsCategory from '@/components/ProblemsCategory/ProblemsCategory';

const Page = () => {
    const [favorites, setFavorites] = useState<string[]>([])
    const [sortBy, setSortBy] = useState<'name' | 'count' | 'popular'>('name')

    const categories = [
        { name: 'Алгебра', icon: Calculator, count: 156, description: 'Основни алгебрични операции и уравнения' },
        { name: 'Геометрия', icon: Brain, count: 98, description: 'Геометрични фигури и пространствени тела' },
        { name: 'Тригонометрия', icon: Star, count: 75, description: 'Тригонометрични функции и тъждества' },
        { name: 'Функции', icon: Target, count: 64, description: 'Функции и техните графики' },
        { name: 'Уравнения', icon: BookOpen, count: 89, description: 'Различни видове уравнения' },
        { name: 'Неравенства', icon: Clock, count: 45, description: 'Решаване на неравенства' },
        { name: 'Вероятности', icon: Award, count: 32, description: 'Теория на вероятностите' },
        { name: 'Статистика', icon: TrendingUp, count: 28, description: 'Статистически анализ' },
        { name: 'Комбинаторика', icon: Bookmark, count: 41, description: 'Комбинаторични задачи' },
        { name: 'Логика', icon: Brain, count: 55, description: 'Логически задачи' },
        { name: 'Множества', icon: Target, count: 38, description: 'Теория на множествата' },
        { name: 'Последователности', icon: Calculator, count: 47, description: 'Числови последователности' }
    ]

    const toggleFavorite = (categoryName: string) => {
        setFavorites(prev =>
            prev.includes(categoryName)
                ? prev.filter(name => name !== categoryName)
                : [...prev, categoryName]
        )
    }

    const sortedCategories = [...categories].sort((a, b) => {
        // First sort by favorites
        const aIsFavorite = favorites.includes(a.name);
        const bIsFavorite = favorites.includes(b.name);
        if (aIsFavorite !== bIsFavorite) {
            return aIsFavorite ? -1 : 1;
        }

        // Then apply the selected sort
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'count':
                return b.count - a.count;
            case 'popular':
                return b.count - a.count;
            default:
                return 0;
        }
    });
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }


    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Категории</h1>
                <p className="text-gray-600 mt-2">Изберете категория и започнете да решавате задачи</p>
            </div>

            {/* Search, Filter and Sort */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Търсене на категории..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F58C9]/20 focus:border-[#6F58C9]"
                    />
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Filter className="w-5 h-5 text-gray-600" />
                        <span>Филтри</span>
                    </button>
                    <div className="relative">
                        <button
                            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            onClick={() => setSortBy(prev => prev === 'name' ? 'count' : 'name')}
                        >
                            <span>Сортирай по</span>
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Categories Grid */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
            >
                <AnimatePresence>
                    {sortedCategories.map((category) => (
                        <ProblemsCategory
                            key={category.name}
                            category={category}
                            favorites={favorites}
                            toggleFavorite={toggleFavorite}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default Page