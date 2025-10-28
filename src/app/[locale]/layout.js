import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export default async function LocaleLayout({ children, params }) {

  const { locale } = await params;

  if (!['en', 'ar'].includes(locale)) {
    notFound();
  }

  const messages = await getMessages(locale);

  return (
    <div style={{
      fontFamily: locale === 'ar' ? "'Almarai', Tahoma, Arial, sans-serif" : "'Roboto', Arial, sans-serif",
      direction: locale === 'ar' ? 'rtl' : 'ltr',
      minHeight: '100vh'
    }}>
      <NextIntlClientProvider messages={messages}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}

export async function generateMetadata({ params }) {
  const { locale } = params;

  return {
    title: 'Ertikaz',
    icons: {
      icon: '/images/logo.png',
    },
    description: locale === 'ar'
      ? 'مكتب إرتكاز للمحاماة في سوريا يقدم استشارات قانونية وتمثيل القضايا وحماية حقوق العملاء بكفاءة ومهنية.'
      : 'Ertikaz Law Firm in Syria offers expert legal consultations, case representation, and protection of clients’ rights with professionalism.',
    keywords: ['محاماة', 'مكتب محاماة', 'استشارات قانونية', 'تمثيل قضايا', 'إرتكاز', 'Syria Law Firm'],
    openGraph: {
      title: locale === 'ar' ? 'مكتب إرتكاز للمحاماة | Ertikaz' : 'Ertikaz Law Firm',
      description: locale === 'ar'
        ? 'مكتب إرتكاز للمحاماة في سوريا يقدم استشارات قانونية وتمثيل القضايا وحماية حقوق العملاء بكفاءة ومهنية.'
        : 'Ertikaz Law Firm in Syria offers expert legal consultations, case representation, and protection of clients’ rights with professionalism.',
      url: `https://irtikaz.com/${locale}`,
      siteName: 'Ertikaz',
      locale: locale === 'ar' ? 'ar_AR' : 'en_US',
      type: 'website',
    },
  };
}

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ar' }
  ];
}
