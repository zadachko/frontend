"use client"

import type React from "react"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle, AlertCircle, Mail, Clock, MessageSquare, ChevronDown, HelpCircle, Facebook, Instagram, Twitter, Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Animation variants
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
    },
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const faqItems = [
    {
        question: "Как мога да отменя абонамента си?",
        answer:
            "Можеш да отмениш абонамента си по всяко време от настройките на профила си или като се свържеш с нашия екип за поддръжка.",
    },
    {
        question: "Предлагате ли отстъпки за училища?",
        answer:
            "Да, имаме специални планове и отстъпки за училища и учители. Свържи се с нас за повече информация за групови планове.",
    },
    {
        question: "Как да възстановя паролата си?",
        answer: "Отиди на страницата за вход и натисни линка „Забравена парола?“. Ще получиш имейл с инструкции за нулиране.",
    },
    {
        question: "Мога ли да тествам платформата без регистрация?",
        answer: "За момента не предлагаме демо режим без регистрация, но имаме напълно безплатен план, с който можеш да пробваш всичко основно.",
    },
    {
        question: "Как да се свържа с екипа ако не получа отговор?",
        answer: "Ако не получиш отговор до 24 часа, можеш да ни пишеш директно на support@zadachko.bg или да използваш формата отново.",
    },
]

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })

    const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = "Името е задължително"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Имейлът е задължителен"
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Невалиден имейл адрес"
        }

        if (!formData.subject) {
            newErrors.subject = "Моля, изберете тема"
        }

        if (!formData.message.trim()) {
            newErrors.message = "Съобщението е задължително"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        // Clear error when field is edited
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setFormState("submitting")

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Reset form on success
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            })

            setFormState("success")

            // Reset success message after 5 seconds
            setTimeout(() => {
                setFormState("idle")
            }, 5000)
        } catch (error) {
            setFormState("error")
        }
    }

    return (
        <div className="min-h-screen bg-[#f0eeff]">
            {/* Header section */}
            <motion.div
                className="container mx-auto px-4 py-12 md:py-16"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#3a2f7d]">Контакти</h1>
                <p className="mt-4 text-center text-lg max-w-3xl mx-auto text-[#6b6b6b]">
                    Свържи се с екипа на Задачко – ще се радваме да чуем мнението ти, да ти помогнем или просто да си поговорим за
                    математика!
                </p>
            </motion.div>

            {/* Main content */}
            <div className="container mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact form */}
                    <motion.div
                        className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 md:p-8"
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-[#3a2f7d]">Изпрати съобщение</h2>

                        <AnimatePresence mode="wait">
                            {formState === "success" && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    layout
                                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700"
                                >
                                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                                    <p>Благодарим за съобщението! Ще се свържем с теб възможно най-скоро.</p>
                                </motion.div>
                            )}

                            {formState === "error" && (
                                <motion.div
                                    key="error"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    layout
                                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700"
                                >
                                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                                    <p>Възникна грешка при изпращането на съобщението. Моля, опитай отново по-късно.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit}>
                            <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="visible">
                                <motion.div variants={fadeIn}>
                                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                                        Име
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 rounded-lg border ${errors.name ? "border-red-300 bg-red-50" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary`}
                                        placeholder="Вашето име"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </motion.div>

                                <motion.div variants={fadeIn}>
                                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                                        Имейл адрес
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 rounded-lg border ${errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary`}
                                        placeholder="example@email.com"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </motion.div>

                                <motion.div variants={fadeIn}>
                                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                                        Тема
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 rounded-lg border appearance-none ${errors.subject ? "border-red-300 bg-red-50" : "border-gray-300"
                                                } focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary`}
                                        >
                                            <option value="" disabled>
                                                Изберете тема
                                            </option>
                                            <option value="Въпрос">Въпрос</option>
                                            <option value="Проблем">Проблем</option>
                                            <option value="Идея">Идея</option>
                                            <option value="Друго">Друго</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-5 w-5" />
                                    </div>
                                    {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                                </motion.div>

                                <motion.div variants={fadeIn}>
                                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                                        Съобщение
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className={`w-full px-4 py-2 rounded-lg border ${errors.message ? "border-red-300 bg-red-50" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary`}
                                        placeholder="Вашето съобщение..."
                                    />
                                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                                </motion.div>

                                <motion.div variants={fadeIn}>
                                    <button
                                        type="submit"
                                        disabled={formState === "submitting"}
                                        className="w-full md:w-auto px-6 py-3 bg-primary text-white font-medium rounded-lg transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {formState === "submitting" ? (
                                            <span className="flex items-center justify-center">
                                                <svg
                                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Изпращане...
                                            </span>
                                        ) : (
                                            "Изпрати"
                                        )}
                                    </button>
                                </motion.div>
                            </motion.div>
                        </form>
                    </motion.div>

                    {/* Contact info */}
                    <motion.div className="space-y-6" variants={staggerContainer} initial="hidden" animate="visible">
                        <motion.div className="bg-white rounded-2xl shadow-sm p-6" variants={fadeIn}>
                            <h3 className="text-xl font-bold mb-4 text-[#3a2f7d]">Директен контакт</h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <Mail className="h-5 w-5 text-primary mt-0.5 mr-3" />
                                    <div>
                                        <p className="font-medium">Имейл</p>
                                        <a href="mailto:support@zadachko.com" className="text-primary hover:underline">
                                            support@zadachko.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Phone className="h-5 w-5 text-primary mt-0.5 mr-3" />
                                    <div>
                                        <p className="font-medium">Телефон</p>
                                        <a href="tel:+359888123456" className="text-primary hover:underline">
                                            +359 888 123 456
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Clock className="h-5 w-5 text-primary mt-0.5 mr-3" />
                                    <div>
                                        <p className="font-medium">Време за отговор</p>
                                        <p className="text-gray-600">Обикновено отговаряме до 24 часа</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div className="bg-white rounded-2xl shadow-sm p-6" variants={fadeIn}>
                            <h3 className="text-xl font-bold mb-4 text-[#3a2f7d]">Социални мрежи</h3>
                            <p className="text-gray-600 mb-4">Следи ни за новини и съвети за математика</p>
                            <div className="flex space-x-3">
                                <a
                                    href="#"
                                    className="flex items-center justify-center w-10 h-10 bg-[#f0eeff] rounded-lg text-primary hover:bg-primary hover:text-white transition-colors"
                                >
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center justify-center w-10 h-10 bg-[#f0eeff] rounded-lg text-primary hover:bg-primary hover:text-white transition-colors"
                                >
                                    <Instagram className="h-5 w-5" />
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center justify-center w-10 h-10 bg-[#f0eeff] rounded-lg text-primary hover:bg-primary hover:text-white transition-colors"
                                >
                                    <Twitter className="h-5 w-5" />
                                </a>
                            </div>
                        </motion.div>

                        <motion.div className="bg-white rounded-2xl shadow-sm p-6" variants={fadeIn}>
                            <h3 className="text-xl font-bold mb-4 text-[#3a2f7d]">Нужна ти е помощ?</h3>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <Mail className="h-5 w-5 text-primary mt-0.5 mr-3" />
                                    <div>
                                        <p className="font-medium">Чат поддръжка</p>
                                        <p className="text-sm text-gray-600">
                                            Онлайн всеки ден 9:00 - 18:00
                                            {/* <br />
                                            <span className="text-gray-500">Ще получите отговор на имейла си.</span> */}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* FAQ Section */}
                <motion.div className="mt-16" variants={fadeIn} initial="hidden" animate="visible">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#3a2f7d] mb-4">Често задавани въпроси</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Намери отговори на най-често задаваните въпроси за Задачко
                        </p>
                    </div>

                    <motion.div
                        className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Accordion type="single" collapsible className="w-full">
                            {faqItems.map((item, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left">
                                        <div className="flex items-center">
                                            <HelpCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                                            <span className="font-medium text-gray-800">{item.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-4 pt-0">
                                        <div className="pl-8 text-gray-600">{item.answer}</div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
