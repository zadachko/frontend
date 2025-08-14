
import { ChevronRight, Home } from 'lucide-react'
import Link from "next/link"
import { categoriesData } from "@/lib/categories-data"
import { notFound } from "next/navigation"

interface Problem {
    id: string;
    number: number;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    status: 'completed' | 'in-progress' | 'not-started';
    points?: number;
    timeEstimate?: string;
}

interface ExercisesPageProps {
    params: Promise<{
        subcategory: string
    }>
}

export default async function ExercisesPage({ params }: ExercisesPageProps) {
    const { subcategory: subcategoryParam } = await params
    // Find the subcategory across all categories
    let subcategory = null
    let parentCategory = null

    for (const category of categoriesData) {
        const found = category.subcategories.find(sub => sub.id === subcategoryParam)
        if (found) {
            subcategory = found
            parentCategory = category
            break
        }
    }

    if (!subcategory || !parentCategory) {
        notFound()
    }

    // Mock problems data - in a real app this would come from an API or database
    const problems: Problem[] = [
        {
            id: '1',
            number: 1,
            title: 'Реши уравнението 2x + 5 = 13',
            description: 'Намери стойността на x в даденото уравнение',
            difficulty: 'easy',
            status: 'completed',
            points: 10,
            timeEstimate: '5 мин'
        },
        {
            id: '2',
            number: 2,
            title: 'Изчисли лицето на правоъгълник',
            description: 'Даден е правоъгълник със страни 8 см и 12 см. Намери лицето му.',
            difficulty: 'easy',
            status: 'completed',
            points: 15,
            timeEstimate: '8 мин'
        },
        {
            id: '3',
            number: 3,
            title: 'Система от уравнения',
            description: 'Реши системата: x + y = 10, 2x - y = 4',
            difficulty: 'medium',
            status: 'in-progress',
            points: 25,
            timeEstimate: '15 мин'
        },
        {
            id: '4',
            number: 4,
            title: 'Пифагорова теорема',
            description: 'В правоъгълен триъгълник катетите са 6 см и 8 см. Намери хипотенузата.',
            difficulty: 'medium',
            status: 'not-started',
            points: 20,
            timeEstimate: '12 мин'
        },
        {
            id: '5',
            number: 5,
            title: 'Квадратно уравнение',
            description: 'Реши уравнението x² - 5x + 6 = 0',
            difficulty: 'hard',
            status: 'not-started',
            points: 30,
            timeEstimate: '20 мин'
        },
        {
            id: '6',
            number: 6,
            title: 'Геометрична прогресия',
            description: 'Намери първия член на геометрична прогресия, ако a₃ = 8 и q = 2',
            difficulty: 'hard',
            status: 'not-started',
            points: 35,
            timeEstimate: '25 мин'
        },
        {
            id: '1',
            number: 1,
            title: 'Реши уравнението 2x + 5 = 13',
            description: 'Намери стойността на x в даденото уравнение',
            difficulty: 'easy',
            status: 'completed',
            points: 10,
            timeEstimate: '5 мин'
        },
        {
            id: '2',
            number: 2,
            title: 'Изчисли лицето на правоъгълник',
            description: 'Даден е правоъгълник със страни 8 см и 12 см. Намери лицето му.',
            difficulty: 'easy',
            status: 'completed',
            points: 15,
            timeEstimate: '8 мин'
        },
        {
            id: '3',
            number: 3,
            title: 'Система от уравнения',
            description: 'Реши системата: x + y = 10, 2x - y = 4',
            difficulty: 'medium',
            status: 'in-progress',
            points: 25,
            timeEstimate: '15 мин'
        },
        {
            id: '4',
            number: 4,
            title: 'Пифагорова теорема',
            description: 'В правоъгълен триъгълник катетите са 6 см и 8 см. Намери хипотенузата.',
            difficulty: 'medium',
            status: 'not-started',
            points: 20,
            timeEstimate: '12 мин'
        },
        {
            id: '5',
            number: 5,
            title: 'Квадратно уравнение',
            description: 'Реши уравнението x² - 5x + 6 = 0',
            difficulty: 'hard',
            status: 'not-started',
            points: 30,
            timeEstimate: '20 мин'
        },
        {
            id: '6',
            number: 6,
            title: 'Геометрична прогресия',
            description: 'Намери първия член на геометрична прогресия, ако a₃ = 8 и q = 2',
            difficulty: 'hard',
            status: 'not-started',
            points: 35,
            timeEstimate: '25 мин'
        }
    ]

    return (
        <div className="flex-1 overflow-y-auto bg-white p-6 md:p-8 lg:p-12">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm text-gray-500 border-b border-gray-200 pb-4">
                    <Link href="/platform/categories" className="hover:text-gray-700 transition-colors flex items-center">
                        <Home className="w-4 h-4 mr-1" />
                        Категории
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href={`/platform/categories/${parentCategory.id}`} className="hover:text-gray-700 transition-colors">
                        {parentCategory.name}
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 font-medium">{subcategory.name}</span>
                </nav>

                {/* Problems List */}
                <div className="flex flex-wrap gap-4">
                    {problems.map((problem) => (
                        <div key={problem.id} className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-semibold text-sm border border-gray-200">
                            {problem.number}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
