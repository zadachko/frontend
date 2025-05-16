"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Check, HelpCircle, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Pricing plans data
const pricingPlans = [
    {
        id: "basic",
        name: "Основен",
        description: "Идеален за начинаещи ученици, които искат да подобрят своите умения по математика.",
        monthlyPrice: 9.99,
        yearlyPrice: 99.99,
        features: [
            { name: "Достъп до 1000+ задачи", included: true },
            { name: "Базови тестове", included: true },
            { name: "Персонализирана статистика", included: true },
            { name: "Достъп до 3 образователни игри", included: true },
            { name: "Базови обяснения на решенията", included: true },
            { name: "Симулации на НВО изпити", included: false },
            { name: "Персонализирани пътеки за учене", included: false },
            { name: "Приоритетна поддръжка", included: false },
        ],
        popular: false,
        ctaText: "Започни с Основен",
        color: "bg-primary-100",
        textColor: "text-primary-700",
    },
    {
        id: "premium",
        name: "Премиум",
        description: "Най-популярният избор за ученици, които се подготвят сериозно за НВО.",
        monthlyPrice: 19.99,
        yearlyPrice: 199.99,
        features: [
            { name: "Достъп до 3000+ задачи", included: true },
            { name: "Неограничени тестове", included: true },
            { name: "Разширена статистика и анализ", included: true },
            { name: "Достъп до всички образователни игри", included: true },
            { name: "Подробни обяснения на решенията", included: true },
            { name: "Симулации на НВО изпити", included: true },
            { name: "Персонализирани пътеки за учене", included: true },
            { name: "Приоритетна поддръжка", included: false },
        ],
        popular: true,
        ctaText: "Избери Премиум",
        color: "bg-primary-500",
        textColor: "text-white",
    },
    {
        id: "ultimate",
        name: "Ултимейт",
        description: "Пълен пакет с всички функции за максимални резултати и успех на изпита.",
        monthlyPrice: 29.99,
        yearlyPrice: 299.99,
        features: [
            { name: "Достъп до 5000+ задачи", included: true },
            { name: "Неограничени тестове", included: true },
            { name: "Разширена статистика и анализ", included: true },
            { name: "Достъп до всички образователни игри", included: true },
            { name: "Видео обяснения на решенията", included: true },
            { name: "Неограничени симулации на НВО изпити", included: true },
            { name: "Персонализирани пътеки за учене", included: true },
            { name: "Приоритетна поддръжка 24/7", included: true },
        ],
        popular: false,
        ctaText: "Вземи Ултимейт",
        color: "bg-primary-900",
        textColor: "text-white",
    },
]

// FAQ data
const faqItems = [
    {
        question: "Мога ли да сменя плана си по-късно?",
        answer:
            "Да, можете да надстроите или понижите своя план по всяко време. Промените влизат в сила от следващия период на таксуване. При надстройване, ще получите незабавен достъп до новите функции, а при понижаване, ще запазите текущите функции до края на платения период.",
    },
    {
        question: "Има ли безплатен пробен период?",
        answer:
            "Да, всички планове включват 7-дневен безплатен пробен период. Можете да изпробвате всички функции на избрания план без ангажимент. Ако решите, че Zadachko не е подходящ за вас, можете да отмените абонамента си преди края на пробния период и няма да бъдете таксувани.",
    },
    {
        question: "Как мога да отменя абонамента си?",
        answer:
            "Можете да отмените абонамента си по всяко време от настройките на вашия акаунт. След отмяна, ще продължите да имате достъп до платените функции до края на текущия платен период. Не предлагаме възстановяване на средства за частично използвани периоди на абонамент.",
    },
    {
        question: "Има ли отстъпки за училища или групи?",
        answer:
            "Да, предлагаме специални цени за училища и групи от 10 или повече ученици. Моля, свържете се с нашия отдел за продажби на schools@zadachko.bg за повече информация и персонализирана оферта, съобразена с нуждите на вашето училище или група.",
    },
    {
        question: "Какви методи на плащане приемате?",
        answer:
            "Приемаме всички основни кредитни и дебитни карти (Visa, Mastercard), PayPal, и банкови преводи. За училища и организации предлагаме и възможност за плащане по фактура.",
    },
    {
        question: "Мога ли да използвам Zadachko на различни устройства?",
        answer:
            "Да, можете да използвате Zadachko на неограничен брой устройства с един акаунт. Нашата платформа е достъпна чрез уеб браузър на компютър, таблет или смартфон, както и чрез нашите мобилни приложения за iOS и Android.",
    },
]


export default function PricingPage() {
    const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
    const pricingRef = useRef(null)
    const featuresRef = useRef(null)
    const faqRef = useRef(null)

    const isPricingInView = useInView(pricingRef, { once: true, amount: 0.3 })
    const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 })
    const isFaqInView = useInView(faqRef, { once: true, amount: 0.3 })

    const isMobile = false;

    // Calculate yearly savings
    const calculateSavings = (monthlyPrice: number, yearlyPrice: number) => {
        const monthlyCostForYear = monthlyPrice * 12
        const savings = monthlyCostForYear - yearlyPrice
        const savingsPercentage = Math.round((savings / monthlyCostForYear) * 100)
        return savingsPercentage
    }

    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-b from-primary-50 to-white py-16 md:py-24 overflow-hidden">
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
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                Прости и прозрачни <span className="text-primary-500">цени</span>
                            </motion.h1>
                            <motion.p
                                className="text-lg text-gray-700 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                Изберете план, който отговаря на вашите нужди. Всички планове включват 7-дневен безплатен пробен период.
                            </motion.p>

                            <motion.div
                                className="flex items-center justify-center mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <div className="flex items-center space-x-2 bg-white p-1.5 rounded-full shadow-sm border">
                                    <Label
                                        htmlFor="billing-toggle"
                                        className={`px-4 py-1.5 rounded-full cursor-pointer text-sm font-medium ${billingPeriod === "monthly"
                                            ? "bg-primary-100 text-primary-700"
                                            : "text-gray-500 hover:text-gray-700"
                                            }`}
                                        onClick={() => setBillingPeriod("monthly")}
                                    >
                                        Месечно
                                    </Label>
                                    <Switch
                                        id="billing-toggle"
                                        checked={billingPeriod === "yearly"}
                                        onCheckedChange={(checked) => setBillingPeriod(checked ? "yearly" : "monthly")}
                                        className="data-[state=checked]:bg-primary-500"
                                    />
                                    <Label
                                        htmlFor="billing-toggle"
                                        className={`px-4 py-1.5 rounded-full cursor-pointer text-sm font-medium flex items-center ${billingPeriod === "yearly"
                                            ? "bg-primary-100 text-primary-700"
                                            : "text-gray-500 hover:text-gray-700"
                                            }`}
                                        onClick={() => setBillingPeriod("yearly")}
                                    >
                                        Годишно
                                        <Badge className="ml-2 bg-green-500 hover:bg-green-600">-20%</Badge>
                                    </Label>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Pricing Cards Section */}
                <section ref={pricingRef} className="py-16 bg-white">
                    <div className="container">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {pricingPlans.map((plan, index) => (
                                <motion.div
                                    key={plan.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isPricingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                                    className={`relative ${plan.popular ? "md:-mt-8 md:mb-8" : ""}`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-5 inset-x-0 flex justify-center">
                                            <Badge className="bg-primary-500 hover:bg-primary-600 px-4 py-1 text-sm font-medium">
                                                Най-популярен
                                            </Badge>
                                        </div>
                                    )}
                                    <Card
                                        className={`h-full overflow-hidden border-2 transition-all duration-200 ${selectedPlan === plan.id
                                            ? "border-primary-500 shadow-lg shadow-primary-100"
                                            : plan.popular
                                                ? "border-primary-200 shadow-md"
                                                : "border-gray-200 hover:border-primary-200 hover:shadow-md"
                                            }`}
                                    >
                                        <CardHeader className={`p-6 ${plan.color} ${plan.textColor}`}>
                                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                            <p className={`${plan.textColor} ${plan.id === "premium" ? "opacity-90" : "opacity-80"}`}>
                                                {plan.description}
                                            </p>
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            <div className="mb-6">
                                                <div className="flex items-baseline">
                                                    <span className="text-3xl font-bold text-gray-900">
                                                        {billingPeriod === "monthly"
                                                            ? `${plan.monthlyPrice.toFixed(2)} лв.`
                                                            : `${plan.yearlyPrice.toFixed(2)} лв.`}
                                                    </span>
                                                    <span className="text-gray-500 ml-2">
                                                        /{billingPeriod === "monthly" ? "месец" : "година"}
                                                    </span>
                                                </div>
                                                {billingPeriod === "yearly" && (
                                                    <div className="mt-2 text-sm text-green-600 font-medium">
                                                        Спестявате{" "}
                                                        {calculateSavings(plan.monthlyPrice, plan.yearlyPrice)}% с годишен план
                                                    </div>
                                                )}
                                            </div>

                                            <ul className="space-y-3 mb-6">
                                                {plan.features.map((feature, i) => (
                                                    <li key={i} className="flex items-start">
                                                        {feature.included ? (
                                                            <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                                        ) : (
                                                            <X className="h-5 w-5 text-gray-300 mr-3 mt-0.5 flex-shrink-0" />
                                                        )}
                                                        <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                                                            {feature.name}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                        <CardFooter className="p-6 pt-0">
                                            <Button
                                                className={`w-full rounded-xl ${plan.id === "premium"
                                                    ? "bg-primary-500 hover:bg-primary-600"
                                                    : plan.id === "ultimate"
                                                        ? "bg-primary-800 hover:bg-primary-900"
                                                        : "bg-primary-100 text-primary-700 hover:bg-primary-200"
                                                    }`}
                                                onClick={() => setSelectedPlan(plan.id)}
                                            >
                                                {plan.ctaText}
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            className="mt-12 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isPricingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <p className="text-gray-500">
                                Всички цени са с включен ДДС. Можете да отмените абонамента си по всяко време.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Features Comparison Section */}
                <section ref={featuresRef} className="py-16 bg-primary-50">
                    <div className="container">
                        <motion.div
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-primary-700">Сравнение на плановете</h2>
                            <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
                                Разгледайте подробно какво включва всеки план, за да изберете най-подходящия за вас.
                            </p>
                        </motion.div>

                        {/* Mobile view - Tabs */}
                        {isMobile ? (
                            <Tabs defaultValue="basic" className="w-full">
                                <TabsList className="grid grid-cols-3 mb-8">
                                    <TabsTrigger value="basic">Основен</TabsTrigger>
                                    <TabsTrigger value="premium">Премиум</TabsTrigger>
                                    <TabsTrigger value="ultimate">Ултимейт</TabsTrigger>
                                </TabsList>

                                {pricingPlans.map((plan) => (
                                    <TabsContent key={plan.id} value={plan.id} className="mt-0">
                                        <Card>
                                            <CardHeader className={`${plan.color} ${plan.textColor}`}>
                                                <h3 className="text-xl font-bold">{plan.name}</h3>
                                                <p className="text-sm">
                                                    {billingPeriod === "monthly"
                                                        ? `${plan.monthlyPrice.toFixed(2)} лв./месец`
                                                        : `${plan.yearlyPrice.toFixed(2)} лв./година`}
                                                </p>
                                            </CardHeader>
                                            <CardContent className="pt-6">
                                                <ul className="space-y-3">
                                                    {plan.features.map((feature, i) => (
                                                        <li key={i} className="flex items-start">
                                                            {feature.included ? (
                                                                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                                            ) : (
                                                                <X className="h-5 w-5 text-gray-300 mr-3 mt-0.5 flex-shrink-0" />
                                                            )}
                                                            <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                                                                {feature.name}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                            <CardFooter>
                                                <Button
                                                    className={`w-full rounded-xl ${plan.id === "premium"
                                                        ? "bg-primary-500 hover:bg-primary-600"
                                                        : plan.id === "ultimate"
                                                            ? "bg-primary-800 hover:bg-primary-900"
                                                            : "bg-primary-100 text-primary-700 hover:bg-primary-200"
                                                        }`}
                                                >
                                                    {plan.ctaText}
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        ) : (
                            // Desktop view - Table
                            <motion.div
                                className="bg-white rounded-xl shadow-md overflow-hidden border"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="py-4 px-6 text-left text-gray-500 font-medium">Функция</th>
                                            {pricingPlans.map((plan) => (
                                                <th key={plan.id} className="py-4 px-6 text-center">
                                                    <div className={`text-lg font-bold ${plan.id === "premium" ? "text-primary-600" : ""}`}>
                                                        {plan.name}
                                                    </div>
                                                    <div className="text-gray-700 font-medium">
                                                        {billingPeriod === "monthly"
                                                            ? `${plan.monthlyPrice.toFixed(2)} лв./месец`
                                                            : `${plan.yearlyPrice.toFixed(2)} лв./година`}
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Generate rows based on all unique features */}
                                        {pricingPlans[2].features.map((feature, index) => (
                                            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                                <td className="py-4 px-6 text-gray-700 font-medium">{feature.name}</td>
                                                {pricingPlans.map((plan) => (
                                                    <td key={`${plan.id}-${index}`} className="py-4 px-6 text-center">
                                                        {plan.features[index]?.included ? (
                                                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                                                        ) : (
                                                            <X className="h-5 w-5 text-gray-300 mx-auto" />
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                        <tr className="bg-gray-50">
                                            <td className="py-4 px-6"></td>
                                            {pricingPlans.map((plan) => (
                                                <td key={`${plan.id}-cta`} className="py-4 px-6 text-center">
                                                    <Button
                                                        className={`rounded-xl ${plan.id === "premium"
                                                            ? "bg-primary-500 hover:bg-primary-600"
                                                            : plan.id === "ultimate"
                                                                ? "bg-primary-800 hover:bg-primary-900"
                                                                : "bg-primary-100 text-primary-700 hover:bg-primary-200"
                                                            }`}
                                                    >
                                                        {plan.ctaText}
                                                    </Button>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </motion.div>
                        )}
                    </div>
                </section>

                {/* FAQ Section */}
                <section ref={faqRef} className="py-16 bg-primary-50">
                    <div className="container">
                        <motion.div
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isFaqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-primary-700">Често задавани въпроси</h2>
                            <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
                                Намерете отговори на най-често задаваните въпроси за нашите планове и цени.
                            </p>
                        </motion.div>

                        <motion.div
                            className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isFaqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Accordion type="single" collapsible className="w-full">
                                {faqItems.map((item, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left">
                                            <div className="flex items-center">
                                                <HelpCircle className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
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

                        <motion.div
                            className="text-center mt-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isFaqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <p className="text-gray-700 mb-4">
                                Имате други въпроси? Не се колебайте да се свържете с нашия екип за поддръжка.
                            </p>
                            <Link href="/contact">
                                <Button variant="outline" className="rounded-xl">
                                    Свържете се с нас
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>

        </div>
    )
}
