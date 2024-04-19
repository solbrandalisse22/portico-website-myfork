import english from './en.json'
import spanish from './es.json'
import french from './fr.json'
import italian from './it.json'
import EnglishCountriesList from './en-countries-list.json'
import ItalianCountriesList from './en-countries-list.json'
import SpanishCountriesList from './en-countries-list.json'
import FrenchCountriesList from './en-countries-list.json'
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
  if (LANGUAGES[language.toUpperCase()] === 'en') return 3
  if (LANGUAGES[language.toUpperCase()] === 'it') return 12
  if (LANGUAGES[language.toUpperCase()] === 'fr') return 13
  if (LANGUAGES[language.toUpperCase()] === 'es') return 1
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
  return EnglishCountriesList
}