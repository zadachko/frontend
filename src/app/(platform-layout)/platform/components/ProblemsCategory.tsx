import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronRight } from 'lucide-react';
import React from 'react';

type Category = {
    name: string,
    problems: number,
    completed: number,
    bgColor: string,
    iconColor?: string,
    icon?: React.ElementType
}
const ProblemsCategory = ({ category, index }: { category: Category, index: number }) => {
    return (
        <Card
            key={index}
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-md cursor-pointer"
        >
            <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                    {category.icon && (
                        <div className={`p-3 rounded-lg ${category.bgColor}`}>
                            <category.icon className={`w-6 h-6 ${category.iconColor || ''}`} />
                        </div>
                    )}
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{category.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{category.problems} задачи</p>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                        <span>Завършен: {category.completed}</span>
                        <span>{Math.round((category.completed / category.problems) * 100)}%</span>
                    </div>
                    <Progress value={(category.completed / category.problems) * 100} className="h-2 mb-4" />
                </div>
                <Button className="w-full bg-[#6F58C9] hover:bg-[#5A4BA3] text-white font-medium">
                    Разгледай задачите
                    <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
            </CardContent>
        </Card>
    )
}

export default ProblemsCategory