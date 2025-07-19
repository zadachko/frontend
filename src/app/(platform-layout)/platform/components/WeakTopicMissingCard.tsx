import React from 'react';
import { Button } from '@/components/ui/button';
import { Target, TestTube } from 'lucide-react';
import { GraduationCap } from 'lucide-react';

const WeakTopicMissingCard = () => {
    return (
        <div className="text-center py-8">
            <div className="mb-6">
                <div className="inline-flex p-4 rounded-full bg-green-100 mb-4">
                    <Target className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Отлична работа!</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Нямате слаби теми. Проверете няколко теста, за да помогнете на системата да разбере кои теми
                    може да са нуждае от повече упражнения.
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="bg-[#6F58C9] hover:bg-[#5A4BA3] text-white">
                    <TestTube className="w-4 h-4 mr-2" />
                    Провери се
                </Button>
                <Button
                    variant="outline"
                    className="border-[#6F58C9] text-[#6F58C9] hover:bg-[#6F58C9] hover:text-white bg-transparent"
                >
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Симулация на изпит
                </Button>
            </div>
        </div>
    )
}

export default WeakTopicMissingCard