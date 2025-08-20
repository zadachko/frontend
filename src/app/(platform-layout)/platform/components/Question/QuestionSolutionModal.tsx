"use client"

import { useEffect, useMemo, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

import "katex/dist/katex.min.css"
import { BlockMath, InlineMath } from "react-katex"
import { applyStepActions, type DiagramData, Renderer, type StepAction } from "geometry-diagram-renderer"

export type SolutionStep = {
    id: string | number
    title?: string
    exerciseText: string // plain text containing $...$ or $$...$$ for math
    solutionText: string // plain text containing $...$ or $$...$$ for math
}

export type QuestionSolutionModalProps = {
    isOpen: boolean
    onClose: () => void
    exercise: {
        id: number | string
        text: string // supports $...$ and $$...$$
        imageSrc?: string
        imageAlt?: string
    }
    steps?: SolutionStep[]
    initialStepIndex?: number

    // Answer review props
    questionType?: "text" | "multiple"
    userAnswer?: string
    correctAnswer?: string
    options?: string[] // for multiple choice
    diagramData?: DiagramData
    diagramSteps?: StepAction[][]
}

// render a string with $...$ (inline) and $$...$$ (block) math
function renderWithMath(text: string, textClass = "text-md") {
    return text.split(/(\$\$.*?\$\$|\$.*?\$)/g).map((part, idx) => {
        if (part.startsWith("$$") && part.endsWith("$$")) {
            return (
                <span key={idx} className={textClass}>
                    <BlockMath math={part.slice(2, -2)} />
                </span>
            )
        }
        if (part.startsWith("$") && part.endsWith("$")) {
            return (
                <span key={idx} className={textClass}>
                    <InlineMath math={part.slice(1, -1)} />
                </span>
            )
        }
        return (
            <span key={idx} className={textClass}>
                {part}
            </span>
        )
    })
}

// Bulgarian letters for choices
const optionLetters = ["а", "б", "в", "г", "д", "е"]

/* ------------------------------ Main Component ---------------------------- */

export default function QuestionSolutionModal({
    isOpen,
    onClose,
    exercise,
    steps,
    initialStepIndex = 0,
    questionType,
    userAnswer,
    correctAnswer,
    options = [],
    diagramData,
    diagramSteps,
}: QuestionSolutionModalProps) {
    const safeSteps = useMemo(() => (Array.isArray(steps) ? steps : []), [steps])

    const [current, setCurrent] = useState(() =>
        Math.min(Math.max(0, initialStepIndex), Math.max(0, safeSteps.length - 1)),
    )

    // Reset current when opened or step count changes
    useEffect(() => {
        if (isOpen) {
            setCurrent(Math.min(Math.max(0, initialStepIndex), Math.max(0, safeSteps.length - 1)))
        }
    }, [isOpen, initialStepIndex, safeSteps.length])

    const mergedDiagram =
        diagramData && diagramSteps
            ? diagramSteps.slice(0, current).reduce((acc, step) => applyStepActions(acc, step), diagramData)
            : undefined

    // ESC to close, arrows to navigate
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
            if (e.key === "ArrowRight" || e.key === "ArrowDown") next()
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev()
        }
        if (isOpen) window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [isOpen, onClose])

    const atStart = current === 0
    const atEnd = current === Math.max(0, safeSteps.length - 1)

    const next = () => setCurrent((c) => Math.min(c + 1, Math.max(0, safeSteps.length - 1)))
    const prev = () => setCurrent((c) => Math.max(c - 1, 0))

    const stepCountLabel = `${safeSteps.length ? current + 1 : 0} / ${Math.max(safeSteps.length, 1)}`
    const currentStep = safeSteps[current]
    const visibleSteps: SolutionStep[] = useMemo(
        () => safeSteps.slice(0, Math.min(current + 1, safeSteps.length)),
        [safeSteps, current],
    )

    /* ---------------------------- Answer Review UI --------------------------- */

    const renderAnswerReview = () => {
        if (!questionType) return null

        const hasBoth = !!userAnswer && !!correctAnswer

        // Map a provided answer (option text OR letter) to its canonical letter
        const getIndexForAnswer = (answer?: string): number | null => {
            if (!answer) return null
            const idxFromOption = options?.indexOf(answer)
            if (typeof idxFromOption === "number" && idxFromOption >= 0) return idxFromOption
            const normalized = answer
                .replace(/\)\s*$/, "")
                .trim()
                .toLowerCase()
            const idxFromLetter = optionLetters.findIndex((l) => l === normalized)
            if (idxFromLetter >= 0) return idxFromLetter
            return null
        }

        const userIndex = questionType === "multiple" ? getIndexForAnswer(userAnswer) : null
        const correctIndex = questionType === "multiple" ? getIndexForAnswer(correctAnswer) : null
        const userLetter = userIndex != null ? optionLetters[userIndex] : null
        const correctLetter = correctIndex != null ? optionLetters[correctIndex] : null
        const userOptionText = userIndex != null ? options[userIndex] : null
        const correctOptionText = correctIndex != null ? options[correctIndex] : null

        const isCorrect =
            hasBoth &&
            (questionType === "multiple"
                ? userIndex != null && correctIndex != null && userIndex === correctIndex
                : userAnswer === correctAnswer)

        const renderUserAnswer = () => {
            if (questionType === "multiple") {
                if (userIndex == null) return "Без отговор"
                return (
                    <>
                        {`${userLetter}) `}
                        {userOptionText ? renderWithMath(userOptionText, "text-sm md:text-[16px]") : null}
                    </>
                )
            }
            return userAnswer ? renderWithMath(userAnswer, "text-sm md:text-[16px]") : "Без отговор"
        }

        const renderCorrectAnswer = () => {
            if (questionType === "multiple") {
                if (correctIndex == null) return null
                return (
                    <>
                        {`${correctLetter}) `}
                        {correctOptionText ? renderWithMath(correctOptionText, "text-sm md:text-[16px]") : null}
                    </>
                )
            }
            return correctAnswer ? renderWithMath(correctAnswer, "text-sm md:text-[16px]") : null
        }

        return (
            <div className={`gap-3 mb-4 ${hasBoth && !isCorrect ? "flex flex-row" : ""}`}>
                <div
                    className={[
                        "p-1 md:p-3 rounded border flex items-center justify-center",
                        hasBoth && !isCorrect ? "w-1/2" : "w-full",
                        isCorrect
                            ? "bg-green-50 border-green-200"
                            : hasBoth && !isCorrect
                                ? "bg-red-50 border-red-200"
                                : "bg-gray-50 border-gray-200",
                    ].join(" ")}
                >
                    <span className="text-xs md:text-sm text-gray-600 mr-1">Вашият отговор:</span>
                    <span
                        className={[
                            "text-xs md:text-sm font-medium",
                            isCorrect ? "text-green-800" : hasBoth && !isCorrect ? "text-red-800" : "text-gray-800",
                        ].join(" ")}
                    >
                        {renderUserAnswer()}
                    </span>
                </div>

                {hasBoth && !isCorrect && (
                    <div className="p-2 md:p-3 rounded border bg-green-50 border-green-200 w-1/2 flex justify-center">
                        <span className="text-xs md:text-sm text-gray-600">Правилен отговор: </span>
                        <span className="text-xs md:text-sm font-medium text-green-800">{renderCorrectAnswer()}</span>
                    </div>
                )}
            </div>
        )
    }

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
                                    Задача #{exercise.id}
                                </DialogTitle>
                            </DialogHeader>

                            <div className="prose max-w-none text-gray-900">
                                <div className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                                    {renderWithMath(exercise.text, "text-sm md:text-[18px]")}
                                </div>
                            </div>

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
                                        <ol className="pl-0 space-y-2" style={{ listStyleType: "none", paddingLeft: 0, marginLeft: 0 }}>
                                            {visibleSteps.map((s) => (
                                                <li key={s.id} className="text-base leading-relaxed">
                                                    {renderWithMath(s.exerciseText, 'text-[18px]')}
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* Solution Section - Bottom on mobile, Right on desktop */}
                    <div className="w-full md:w-1/2 min-w-0 min-h-0 flex flex-col">
                        {/* Header */}
                        <div className="px-4 md:px-8 pt-4 md:pt-8 pb-3 md:pb-4 border-b bg-white flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg md:text-xl font-bold text-gray-900">Решение – стъпки</h3>
                                <span className="text-xs md:text-sm text-gray-500">Стъпка {stepCountLabel}</span>
                            </div>
                        </div>

                        {/* Answer review */}
                        <div className="px-4 md:px-8 pt-3 md:pt-4 flex-shrink-0">{renderAnswerReview()}</div>

                        {/* Current Step Display - Mobile and Desktop */}
                        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-3 md:py-4">
                            {currentStep ? (
                                <div className="space-y-3">
                                    {/* Mobile: Show only current step */}
                                    <div className="md:hidden">
                                        <div className="group rounded-xl border border-emerald-500 bg-emerald-50 shadow-sm p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-emerald-600 bg-emerald-600 text-white text-xs font-semibold">
                                                    {current + 1}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    {currentStep.title && (
                                                        <h4 className="text-sm font-semibold text-emerald-700 mb-1">
                                                            {renderWithMath(currentStep.title, "text-sm")}
                                                        </h4>
                                                    )}
                                                    <div className="text-sm leading-relaxed text-emerald-900">
                                                        {renderWithMath(currentStep.solutionText, "text-sm")}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Desktop: Show all steps with current highlighted */}
                                    <div className="hidden md:block">
                                        <ol className="space-y-3">
                                            {safeSteps.map((s, i) => {
                                                const active = i === current
                                                return (
                                                    <li key={s.id}>
                                                        <div
                                                            onClick={() => setCurrent(i)}
                                                            className={[
                                                                "group cursor-pointer rounded-xl border p-4 transition-all",
                                                                active
                                                                    ? "border-emerald-500 bg-emerald-50 shadow-sm"
                                                                    : "border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/40",
                                                            ].join(" ")}
                                                        >
                                                            <div className="flex items-start gap-3">
                                                                <div
                                                                    className={[
                                                                        "mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                                                                        active
                                                                            ? "border-emerald-600 bg-emerald-600 text-white"
                                                                            : "border-gray-300 bg-gray-100 text-gray-700",
                                                                    ].join(" ")}
                                                                >
                                                                    {i + 1}
                                                                </div>
                                                                <div className="min-w-0 flex-1">
                                                                    {s.title && (
                                                                        <div className="flex items-center gap-2">
                                                                            <h4
                                                                                className={
                                                                                    "truncate text-sm font-semibold " +
                                                                                    (active ? "text-emerald-700" : "text-gray-900")
                                                                                }
                                                                            >
                                                                                {renderWithMath(s.title, "text-[15px]")}
                                                                            </h4>
                                                                        </div>
                                                                    )}
                                                                    <div
                                                                        className={
                                                                            "mt-1 text-sm leading-relaxed " + (active ? "text-emerald-900" : "text-gray-700")
                                                                        }
                                                                    >
                                                                        {renderWithMath(s.solutionText, "text-[17px]")}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ol>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-xs md:text-sm text-gray-500">Няма стъпки за показване.</div>
                            )}
                        </div>

                        {/* Controls */}
                        <div className="border-t bg-white p-3 md:p-4 flex-shrink-0">
                            <div className="mx-2 md:mx-4 flex items-center justify-between gap-2 md:gap-4">
                                <Button
                                    variant="outline"
                                    onClick={prev}
                                    disabled={atStart}
                                    className="gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-4 py-1 md:py-2 bg-transparent"
                                    size="sm"
                                >
                                    <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
                                    <span className="hidden sm:inline">Предишна</span>
                                    <span className="sm:hidden">Пред.</span>
                                </Button>
                                <div className="text-xs text-gray-500 text-center">
                                    <span className="hidden md:inline">Навигирай със стрелките ← →</span>
                                    <span className="md:hidden">← →</span>
                                </div>
                                <Button
                                    onClick={next}
                                    disabled={atEnd}
                                    className="gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-4 py-1 md:py-2"
                                    size="sm"
                                >
                                    <span className="hidden sm:inline">Следваща</span>
                                    <span className="sm:hidden">След.</span>
                                    <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
