import React from 'react'
import { renderWithMath } from '@/app/(platform-layout)/platform/common/utilities/renderWithMath';

type QuestionStatementProps = {
    statement: string
}

const QuestionStatement = ({ statement }: QuestionStatementProps) => {
    return (
        <div className="prose max-w-none text-gray-900">
            <div className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                {renderWithMath(statement, "text-sm md:text-[18px]")}
            </div>
        </div>
    )
}

export default QuestionStatement;