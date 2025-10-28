const loadMessages = async (locale) => {
    const messages = {};

    const pages = ['home', 'service', 'aboutUs', 'joinUs'];

    for (const page of pages) {
        try {
            const pageMessages = (await import(`./${locale}/${page}.json`)).default;
            Object.assign(messages, pageMessages);
        } catch (error) {
            console.warn(`ملف ${page} غير موجود للغة ${locale}`);
        }
    }

    return messages;
};

export default loadMessages;