"use client"

import { useEffect, useState } from "react"
import { useMotionValue, animate } from "framer-motion"

interface AnimatedCounterProps {
    from?: number
    to: number
    duration?: number
    delay?: number
    formatter?: (value: number) => string
    className?: string
}

export function AnimatedCounter({
    from = 0,
    to,
    duration = 2,
    delay = 0,
    formatter = (value) => Math.round(value).toString(),
    className = "",
}: AnimatedCounterProps) {
    const count = useMotionValue(from)
    const [displayValue, setDisplayValue] = useState(formatter(from))

    useEffect(() => {
        const animation = animate(count, to, {
            duration,
            delay,
            ease: [0.25, 0.1, 0.25, 1], // Custom easing for a nice effect
            onUpdate: (latest) => {
                setDisplayValue(formatter(latest))
            },
        })

        return animation.stop
    }, [count, to, duration, delay, formatter])

    return <span className={className}>{displayValue}</span>
}

// Specialized counter components for common formats
export function NumberCounter({ value, ...props }: { value: number } & Omit<AnimatedCounterProps, "to">) {
    return <AnimatedCounter to={value} {...props} />
}

export function PercentageCounter({ value, ...props }: { value: number } & Omit<AnimatedCounterProps, "to">) {
    return <AnimatedCounter to={value} formatter={(val) => `${Math.round(val)}%`} {...props} />
}

export function PlusCounter({ value, ...props }: { value: number } & Omit<AnimatedCounterProps, "to">) {
    return <AnimatedCounter to={value} formatter={(val) => `${Math.round(val)}+`} {...props} />
}
