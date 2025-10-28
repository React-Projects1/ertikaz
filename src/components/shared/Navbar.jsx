"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations("home");
    const locale = useLocale();
    const pathname = usePathname();

    const sections = [
        { id: "services", label: t("services"), href: `/${locale}/` },
        { id: "aboutUs", label: t("aboutUs"), href: `/${locale}/aboutUs` },
        { id: "contactUs", label: t("contactUs"), href: `/${locale}/contactUs` },
    ];

    const switchLocale = (lang) => {
        const segments = pathname.split("/");
        segments[1] = lang;
        return segments.join("/") || "/";
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-myPrimary z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center justify-between">

                <div className="flex-shrink-0  flex items-center gap-3">
                    <img src="/images/logo2.png" alt="Logo" className="w-9" />
                    <p className="text-white text-sm">
                        {t("logo-text")}
                    </p>
                </div>

                <nav className="hidden md:flex flex-1 justify-center gap-6 text-sm lg:text-base text-white">
                    {sections.map((section) => (
                        <Link
                            key={section.id}
                            href={section.href}
                            className={`px-3 whitespace-nowrap text-md transition ${pathname === section.href
                                ? "text-mySecondary font-semibold"
                                : "hover:text-myHover"
                                }`}
                        >
                            {section.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <div className="flex items-center gap-2 text-white text-sm">
                        <Link
                            href={switchLocale("ar")}
                            className={`${locale === "ar" ? "text-myHover font-bold" : "hover:text-myHover"}`}
                        >
                            AR
                        </Link>
                        <span>|</span>
                        <Link
                            href={switchLocale("en")}
                            className={`${locale === "en" ? "text-myHover font-bold" : "hover:text-myHover"}`}
                        >
                            EN
                        </Link>
                    </div>

                    <Link
                        href={`/${locale}/joinUs`}
                        className="bg-mySecondary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-myHover transition"
                    >
                        {t("joinUs")}
                    </Link>
                </div>

                <div className="flex md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="transition-transform duration-300"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X className="text-white" size={24} />
                        ) : (
                            <Menu className="text-white" size={24} />
                        )}
                    </button>
                </div>
            </div>

            <div
                className={`absolute top-full left-0 w-full bg-white px-4 pb-4 shadow-md transition-all duration-300 overflow-hidden ${isOpen
                    ? "opacity-100 translate-y-0 max-h-[500px]"
                    : "opacity-0 -translate-y-4 max-h-0"
                    }`}
            >
                <nav className="flex flex-col items-start gap-3 mt-3">
                    {sections.map((section) => (
                        <Link
                            key={section.id}
                            href={section.href}
                            onClick={() => setIsOpen(false)}
                            className="px-3 whitespace-nowrap text-md transition hover:text-myHover"
                        >
                            {section.label}
                        </Link>
                    ))}

                    <div className="flex items-center gap-2 text-gray-700 text-sm mt-2 px-3">
                        <Link
                            href={switchLocale("ar")}
                            onClick={() => setIsOpen(false)}
                            className={`${locale === "ar" ? "text-myPrimary font-bold" : "hover:text-myPrimary"}`}
                        >
                            AR
                        </Link>
                        <span>|</span>
                        <Link
                            href={switchLocale("en")}
                            onClick={() => setIsOpen(false)}
                            className={`${locale === "en" ? "text-myPrimary font-bold" : "hover:text-myPrimary"}`}
                        >
                            EN
                        </Link>
                    </div>

                    <Link
                        href={`/${locale}/joinUs`}
                        onClick={() => setIsOpen(false)}
                        className="mt-3 bg-myPrimary text-white px-4 py-2 rounded-lg text-sm font-semibold w-full text-center hover:bg-myHover transition"
                    >
                        {t("joinUs")}
                    </Link>
                </nav>
            </div>
        </header>
    );
}
