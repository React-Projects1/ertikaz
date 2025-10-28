import Hero from '@/components/shared/Hero';
import React from 'react';
import { useTranslations, useLocale } from "next-intl";

export const metadata = {
    title: "من نحن | Ertikaz",
    description:"تعرّف على مكتب إرتكاز للمحاماة في سوريا، واكتشف خبرتنا في تقديم الاستشارات القانونية وتمثيل القضايا وحماية حقوق عملائنا. تعرف على فريقنا وقيمنا وتواصل معنا بسهولة.",
    alternates: {
        languages: {
            en: "/en/aboutUs",
            ar: "/ar/aboutUs",
        },
    },
};

const AboutUsPage = () => {

    const t = useTranslations("aboutUs");

    const paragraphs = [1, 2, 3, 4].map((id) => ({
        id,
        title: t(`about-${id}-title`),
        content: t(`about-${id}-desc`),
        img: id === 3 ? '/images/about-3.png' : `/images/about-${id}.jpg`
    }));

    return (
        <div>
            <Hero
                title={t("heroTitle")}
                desc={t("heroDesc")}
            />

            {paragraphs.map(item => (
                <article
                    key={item.id}
                    className={`${item.id === 2 ? "bg-[#CCAA6F33]" : "container mx-auto py-12 px-4 flex flex-col justify-center md:px-32"}`}
                >
                    <div className={`${item.id === 2 ? "max-w-6xl mx-auto py-8 px-4 md:px-20" : "max-w-6xl mx-auto"}`}>
                        <div className={`flex flex-col gap-20 items-center ${item.id % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>

                            <div className="lg:flex-1 space-y-6 text-myPrimary text-xl leading-relaxed">
                                <h3 className={`py-2 px-6 font-semibold bg-[#BC9E6A52] inline-block rounded-lg shadow-sm ${item.id === 2 ? "text-primary bg-[#CCAA6F33]" : ""}`}>
                                    {item.title}
                                </h3>
                                <p className="whitespace-pre-line text-[16px] font-normal text-textPrimary">
                                    {item.content}
                                </p>
                            </div>

                            <div className="w-full sm:w-[500px] lg:w-[35%] flex-shrink-0">
                                <div className="rounded-lg overflow-hidden shadow-lg">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className={`w-full object-cover ${item.id === 1 ? "lg:h-auto h-72" : "h-72 lg:h-80"}`}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default AboutUsPage;
