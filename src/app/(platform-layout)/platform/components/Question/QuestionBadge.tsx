import React from 'react'
type QuestionBadgeProps = {
    questionNumber: number
}
const QuestionBadge = ({ questionNumber }: QuestionBadgeProps) => {
    return (
        <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm bg-gray-100 text-gray-600">
                {questionNumber}
            </div>
        </div>
    )
}

export default QuestionBadge;