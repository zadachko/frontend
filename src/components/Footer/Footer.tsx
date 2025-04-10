import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Zadachko</h3>
                        <p className="text-gray-400 mb-4">
                            Платформа за подготовка за НВО по математика, създадена от ученици за ученици.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Бързи връзки</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                                    Начало
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                                    За нас
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                                    Често срещани въпроси
                                </Link>
                            </li>
                            <li>
                                <Link href="/news" className="text-gray-400 hover:text-white transition-colors">
                                    Новини
                                </Link>
                            </li>
                            <li>
                                <Link href="/subscriptions" className="text-gray-400 hover:text-white transition-colors">
                                    Абонаменти
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Topics */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Теми</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/topics/algebra" className="text-gray-400 hover:text-white transition-colors">
                                    Алгебра
                                </Link>
                            </li>
                            <li>
                                <Link href="/topics/geometry" className="text-gray-400 hover:text-white transition-colors">
                                    Геометрия
                                </Link>
                            </li>
                            <li>
                                <Link href="/topics/trigonometry" className="text-gray-400 hover:text-white transition-colors">
                                    Тригонометрия
                                </Link>
                            </li>
                            <li>
                                <Link href="/topics/statistics" className="text-gray-400 hover:text-white transition-colors">
                                    Статистика
                                </Link>
                            </li>
                            <li>
                                <Link href="/topics" className="text-gray-400 hover:text-white transition-colors">
                                    Всички теми
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Контакти</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <Mail className="text-gray-400 mr-2 mt-1" size={18} />
                                <span className="text-gray-400">info@zadachko.com</span>
                            </li>
                            <li className="flex items-start">
                                <Phone className="text-gray-400 mr-2 mt-1" size={18} />
                                <span className="text-gray-400">+359 888 123 456</span>
                            </li>
                            <li className="flex items-start">
                                <MapPin className="text-gray-400 mr-2 mt-1" size={18} />
                                <span className="text-gray-400">София, България</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Zadachko. Всички права запазени.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 