import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import React from 'react';

type WeakTopic = {
    name: string;
    score: number;
    lastAttempt: string;
}

const WeakTopicCard = ({ topic, index }: { topic: WeakTopic, index: number }) => {
    return (
        <div
            key={index}
            className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
        >
            <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">{topic.name}</h3>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">Успех: {topic.score}%</span>
                    <Progress value={topic.score} className="w-24 h-2" />
                </div>
                <span className="text-xs text-gray-500">Последен опит: {topic.lastAttempt}</span>
            </div>
            <Button size="sm" className="bg-[#6F58C9] hover:bg-[#5A4BA3] text-white ml-4">
                Упражнявай
            </Button>
        </div>
    )
}

export default WeakTopicCard;