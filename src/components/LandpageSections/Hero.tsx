"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, useAnimation, useInView } from "framer-motion"
import { PercentageCounter, PlusCounter } from "@/components/ui/animated-counter"

// Math SVG components
const MathSymbols = {
    Pi: ({ className = "" }) => (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20 30H80M35 30V70M65 30V70"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    Sigma: ({ className = "" }) => (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 25H75L25 75H75" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    Sqrt: ({ className = "" }) => (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 50L35 70L80 20" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    Divide: ({ className = "" }) => (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="30" r="8" fill="currentColor" />
            <circle cx="50" cy="70" r="8" fill="currentColor" />
            <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        </svg>
    ),
    Function: ({ className = "" }) => (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M30 20C30 20 30 50 30 50C30 65 45 65 50 65C55 65 70 65 70 50C70 50 70 20 70 20M30 80C30 80 30 50 30 50M70 80C70 80 70 50 70 50"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    Triangle: ({ className = "" }) => (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M50 20L80 80H20L50 20Z"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
}

// Floating element with enhanced interactivity
const FloatingElement = ({
    children,
    x,
    y,
    size,
    color,
    delay = 0,
    factor = 1,
    mobileHidden = false,
    mobilePosition,
}: {
    children: React.ReactNode
    x: string
    y: string
    size: string
    color: string
    delay?: number
    factor?: number
    mobileHidden?: boolean
    mobilePosition?: { x: string; y: string }
}) => {
    const [isHovered, setIsHovered] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const isMobile = false;

    // Don't render if this element should be hidden on mobile
    if (isMobile && mobileHidden) {
        return null
    }

    // Random floating animation parameters
    const floatX = Math.random() * 10 - 5
    const floatY = Math.random() * 10 - 5
    const duration = 3 + Math.random() * 2

    // Adjust size for mobile
    const mobileSize = isMobile
        ? size
            .replace(/w-(\d+)/, (_, num) => `w-${Math.max(8, Number.parseInt(num) * 0.7)}`)
            .replace(/h-(\d+)/, (_, num) => `h-${Math.max(8, Number.parseInt(num) * 0.7)}`)
        : size

    // Use mobile-specific position if provided and on mobile
    const elementX = isMobile && mobilePosition ? mobilePosition.x : x
    const elementY = isMobile && mobilePosition ? mobilePosition.y : y

    return (
        <motion.div
            className="absolute pointer-events-auto"
            style={{
                top: elementY,
                left: elementX,
                // Ensure elements don't go off-screen on mobile
                maxWidth: isMobile ? "20%" : "auto",
                maxHeight: isMobile ? "20%" : "auto",
                zIndex: isMobile ? 0 : 5, // Lower z-index on mobile to prevent overlapping with text
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: isMobile ? 0.7 : 1, // Reduce opacity on mobile
                scale: 1,
                x: isHovered ? position.x * factor * 2 : floatX,
                y: isHovered ? position.y * factor * 2 : floatY,
            }}
            transition={{
                opacity: { delay, duration: 0.8 },
                scale: { delay, duration: 0.8, type: "spring" },
                x: { duration, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" },
                y: { duration: duration * 1.2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" },
            }}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                setPosition({
                    x: (e.clientX - rect.left - rect.width / 2) / 5,
                    y: (e.clientY - rect.top - rect.height / 2) / 5,
                })
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0], transition: { rotate: { duration: 0.5 } } }}
            whileTap={{ scale: 0.9 }}
        >
            <div
                className={`${color} ${mobileSize} rounded-2xl flex items-center justify-center shadow-lg`}
                style={{ transition: "box-shadow 0.3s ease" }}
            >
                {children}
            </div>
        </motion.div>
    )
}


// Enhanced CTA button with animations
const AnimatedButton = ({
    variant = "default",
    children,
    href,
    delay = 0,
    className = "",
}: {
    variant?: "default" | "outline"
    children: React.ReactNode
    href: string
    delay?: number
    className?: string
}) => {
    const isMobile = false;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full sm:w-auto ${className}`}
        >
            <Link href={href} className="w-full block">
                <Button
                    variant={variant}
                    size={isMobile ? "default" : "lg"}
                    className={`w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-xl sm:rounded-2xl relative overflow-hidden group ${variant === "default" ? "bg-primary-500" : "border-2 border-primary-500"
                        }`}
                >
                    <span className="relative z-10">{children}</span>
                    <span
                        className={`absolute inset-0 ${variant === "default" ? "bg-primary-600" : "bg-primary-100"
                            } transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`}
                    />
                    <span className="absolute top-0 right-0 h-full w-1/4 bg-white/20 skew-x-[25deg] transform -translate-x-32 group-hover:translate-x-full transition-transform duration-700" />
                </Button>
            </Link>
        </motion.div>
    )
}

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const statsRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: false, margin: "-100px" })
    const isStatsInView = useInView(statsRef, { once: true, amount: 0.5 })
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible")
        }
    }, [controls, isInView])


    return (
        <section
            ref={containerRef}
            className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white py-16 md:py-20 lg:py-32"
        >

            {/* Main content with improved mobile spacing */}
            <div className="container relative z-10 px-5 sm:px-6">
                <div className="mx-auto max-w-3xl text-center">
                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-700 relative z-10"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.span
                            initial={{ display: "inline-block" }}
                            animate={{ rotate: [0, -2, 2, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
                        >
                            Подготви
                        </motion.span>{" "}
                        се за НВО по математика със{" "}
                        <motion.span
                            className="text-primary-500 inline-block"
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        >
                            Задачко
                        </motion.span>
                    </motion.h1>

                    {/* Add a semi-transparent background to improve text readability on mobile */}
                    <motion.div
                        className="relative z-10 mt-6 sm:mt-8 px-3 py-4 rounded-xl bg-white/60 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <p className="text-base sm:text-lg text-gray-700 sm:text-gray-600">
                            Интерактивна платформа с хиляди задачи, тестове и игри, които ще направят подготовката ти за изпита
                            забавна и ефективна.
                        </p>
                    </motion.div>

                    {/* Improved button spacing for mobile */}
                    <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-5 sm:gap-4 justify-center">
                        <AnimatedButton href="/register" delay={0.6}>
                            Започни сега
                        </AnimatedButton>
                        <AnimatedButton href="/about" variant="outline" delay={0.8} className="mt-2 sm:mt-0">
                            Научи повече
                        </AnimatedButton>
                    </div>

                    {/* Animated stats section with improved mobile layout */}
                    <motion.div
                        ref={statsRef}
                        className="mt-12 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 gap-5 max-w-lg mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.0 }}
                    >
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                            <div className="text-2xl sm:text-3xl font-bold text-primary-500">
                                {isStatsInView && <PlusCounter value={5000} duration={2.5} />}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">Задачи</div>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                            <div className="text-2xl sm:text-3xl font-bold text-primary-500">
                                {isStatsInView && <PlusCounter value={1200} duration={2} />}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">Ученици</div>
                        </div>
                        <div className="col-span-2 sm:col-span-1 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                            <div className="text-2xl sm:text-3xl font-bold text-primary-500">
                                {isStatsInView && <PercentageCounter value={98} duration={1.5} />}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">Успеваемост</div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Repositioned floating math elements for mobile */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="relative w-full h-full">
                    <FloatingElement
                        x="10%"
                        y="15%"
                        size="w-16 h-16"
                        color="bg-primary-200/80 text-primary-700"
                        delay={0.2}
                        factor={1.5}
                        mobilePosition={{ x: "5%", y: "5%" }}
                    >
                        <MathSymbols.Pi className="w-10 h-10" />
                    </FloatingElement>

                    <FloatingElement
                        x="15%"
                        y="60%"
                        size="w-20 h-20"
                        color="bg-green-200/80 text-green-700"
                        delay={0.4}
                        factor={1.2}
                        mobilePosition={{ x: "2%", y: "85%" }}
                    >
                        <MathSymbols.Divide className="w-12 h-12" />
                    </FloatingElement>

                    <FloatingElement
                        x="85%"
                        y="25%"
                        size="w-24 h-24"
                        color="bg-primary-100/80 text-primary-700"
                        delay={0.6}
                        factor={1.8}
                        mobilePosition={{ x: "85%", y: "10%" }}
                    >
                        <MathSymbols.Sqrt className="w-14 h-14" />
                    </FloatingElement>

                    <FloatingElement
                        x="80%"
                        y="70%"
                        size="w-16 h-16"
                        color="bg-yellow-200/80 text-yellow-700"
                        delay={0.8}
                        factor={1.3}
                        mobilePosition={{ x: "85%", y: "85%" }}
                    >
                        <MathSymbols.Sigma className="w-10 h-10" />
                    </FloatingElement>

                    <FloatingElement
                        x="5%"
                        y="40%"
                        size="w-12 h-12"
                        color="bg-primary-300/80 text-primary-700"
                        delay={1.0}
                        factor={1.6}
                        mobileHidden={true}
                    >
                        <span className="text-xl font-bold">x²</span>
                    </FloatingElement>

                    <FloatingElement
                        x="75%"
                        y="15%"
                        size="w-14 h-14"
                        color="bg-orange-200/80 text-orange-700"
                        delay={1.2}
                        factor={1.4}
                        mobileHidden={true}
                    >
                        <MathSymbols.Triangle className="w-9 h-9" />
                    </FloatingElement>

                    <FloatingElement
                        x="25%"
                        y="80%"
                        size="w-18 h-18"
                        color="bg-primary-200/80 text-primary-700"
                        delay={1.4}
                        factor={1.7}
                        mobileHidden={true}
                    >
                        <MathSymbols.Function className="w-11 h-11" />
                    </FloatingElement>
                </div>
            </div>

        </section>
    )
}
