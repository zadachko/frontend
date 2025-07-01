"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
    {
        name: "Мария Иванова",
        role: "Ученичка, 7 клас",
        content:
            "Благодарение на Zadachko повиших оценката си по математика от 4 на 6 само за един срок! Задачите са интересни и обясненията много ясни.",
        avatar: "/placeholder.svg?height=80&width=80",
        stars: 5,
    },
    {
        name: "Георги Петров",
        role: "Ученик, 7 клас",
        content:
            "Преди мразех математиката, но с игрите в Zadachko започнах да я харесвам. Вече не се притеснявам за НВО.",
        avatar: "/placeholder.svg?height=80&width=80",
        stars: 5,
    },
    {
        name: "Елена Димитрова",
        role: "Родител",
        content:
            "Като родител съм много доволна от напредъка на дъщеря ми. Платформата е интуитивна и децата я използват с желание.",
        avatar: "/placeholder.svg?height=80&width=80",
        stars: 4,
    },
]

const TestimonialsSection = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    return (
        <section ref={ref} className="py-20 bg-primary-50 overflow-hidden relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary-200 opacity-20"
                    animate={{
                        x: [0, 10, 0, -10, 0],
                        y: [0, -10, 0, 10, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-primary-300 opacity-10"
                    animate={{
                        x: [0, -15, 0, 15, 0],
                        y: [0, 15, 0, -15, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full bg-primary-400 opacity-5"
                    animate={{
                        scale: [1, 1.2, 1, 0.8, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="container relative z-10">
                {/* Section header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-block"
                    >
                        <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                            Отзиви
                        </span>
                    </motion.div>
                    <motion.h2
                        className="text-3xl font-bold text-primary-600 md:text-4xl mt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        Какво казват нашите потребители
                    </motion.h2>
                    <motion.p
                        className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.6 }}
                    >
                        Хиляди ученици вече подобриха резултатите си с Zadachko
                    </motion.p>
                </motion.div>

                {/* Testimonials grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-2xl p-6 shadow-lg relative group"
                            initial={{ opacity: 0, y: 50, rotateY: -10 }}
                            transition={{ duration: 0.7, delay: index * 0.2 + 0.5 }}
                            animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                        >
                            {/* Floating quote icon */}
                            <motion.div
                                className="absolute -top-3 -right-3 text-primary-200 opacity-50"
                                animate={{ rotate: [0, 5, 0, -5, 0] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Quote size={40} />
                            </motion.div>

                            {/* Avatar + name */}
                            <div className="flex items-center mb-4">
                                <motion.div
                                    className="mr-4 relative"
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: [0, -5, 5, -5, 0],
                                        transition: { delay: 0, duration: 0.5 },
                                    }}
                                >
                                    <div className="absolute inset-0 bg-primary-200 rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity" />
                                    <Image
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        width={50}
                                        height={50}
                                        className="rounded-full relative z-10 border-2 border-white"
                                    />
                                </motion.div>
                                <div>
                                    <h3 className="font-bold text-primary-600">{testimonial.name}</h3>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>

                            {/* Stars */}
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{
                                            duration: 0.3,
                                            delay: index * 0.2 + i * 0.1 + 0.7,
                                        }}
                                    >
                                        <Star
                                            className={`w-4 h-4 ${i < testimonial.stars
                                                ? "text-yellow-400 fill-yellow-400"
                                                : "text-gray-300"
                                                }`}
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Content */}
                            <motion.p
                                className="text-gray-600 relative z-10"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.2 + 1 }}
                            >
                                {testimonial.content}
                            </motion.p>

                            {/* Decorative gradient on hover */}
                            <motion.div
                                className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl"
                            // no framer delay needed here—it’s pure CSS
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Call to action */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 1.5 }}
                >
                    <motion.button
                        className="bg-white border border-primary-200 text-primary-600 hover:bg-primary-50 px-6 py-2 rounded-xl font-medium relative overflow-hidden group"
                        whileHover={{ scale: 1.05, transition: { delay: 0, duration: 0.2 } }}
                        whileTap={{ scale: 0.95, transition: { delay: 0, duration: 0.1 } }}
                    >
                        <span className="relative z-10 flex items-center cursor-pointer">
                            Виж всички отзиви
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-2"
                                initial={{ x: 0 }}
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                            >
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </motion.svg>
                        </span>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    )
}

export default TestimonialsSection
