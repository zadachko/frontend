import React from 'react'
import { RenderWithMath } from '@/components/common/RenderWithMath';

type QuestionStatementProps = {
    statement: string
}

const QuestionStatement = ({ statement }: QuestionStatementProps) => {
    return (
        <div className="prose max-w-none text-gray-900">
            <div className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                {RenderWithMath(statement, "text-sm md:text-[18px]")}
            </div>
        </div>
    )
}

export default QuestionStatement;