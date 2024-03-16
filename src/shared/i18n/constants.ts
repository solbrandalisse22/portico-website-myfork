import { type CourtItem } from "@/types/types";

interface ILanguages {
  [key: string]: string
}

export const LANGUAGES = {
  EN: 'en',
  ES: 'es',
  FR: 'fr',
  IT: 'it',
  DEFAULT: 'en',
} as ILanguages

export const courtsGrid = (i18n: any) => {
  return [
    {
      title: i18n.PAGES.COURTS.COURT1.TITLE,
      description: i18n.PAGES.COURTS.COURT1.LITTLE_DESCRIPTION,
      url: i18n.PAGES.COURTS.COURT1.ROUTE.URL,
      label: i18n.PAGES.COURTS.COURT1.ROUTE.LABEL,
      image: {
        src: i18n.PAGES.COURTS.COURT1.CONTACT_SECTION.IMAGE,
        alt: i18n.PAGES.COURTS.COURT1.NAME,
      }
    },
    {
      title: i18n.PAGES.COURTS.COURT2.TITLE,
      description: i18n.PAGES.COURTS.COURT2.LITTLE_DESCRIPTION,
      url: i18n.PAGES.COURTS.COURT2.ROUTE.URL,
      label: i18n.PAGES.COURTS.COURT2.ROUTE.LABEL,
      image: {
        src: i18n.PAGES.COURTS.COURT2.CONTACT_SECTION.IMAGE,
        alt: i18n.PAGES.COURTS.COURT2.NAME,
      }
    },
    {
      title: i18n.PAGES.COURTS.COURT3.TITLE,
      description: i18n.PAGES.COURTS.COURT3.LITTLE_DESCRIPTION,
      url: i18n.PAGES.COURTS.COURT3.ROUTE.URL,
      label: i18n.PAGES.COURTS.COURT3.ROUTE.LABEL,
      image: {
        src: i18n.PAGES.COURTS.COURT3.CONTACT_SECTION.IMAGE,
        alt: i18n.PAGES.COURTS.COURT3.NAME,
      }
    },
    {
      title: i18n.PAGES.COURTS.COURT4.TITLE,
      description: i18n.PAGES.COURTS.COURT4.LITTLE_DESCRIPTION,
      url: i18n.PAGES.COURTS.COURT4.ROUTE.URL,
      label: i18n.PAGES.COURTS.COURT4.ROUTE.LABEL,
      image: {
        src: i18n.PAGES.COURTS.COURT4.CONTACT_SECTION.IMAGE,
        alt: i18n.PAGES.COURTS.COURT4.NAME,
      }
    },
    {
      title: i18n.PAGES.COURTS.COURT5.TITLE,
      description: i18n.PAGES.COURTS.COURT5.LITTLE_DESCRIPTION,
      url: i18n.PAGES.COURTS.COURT5.ROUTE.URL,
      label: i18n.PAGES.COURTS.COURT5.ROUTE.LABEL,
      image: {
        src: i18n.PAGES.COURTS.COURT5.CONTACT_SECTION.IMAGE,
        alt: i18n.PAGES.COURTS.COURT5.NAME,
      }
    },
    {
      title: i18n.PAGES.COURTS.COURT6.TITLE,
      description: i18n.PAGES.COURTS.COURT6.LITTLE_DESCRIPTION,
      url: i18n.PAGES.COURTS.COURT6.ROUTE.URL,
      label: i18n.PAGES.COURTS.COURT6.ROUTE.LABEL,
      image: {
        src: i18n.PAGES.COURTS.COURT6.CONTACT_SECTION.IMAGE,
        alt: i18n.PAGES.COURTS.COURT6.NAME,
      }
    },
    {
      title: i18n.PAGES.COURTS.COURT7.TITLE,
      description: i18n.PAGES.COURTS.COURT7.LITTLE_DESCRIPTION,
      url: i18n.PAGES.COURTS.COURT7.ROUTE.URL,
      label: i18n.PAGES.COURTS.COURT7.ROUTE.LABEL,
      image: {
        src: i18n.PAGES.COURTS.COURT7.CONTACT_SECTION.IMAGE,
        alt: i18n.PAGES.COURTS.COURT7.NAME,
      }
    },
    {
      title: i18n.PAGES.COURTS.COURT8.TITLE,
      description: i18n.PAGES.COURTS.COURT8.LITTLE_DESCRIPTION,
      url: i18n.PAGES.COURTS.COURT8.ROUTE.URL,
      label: i18n.PAGES.COURTS.COURT8.ROUTE.LABEL,
      image: {
        src: i18n.PAGES.COURTS.COURT8.CONTACT_SECTION.IMAGE,
        alt: i18n.PAGES.COURTS.COURT8.NAME,
      }
    }
  ] as CourtItem[];
}