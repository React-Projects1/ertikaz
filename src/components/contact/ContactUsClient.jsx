"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import "leaflet/dist/leaflet.css";
import Hero from "@/components/shared/Hero";
import { useTranslations, useLocale } from "next-intl";

const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    { ssr: false }
);
const Popup = dynamic(
    () => import("react-leaflet").then((mod) => mod.Popup),
    { ssr: false }
);

export default function ContactUsClient() {
    const t = useTranslations("home");
    const locale = useLocale();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const L = require("leaflet");
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl:
                    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
                iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                shadowUrl:
                    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
            });
        }
    }, []);

    const offices = [
        {
            id: 1,
            name: t("office-damascus-name"),
            phone: "+963 11 3322473",
            address: t("office-damascus-address"),
            lat: 33.5163727, 
            lng: 36.2758141,
        },
    ];

    return (
        <main>
            <Hero title={t("contactUs")} button={true} />

            <h1 className="text-3xl font-bold text-myPrimary text-center mt-10 mb-6">
                {t("contactUs")}
            </h1>

            <section
                className="max-w-4xl mx-auto px-4 py-10  gap-8"
            >
                {offices.map((office) => (
                    <article
                        key={office.id}
                        className="border rounded-lg p-5 shadow-sm bg-white"
                    >
                        <h2 className="text-xl font-semibold mb-4 text-myPrimary">
                            {office.name}
                        </h2>

                        <address className="not-italic">
                            <div className="mb-1 flex items-center gap-2">
                                <Image
                                    src="/images/phone.png"
                                    alt="phoneIconAlt"
                                    width={16}
                                    height={16}
                                    className={locale === "en" ? "-scale-x-100" : ""}
                                />
                                <a
                                    href={`tel:${office.phone}`}
                                    dir="ltr"
                                    className="text-left hover:text-mySecondary transition"
                                >
                                    {office.phone}
                                </a>
                            </div>

                            <div className="mb-6 flex items-center gap-2">
                                <Image
                                    src="/images/location.png"
                                    alt="locationIconAlt"
                                    width={16}
                                    height={16}
                                />
                                <span>{office.address}</span>
                            </div>
                        </address>

                        <div className="h-96 mb-3 rounded overflow-hidden relative z-0">
                            <MapContainer
                                center={[office.lat, office.lng]}
                                zoom={15}
                                // scrollWheelZoom={false}
                                className="h-full w-full"
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution="© OpenStreetMap contributors"
                                />
                                <Marker position={[office.lat, office.lng]}>
                                    <Popup>{office.name}</Popup>
                                </Marker>
                            </MapContainer>

                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${office.lat},${office.lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`عرض موقع ${office.name} على خريطة Google`}
                                className="absolute bottom-0 left-0 right-0 z-[1000] text-center bg-white/80 text-myPrimary font-semibold hover:text-mySecondary transition py-2 text-sm"
                            >
                                {t("view")}
                            </a>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}
