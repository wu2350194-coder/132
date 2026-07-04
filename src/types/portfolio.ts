export type DetailLink = {
  label: string;
  href: string;
};

export type DetailRecord = {
  kind: "project" | "award";
  number: string;
  title: string;
  category: string;
  description: string;
  images?: string[];
  links?: DetailLink[];
  details?: Array<{
    label: string;
    value: string;
  }>;
  process?: string[];
  evidence?: string[];
  outcome?: string;
  layoutId: string;
};

export type ProjectItem = {
  number: string;
  title: string;
  category: string;
  description: string;
  images: string[];
  link?: string;
  linkLabel?: string;
  evidence?: string[];
  outcome?: string;
  process?: string[];
};

export type AwardItem = {
  number: string;
  title: string;
  category: string;
  description: string;
  year?: string;
  link?: string;
  linkLabel?: string;
  evidence?: string[];
  outcome?: string;
};
