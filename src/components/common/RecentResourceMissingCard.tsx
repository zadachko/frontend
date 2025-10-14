import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Clock } from 'lucide-react';
import { TestTube } from 'lucide-react';
import React from 'react';

const RecentResourceMissingCard = () => {
    return (
        <Card className="bg-white border-0 shadow-md">
            <CardContent className="p-12 text-center">
                <div className="mb-6">
                    <div className="inline-flex p-4 rounded-full bg-gray-100 mb-4">
                        <Clock className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Нямате скорошни задачи и тестове</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Нямате скорошни задачи или тестове. Започнете своето обучение, като създадете първия си тест или
                        разгледайте категориите съз задачите по-долу!
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button className="bg-[#6F58C9] hover:bg-[#5A4BA3] text-white">
                        <TestTube className="w-4 h-4 mr-2" />
                        Започни първия си тест
                    </Button>
                    <Button
                        variant="outline"
                        className="border-[#6F58C9] text-[#6F58C9] hover:bg-[#6F58C9] hover:text-white bg-transparent"
                    >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Разгледай категориите със задачи
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default RecentResourceMissingCard;
