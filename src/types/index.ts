export interface FaqItem {
  question: string;
  answer: string;
}

export interface LocationMeta {
  city?: string;
  region?: string;
  country?: string;
}

export interface SeoPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  bullets: string[];
  processSteps: string[];
  faq: FaqItem[];
  primaryKeywords: string[];
  secondaryKeywords: string[];
  schemaType: string;
  location?: LocationMeta;
  related?: string[];
  author?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  focus: string;
  email?: string;
  socials?: { label: string; url: string }[];
}

export interface Project {
  slug: string;
  title: string;
  location: string;
  summary: string;
  image: string;
  tags: string[];
  link?: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  partner: string;
  title: string;
  description: string;
  image: string;
  link?: string;
}

export interface SearchItem {
  title: string;
  href: string;
  type: string;
  description: string;
}
