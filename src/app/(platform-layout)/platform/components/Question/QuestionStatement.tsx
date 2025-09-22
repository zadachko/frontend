import React from 'react'
import { Renderer } from 'geometry-diagram-renderer';
import type { DiagramData } from 'geometry-diagram-renderer';
import { renderWithMath } from '@/app/(platform-layout)/platform/common/utilities/renderWithMath';

type QuestionStatementProps = {
    statement: string
    diagramData?: DiagramData
    isMobile?: boolean
    isSmallMobile?: boolean
}

const QuestionStatement = ({ statement, diagramData, isMobile = false, isSmallMobile = false }: QuestionStatementProps) => {
    return (
        <div className="flex-1">
            <h3 className={`${isSmallMobile ? 'text-xs' : isMobile ? 'text-sm' : 'text-base'} font-semibold text-gray-900 leading-relaxed mb-3`}>
                {renderWithMath(statement, isSmallMobile ? 'text-xs' : isMobile ? 'text-sm' : 'text-base')}
            </h3>
            {diagramData && (
                <div className="rounded-lg">
                    <Renderer
                        diagramData={diagramData}
                        width={isSmallMobile ? 280 : isMobile ? 350 : 700}
                        height={isSmallMobile ? 180 : isMobile ? 225 : 450}
                    />
                </div>
            )}
        </div>
    )
}

export default QuestionStatement;