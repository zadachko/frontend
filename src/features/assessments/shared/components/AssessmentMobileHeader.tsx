// components/AssessmentMobileHeader.tsx
import { Button } from '@/components/ui/button';
import { Menu, X, type LucideIcon } from 'lucide-react';
import { Clock } from './Clock';
import React from 'react';

type BaseProps = {
    showMobileNav: boolean;
    setShowMobileNav: (show: boolean) => void;
    className?: string;
};

type LiveProps = BaseProps & {
    assessmentModeType: 'live';
    setShowSubmitDialog: (show: boolean) => void;
    clockColor: string;

    /**
     * To keep Tailwind happy (no dynamic class name construction),
     * pass complete class strings you already safelist in your config.
     * Example:
     *   submitBtnClasses={{
     *     base: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white",
     *     hover: "hover:from-emerald-600 hover:to-emerald-700"
     *   }}
     */
    submitBtnClasses?: {
        base: string;
        hover?: string;
    };
};

type OverviewProps = BaseProps & {
    assessmentModeType: 'overview';
    Icon: LucideIcon;
    iconColor: string;
    correctAnswers: number;
    totalQuestions: number;
};

type AssessmentMobileHeaderProps = LiveProps | OverviewProps;

export default function AssessmentMobileHeader(props: AssessmentMobileHeaderProps) {
    const { showMobileNav, setShowMobileNav, className } = props;

    const toggleMobileNav = () => setShowMobileNav(!showMobileNav);

    return (
        <div
            className={[
                "sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm w-screen",
                className ?? ""
            ].join(" ")}
        >
            {/* Left section: menu + context (clock OR results title) */}
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMobileNav}
                    className="p-2"
                    aria-label={showMobileNav ? "Close menu" : "Open menu"}
                >
                    {showMobileNav ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>

                {props.assessmentModeType === 'live' ? (
                    <div className="flex items-center gap-2">
                        <Clock clockColor={props.clockColor} mobile />
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <props.Icon className={`w-4 h-4 ${props.iconColor}`} />
                        <span className={`font-semibold ${props.iconColor}`}>Резултати</span>
                    </div>
                )}
            </div>

            {/* Right section: submit button OR score */}
            {props.assessmentModeType === 'live' ? (
                <Button
                    size="sm"
                    onClick={() => props.setShowSubmitDialog(true)}
                    className={[
                        props.submitBtnClasses?.base ??
                        "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white",
                        props.submitBtnClasses?.hover ?? "hover:from-emerald-600 hover:to-emerald-700"
                    ].join(" ")}
                >
                    Изпрати
                </Button>
            ) : (
                <div className="flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-medium text-green-700">
                        {props.correctAnswers}/{props.totalQuestions}
                    </span>
                </div>
            )}
        </div>
    );
}
