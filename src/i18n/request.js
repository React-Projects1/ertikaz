import { getRequestConfig } from 'next-intl/server';
import loadMessages from '../messages';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale || 'en';

  return {
    locale,
    messages: await loadMessages(locale)
  };
});