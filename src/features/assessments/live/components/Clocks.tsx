import React, { useEffect, useState, useRef } from 'react'
import { Clock as ClockIcon } from 'lucide-react'

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

interface ClockProps {
    mobile: boolean
    clockColor?: string
    initialTime?: number // in seconds, defaults to 90 minutes
}

export const Clock = ({ mobile, clockColor, initialTime = 90 * 60 }: ClockProps) => {
    const [timeLeft, setTimeLeft] = useState(initialTime)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    if (timerRef.current) {
                        clearInterval(timerRef.current)
                        timerRef.current = null
                    }
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }
        }
    }, []) // Empty dependency array ensures this only runs once

    if (mobile) {
        return (
            <>
                <ClockIcon className={`w-4 h-4 ${clockColor}`} />
                <span className={`font-mono text-lg font-bold ${clockColor}`}>
                    {formatTime(timeLeft)}
                </span>
            </>
        )
    }

    return (
        <div className="flex items-center justify-center gap-2 text-white">
            <ClockIcon className="w-5 h-5" />
            <span className="font-mono text-2xl font-bold">
                {formatTime(timeLeft)}
            </span>
        </div>
    )
}

export default Clock;