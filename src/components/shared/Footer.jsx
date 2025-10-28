import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from "next-intl";

const Footer = () => {
    const t = useTranslations("home");
    const locale = useLocale();

    const quickLinks = [
        { name: t('footer.quickLinks.ourServices'), href: `/${locale}/` },
        { name: t('footer.quickLinks.aboutUs'), href: `/${locale}/aboutUs` },
        { name: t('footer.quickLinks.contactUs'), href: `/${locale}/contactUs` },
    ];

    const services = [
        { name: t('footer.services.litigation') },
        { name: t('footer.services.companyServices') },
        { name: t('footer.services.foreignTrainees') },
        { name: t('footer.services.contracts') },
        { name: t('footer.services.consulting') },
        { name: t('footer.services.commercialCases') },
    ];
    
    const socialMedia = [
        { icon: '/images/youtube.svg', alt: 'youtube', href: 'https://www.youtube.com/@ErtikazLawfirm' },
        { icon: '/images/twitter.png', alt: 'Twitter', href: 'https://x.com/ertikazlawfirm?s=11' },
        { icon: '/images/instagram.png', alt: 'Instagram', href: 'https://www.instagram.com/ertikazlawfirm?igsh=a2wzZGtvOWducnJm' },
        { icon: '/images/facebook.png', alt: 'Facebook', href: 'https://www.facebook.com/share/1A2ZjxBwb5/?mibextid=wwXIfr' },
    ];

    return (
        <footer className="w-full">
            <div className='text-white py-12 px-6 lg:px-20 bg-myPrimary'>
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              
                    <div className="flex flex-col items-center justify-center md:items-start md:justify-start col-span-1">
                        <div className="mb-4 w-32 h-32 relative">
                            <Image
                                src="/images/logo2.png"
                                alt="Logo"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="flex items-center gap-4 mt-4">
                            {socialMedia.map((item) => (
                                <a
                                    key={item.alt}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 transition"
                                >
                                    <div className="w-5 h-5 relative">
                                        <Image
                                            src={item.icon}
                                            alt={item.alt}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
   
                    <div className="col-span-1">
                        <h4 className="text-lg font-bold text-mySecondary mb-4">
                            {t('footer.quickLinks.title')}
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-mySecondary transition"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h4 className="text-lg font-bold text-mySecondary mb-4">
                            {t('footer.services.title')}
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {services.map((link) => (
                                <li key={link.name}>
                                    <p>{link.name}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-1 hidden md:block"></div>
                </div>
            </div>

            <div className='text-center text-sm text-white py-3 bg-mySecondary'>
                <div className="max-w-7xl mx-auto px-6">
                    <p>{t('footer.copyRight', { year: new Date().getFullYear() })}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
