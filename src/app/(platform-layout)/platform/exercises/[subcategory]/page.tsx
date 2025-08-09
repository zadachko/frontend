import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Home, BookOpen, Play, CheckCircle, Clock, Lightbulb, Target, Star } from 'lucide-react'
import Link from "next/link"
import { categoriesData, getSubcategoryById } from "@/lib/categories-data"
import { notFound } from "next/navigation"

interface ExercisesPageProps {
    params: {
        subcategory: string
    }
}

export default function ExercisesPage({ params }: ExercisesPageProps) {
    // Find the subcategory across all categories
    let subcategory = null
    let parentCategory = null

    for (const category of categoriesData) {
        const found = category.subcategories.find(sub => sub.id === params.subcategory)
        if (found) {
            subcategory = found
            parentCategory = category
            break
        }
    }

    if (!subcategory || !parentCategory) {
        notFound()
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-5 h-5 text-green-500" />
            case 'in-progress':
                return <Clock className="w-5 h-5 text-yellow-500" />
            default:
                return <Play className="w-5 h-5 text-gray-400" />
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Завършен'
            case 'in-progress':
                return 'В процес'
            default:
                return 'Започни'
        }
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return 'bg-green-100 text-green-700'
            case 'medium':
                return 'bg-yellow-100 text-yellow-700'
            case 'hard':
                return 'bg-red-100 text-red-700'
            default:
                return 'bg-gray-100 text-gray-700'
        }
    }

    const getDifficultyText = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return 'Лесно'
            case 'medium':
                return 'Средно'
            case 'hard':
                return 'Трудно'
            default:
                return 'Неизвестно'
        }
    }

    const SubIconComponent = subcategory.icon

    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm text-gray-600">
                    <Link href="/platform/categories" className="hover:text-[#6F58C9] transition-colors flex items-center">
                        <Home className="w-4 h-4 mr-1" />
                        Категории
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href={`/platform/categories/${parentCategory.id}`} className="hover:text-[#6F58C9] transition-colors">
                        {parentCategory.name}
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 font-medium">{subcategory.name}</span>
                </nav>

                {/* Header Section */}
                <section className="text-center space-y-4">
                    <div className={`inline-flex p-6 rounded-full ${subcategory.bgColor} mb-4`}>
                        <SubIconComponent className={`w-16 h-16 ${subcategory.iconColor}`} />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900">{subcategory.name}</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {subcategory.description}
                    </p>
                    <Badge variant="secondary" className="text-sm font-medium bg-[#6F58C9]/10 text-[#6F58C9]">
                        {subcategory.lessonRange}
                    </Badge>
                </section>

                {/* Progress Overview */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 mb-2">
                                {subcategory.exercises.filter(ex => ex.status === 'completed').length}
                            </div>
                            <div className="text-gray-600">Завършени уроци</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-600 mb-2">
                                {subcategory.exercises.filter(ex => ex.status === 'in-progress').length}
                            </div>
                            <div className="text-gray-600">В процес</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#6F58C9] mb-2">
                                {subcategory.exercises.length}
                            </div>
                            <div className="text-gray-600">Общо уроци</div>
                        </div>
                    </div>
                </section>

                {/* Exercises Grid */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-[#6F58C9]" />
                        Уроци
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {subcategory.exercises.map((exercise, index) => (
                            <Card key={exercise.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-2">
                                            {getStatusIcon(exercise.status)}
                                            <span className="text-sm font-medium text-[#6F58C9]">
                                                Урок {exercise.lessonNumber}
                                            </span>
                                        </div>
                                        <Badge className={`text-xs ${getDifficultyColor(exercise.difficulty)}`}>
                                            {getDifficultyText(exercise.difficulty)}
                                        </Badge>
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 group-hover:text-[#6F58C9] transition-colors">
                                        {exercise.title}
                                    </h3>

                                    <Button
                                        className={`w-full font-semibold py-2 h-10 transition-all ${exercise.status === 'completed'
                                            ? 'bg-green-500 hover:bg-green-600 text-white'
                                            : exercise.status === 'in-progress'
                                                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                                : 'bg-[#6F58C9] hover:bg-[#5A4BA3] text-white'
                                            }`}
                                    >
                                        {getStatusText(exercise.status)}
                                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Tips Section */}
                <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                    <div className="flex items-start space-x-4">
                        <div className="p-3 rounded-full bg-blue-100">
                            <Lightbulb className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Полезни съвети 💡</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start space-x-3">
                                    <Target className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-1">Започни с лесните</h4>
                                        <p className="text-sm text-gray-600">Започни с лесните уроци, за да изградиш увереност</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Star className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-1">Практикувай редовно</h4>
                                        <p className="text-sm text-gray-600">15-20 минути всеки ден са по-добри от 2 часа веднъж седмично</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-1">Не се притеснявай от грешките</h4>
                                        <p className="text-sm text-gray-600">Грешките са част от ученето - важното е да се учиш от тях</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Clock className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-1">Вземи си почивки</h4>
                                        <p className="text-sm text-gray-600">Ако се затрудняваш, направи пауза и се върни по-късно</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
