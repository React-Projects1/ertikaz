"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import Head from "next/head";
import { useTranslations, useLocale } from "next-intl";

const Services = () => {
    const t = useTranslations("home");
    const locale = useLocale();

    const data = [
        { id: 1, img: "/images/ser-1.jpg", title: t("service-1-title"), description: t("service-1-desc") },
        { id: 2, img: "/images/ser-2.jpg", title: t("service-2-title"), description: t("service-2-desc") },
        { id: 3, img: "/images/ser-3.png", title: t("service-3-title"), description: t("service-3-desc") },
        { id: 4, img: "/images/ser-4.jpg", title: t("service-4-title"), description: t("service-4-desc") },
        { id: 5, img: "/images/ser-5.png", title: t("service-5-title"), description: t("service-5-desc") },
        { id: 6, img: "/images/ser-6.jpg", title: t("service-6-title"), description: t("service-6-desc") },
    ];

    return (
        <>
      
            <Head>
                <title>خدماتنا القانونية | إرتكاز</title>
                <meta
                    name="description"
                    content="اكتشف خدمات مكتب إرتكاز للمحاماة في سوريا، بدءًا من الاستشارات القانونية المتخصصة وصولًا إلى تمثيل القضايا أمام المحاكم، لضمان حقوقك وحماية مصالحك القانونية."
                />
                <meta name="keywords" content="خدمات قانونية, محاماة سوريا, استشارات قانونية, تمثيل قانوني, إرتكاز للمحاماة, قوانين وعقود, مكتب محاماة سوريا" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`https://irtikaz.com/${locale}/services`} />
            </Head>

            <section className="flex flex-wrap justify-center gap-8 sm:gap-5 md:gap-y-8 lg:px-14">
                {data.map((item) => (
                    <article
                        key={item.id}
                        className="w-[90%] sm:w-[48%] md:w-[45%] lg:w-[30%] mx-auto bg-white rounded-xl shadow-sm overflow-hidden border"
                        dir={locale === "ar" ? "rtl" : "ltr"}
                    >
                        <figure className="h-48 overflow-hidden">
                            <Image
                                src={item.img}
                                alt={item.title}
                                width={400}
                                height={300}
                                className="w-full h-full object-cover"
                            />
                            <figcaption className="sr-only">{item.title}</figcaption>
                        </figure>

                        <div className="p-4 text-center">
                            <h3 className="text-xl font-semibold text-myPrimary mb-3">{item.title}</h3>
                            <p className="text-textPrimary mb-5 leading-relaxed">{item.description}</p>

                            <Link
                                href={`/${locale}/services/${item.id}`}
                                className="flex justify-center items-center text-mySecondary font-semibold hover:text-myHover text-sm gap-2"
                            >
                                <span>{t("more")}</span>
                                <ChevronLeft className={`w-4 h-4 ${locale === "ar" ? "scale-x-100" : "-scale-x-100"}`} />
                            </Link>
                        </div>
                    </article>
                ))}
            </section>
        </>
    );
};

export default Services;
