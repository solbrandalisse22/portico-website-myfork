import { type CourtItem } from "@/types/types";

interface ILanguages {
  [key: string]: string
}

export const LANGUAGES = {
  EN: 'en',
  ES: 'es',
  FR: 'fr',
  IT: 'it',
  DE: 'de',
  DEFAULT: 'en',
} as ILanguages

export const courtsGrid = (i18n: any) => {
  return [
    {
      title: i18n.PAGES.MOBILE_COURT.TITLE,
      description: i18n.PAGES.MOBILE_COURT.LITTLE_DESCRIPTION,
      url: i18n.PAGES.MOBILE_COURT.ROUTE.URL,
      label: i18n.PAGES.MOBILE_COURT.ROUTE.LABEL,
      more: i18n.PAGES.MOBILE_COURT.ROUTE.LABEL,
      image: {
        src: i18n.PAGES.MOBILE_COURT.CONTACT_SECTION.IMAGE,
        alt: i18n.PAGES.MOBILE_COURT.NAME,
      }
    },
    {
      title: i18n.PAGES.FLOW_COURT.TITLE,
      description: i18n.PAGES.FLOW_COURT.LITTLE_DESCRIPTION,
      url: i18n.PAGES.FLOW_COURT.ROUTE.URL,
      label: i18n.PAGES.FLOW_COURT.ROUTE.LABEL,
      more: i18n.PAGES.FLOW_COURT.ROUTE.LABEL,
      image: {
        src: i18n.PAGES.FLOW_COURT.CONTACT_SECTION.IMAGE,
        alt: i18n.PAGES.FLOW_COURT.NAME,
      }
    },
    {
      title: i18n.PAGES.PANORAMIC_COURT.TITLE,
      description: i18n.PAGES.PANORAMIC_COURT.LITTLE_DESCRIPTION,
      url: i18n.PAGES.PANORAMIC_COURT.ROUTE.URL,
      label: i18n.PAGES.PANORAMIC_COURT.ROUTE.LABEL,
      more: i18n.PAGES.PANORAMIC_COURT.ROUTE.LABEL,
      image: {
        src: i18n.PAGES.PANORAMIC_COURT.CONTACT_SECTION.IMAGE,
        alt: i18n.PAGES.PANORAMIC_COURT.NAME,
      }
    },
    {
      title: i18n.PAGES.CLUB_COURT.TITLE,
      description: i18n.PAGES.CLUB_COURT.LITTLE_DESCRIPTION,
      url: i18n.PAGES.CLUB_COURT.ROUTE.URL,
      label: i18n.PAGES.CLUB_COURT.ROUTE.LABEL,
      more: i18n.PAGES.CLUB_COURT.ROUTE.LABEL,
      image: {
        src: i18n.PAGES.CLUB_COURT.CONTACT_SECTION.IMAGE,
        alt: i18n.PAGES.CLUB_COURT.NAME,
      }
    },
    {
      title: i18n.PAGES.CLUB_PLUS_COURT.TITLE,
      description: i18n.PAGES.CLUB_PLUS_COURT.LITTLE_DESCRIPTION,
      url: i18n.PAGES.CLUB_PLUS_COURT.ROUTE.URL,
      label: i18n.PAGES.CLUB_PLUS_COURT.ROUTE.LABEL,
      more: i18n.PAGES.CLUB_PLUS_COURT.ROUTE.LABEL,
      image: {
        src: i18n.PAGES.CLUB_PLUS_COURT.CONTACT_SECTION.IMAGE,
        alt: i18n.PAGES.CLUB_PLUS_COURT.NAME,
      }
    },
    {
      title: i18n.PAGES.CLUB_FORCE_80_COURT.TITLE,
      description: i18n.PAGES.CLUB_FORCE_80_COURT.LITTLE_DESCRIPTION,
      url: i18n.PAGES.CLUB_FORCE_80_COURT.ROUTE.URL,
      label: i18n.PAGES.CLUB_FORCE_80_COURT.ROUTE.LABEL,
      more: i18n.PAGES.CLUB_FORCE_80_COURT.ROUTE.LABEL,
      image: {
        src: i18n.PAGES.CLUB_FORCE_80_COURT.CONTACT_SECTION.IMAGE,
        alt: i18n.PAGES.CLUB_FORCE_80_COURT.NAME,
      }
    },
    {
      title: i18n.PAGES.PANORAMIC_FORCE_80_COURT.TITLE,
      description: i18n.PAGES.PANORAMIC_FORCE_80_COURT.LITTLE_DESCRIPTION,
      url: i18n.PAGES.PANORAMIC_FORCE_80_COURT.ROUTE.URL,
      label: i18n.PAGES.PANORAMIC_FORCE_80_COURT.ROUTE.LABEL,
      more: i18n.PAGES.PANORAMIC_FORCE_80_COURT.ROUTE.LABEL,
      image: {
        src: i18n.PAGES.PANORAMIC_FORCE_80_COURT.CONTACT_SECTION.IMAGE,
        alt: i18n.PAGES.PANORAMIC_FORCE_80_COURT.NAME,
      }
    },
    {
      title: i18n.PAGES.SINGLE_COURT.TITLE,
      description: i18n.PAGES.SINGLE_COURT.LITTLE_DESCRIPTION,
      url: i18n.PAGES.SINGLE_COURT.ROUTE.URL,
      label: i18n.PAGES.SINGLE_COURT.ROUTE.LABEL,
      more: i18n.PAGES.SINGLE_COURT.ROUTE.LABEL,
      image: {
        src: i18n.PAGES.SINGLE_COURT.CONTACT_SECTION.IMAGE,
        alt: i18n.PAGES.SINGLE_COURT.NAME,
      }
    },
    {
      title: i18n.PAGES.MINI_COURT.TITLE,
      description: i18n.PAGES.MINI_COURT.LITTLE_DESCRIPTION,
      url: i18n.PAGES.MINI_COURT.ROUTE.URL,
      label: i18n.PAGES.MINI_COURT.ROUTE.LABEL,
      more: i18n.PAGES.MINI_COURT.ROUTE.LABEL,
      image: {
        src: i18n.PAGES.MINI_COURT.CONTACT_SECTION.IMAGE,
        alt: i18n.PAGES.MINI_COURT.NAME,
      }
    }
  ] as CourtItem[];
}