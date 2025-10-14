import Link from 'next/link';
import { Calculator, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-primary-700 text-white py-12">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Calculator className="h-6 w-6" />
                            <span className="font-bold text-xl">Zadachko</span>
                        </div>
                        <p className="text-primary-200 text-sm">
                            Интерактивна платформа за подготовка за НВО по математика за ученици в 7 клас.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <Link href="#" className="text-white hover:text-primary-200">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-white hover:text-primary-200">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-white hover:text-primary-200">
                                <Twitter className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">Платформа</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/features" className="text-primary-200 hover:text-white">
                                    Функции
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-primary-200 hover:text-white">
                                    Цени
                                </Link>
                            </li>
                            <li>
                                <Link href="/testimonials" className="text-primary-200 hover:text-white">
                                    Отзиви
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-primary-200 hover:text-white">
                                    Често задавани въпроси
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">Ресурси</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/blog" className="text-primary-200 hover:text-white">
                                    Блог
                                </Link>
                            </li>
                            <li>
                                <Link href="/guides" className="text-primary-200 hover:text-white">
                                    Ръководства
                                </Link>
                            </li>
                            <li>
                                <Link href="/help" className="text-primary-200 hover:text-white">
                                    Помощен център
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-primary-200 hover:text-white">
                                    Контакти
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">Правна информация</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/terms" className="text-primary-200 hover:text-white">
                                    Условия за ползване
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-primary-200 hover:text-white">
                                    Политика за поверителност
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="text-primary-200 hover:text-white">
                                    Политика за бисквитки
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#ffffff40] mt-8 pt-8 text-center text-primary-200 text-sm">
                    <p>© {new Date().getFullYear()} Zadachko. Всички права запазени.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
