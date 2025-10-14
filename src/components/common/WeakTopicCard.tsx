import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import React from 'react';
import type { WeakTopic } from '@/types';

type WeakTopicCardProps = {
    topic: WeakTopic;
    index: number;
    icon: React.ElementType;
};

const WeakTopicCard = ({ topic, index, icon: Icon }: WeakTopicCardProps) => {
    return (
        <div
            key={index}
            className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-xl bg-gray-50 hover:bg-gray-100 shadow-md duration-200"
        >
            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="p-3 rounded-lg bg-white shadow flex items-center justify-center">
                    <Icon className="w-7 h-7 text-[#6F58C9]" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 text-lg truncate">{topic.name}</h3>
                    </div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm text-gray-600">Успех: {topic.score}%</span>
                        <Progress value={topic.score} className="w-28 h-2" />
                    </div>
                    <span className="text-xs text-gray-500">Последен опит: {topic.lastAttempt}</span>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-40">
                <Button
                    size="lg"
                    className="bg-[#6F58C9] hover:bg-[#5A4BA3] text-white font-semibold w-full transition-all animate-bounce-once"
                >
                    Упражнявай
                </Button>
            </div>
        </div>
    );
};

export default WeakTopicCard;
