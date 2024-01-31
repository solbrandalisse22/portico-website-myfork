interface ILanguages {
  [key: string]: string
}

export const LANGUAGES = {
  'localhost:4321': 'en',
  'localhost:4322': 'es',
  DEFAULT: 'en',
} as ILanguages