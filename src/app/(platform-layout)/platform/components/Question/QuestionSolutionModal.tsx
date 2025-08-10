"use client"

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

export type SolutionStep = {
    id: string | number;
    title?: string;
    content: string; // plain text containing $...$ or $$...$$ for math
};

export type QuestionSolutionModalProps = {
    isOpen: boolean;
    onClose: () => void;
    exercise: {
        id: number | string;
        text: string; // supports $...$ and $$...$$
        imageSrc?: string;
        imageAlt?: string;
    };
    steps?: SolutionStep[];
    initialStepIndex?: number;

    // Answer review props
    questionType?: "text" | "multiple";
    userAnswer?: string;
    correctAnswer?: string;
    options?: string[]; // for multiple choice
};

// render a string with $...$ (inline) and $$...$$ (block) math
function renderWithMath(text: string) {
    return text.split(/(\$\$.*?\$\$|\$.*?\$)/g).map((part, idx) => {
        if (part.startsWith("$$") && part.endsWith("$$")) {
            return (
                <span key={idx} className="text-lg">
                    <BlockMath math={part.slice(2, -2)} />
                </span>
            );
        }
        if (part.startsWith("$") && part.endsWith("$")) {
            return (
                <span key={idx} className="text-lg">
                    <InlineMath math={part.slice(1, -1)} />
                </span>
            );
        }
        return <span key={idx} className="text-lg">{part}</span>;
    });
}

// Bulgarian letters for choices
const optionLetters = ["а", "б", "в", "г", "д", "е"];

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
}: QuestionSolutionModalProps) {
    const safeSteps = useMemo(() => (Array.isArray(steps) ? steps : []), [steps]);

    const [current, setCurrent] = useState(() =>
        Math.min(Math.max(0, initialStepIndex), Math.max(0, safeSteps.length - 1))
    );

    const listRef = useRef<HTMLDivElement>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Reset current when opened or step count changes
    useEffect(() => {
        if (isOpen) {
            setCurrent(Math.min(Math.max(0, initialStepIndex), Math.max(0, safeSteps.length - 1)));
        }
    }, [isOpen, initialStepIndex, safeSteps.length]);

    // ESC to close, arrows to navigate
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        if (isOpen) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    // Keep active step in view
    useEffect(() => {
        const el = stepRefs.current[current];
        const list = listRef.current;
        if (!el || !list) return;
        const elTop = el.offsetTop;
        const elBottom = elTop + el.clientHeight;
        const viewTop = list.scrollTop;
        const viewBottom = viewTop + list.clientHeight;
        if (elTop < viewTop + 16) {
            list.scrollTo({ top: elTop - 16, behavior: "smooth" });
        } else if (elBottom > viewBottom - 16) {
            list.scrollTo({ top: elBottom - list.clientHeight + 16, behavior: "smooth" });
        }
    }, [current]);

    const atStart = current === 0;
    const atEnd = current === Math.max(0, safeSteps.length - 1);

    const next = () => setCurrent((c) => Math.min(c + 1, Math.max(0, safeSteps.length - 1)));
    const prev = () => setCurrent((c) => Math.max(c - 1, 0));

    const stepCountLabel = `${safeSteps.length ? current + 1 : 0} / ${Math.max(safeSteps.length, 1)}`;

    /* ---------------------------- Answer Review UI --------------------------- */

    const renderAnswerReview = () => {
        if (!questionType) return null;

        const hasBoth = !!userAnswer && !!correctAnswer;

        // Map a provided answer (option text OR letter) to its canonical letter
        const getIndexForAnswer = (answer?: string): number | null => {
            if (!answer) return null;
            const idxFromOption = options?.indexOf(answer);
            if (typeof idxFromOption === "number" && idxFromOption >= 0) return idxFromOption;
            const normalized = answer.replace(/\)\s*$/, "").trim().toLowerCase();
            const idxFromLetter = optionLetters.findIndex((l) => l === normalized);
            if (idxFromLetter >= 0) return idxFromLetter;
            return null;
        };

        const userIndex = questionType === "multiple" ? getIndexForAnswer(userAnswer) : null;
        const correctIndex = questionType === "multiple" ? getIndexForAnswer(correctAnswer) : null;
        const userLetter = userIndex != null ? optionLetters[userIndex] : null;
        const correctLetter = correctIndex != null ? optionLetters[correctIndex] : null;
        const userOptionText = userIndex != null ? options[userIndex] : null;
        const correctOptionText = correctIndex != null ? options[correctIndex] : null;

        const isCorrect = hasBoth && (
            questionType === "multiple"
                ? userIndex != null && correctIndex != null && userIndex === correctIndex
                : userAnswer === correctAnswer
        );

        const renderUserAnswer = () => {
            if (questionType === "multiple") {
                if (userIndex == null) return "Без отговор";
                return (
                    <>
                        {`${userLetter}) `}
                        {userOptionText ? renderWithMath(userOptionText) : null}
                    </>
                );
            }
            return userAnswer ? renderWithMath(userAnswer) : "Без отговор";
        };

        const renderCorrectAnswer = () => {
            if (questionType === "multiple") {
                if (correctIndex == null) return null;
                return (
                    <>
                        {`${correctLetter}) `}
                        {correctOptionText ? renderWithMath(correctOptionText) : null}
                    </>
                );
            }
            return correctAnswer ? renderWithMath(correctAnswer) : null;
        };

        return (
            <div className="flex gap-3 mb-4">
                <div
                    className={[
                        "p-3 rounded border w-1/2",
                        isCorrect
                            ? "bg-green-50 border-green-200"
                            : hasBoth && !isCorrect
                                ? "bg-red-50 border-red-200"
                                : "bg-gray-50 border-gray-200",
                    ].join(" ")}
                >
                    <span className="text-sm text-gray-600">Вашият отговор: </span>
                    <span
                        className={[
                            "text-sm font-medium",
                            isCorrect
                                ? "text-green-800"
                                : hasBoth && !isCorrect
                                    ? "text-red-800"
                                    : "text-gray-800",
                        ].join(" ")}
                    >
                        {renderUserAnswer()}
                    </span>
                </div>

                {hasBoth && !isCorrect && (
                    <div className="p-3 rounded border bg-green-50 border-green-200 w-1/2">
                        <span className="text-sm text-gray-600">Правилен отговор: </span>
                        <span className="text-sm font-medium text-green-800">
                            {renderCorrectAnswer()}
                        </span>
                    </div>
                )}
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="!max-w-none !w-[90vw] !h-[85vh] !p-0 !overflow-hidden !border-0 !shadow-none !top-1/2 !left-1/2 !-translate-x-1/2 !-translate-y-1/2 !rounded-xl">
                <div className="flex h-full bg-white">
                    {/* Left: exercise */}
                    <div className="w-1/2 min-w-0 border-r border-gray-200 bg-gray-50">
                        <div className="h-full overflow-y-auto p-8">
                            <DialogHeader className="mb-4">
                                <DialogTitle className="text-lg font-semibold text-gray-900">
                                    Задача #{exercise.id}
                                </DialogTitle>
                            </DialogHeader>

                            <div className="prose max-w-none text-gray-900">
                                <div className="text-base leading-relaxed whitespace-pre-wrap">
                                    {renderWithMath(exercise.text)}
                                </div>
                            </div>

                            {exercise.imageSrc && (
                                <div className="mt-6 relative w-full overflow-hidden rounded-lg border bg-white shadow-sm">
                                    <div className="aspect-[16/10] w-full">
                                        <Image
                                            src={exercise.imageSrc}
                                            alt={exercise.imageAlt || "exercise image"}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: answers + steps */}
                    <div className="w-1/2 min-w-0 flex flex-col">
                        {/* Header */}
                        <div className="px-8 pt-8 pb-4 border-b bg-white">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-900">Решение – стъпки</h3>
                                <span className="text-sm text-gray-500">Стъпка {stepCountLabel}</span>
                            </div>
                        </div>

                        {/* Answer review */}
                        <div className="px-8 pt-4">{renderAnswerReview()}</div>

                        {/* Steps */}
                        <div ref={listRef} className="flex-1 overflow-y-auto px-8 py-4">
                            <ol className="space-y-3">
                                {safeSteps.map((s, i) => {
                                    const active = i === current;
                                    return (
                                        <li key={s.id}>
                                            <div
                                                ref={(el) => {
                                                    stepRefs.current[i] = el;
                                                }}
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
                                                                    {s.title}
                                                                </h4>
                                                            </div>
                                                        )}
                                                        <div
                                                            className={
                                                                "mt-1 text-sm leading-relaxed " +
                                                                (active ? "text-emerald-900" : "text-gray-700")
                                                            }
                                                        >
                                                            {renderWithMath(s.content)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}

                                {safeSteps.length === 0 && (
                                    <li className="text-sm text-gray-500">Няма стъпки за показване.</li>
                                )}
                            </ol>
                        </div>

                        {/* Controls */}
                        <div className="border-t bg-white p-4">
                            <div className="mx-4 flex items-center justify-between gap-4">
                                <Button variant="outline" onClick={prev} disabled={atStart} className="gap-2">
                                    <ChevronLeft className="h-4 w-4" /> Предишна
                                </Button>
                                <div className="text-xs text-gray-500">Навигирай със стрелките ← →</div>
                                <Button onClick={next} disabled={atEnd} className="gap-2">
                                    Следваща <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
