import React from "react";
import { serviceDataList } from "../../../../../data/serviceData";
import { useTranslations, useLocale } from "next-intl";

export const metadata = {
    title: " خدماتنا | Ertikaz",
    description: "اكتشف خدمات مكتب إرتكاز للمحاماة في سوريا، بدءًا من الاستشارات القانونية المتخصصة وصولًا إلى تمثيل القضايا أمام المحاكم، لضمان حماية حقوقك ومصالحك القانونية بكفاءة ومهنية.",
    alternates: {
        languages: {
            en: "/en/service",
            ar: "/ar/service",
        },
    },
};

const ServicePage = ({ params }) => {
    const serviceId = parseInt(params.id, 10);
    const t = useTranslations("service");
    const locale = useLocale();

    const service = serviceDataList.find((s) => s.id === serviceId);
    if (!service) return <p>Service not found</p>;

    return (
        <>
            <main
                className="max-w-7xl mx-auto p-6 mt-16 md:mt-24 mb-6 min-h-[55vh] flex items-center"
                dir={locale === "ar" ? "rtl" : "ltr"}
            >
                <section className="flex flex-col lg:flex-row-reverse gap-8 lg:items-stretch">
                    <article className="lg:w-2/3 flex flex-col lg:order-1">
                        <div className="text-lg leading-relaxed text-gray-700 flex-1">
                            <div className="flex-shrink-0 w-24 mb-2">
                                <img
                                    src="/images/logo3.png"
                                    alt="Logo مكتب إرتكاز للمحاماة"
                                    className="w-full"
                                />
                            </div>

                            <h1 className="text-4xl font-bold mb-8 text-myPrimary">
                                {t(service.titleKey)}
                            </h1>

                            <p className="mb-2 text-[16px] text-textPrimary text-justify">
                                {t(service.descriptionKey)}
                            </p>


                            {service.listItemsKeys?.length > 0 && (
                                <ul
                                    className={`space-y-2 mb-4 text-[16px] text-textPrimary text-justify ${locale == 'ar' ? 'pr-6' : 'pl-6'
                                        }`}
                                >
                                    {service?.listItemsKeys.map((key, index) => (
                                        <li key={index}>
                                            - {t(key)}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div className="mb-2 text-[16px] text-textPrimary text-justify">
                                {service.descriptionKey2 && (
                                    <p className="mb-2 text-[16px] text-textPrimary  text-justify">
                                        {t(service.descriptionKey2)}
                                    </p>
                                )}
                            </div>

                        </div>
                    </article>

                    <aside className="w-full lg:w-1/3 flex justify-center lg:order-2">
                        <div className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-full h-full rounded-lg overflow-hidden shadow-xl">
                            <img
                                className="w-full h-full object-cover"
                                src={service.img}
                                alt={service.titleKey}
                            />
                        </div>
                    </aside>
                </section>
            </main>
        </>
    );
};

export default ServicePage;
