import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { categoriesData } from '@/lib/categories-data';

export default function CategoriesPage() {
    return (
        <div className="flex flex-1 h-full w-full overflow-hidden">
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header Section */}
                    <section className="text-center space-y-4">
                        <div className="inline-flex p-4 rounded-full bg-[#6F58C9]/10 mb-4">
                            <BookOpen className="w-12 h-12 text-[#6F58C9]" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900">Категории</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Избери категория и започни своето математическо приключение! Всяка категория съдържа
                            интересни уроци и задачи, които ще те направят по-добър в математиката.
                        </p>
                    </section>

                    {/* Categories Grid */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoriesData.map((category) => {
                            const IconComponent = category.icon;
                            const progressPercentage = (category.progress.completed / category.progress.total) * 100;

                            return (
                                <Link key={category.id} href={`/platform/categories/${category.id}`}>
                                    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-0 overflow-hidden">
                                        <CardContent className="p-0">
                                            <div className={`${category.bgColor} p-6 text-center`}>
                                                <div className="inline-flex p-4 rounded-full bg-white/80 mb-4 group-hover:scale-110 transition-transform duration-300">
                                                    <IconComponent className={`w-8 h-8 ${category.iconColor}`} />
                                                </div>
                                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                                    {category.name}
                                                </h3>
                                            </div>
                                            <div className="p-6 bg-white">
                                                <p className="text-gray-600 mb-4 leading-relaxed">
                                                    {category.description}
                                                </p>

                                                {/* Progress Section */}
                                                <div className="mb-6">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm font-medium text-gray-700">
                                                            Прогрес
                                                        </span>
                                                        <span className="text-sm text-gray-500">
                                                            {category.progress.completed}/{category.progress.total}
                                                        </span>
                                                    </div>
                                                    <Progress value={progressPercentage} className="h-2" />
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {Math.round(progressPercentage)}% завършено
                                                    </p>
                                                </div>

                                                <Button className="w-full bg-[#6F58C9] hover:bg-[#5A4BA3] text-white font-semibold py-3 h-12 group-hover:bg-[#5A4BA3] transition-colors">
                                                    Започни обучението
                                                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </section>
                </div>
            </div>
        </div>
    );
}
