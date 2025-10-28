import ContactUsClient from "@/components/contact/ContactUsClient";

export const metadata = {
    title: "اتصل بنا | Ertikaz",
    description:
        "تعرّف على مكاتب Ertikaz في دمشق وريف دمشق، وتواصل معنا عبر الهاتف أو زر موقعنا على الخريطة.",
    alternates: {
        languages: {
            en: "/en/contact",
            ar: "/ar/contact",
        },
    },
};

export default function ContactUsPage() {
    return <ContactUsClient />;
}
