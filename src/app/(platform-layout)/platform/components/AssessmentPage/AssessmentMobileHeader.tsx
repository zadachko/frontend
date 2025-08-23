import { Button } from "@/components/ui/button";
import { Menu, X, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface AssessmentMobileHeaderProps {
    showMobileNav: boolean;
    toggleMobileNav: () => void;
    // timeLeft: number;
    // formatTime: (time: number) => string;
    handleSubmitExam: () => void;
    clockColor: string; // e.g. "text-emerald-600" or "text-[#6F58C9]"
    buttonGradient: {
        from: string;
        to: string;
        hoverFrom: string;
        hoverTo: string;
    };
}

export function AssessmentMobileHeader({
    showMobileNav,
    toggleMobileNav,
    // timeLeft,
    // formatTime,
    handleSubmitExam,
    clockColor,
    buttonGradient,
}: AssessmentMobileHeaderProps) {


    const [timeLeft, setTimeLeft] = useState(90 * 60) // 90 minutes in seconds


    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    // Format time display
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    return (
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMobileNav}
                    className="p-2"
                >
                    {showMobileNav ? (
                        <X className="w-5 h-5" />
                    ) : (
                        <Menu className="w-5 h-5" />
                    )}
                </Button>
                <div className="flex items-center gap-2">
                    <Clock className={`w-4 h-4 ${clockColor}`} />
                    <span className={`font-mono text-lg font-bold ${clockColor}`}>
                        {formatTime(timeLeft)}
                    </span>
                </div>
            </div>
            <Button
                size="sm"
                className={`bg-gradient-to-r from-${buttonGradient.from} to-${buttonGradient.to} text-white hover:from-${buttonGradient.hoverFrom} hover:to-${buttonGradient.hoverTo}`}
                onClick={handleSubmitExam}
            >
                Изпрати
            </Button>
        </div>
    );
}
