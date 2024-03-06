import CourtItem from "@/shared/components/CourtItem.astro";

export interface CourtItem {
  title: string;
  description: string;
  url: string;
  images: Photo[];
}

export interface Photo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  imgAlt?: string;
  id?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Route {
  label: string;
  href: string;
}

export interface Court {
  id: string;
  name: string;
  description: string;
  images: Photo[];
  features: Feature[];
  title: string;
  subtitle: string;
  littleDescription: string;
  route?: Route;
}

export interface Project {
  projectCity: string;
  projectName: string;
  shortdescription: string;
  description: string;
  projectLogo: string;
  projectsCourts: string;
  constructionYear: string;
  website: string;
  images?: Photo[];
  route?: Route;
}

export interface Country {
  country: string;
  id: string;
  coordinates: Array<number>;
  projects: Project[];
}

export interface FeatureCourt {
  TITLE: string;
  IMAGES: Photo[];
  LIST: string[];
}

export interface FirstSectionCourt {
  TITLE: string;
  DESCRIPTION: string;
}

export interface AdvantageSectionCourt {
  IMAGE: Photo;
  TITLE: string;
  ADVANTAGES: string[];
}

export interface InformationSection {
  TITLE: string;
  IMAGE: Photo;
  SUBTITLE: string;
  TEXT: string;
}

export interface ContactSection {
  TITLE?: string;
  SUBTITLE?: string;
  BUTTON: Route;
  SUBJECT?: string;
  BG_IMAGE: string;
  IMAGE: string
}

export interface CourtItem2 {
  SEO_TITLE: string;
  SEO_DESCRIPTION: string;
  ID: string;
  NAME: string;
  SUBTITLE: string;
  TITLE: string;
  DETAIL_TITLE: string;
  DESCRIPTION: string;
  LITTLE_DESCRIPTION: string;
  MORE_INFO_URL: string;
  CONTACT_TITLE_1: string;
  CONTACT_SUBJECT: string;
  CONTACT_BUTTON: string;
  URL: Route;
  FEATURE_SECTION ?: FeatureCourt;
  HOME_IMAGES: Photo[];
  FIRST_SECTION ?: FirstSectionCourt;
  ADVANTAGE_SECTION ?: AdvantageSectionCourt;
  INFORMATION_SECTION: InformationSection;
  CONTACT_SECTION: ContactSection;
  BUTTON: Route;
}