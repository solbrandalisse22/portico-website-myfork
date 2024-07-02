import english from './en.json'
import spanish from './es.json'
import french from './fr.json'
import italian from './it.json'
import german from './de.json'
import EnglishCountriesList from './en-countries-list.json'
import ItalianCountriesList from './en-countries-list.json'
import SpanishCountriesList from './en-countries-list.json'
import FrenchCountriesList from './en-countries-list.json'
import GermanCountriesList from './en-countries-list.json'
import { LANGUAGES } from './constants'

export const getI18N = ({
  language = LANGUAGES.DEFAULT
}: {
  language: string | undefined
}) => {
  if (LANGUAGES[language.toUpperCase()] === 'en') return english
  if (LANGUAGES[language.toUpperCase()] === 'es') return spanish
  if (LANGUAGES[language.toUpperCase()] === 'fr') return french
  if (LANGUAGES[language.toUpperCase()] === 'it') return italian
  if (LANGUAGES[language.toUpperCase()] === 'de') return german
  return english
}

export const getCurrentLocale = ({
  language = LANGUAGES.DEFAULT
}: {
  language: string | undefined
}) => LANGUAGES[language.toUpperCase()] || LANGUAGES.DEFAULT

export const getCategoryByLanguage = ({
  language = LANGUAGES.DEFAULT
}: {
  language: string | undefined
}) => {
  if (LANGUAGES[language.toUpperCase()] === 'en') return 51
  if (LANGUAGES[language.toUpperCase()] === 'it') return 60
  if (LANGUAGES[language.toUpperCase()] === 'fr') return 61
  if (LANGUAGES[language.toUpperCase()] === 'es') return 59
  if (LANGUAGES[language.toUpperCase()] === 'de') return 62
  return 1
}

export const getCountryListByLanguage = ({
  language = LANGUAGES.DEFAULT
}: {
  language: string | undefined
}) => {
  if (LANGUAGES[language.toUpperCase()] === 'it') return ItalianCountriesList
  if (LANGUAGES[language.toUpperCase()] === 'fr') return FrenchCountriesList
  if (LANGUAGES[language.toUpperCase()] === 'es') return SpanishCountriesList
  if (LANGUAGES[language.toUpperCase()] === 'fr') return EnglishCountriesList
  if (LANGUAGES[language.toUpperCase()] === 'de') return GermanCountriesList
  return EnglishCountriesList
}

export const getCustomPages = async ({
  language = LANGUAGES.DEFAULT
}: {
  language: string | undefined
}) => {
  // get post from 'portico.porticosport.com'
  const category = getCategoryByLanguage({ language })
  const i18n = getI18N({ language })
  const res = await fetch(`https://portico.porticosport.com/wp-json/wp/v2/posts?categories=${category}&per_page=100`);
  const posts = await res.json();
  const initialUrl = i18n.PAGES.NEWS.ROUTE.URL;
  return posts.map((post: { slug: string }) => `${i18n.SITE}${initialUrl}/${post.slug}`);
}