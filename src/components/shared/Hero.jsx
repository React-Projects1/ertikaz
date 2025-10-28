import Image from 'next/image';
import React from 'react';
import { useTranslations, useLocale } from "next-intl";
import { Phone } from 'lucide-react';

const Hero = ({ title, button = false }) => {

    const t = useTranslations("home");
    const locale = useLocale();

    const handleEmailClick = () => {
        window.location.href = "mailto:ERTIKAZLAWFIRM@GMAIL.COM?subject=استفسار%20قانوني";
    };

    return (
        <section dir="ltr" className="relative w-full h-screen md:h-[75vh] ">
            <div className="overflow-hidden w-full h-full ">
                <div className="flex">
                    <div className="relative min-w-full h-screen md:h-[75vh] mt-5">
                        <img src="/images/hero.jpg" alt="Logo" className="w-full h-full
                         object-cover object-center" />
                        <div className="absolute inset-0 bg-black/60 z-5"></div>

                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 md:px-12 z-10">
                            <div className=" w-20 lg:w-28 relative mb-3">

                                <img src="/images/logo2.png" alt="Logo"
                                    className="w-full h-full object-contain" />
                            </div>

                            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 max-w-xl sm:max-w-3xl md:max-w-4xl">
                                {title}
                            </h1>
                            <p className="text-sm sm:text-base md:text-lg mb-8 max-w-md sm:max-w-2xl md:max-w-2xl">
                                {t('heroDesc')}
                            </p>

                            {button && (
                                <div className="flex flex-wrap justify-center items-center gap-3">

                                    <a
                                        href={`https://mail.google.com/mail/?view=cm&to=ERTIKAZLAWFIRM@GMAIL.COM`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`bg-mySecondary hover:bg-myHover text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold flex items-center justify-center gap-2 transition-colors duration-300 ${locale === "ar" ? "flex-row-reverse" : "flex-row"}`}
                                    >
                                        <img
                                            className={`w-5 h-5 object-contain ${locale === "ar" ? "-scale-x-100" : ""}`}
                                            src="/images/email.png"
                                            alt="email"
                                        />
                                        <span className="leading-none">ERTIKAZLAWFIRM@GMAIL.COM</span>
                                    </a>

                                    <a
                                        href="https://wa.me/+963996543219"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`bg-mySecondary hover:bg-myHover text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold flex items-center justify-center gap-2 transition-colors duration-300 ${locale === "ar" ? "flex-row-reverse" : "flex-row"}`}
                                    >
                                        <Phone
                                            fill="white"
                                            className={`w-5 h-5 ${locale === "ar" ? "-scale-x-100" : ""}`}
                                        />
                                        <span className="leading-none">+963996543219</span>
                                    </a>
                                </div>

                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
