"use client"

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

// --- Types ---
export type SolutionStep = {
    id: string | number;
    title?: string;
    content: string; // plain text or simple HTML
};

export type QuestionSolutionModalProps = {
    isOpen: boolean;
    onClose: () => void;
    exercise: {
        id: number | string;
        text: string; // short exercise statement (KaTeX-ready text or plain)
        imageSrc?: string; // optional illustrative image
        imageAlt?: string;
    };
    steps?: SolutionStep[]; // <-- made optional
    initialStepIndex?: number;
};

export default function QuestionSolutionModal({
    isOpen,
    onClose,
    exercise,
    steps,
    initialStepIndex = 0,
}: QuestionSolutionModalProps) {
    // guard against undefined/missing steps
    const safeSteps = useMemo(() => (Array.isArray(steps) ? steps : []), [steps]);

    const [current, setCurrent] = useState(() =>
        Math.min(Math.max(0, initialStepIndex), Math.max(0, safeSteps.length - 1))
    );

    const listRef = useRef<HTMLDivElement>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Reset current when modal opens with a different initial index or steps change
    useEffect(() => {
        if (isOpen) {
            setCurrent(Math.min(Math.max(0, initialStepIndex), Math.max(0, safeSteps.length - 1)));
        }
    }, [isOpen, initialStepIndex, safeSteps.length]);

    // Close on ESC and support arrow navigation
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        if (isOpen) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, current, safeSteps.length, onClose]);

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

    const stepCountLabel = useMemo(
        () => `${safeSteps.length ? current + 1 : 0} / ${Math.max(safeSteps.length, 1)}`,
        [current, safeSteps.length]
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="!max-w-none !w-[90vw] !h-[85vh] !p-0 !overflow-hidden !border-0 !shadow-none !top-1/2 !left-1/2 !-translate-x-1/2 !-translate-y-1/2 !rounded-xl">
                <div className="flex h-full bg-white">
                    {/* Left side: exercise text + image */}
                    <div className="w-1/2 min-w-0 border-r border-gray-200 bg-gray-50">
                        <div className="h-full overflow-y-auto p-8">
                            <DialogHeader className="mb-4">
                                <DialogTitle className="text-lg font-semibold text-gray-900">
                                    Задача #{exercise.id}
                                </DialogTitle>
                            </DialogHeader>

                            <div className="prose max-w-none text-gray-900">
                                <p className="text-base leading-relaxed whitespace-pre-wrap">{exercise.text}</p>
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

                    {/* Right side: steps + controls */}
                    <div className="w-1/2 min-w-0 flex flex-col">
                        {/* Header */}
                        <div className="px-8 pt-8 pb-4 border-b bg-white">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-900">Решение – стъпки</h3>
                                <span className="text-sm text-gray-500">Стъпка {stepCountLabel}</span>
                            </div>
                        </div>

                        {/* Scrollable Steps */}
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
                                                                {active && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                                                            </div>
                                                        )}
                                                        <p
                                                            className={
                                                                "mt-1 text-sm leading-relaxed " +
                                                                (active ? "text-emerald-900" : "text-gray-700")
                                                            }
                                                        >
                                                            {s.content}
                                                        </p>
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
