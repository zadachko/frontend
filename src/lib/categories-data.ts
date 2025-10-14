import { Calculator, Ruler, Hash, BarChart3, FileText, Sigma, Triangle, Circle, Target } from 'lucide-react';

export interface Category {
    id: string;
    name: string;
    description: string;
    icon: React.ElementType;
    bgColor: string;
    iconColor: string;
    progress: {
        completed: number;
        total: number;
    };
    subcategories: Subcategory[];
}

export interface Subcategory {
    id: string;
    name: string;
    description: string;
    lessonRange: string;
    icon: React.ElementType;
    bgColor: string;
    iconColor: string;
    exercises: Exercise[];
}

export interface Exercise {
    id: string;
    lessonNumber: number;
    title: string;
    status: 'completed' | 'in-progress' | 'not-started';
    difficulty: 'easy' | 'medium' | 'hard';
}

export const categoriesData: Category[] = [
    {
        id: 'algebra',
        name: 'Алгебра',
        description: 'Научи основите на алгебрата с уравнения, променливи и математически изрази',
        icon: Calculator,
        bgColor: 'bg-purple-100',
        iconColor: 'text-purple-600',
        progress: {
            completed: 3,
            total: 8,
        },
        subcategories: [
            {
                id: 'basic-expressions',
                name: 'Основни изрази',
                description: 'Научи как да работиш с променливи и прости алгебрични изрази',
                lessonRange: 'уроци 1-15',
                icon: Calculator,
                bgColor: 'bg-purple-50',
                iconColor: 'text-purple-500',
                exercises: [
                    {
                        id: '1',
                        lessonNumber: 1,
                        title: 'Въведение в променливите',
                        status: 'completed',
                        difficulty: 'easy',
                    },
                    {
                        id: '2',
                        lessonNumber: 2,
                        title: 'Събиране и изваждане с променливи',
                        status: 'completed',
                        difficulty: 'easy',
                    },
                    {
                        id: '3',
                        lessonNumber: 3,
                        title: 'Умножение с променливи',
                        status: 'in-progress',
                        difficulty: 'medium',
                    },
                    {
                        id: '4',
                        lessonNumber: 4,
                        title: 'Деление с променливи',
                        status: 'not-started',
                        difficulty: 'medium',
                    },
                    {
                        id: '5',
                        lessonNumber: 5,
                        title: 'Комбинирани операции',
                        status: 'not-started',
                        difficulty: 'hard',
                    },
                ],
            },
            {
                id: 'equations',
                name: 'Уравнения',
                description: 'Реши прости уравнения и научи основните правила',
                lessonRange: 'уроци 16-30',
                icon: Target,
                bgColor: 'bg-blue-50',
                iconColor: 'text-blue-500',
                exercises: [
                    {
                        id: '6',
                        lessonNumber: 16,
                        title: 'Прости уравнения',
                        status: 'not-started',
                        difficulty: 'easy',
                    },
                    {
                        id: '7',
                        lessonNumber: 17,
                        title: 'Уравнения с една променлива',
                        status: 'not-started',
                        difficulty: 'medium',
                    },
                    {
                        id: '8',
                        lessonNumber: 18,
                        title: 'Проверка на решенията',
                        status: 'not-started',
                        difficulty: 'medium',
                    },
                ],
            },
        ],
    },
    {
        id: 'geometry',
        name: 'Геометрия',
        description: 'Изследвай света на формите, ъглите и пространството',
        icon: Ruler,
        bgColor: 'bg-blue-100',
        iconColor: 'text-blue-600',
        progress: {
            completed: 2,
            total: 6,
        },
        subcategories: [
            {
                id: 'basic-shapes',
                name: 'Основни фигури',
                description: 'Научи за триъгълници, квадрати, кръгове и техните свойства',
                lessonRange: 'уроци 1-12',
                icon: Triangle,
                bgColor: 'bg-blue-50',
                iconColor: 'text-blue-500',
                exercises: [
                    {
                        id: '9',
                        lessonNumber: 1,
                        title: 'Триъгълници',
                        status: 'completed',
                        difficulty: 'easy',
                    },
                    {
                        id: '10',
                        lessonNumber: 2,
                        title: 'Квадрати и правоъгълници',
                        status: 'in-progress',
                        difficulty: 'easy',
                    },
                    {
                        id: '11',
                        lessonNumber: 3,
                        title: 'Кръгове',
                        status: 'not-started',
                        difficulty: 'medium',
                    },
                ],
            },
            {
                id: 'angles',
                name: 'Ъгли',
                description: 'Разбери различните видове ъгли и как да ги измерваш',
                lessonRange: 'уроци 13-25',
                icon: Circle,
                bgColor: 'bg-green-50',
                iconColor: 'text-green-500',
                exercises: [
                    {
                        id: '12',
                        lessonNumber: 13,
                        title: 'Остри ъгли',
                        status: 'not-started',
                        difficulty: 'easy',
                    },
                    {
                        id: '13',
                        lessonNumber: 14,
                        title: 'Прави ъгли',
                        status: 'not-started',
                        difficulty: 'easy',
                    },
                    {
                        id: '14',
                        lessonNumber: 15,
                        title: 'Тъпи ъгли',
                        status: 'not-started',
                        difficulty: 'medium',
                    },
                ],
            },
        ],
    },
    {
        id: 'fractions',
        name: 'Дроби',
        description: 'Овладей дробите - от основи до сложни операции',
        icon: Hash,
        bgColor: 'bg-green-100',
        iconColor: 'text-green-600',
        progress: {
            completed: 2,
            total: 3,
        },
        subcategories: [
            {
                id: 'basic-fractions',
                name: 'Основни дроби',
                description: 'Научи какво са дробите и как да ги четеш',
                lessonRange: 'уроци 1-10',
                icon: Hash,
                bgColor: 'bg-green-50',
                iconColor: 'text-green-500',
                exercises: [
                    {
                        id: '15',
                        lessonNumber: 1,
                        title: 'Какво е дроб?',
                        status: 'completed',
                        difficulty: 'easy',
                    },
                    {
                        id: '16',
                        lessonNumber: 2,
                        title: 'Четене на дроби',
                        status: 'completed',
                        difficulty: 'easy',
                    },
                    {
                        id: '17',
                        lessonNumber: 3,
                        title: 'Сравняване на дроби',
                        status: 'not-started',
                        difficulty: 'medium',
                    },
                ],
            },
        ],
    },
    {
        id: 'statistics',
        name: 'Статистика',
        description: 'Научи как да събираш, организираш и анализираш данни',
        icon: BarChart3,
        bgColor: 'bg-orange-100',
        iconColor: 'text-orange-600',
        progress: {
            completed: 0,
            total: 2,
        },
        subcategories: [
            {
                id: 'data-collection',
                name: 'Събиране на данни',
                description: 'Научи как да събираш и организираш информация',
                lessonRange: 'уроци 1-8',
                icon: BarChart3,
                bgColor: 'bg-orange-50',
                iconColor: 'text-orange-500',
                exercises: [
                    {
                        id: '18',
                        lessonNumber: 1,
                        title: 'Какво са данните?',
                        status: 'not-started',
                        difficulty: 'easy',
                    },
                    {
                        id: '19',
                        lessonNumber: 2,
                        title: 'Събиране на данни',
                        status: 'not-started',
                        difficulty: 'easy',
                    },
                ],
            },
        ],
    },
    {
        id: 'word-problems',
        name: 'Текстови задачи',
        description: 'Реши реални проблеми с помощта на математиката',
        icon: FileText,
        bgColor: 'bg-pink-100',
        iconColor: 'text-pink-600',
        progress: {
            completed: 0,
            total: 2,
        },
        subcategories: [
            {
                id: 'simple-problems',
                name: 'Прости задачи',
                description: 'Започни с лесни текстови задачи от ежедневието',
                lessonRange: 'уроци 1-15',
                icon: FileText,
                bgColor: 'bg-pink-50',
                iconColor: 'text-pink-500',
                exercises: [
                    {
                        id: '20',
                        lessonNumber: 1,
                        title: 'Задачи за пазаруване',
                        status: 'not-started',
                        difficulty: 'easy',
                    },
                    {
                        id: '21',
                        lessonNumber: 2,
                        title: 'Задачи за време',
                        status: 'not-started',
                        difficulty: 'medium',
                    },
                ],
            },
        ],
    },
    {
        id: 'pre-algebra',
        name: 'Предалгебра',
        description: 'Подготви се за алгебрата с основни математически концепции',
        icon: Sigma,
        bgColor: 'bg-teal-100',
        iconColor: 'text-teal-600',
        progress: {
            completed: 0,
            total: 2,
        },
        subcategories: [
            {
                id: 'number-operations',
                name: 'Операции с числа',
                description: 'Усъвършенствай уменията си с основните математически операции',
                lessonRange: 'уроци 1-20',
                icon: Sigma,
                bgColor: 'bg-teal-50',
                iconColor: 'text-teal-500',
                exercises: [
                    {
                        id: '22',
                        lessonNumber: 1,
                        title: 'Събиране на големи числа',
                        status: 'not-started',
                        difficulty: 'easy',
                    },
                    {
                        id: '23',
                        lessonNumber: 2,
                        title: 'Изваждане на големи числа',
                        status: 'not-started',
                        difficulty: 'easy',
                    },
                ],
            },
        ],
    },
];

export function getCategoryById(id: string): Category | undefined {
    return categoriesData.find((cat) => cat.id === id);
}

export function getSubcategoryById(categoryId: string, subcategoryId: string): Subcategory | undefined {
    const category = getCategoryById(categoryId);
    return category?.subcategories.find((sub) => sub.id === subcategoryId);
}
