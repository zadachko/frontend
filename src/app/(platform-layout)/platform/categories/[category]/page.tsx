import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, Home, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { getCategoryById } from '@/lib/categories-data';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category: categoryParam } = await params;
    const category = getCategoryById(categoryParam);

    if (!category) {
        notFound();
    }

    const IconComponent = category.icon;

    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm text-gray-600">
                    <Link
                        href="/platform/categories"
                        className="hover:text-[#6F58C9] transition-colors flex items-center"
                    >
                        <Home className="w-4 h-4 mr-1" />
                        Категории
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 font-medium">{category.name}</span>
                </nav>

                {/* Header Section */}
                <section className="text-center space-y-4">
                    <div className={`inline-flex p-6 rounded-full ${category.bgColor} mb-4`}>
                        <IconComponent className={`w-16 h-16 ${category.iconColor}`} />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900">{category.name}</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">{category.description}</p>
                </section>

                {/* Subcategories Grid */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-[#6F58C9]" />
                        Теми в {category.name}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {category.subcategories.map((subcategory) => {
                            const SubIconComponent = subcategory.icon;
                            return (
                                <Link key={subcategory.id} href={`/platform/exercises/${subcategory.id}`}>
                                    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 h-full">
                                        <CardContent className="p-6">
                                            <div className="flex items-start space-x-4">
                                                <div
                                                    className={`p-3 rounded-lg ${subcategory.bgColor} group-hover:scale-110 transition-transform duration-300`}
                                                >
                                                    <SubIconComponent className={`w-6 h-6 ${subcategory.iconColor}`} />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#6F58C9] transition-colors">
                                                        {subcategory.name}
                                                    </h3>
                                                    <p className="text-gray-600 mb-3 leading-relaxed">
                                                        {subcategory.description}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium text-[#6F58C9] bg-[#6F58C9]/10 px-3 py-1 rounded-full">
                                                            {subcategory.lessonRange}
                                                        </span>
                                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#6F58C9] group-hover:translate-x-1 transition-all" />
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}
