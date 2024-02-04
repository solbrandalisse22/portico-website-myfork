import english from './en.json'
import spanish from './es.json'
import { LANGUAGES } from './constants'

export const getI18N = ({
  language = LANGUAGES.DEFAULT
}: {
  language: string | undefined
}) => {
  console.log('language: ', LANGUAGES[language.toUpperCase()])
  if (LANGUAGES[language.toUpperCase()] === 'en') return english;
  if (LANGUAGES[language.toUpperCase()] === 'es') return spanish
  return english
}

export const getCurrentLocale = ({
  language = LANGUAGES.DEFAULT
}: {
  language: string | undefined
}) => LANGUAGES[language.toUpperCase()] || LANGUAGES.DEFAULT
