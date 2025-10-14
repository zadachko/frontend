import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Clock } from "./Clocks";
interface AssessmentMobileHeaderProps {
    showMobileNav: boolean;
    setShowMobileNav: (show: boolean) => void;
    // handleSubmitExam: () => void;
    setShowSubmitDialog: (show: boolean) => void;
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
    setShowMobileNav,
    // handleSubmitExam,
    setShowSubmitDialog,
    clockColor,
    buttonGradient,
}: AssessmentMobileHeaderProps) {

    const toggleMobileNav = () => {
        setShowMobileNav(!showMobileNav)
    }

    const handleSubmitExam = () => {
        setShowSubmitDialog(true)
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
                    <Clock clockColor={clockColor} mobile={true} />
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
