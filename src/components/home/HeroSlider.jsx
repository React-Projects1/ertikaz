"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function HeroSlider({ locale }) {
  const t = useTranslations("home");
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      title: t("slide-1-title"),
      description: t("slide-1-desc"),
      img: "/images/hero-1.jpg",
    },
    {
      id: 2,
      title: t("slide-2-title"),
      description: t("slide-2-desc"),
      img: "/images/hero-2.jpg",
    },
    {
      id: 3,
      title: t("slide-3-title"),
      description: t("slide-3-desc"),
      img: "/images/hero-3.jpg",
    },
  ];

  const titleWords = slides[currentIndex].title.split(" ");
  const descWords = slides[currentIndex].description.split(" ");
 
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, (titleWords.length + descWords.length) * 300 + 6000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <section className="relative w-full h-screen md:h-[100vh]">
      <div className="relative w-full h-full overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
     
            <Image
              src={slide.img}
              alt={slide.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60"></div>
          
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 md:px-12">

              <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 relative mb-6">
                <Image
                  src="/images/logo2.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
    
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 max-w-xl sm:max-w-3xl md:max-w-4xl">
                {titleWords.map((word, i) => (
                  <motion.span
                    key={`${currentIndex}-title-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.3, duration: 0.5 }}
                    className="inline-block mr-2"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
        
              <p className="text-sm sm:text-base md:text-lg mb-8 max-w-md sm:max-w-2xl md:max-w-2xl">
                {descWords.map((word, i) => (
                  <motion.span
                    key={`${currentIndex}-desc-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: titleWords.length * 0.3 + i * 0.3,
                      duration: 0.5,
                    }}
                    className="inline-block mr-2"
                  >
                    {word}
                  </motion.span>
                ))}
              </p>

              <div className="flex gap-2 sm:gap-3 justify-center items-center mb-6">
                {slides.map((_, idx) => (
                  <span
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`cursor-pointer transition-all duration-500 ease-in-out transform ${
                      currentIndex === idx
                        ? "bg-mySecondary w-6 h-2 rounded-full scale-110"
                        : "bg-white w-3 h-3 rounded-full scale-100 hover:scale-125"
                    }`}
                  ></span>
                ))}
              </div>
     
              <a
                href="https://wa.me/+963996543219"
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-mySecondary hover:bg-myHover text-white px-6 sm:px-8 py-3 rounded-full text-sm sm:text-lg font-semibold flex items-center gap-2 transition-colors duration-300 ${
                  locale === "ar" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <Phone fill="white" className="w-4 sm:w-5 h-4 sm:h-5" />
                <span>{t("contactUs")}</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
