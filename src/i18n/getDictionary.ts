import 'server-only';
import { Locale } from './config';
import { id } from './dictionaries/id';
import { en } from './dictionaries/en';
import { Dictionary } from './types';

const dictionaries = {
  id: () => id,
  en: () => en,
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]?.() ?? dictionaries.id();
};
