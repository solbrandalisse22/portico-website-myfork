export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
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