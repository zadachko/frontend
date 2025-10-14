import React from 'react';
import { RenderWithMath } from '@/components/common/RenderWithMath';
import { type DiagramData, Renderer } from 'geometry-diagram-renderer';
import { SolutionStep } from './QuestionSolutionModal';

const QuestionSolution = ({
    mergedDiagram,
    visibleSteps,
}: {
    mergedDiagram: DiagramData | undefined;
    visibleSteps: SolutionStep[];
}) => {
    return (
        <>
            {mergedDiagram ? (
                <>
                    <div className="md:block hidden">
                        <Renderer diagramData={mergedDiagram} width={700} height={700} />
                    </div>
                    <div className="md:hidden block">
                        <Renderer diagramData={mergedDiagram} width={350} height={300} />
                    </div>
                </>
            ) : (
                visibleSteps.length > 0 && (
                    <div className="mt-6 w-full rounded-lg border bg-white shadow-sm p-4">
                        <ol className="pl-0 space-y-2" style={{ listStyleType: 'none', paddingLeft: 0, marginLeft: 0 }}>
                            {visibleSteps.map((s) => (
                                <li key={s.id} className="text-base leading-relaxed">
                                    {RenderWithMath(s.exerciseText, 'text-[18px]')}
                                </li>
                            ))}
                        </ol>
                    </div>
                )
            )}
        </>
    );
};

export default QuestionSolution;
