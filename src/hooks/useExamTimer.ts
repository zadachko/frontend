import { useEffect, useCallback, Dispatch, SetStateAction } from 'react';

export const useExamTimer = (
    timeLeft: number,
    setTimeLeft: Dispatch<SetStateAction<number>>,
    isExamStarted: boolean,
    onTimeUp: () => void
) => {
    // Timer effect
    useEffect(() => {
        if (!isExamStarted || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev: number) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isExamStarted, timeLeft, setTimeLeft, onTimeUp]);

    // Format time display
    const formatTime = useCallback((seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }, []);

    // Get time warning status
    const getTimeWarningStatus = useCallback((totalSeconds: number) => {
        if (totalSeconds <= 300) { // 5 minutes or less
            return { type: 'critical', color: 'text-red-600', bgColor: 'bg-red-100' };
        } else if (totalSeconds <= 900) { // 15 minutes or less
            return { type: 'warning', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
        } else {
            return { type: 'normal', color: 'text-emerald-600', bgColor: 'bg-emerald-100' };
        }
    }, []);

    return {
        formatTime,
        getTimeWarningStatus,
    };
};
