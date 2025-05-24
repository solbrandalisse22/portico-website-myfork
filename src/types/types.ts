import CourtItem from "@/shared/components/CourtItem.astro";

export interface Review {
  autor: string,
  review: string
}

export interface Photo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  imgAlt?: string;
  id?: string;
}
export interface CourtItem {
  title: string;
  description: string;
  url: string;
  images?: Photo[];
  image?: Photo;
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
  SUBTITLE: string;
  DESCRIPTION?: string;
  IMAGES: Photo[];
  LIST: string[];
}

export interface FirstSectionCourt {
  ID: string;
  TITLE: string;
  DESCRIPTION: string;
  IMAGES: {
    FRONT: Photo;
    PERSPECTIVE: Photo;
    TOP: Photo;
  };
}

export interface AdvantageSectionCourt {
  IMAGE: Photo;
  TITLE: string;
  ADVANTAGES: string[];
}

export interface Benefit {
  header: string;
  icon: string;
  footer: string;
}
export interface BenefitsSectionCourt {
  ID: string;
  TITLE: string;
  BENEFITS: Benefit[];
}

export interface SizingSectionCourt {
  ID: string;
  TITLE: string;
  INDOOR_TITLE: string;
  OUTDOOR_TITLE: string;
  DESCRIPTION?: string;
  OUTDOOR: string;
  INDOOR: string;
  IMAGE: Photo;
}

export interface InformationSection {
  ID?: string;
  TITLE: string;
  IMAGE: Photo;
  SUBTITLE?: string;
  TEXT?: string;
  DESCRIPTION?: string;
  BUTTON?: Route;
}

export interface GallerySection {
  ID: string;
  TITLE: string;
  IMAGES: Photo[];
  BUTTON_TEXT: string;
}

export interface InstallationSection {
  ID: string;
  TITLE: string;
  DESCRIPTION: string
}

export interface CostSection {
  ID: string;
  TITLE: string;
  DESCRIPTION: string
}

export interface ContactSection {
  ID: string;
  TITLE?: string;
  SUBTITLE?: string;
  BUTTON?: Route;
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
  GALLERY_SECTION?: GallerySection;
  BUTTON: Route;
}

export interface SizingType {
  base: string,
  responsive: string
}

export interface Sizing {
  small: SizingType;
  medium: SizingType;
  large: SizingType;
}

export interface TypograghyTags {
  h1: {
    extra: string,
    size: Sizing
  },
  h2: {
    extra: string,
    size: Sizing
  },
  h3: {
    extra: string,
    size: Sizing
  },
  h4: {
    extra: string,
    size: Sizing
  },
  h5: {
    extra: string,
    size: Sizing
  },
  h6: {
    extra: string,
    size: Sizing
  },
  p: {
    extra: string,
    size: Sizing
  },
  span: {
    extra: string,
    size: Sizing
  },
  div: {
    extra: string,
    size: Sizing
  },
}

export interface TypographyTypes {
  current: string;
  primary: string;
  secondary: string;
}
