import type { ElementType } from 'react';

export interface MappingItem {
  icon: ElementType;
  num: string;
  phase: string;
  applications: string;
  tools: string[];
  size: string;
}

export interface CaseStudy {
  id: number;
  shortTitle: string;
  domain: string;
  owner: string;
  university: string;
  program: string;
  tools: string[];
  kpis: string[];
  cardCount: number;
}
