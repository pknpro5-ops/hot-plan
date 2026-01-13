
export type PageView = 'home' | 'service' | 'object' | 'portfolio' | 'prices' | 'sro' | 'about' | 'contacts';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PriceRow {
  system: string;
  apartment: string;
  office: string;
  restaurant: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  problem: string;
  solution: string;
  result: string;
  image: string;
  systems: string[];
}

export interface ProjectStage {
  title: string;
  description: string;
  icon: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  lsi: string[];
}

export interface ServiceDetail {
  id: string;
  title: string;
  icon: string;
  description: string;
  features: string[];
  process: string[];
  seo: SEOMetadata;
  faq: FAQItem[];
}

export interface ObjectDetail {
  id: string;
  title: string;
  image: string;
  description: string;
  requirements: string[];
  challenges: string[];
  seo: SEOMetadata;
}
