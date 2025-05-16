"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { BookOpen, Brain, GraduationCap, Heart, Lightbulb, Users } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

// Team members data
const teamMembers = [
    {
        name: "Кристиян Пенев",
        role: "Основател & Главен изпълнителен директор",
        bio: "Бивш учител по математика с над 15 години опит и страст към образователните технологии.",
        image: "/placeholder.svg?height=300&width=300",
    },
    {
        name: "Антон Янков",
        role: "Технически директор",
        bio: "Софтуерен инженер с опит в изграждането на образователни платформи и адаптивни системи за обучение.",
        image: "/placeholder.svg?height=300&width=300",
    },
]

// Values data
const values = [
    {
        icon: <Lightbulb className="h-8 w-8 text-primary-500" />,
        title: "Иновация",
        description: "Постоянно търсим нови начини да направим ученето по-ефективно и ангажиращо.",
    },
    {
        icon: <Heart className="h-8 w-8 text-primary-500" />,
        title: "Страст",
        description: "Вярваме, че страстта към ученето е ключът към успеха в образованието.",
    },
    {
        icon: <Users className="h-8 w-8 text-primary-500" />,
        title: "Достъпност",
        description: "Стремим се да направим качественото образование достъпно за всички ученици.",
    },
    {
        icon: <Brain className="h-8 w-8 text-primary-500" />,
        title: "Адаптивност",
        description: "Нашата платформа се адаптира към индивидуалните нужди и стил на учене на всеки ученик.",
    },
]

// Timeline data
const timeline = [
    {
        year: "2020",
        title: "Основаване",
        description:
            "Задачко е основан от екип от учители и технологични експерти с мисията да трансформира подготовката за НВО.",
    },
    {
        year: "2021",
        title: "Първа версия",
        description: "Пускаме първата версия на платформата с основни функции за решаване на задачи и тестове.",
    },
    {
        year: "2022",
        title: "Разширяване",
        description:
            "Добавяме адаптивно обучение и персонализирани пътеки за учене, базирани на представянето на учениците.",
    },
    {
        year: "2023",
        title: "Игрификация",
        description: "Въвеждаме елементи на игрификация, включително значки, постижения и образователни игри.",
    },
    {
        year: "2024",
        title: "Днес",
        description: "Над 10,000 ученици използват Задачко за подготовка за НВО с 98% успеваемост.",
    },
]

export default function AboutPage() {
    const missionRef = useRef(null)
    const teamRef = useRef(null)
    const valuesRef = useRef(null)
    const storyRef = useRef(null)

    const isMissionInView = useInView(missionRef, { once: true, amount: 0.3 })
    const isTeamInView = useInView(teamRef, { once: true, amount: 0.3 })
    const isValuesInView = useInView(valuesRef, { once: true, amount: 0.3 })
    const isStoryInView = useInView(storyRef, { once: true, amount: 0.3 })


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
                                За <span className="text-primary-500">Задачко</span>
                            </motion.h1>
                            <motion.p
                                className="text-lg text-gray-700 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                Ние сме екип от страстни учители и технологични експерти, обединени от мисията да направим подготовката
                                за НВО по математика ефективна, достъпна и забавна за всички ученици.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section ref={missionRef} id="mission" className="py-16 bg-white">
                    <div className="container">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={isMissionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-2xl md:text-3xl font-bold text-primary-700 mb-4">Нашата мисия</h2>
                                <p className="text-gray-700 mb-6">
                                    В Задачко вярваме, че всеки ученик заслужава достъп до качествено образование и подготовка. Нашата
                                    мисия е да трансформираме начина, по който учениците се подготвят за НВО по математика, като
                                    предоставяме персонализирана, адаптивна и ангажираща платформа за обучение.
                                </p>
                                <p className="text-gray-700 mb-6">Стремим се да:</p>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <div className="mr-3 mt-1 bg-primary-100 rounded-full p-1">
                                            <GraduationCap className="h-5 w-5 text-primary-600" />
                                        </div>
                                        <span>Повишим успеваемостта на учениците на НВО изпитите</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="mr-3 mt-1 bg-primary-100 rounded-full p-1">
                                            <BookOpen className="h-5 w-5 text-primary-600" />
                                        </div>
                                        <span>Направим ученето по математика интересно и достъпно</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="mr-3 mt-1 bg-primary-100 rounded-full p-1">
                                            <Brain className="h-5 w-5 text-primary-600" />
                                        </div>
                                        <span>Изградим увереност и положително отношение към математиката</span>
                                    </li>
                                </ul>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={isMissionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-primary-200 rounded-2xl transform rotate-3"></div>
                                <div className="absolute inset-0 bg-primary-300 rounded-2xl transform -rotate-3"></div>
                                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-primary-100">
                                    <Image
                                        src="/placeholder.svg?height=600&width=800"
                                        alt="Students learning with Задачко"
                                        width={800}
                                        height={600}
                                        className="w-full h-auto"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section ref={teamRef} id="team" className="py-16 bg-primary-50">
                    <div className="container">
                        <motion.div
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-primary-700">Нашият екип</h2>
                            <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
                                Запознайте се с хората, които стоят зад Задачко - екип от страстни професионалисти, посветени на
                                трансформирането на образованието.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {teamMembers.map((member, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                                    whileHover={{ y: -10, transition: { duration: 0.2 } }}
                                >
                                    <Card className="overflow-hidden h-full">
                                        <CardContent className="p-0">
                                            <div className="relative">
                                                <div className="aspect-square overflow-hidden bg-primary-100">
                                                    <Image
                                                        src={member.image || "/placeholder.svg"}
                                                        alt={member.name}
                                                        width={300}
                                                        height={300}
                                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                                    />
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                                                    <div className="p-4 text-white">
                                                        <p className="text-sm">{member.bio}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-bold text-lg text-primary-700">{member.name}</h3>
                                                <p className="text-sm text-gray-600">{member.role}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section ref={valuesRef} id="values" className="py-16 bg-white">
                    <div className="container">
                        <motion.div
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-primary-700">Нашите ценности</h2>
                            <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
                                Ценностите, които ръководят всичко, което правим в Задачко и ни помагат да създадем най-добрата
                                образователна платформа.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                                    whileHover={{
                                        y: -10,
                                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                        transition: { duration: 0.2 },
                                    }}
                                    className="bg-primary-50 rounded-xl p-6 border border-primary-100"
                                >
                                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-md">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-700 mb-2">{value.title}</h3>
                                    <p className="text-gray-700">{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Story/Timeline Section */}
                <section ref={storyRef} id="story" className="py-16 bg-primary-50">
                    <div className="container">
                        <motion.div
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isStoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-primary-700">Нашата история</h2>
                            <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
                                Пътят на Задачко от идея до водеща платформа за подготовка за НВО по математика.
                            </p>
                        </motion.div>

                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200 hidden md:block"></div>

                            <div className="space-y-12 relative">
                                {timeline.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={isStoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                                        className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center`}
                                    >
                                        <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                                            <div className="bg-white rounded-xl p-6 shadow-md border border-primary-100 h-full">
                                                <div className="text-primary-500 font-bold text-xl mb-2">{item.year}</div>
                                                <h3 className="text-lg font-bold text-primary-700 mb-2">{item.title}</h3>
                                                <p className="text-gray-700">{item.description}</p>
                                            </div>
                                        </div>
                                        <div className="hidden md:flex items-center justify-center w-8 h-8 bg-primary-500 rounded-full my-4 md:my-0 z-10">
                                            <div className="w-3 h-3 bg-white rounded-full"></div>
                                        </div>
                                        <div className="md:w-1/2"></div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>


            </main>
        </div>
    )
}
