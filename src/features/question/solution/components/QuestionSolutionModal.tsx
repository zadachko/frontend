"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Controls from "./StepControls"
import "katex/dist/katex.min.css"
import { applyStepActions, type DiagramData, type StepAction } from "geometry-diagram-renderer"
import { RenderWithMath } from "@/components/common/RenderWithMath"
import QuestionStatement from "./QuestionStatement"
import Header from "./Header"
import StepsList from "./StepsList"
import QuestionSolution from "./QuestionSolution"
import QuestionAnwers from "./QuestionAnwers"

export type SolutionStep = {
    id: string | number
    title?: string
    exerciseText: string // plain text containing $...$ or $$...$$ for math
    solutionText: string // plain text containing $...$ or $$...$$ for math
}

export type QuestionSolutionModalProps = {
    isOpen: boolean
    onClose: () => void
    statement: string // supports $...$ and $$...$$
    position: number
    steps?: SolutionStep[]
    initialStepIndex?: number

    // Answer review props
    questionType: "text" | "multiple"
    userAnswer?: string
    correctAnswer?: string
    options?: string[] // for multiple choice
    diagramData?: DiagramData
    diagramSteps?: StepAction[][]
}


// Bulgarian letters for choices
const optionLetters = ["а", "б", "в", "г", "д", "е"]

/* ------------------------------ Main Component ---------------------------- */

export default function QuestionSolutionModal({
    isOpen,
    onClose,
    statement,
    position,
    steps,
    initialStepIndex = 0,
    questionType,
    userAnswer,
    correctAnswer,
    options = [],
    diagramData,
    diagramSteps,
}: QuestionSolutionModalProps) {
    const stepsArray = useMemo(() => (Array.isArray(steps) ? steps : []), [steps])

    const [currentStepIndex, setCurrentStepIndex] = useState(() =>
        Math.min(Math.max(0, initialStepIndex), Math.max(0, stepsArray.length - 1)),
    )

    // Reset current when opened or step count changes
    useEffect(() => {
        if (isOpen) {
            setCurrentStepIndex(Math.min(Math.max(0, initialStepIndex), Math.max(0, stepsArray.length - 1)))
        }
    }, [isOpen, initialStepIndex, stepsArray.length])

    const mergedDiagram =
        diagramData && diagramSteps
            ? diagramSteps.slice(0, currentStepIndex).reduce((acc, step) => applyStepActions(acc, step), diagramData)
            : undefined



    //* Handle keyboard navigation

    const next = useCallback(() => setCurrentStepIndex((c) => Math.min(c + 1, Math.max(0, stepsArray.length - 1))), [stepsArray.length])
    const prev = useCallback(() => setCurrentStepIndex((c) => Math.max(c - 1, 0)), [])

    const atStart = currentStepIndex === 0
    const atEnd = currentStepIndex === Math.max(0, stepsArray.length - 1)

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
            if (e.key === "ArrowRight" || e.key === "ArrowDown") next()
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev()
        }
        if (isOpen) window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [isOpen, onClose, next, prev])





    const stepCountLabel = `${stepsArray.length ? currentStepIndex + 1 : 0} / ${Math.max(stepsArray.length, 1)}`
    const currentStep = stepsArray[currentStepIndex]
    const visibleSteps: SolutionStep[] = useMemo(
        () => stepsArray.slice(0, Math.min(currentStepIndex + 1, stepsArray.length)),
        [stepsArray, currentStepIndex],
    )


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                showCloseButton
                className="!max-w-none !w-[95vw] md:!w-[90vw] !h-[90vh] md:!h-[85vh] !p-0 !overflow-hidden !border-0 !shadow-none !top-1/2 !left-1/2 !-translate-x-1/2 !-translate-y-1/2 !rounded-xl"
            >
                <div className="flex flex-col md:flex-row h-full min-h-0 bg-white">
                    {/* Exercise Section - Top on mobile, Left on desktop */}
                    <div className="w-full md:w-1/2 min-w-0 min-h-0 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50 flex-shrink-0">
                        <div className="h-full overflow-y-auto p-4 md:p-8">
                            <DialogHeader className="mb-4">
                                <DialogTitle className="text-base md:text-lg font-semibold text-gray-900">
                                    Задача #{position}
                                </DialogTitle>
                            </DialogHeader>

                            <QuestionStatement statement={statement} />

                            <QuestionSolution mergedDiagram={mergedDiagram} visibleSteps={visibleSteps} />

                        </div>
                    </div>

                    {/* Solution Section - Bottom on mobile, Right on desktop */}
                    <div className="w-full md:w-1/2 min-w-0 min-h-0 flex flex-col">
                        {/* Header */}
                        <Header stepCountLabel={stepCountLabel} />

                        {/* Answer review */}
                        <div className="px-4 md:px-8 pt-3 md:pt-4 flex-shrink-0">
                            <QuestionAnwers questionType={questionType} userAnswer={userAnswer || ""} correctAnswer={correctAnswer || ""} options={options} optionLetters={optionLetters} />
                        </div>

                        {/* Current Step Display - Mobile and Desktop */}
                        <StepsList
                            currentStep={currentStep}
                            currentStepIndex={currentStepIndex}
                            steps={stepsArray}
                            setCurrentStepIndex={setCurrentStepIndex}
                            renderWithMath={RenderWithMath}
                        />

                        {/* Controls */}
                        <Controls atStart={atStart} atEnd={atEnd} prev={prev} next={next} />
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    )
}
