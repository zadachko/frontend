// components/ResultsMobileHeader.tsx
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface AssessmentOverviewMobileHeaderProps {
    showMobileNav: boolean;
    setShowMobileNav: (show: boolean) => void;

    Icon: LucideIcon;
    iconColor: string; // e.g. "text-emerald-600" or "text-[#6F58C9]"

    // results
    correctAnswers: number;
    totalQuestions: number;
}

export default function AssessmentOverviewMobileHeader({
    showMobileNav,
    setShowMobileNav,
    Icon,
    iconColor,
    correctAnswers,
    totalQuestions,
}: AssessmentOverviewMobileHeaderProps) {


    const toggleMobileNav = () => {
        setShowMobileNav(!showMobileNav)
    }

    return (
        <div className="sticky top-0 w-screen z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMobileNav}
                    className="p-2"
                >
                    {showMobileNav ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
                <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${iconColor}`} />
                    <span className={`font-semibold ${iconColor}`}>Резултати</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-green-700">
                    {correctAnswers}/{totalQuestions}
                </span>
            </div>
        </div>
    );
}
