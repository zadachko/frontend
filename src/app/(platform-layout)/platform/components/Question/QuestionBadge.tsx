import React from 'react';
import { Bot } from 'lucide-react';

type QuestionBadgeProps = {
    questionNumber: number
    onCircleClick?: () => void
}

const QuestionBadge = ({ questionNumber, onCircleClick }: QuestionBadgeProps) => {
    return (
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm bg-gray-100 text-gray-600">
                {questionNumber}
            </div>
            {onCircleClick && (
                <div
                    className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 cursor-pointer transition-colors duration-200 flex items-center justify-center"
                    onClick={onCircleClick}
                    title="Отвори въпрос в пълен екран"
                >
                    <Bot className="w-6 h-6 text-white" />
                </div>
            )}
        </div>
    )
}

export default QuestionBadge;