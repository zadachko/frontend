'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import Link from "next/link";

interface NewsCardProps {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    slug: string;
    category: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, excerpt, date, readTime, slug, category }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div className="h-48 bg-gray-200">
                {/* This is where an image would go */}
                <div className="w-full h-full flex items-center justify-center bg-[#6F58C9]/10">
                    <span className="text-[#6F58C9] font-semibold">Изображение</span>
                </div>
            </div>
            <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-medium px-2 py-1 rounded bg-[#6F58C9]/10 text-[#6F58C9]">
                        {category}
                    </span>
                    <div className="flex items-center text-gray-500 text-xs">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>{date}</span>
                    </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{excerpt}</p>
                <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-500 text-xs">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>{readTime} мин. четене</span>
                    </div>
                    <Link href={`/news/${slug}`}>
                        <Button variant="ghost" size="sm" className="text-[#6F58C9] hover:text-[#6F58C9]/80 p-0">
                            Прочети повече
                            <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default function News() {
    const featuredNews = {
        title: "Важни промени в НВО изпита по математика за 2024 година",
        excerpt: "Министерството на образованието и науката обяви редица промени в структурата и съдържанието на изпита по математика за седмокласниците. Научете какво се променя и как да се подготвите ефективно с нашата платформа.",
        date: "15.03.2024",
        readTime: "8",
        slug: "promeni-nvo-matematika-2024",
        category: "Новини от МОН"
    };

    const recentNews = [
        {
            title: "10 стратегии за справяне с тревожността преди изпита",
            excerpt: "Изпитният стрес е нещо, което много ученици изпитват. В тази статия споделяме доказани техники, които помагат да се справите с тревожността и да дадете най-доброто от себе си на изпита.",
            date: "10.03.2024",
            readTime: "6",
            slug: "strategii-spravqne-trevognost-izpit",
            category: "Съвети"
        },
        {
            title: "Добавихме над 200 нови задачи в раздел 'Алгебра'",
            excerpt: "Радваме се да обявим, че нашият раздел 'Алгебра' беше разширен с над 200 нови задачи, които обхващат темите за линейни уравнения, системи уравнения и неравенства. Всички задачи включват подробни решения.",
            date: "05.03.2024",
            readTime: "3",
            slug: "novi-zadachi-algebra",
            category: "Обновления"
        },
        {
            title: "Интервю с отличник от НВО 2023: Как постигнах пълен резултат",
            excerpt: "Разговаряхме с Димитър Иванов, който постигна пълен резултат на НВО по математика през 2023 г. Той споделя своите методи за учене, съвети и мотивационни стратегии, които помогнаха за неговия успех.",
            date: "28.02.2024",
            readTime: "10",
            slug: "intervyu-otlichnik-nvo-2023",
            category: "Интервюта"
        },
        {
            title: "Нови функционалности за проследяване на напредъка",
            excerpt: "Вече можете да следите своя напредък по теми и подтеми с новата ни интерактивна графика. Открийте кои са вашите силни и слаби страни и къде да фокусирате усилията си в следващите седмици.",
            date: "20.02.2024",
            readTime: "4",
            slug: "novi-funkcionalnosti-napredak",
            category: "Обновления"
        },
        {
            title: "Математически трикове, които ще ви спестят време на изпита",
            excerpt: "В тази статия ще научите 5 математически трика, които могат да ви помогнат да решавате определени типове задачи по-бързо. Тези техники са особено полезни за задачи с избираем отговор.",
            date: "15.02.2024",
            readTime: "7",
            slug: "matematicheski-trikove-spestyavane-vreme",
            category: "Съвети"
        },
        {
            title: "Предстоящи уебинари за подготовка за НВО",
            excerpt: "Обявяваме серия от безплатни уебинари, които ще се проведат през март и април. Нашите преподаватели ще разгледат най-трудните теми и ще отговарят на въпроси на живо.",
            date: "10.02.2024",
            readTime: "5",
            slug: "predstoqshti-webinari-podgotovka-nvo",
            category: "Събития"
        }
    ];

    const categories = [
        "Всички",
        "Новини от МОН",
        "Обновления",
        "Съвети",
        "Интервюта",
        "Събития"
    ];

    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
                {/* Page Title */}
                <div className="flex flex-col items-center text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Новини и блог
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl">
                        Следете актуални новини за НВО изпита, обновления на платформата и полезни съвети за подготовка
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="mb-10">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="relative w-full md:w-80">
                            <input
                                type="text"
                                placeholder="Търси в новините..."
                                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-[#6F58C9] focus:border-[#6F58C9]"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category, index) => (
                                <button
                                    key={index}
                                    className={`px-4 py-2 text-sm rounded-full ${index === 0
                                        ? "bg-[#6F58C9] text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Featured News */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Актуално</h2>
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="h-64 md:h-auto bg-[#6F58C9]/10 flex items-center justify-center">
                                <span className="text-[#6F58C9] font-semibold">Водеща новина</span>
                            </div>
                            <div className="p-6 md:p-8">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm font-medium px-3 py-1 rounded bg-[#6F58C9]/10 text-[#6F58C9]">
                                        {featuredNews.category}
                                    </span>
                                    <div className="flex items-center text-gray-500 text-sm">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        <span>{featuredNews.date}</span>
                                    </div>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold mb-3">{featuredNews.title}</h3>
                                <p className="text-gray-600 mb-6">{featuredNews.excerpt}</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center text-gray-500 text-sm">
                                        <Clock className="h-4 w-4 mr-1" />
                                        <span>{featuredNews.readTime} мин. четене</span>
                                    </div>
                                    <Link href={`/news/${featuredNews.slug}`}>
                                        <Button>
                                            Прочети повече
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent News */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">Последни публикации</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recentNews.map((news, index) => (
                            <NewsCard
                                key={index}
                                title={news.title}
                                excerpt={news.excerpt}
                                date={news.date}
                                readTime={news.readTime}
                                slug={news.slug}
                                category={news.category}
                            />
                        ))}
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-12">
                    <nav className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="px-3 py-2 text-sm border-gray-300 text-gray-700"
                            disabled
                        >
                            Предишна
                        </Button>
                        {[1, 2, 3, 4, 5].map((page) => (
                            <Button
                                key={page}
                                variant={page === 1 ? "default" : "outline"}
                                size="sm"
                                className={`px-3 py-2 text-sm ${page === 1
                                    ? "bg-[#6F58C9] text-white"
                                    : "border-gray-300 text-gray-700"
                                    }`}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            size="sm"
                            className="px-3 py-2 text-sm border-gray-300 text-gray-700"
                        >
                            Следваща
                        </Button>
                    </nav>
                </div>

                {/* Newsletter Subscription */}
                <div className="bg-[#6F58C9]/5 p-6 sm:p-8 rounded-lg mt-16 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold mb-3">
                        Абонирай се за нашите новини
                    </h2>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Получавай актуални новини, съвети и обновления директно в имейла си
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Твоят имейл адрес"
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#6F58C9] focus:border-[#6F58C9]"
                        />
                        <Button className="whitespace-nowrap">
                            Абонирай се
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
} 