"use client"

import { useRef } from "react"
import { Award, BarChart3, Brain, Clock, FileText, Gamepad2, LineChart, Puzzle } from "lucide-react"
import { motion, useInView } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const features = [
    {
        icon: <FileText className="h-10 w-10 text-primary-500" />,
        title: "Автоматично генерирани тестове",
        description: "Създавай персонализирани тестове според твоите нужди и ниво на подготовка.",
        category: "practice",
    },
    {
        icon: <Award className="h-10 w-10 text-primary-500" />,
        title: "Значки и постижения",
        description: "Печели значки и отключвай нови нива с всяка решена задача.",
        category: "motivation",
    },
    {
        icon: <BarChart3 className="h-10 w-10 text-primary-500" />,
        title: "Детайлна статистика",
        description: "Проследявай своя напредък и виж къде имаш нужда от повече практика.",
        category: "analytics",
    },
    {
        icon: <Brain className="h-10 w-10 text-primary-500" />,
        title: "Адаптивно обучение",
        description: "Платформата се адаптира към твоето ниво и ти предлага подходящи задачи.",
        category: "practice",
    },
    {
        icon: <Gamepad2 className="h-10 w-10 text-primary-500" />,
        title: "Образователни игри",
        description: "Учи докато играеш с нашите интерактивни математически игри.",
        category: "motivation",
    },
    {
        icon: <Clock className="h-10 w-10 text-primary-500" />,
        title: "Симулация на изпит",
        description: "Подготви се за реалния изпит с нашите точни симулации на НВО.",
        category: "practice",
    },
    {
        icon: <LineChart className="h-10 w-10 text-primary-500" />,
        title: "Анализ на грешките",
        description: "Разбери къде грешиш и как да подобриш резултатите си.",
        category: "analytics",
    },
    {
        icon: <Puzzle className="h-10 w-10 text-primary-500" />,
        title: "Стъпка по стъпка решения",
        description: "Виж подробни обяснения на всяка задача, за да разбереш материала по-добре.",
        category: "practice",
    },
]

const FeaturesSection = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, amount: 0.2 })
    const isMobile = false;

    return (
        <section ref={ref} className="py-16 sm:py-20 bg-white overflow-hidden">
            <div className="container px-4 sm:px-6">
                <motion.div
                    className="text-center mb-12 sm:mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="inline-block"
                    >
                        <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                            Защо да избереш нас?
                        </span>
                    </motion.div>
                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-700 mt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        Защо да избереш Zadachko?
                    </motion.h2>
                    <motion.p
                        className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        Нашата платформа е създадена от учители и експерти, за да направи ученето забавно и ефективно.
                    </motion.p>
                </motion.div>

                {/* Tabbed features for better organization on mobile */}
                {isMobile ? (
                    <Tabs defaultValue="practice" className="w-full">
                        <TabsList className="grid grid-cols-3 mb-8">
                            <TabsTrigger value="practice">Практика</TabsTrigger>
                            <TabsTrigger value="analytics">Анализ</TabsTrigger>
                            <TabsTrigger value="motivation">Мотивация</TabsTrigger>
                        </TabsList>
                        {["practice", "analytics", "motivation"].map((category) => (
                            <TabsContent key={category} value={category} className="mt-0">
                                <div className="grid grid-cols-1 gap-4">
                                    {features
                                        .filter((feature) => feature.category === category)
                                        .map((feature, index) => (
                                            <FeatureCard key={index} feature={feature} index={index} isInView={isInView} />
                                        ))}
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.05,
                                },
                            },
                        }}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    >
                        {features.map((feature, index) => (
                            <FeatureCard key={index} feature={feature} index={index} isInView={isInView} />
                        ))}
                    </motion.div>
                )}

                {/* Interactive call to action */}
                <motion.div
                    className="mt-12 sm:mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <motion.button
                        className="bg-primary-500 hover:bg-primary-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-medium text-base sm:text-lg relative overflow-hidden group"
                        whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10">Разгледай всички функции</span>
                        <motion.span className="absolute inset-0 bg-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                        <motion.span className="absolute top-0 right-0 h-full w-1/4 bg-white/20 skew-x-[25deg] transform -translate-x-32 group-hover:translate-x-full transition-transform duration-500" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    )
}

// Update the FeatureCard component to have immediate hover animations
function FeatureCard({ feature }: { feature: { icon: React.ReactNode, title: string, description: string, category: string }, index: number, isInView: boolean }) {
    return (
        <motion.div
            className="bg-primary-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-lg transition-all duration-200 relative overflow-hidden group"
            variants={{
                hidden: { opacity: 0, y: 30 },
                show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.35,
                        ease: "easeOut",
                    },
                },
            }}
        >
            {/* Animated background gradient - make it more immediate */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />

            <motion.div
                className="bg-white rounded-lg sm:rounded-xl w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 shadow-md relative z-10"
                whileHover={{
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.25, ease: "easeInOut" },
                }}
            >
                {feature.icon}
            </motion.div>

            <h3 className="text-lg sm:text-xl font-bold text-primary-700 mb-2 relative z-10">{feature.title}</h3>
            <p className="text-sm sm:text-base text-gray-600 relative z-10">{feature.description}</p>

            {/* Decorative elements with faster animations */}
            <motion.div
                className="absolute -bottom-2 -right-2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-100 opacity-30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute -top-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-100 opacity-20"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 1.3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
        </motion.div>
    )
}

export default FeaturesSection
