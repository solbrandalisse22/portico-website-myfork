interface ILanguages {
  [key: string]: string
}

export const LANGUAGES = {
  'localhost:4321': 'en',
  'localhost:4322': 'es',
  'portico-multicountry-web-adominguez.vercel.app': 'en',
  'portico-multicountry-web.vercel.app': 'es',
  DEFAULT: 'en',
} as ILanguages