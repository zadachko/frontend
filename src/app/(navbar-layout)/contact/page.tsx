"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, MapPin, Phone, Send, Clock, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Contact information data
const contactInfo = [
    {
        icon: <Mail className="h-6 w-6 text-primary-500" />,
        title: "Имейл",
        description: "Напишете ни на",
        value: "info@zadachko.bg",
        href: "mailto:info@zadachko.bg",
    },
    {
        icon: <Phone className="h-6 w-6 text-primary-500" />,
        title: "Телефон",
        description: "Обадете ни се на",
        value: "+359 888 123 456",
        href: "tel:+359888123456",
    },
    {
        icon: <MapPin className="h-6 w-6 text-primary-500" />,
        title: "Адрес",
        description: "Намерете ни на",
        value: "София, България",
        href: "#",
    },
    {
        icon: <Clock className="h-6 w-6 text-primary-500" />,
        title: "Работно време",
        description: "Понеделник - Петък",
        value: "9:00 - 18:00",
        href: "#",
    },
]

// FAQ data for contact-related questions
const faqItems = [
    {
        question: "Как мога да получа помощ с технически проблеми?",
        answer: "За технически проблеми можете да се свържете с нас чрез имейл на support@zadachko.bg или да използвате контактната форма на тази страница. Обикновено отговаряме в рамките на 24 часа.",
    },
    {
        question: "Има ли възможност за групови абонаменти за училища?",
        answer: "Да, предлагаме специални условия за училища и образователни институции. Моля, свържете се с нас за персонализирана оферта и повече информация.",
    },
    {
        question: "Как мога да предложа идеи за подобрения?",
        answer: "Вашите идеи са важни за нас! Можете да изпратите вашите предложения чрез контактната форма или да ни пишете на feedback@zadachko.bg.",
    },
    {
        question: "Има ли възможност за сътрудничество?",
        answer: "Да, винаги търсим нови партньори и сътрудници. Ако сте заинтересовани от сътрудничество, моля, свържете се с нас за обсъждане на възможностите.",
    },
]

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

    const heroRef = useRef(null)
    const contactRef = useRef(null)
    const faqRef = useRef(null)

    const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 })
    const isContactInView = useInView(contactRef, { once: true, amount: 0.3 })
    const isFaqInView = useInView(faqRef, { once: true, amount: 0.3 })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus("idle")

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000))

        // For demo purposes, always show success
        setSubmitStatus("success")
        setIsSubmitting(false)

        // Reset form after success
        setTimeout(() => {
            setFormData({ name: "", email: "", subject: "", message: "" })
            setSubmitStatus("idle")
        }, 3000)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1">
                {/* Hero Section */}
                <section ref={heroRef} className="relative bg-gradient-to-b from-primary-50 to-white py-16 md:py-24 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute bg-primary-500 rounded-full"
                                    style={{
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`,
                                        width: `${Math.random() * 10 + 5}px`,
                                        height: `${Math.random() * 10 + 5}px`,
                                    }}
                                    animate={{
                                        y: [0, Math.random() * 100 - 50],
                                        opacity: [0.3, 0.8, 0.3],
                                    }}
                                    transition={{
                                        duration: Math.random() * 10 + 10,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "reverse",
                                        ease: "easeInOut",
                                        delay: Math.random() * 5,
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="container relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <motion.h1
                                className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-700 mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5 }}
                            >
                                Свържете се с <span className="text-primary-500">нас</span>
                            </motion.h1>
                            <motion.p
                                className="text-lg text-gray-700 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                Имате въпроси или нужда от помощ? Нашият екип е тук, за да ви помогне.
                                Свържете се с нас и ще отговорим възможно най-скоро.
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* Contact Information Section */}
                <section ref={contactRef} className="py-16 bg-white">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={isContactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-2xl md:text-3xl font-bold text-primary-700 mb-6">
                                    Изпратете ни съобщение
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Име *</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Вашето име"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Имейл *</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Вашият имейл"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Тема *</Label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            required
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            placeholder="Тема на съобщението"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Съобщение *</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            required
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Вашето съобщение..."
                                            rows={6}
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full md:w-auto bg-primary-500 hover:bg-primary-600"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Изпращане...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Send className="h-4 w-4" />
                                                Изпрати съобщение
                                            </div>
                                        )}
                                    </Button>

                                    {submitStatus === "success" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 bg-green-50 border border-green-200 rounded-md text-green-700"
                                        >
                                            Благодарим ви! Вашето съобщение е изпратено успешно. Ще се свържем с вас скоро.
                                        </motion.div>
                                    )}

                                    {submitStatus === "error" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700"
                                        >
                                            Възникна грешка при изпращането. Моля, опитайте отново.
                                        </motion.div>
                                    )}
                                </form>
                            </motion.div>

                            {/* Contact Information */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={isContactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl md:text-3xl font-bold text-primary-700 mb-6">
                                    Информация за контакт
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {contactInfo.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                        >
                                            <Card className="h-full hover:shadow-md transition-shadow">
                                                <CardContent className="p-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex-shrink-0">
                                                            {item.icon}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-gray-900 mb-1">
                                                                {item.title}
                                                            </h3>
                                                            <p className="text-sm text-gray-600 mb-2">
                                                                {item.description}
                                                            </p>
                                                            {item.href !== "#" ? (
                                                                <a
                                                                    href={item.href}
                                                                    className="text-primary-600 hover:text-primary-700 font-medium"
                                                                >
                                                                    {item.value}
                                                                </a>
                                                            ) : (
                                                                <p className="text-primary-600 font-medium">
                                                                    {item.value}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section ref={faqRef} className="py-16 bg-gray-50">
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isFaqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-primary-700 mb-4">
                                Често задавани въпроси
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Намерете отговори на най-често задаваните въпроси относно нашите услуги и как да се свържете с нас.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {faqItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isFaqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                >
                                    <Card className="h-full hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 mt-1">
                                                    <MessageSquare className="h-5 w-5 text-primary-500" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 mb-2">
                                                        {item.question}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm">
                                                        {item.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
} 