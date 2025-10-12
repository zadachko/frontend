import React from 'react'
import { SolutionStep } from './QuestionSolutionModal'
const StepsList = ({
    currentStep,
    currentStepIndex,
    steps,
    setCurrentStepIndex,
    renderWithMath,
}: {
    currentStep: SolutionStep
    currentStepIndex: number
    steps: SolutionStep[]
    setCurrentStepIndex: (index: number) => void
    renderWithMath: (text: string, className?: string) => React.ReactNode
}) => {
    return (
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-3 md:py-4">
            {currentStep ? (
                <div className="space-y-3">
                    {/* Mobile: Show only current step */}
                    <div className="md:hidden">
                        <div className="group rounded-xl border border-emerald-500 bg-emerald-50 shadow-sm p-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-emerald-600 bg-emerald-600 text-white text-xs font-semibold">
                                    {currentStepIndex + 1}
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
                            {steps.map((s, i) => {
                                const active = i === currentStepIndex
                                return (
                                    <li key={s.id}>
                                        <div
                                            onClick={() => setCurrentStepIndex(i)}
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
    )
}

export default StepsList;