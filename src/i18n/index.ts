import english from './en.json'
import spanish from './es.json'
import { LANGUAGES } from './constants'

export const getI18N = ({
  host = LANGUAGES.DEFAULT
}: {
  host: string | undefined
}) => {
  if (LANGUAGES[host] === 'en') return english
  if (LANGUAGES[host] === 'es') return spanish
  return english
}

export const getCurrentLocale = ({
  host = LANGUAGES.DEFAULT
}: {
  host: string | undefined
}) => LANGUAGES[host] || LANGUAGES.DEFAULT
