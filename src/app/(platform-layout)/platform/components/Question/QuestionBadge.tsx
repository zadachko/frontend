import React from 'react';
import { Bot } from 'lucide-react';

type QuestionBadgeProps = {
    questionNumber: number
    onCircleClick?: () => void
    isMobile?: boolean
    isSmallMobile?: boolean
    showRobotBadge?: boolean
}

const QuestionBadge = ({ questionNumber, onCircleClick, isMobile = false, isSmallMobile = false, showRobotBadge = false }: QuestionBadgeProps) => {
    return (
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
            <div className={`${isSmallMobile ? 'w-6 h-6 text-xs' : isMobile ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'} rounded-full flex items-center justify-center font-semibold bg-gray-100 text-gray-600`}>
                {questionNumber}
            </div>
            {onCircleClick && showRobotBadge && (
                <div
                    className={`${isSmallMobile ? 'w-4 h-4' : isMobile ? 'w-6 h-6' : 'w-8 h-8'} rounded-full bg-blue-500 hover:bg-blue-600 cursor-pointer transition-colors duration-200 flex items-center justify-center`}
                    onClick={onCircleClick}
                    title="Отвори въпрос в пълен екран"
                >
                    <Bot className={`${isSmallMobile ? 'w-3 h-3' : isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-white`} />
                </div>
            )}
        </div>
    )
}

export default QuestionBadge;