import React from 'react'
import { Renderer } from 'geometry-diagram-renderer';
import type { DiagramData } from 'geometry-diagram-renderer';
import { renderWithMath } from '@/app/(platform-layout)/platform/common/utilities/renderWithMath';

type QuestionStatementProps = {
    statement: string
    diagramData?: DiagramData
}
const QuestionStatement = ({ statement, diagramData }: QuestionStatementProps) => {
    return (
        <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900 leading-relaxed mb-3">
                {renderWithMath(statement, 'text-md')}
            </h3>
            {diagramData && (
                <div className="rounded-lg">
                    <Renderer diagramData={diagramData} width={700} height={450} />
                </div>
            )}
        </div>
    )
}

export default QuestionStatement;