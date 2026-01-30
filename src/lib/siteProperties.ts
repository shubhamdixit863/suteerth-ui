import { API_BASE_URL } from './api';

export interface SiteProperties {
  id: string;
  logo?: string;
  address?: string;
  about_us?: string;
  contact?: string;
  footer_image?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  created_at?: string;
  updated_at?: string;
}

export const fetchSiteProperties = async (): Promise<SiteProperties | null> => {
  const response = await fetch(`${API_BASE_URL}/site-properties`);
  if (!response.ok) {
    throw new Error(`Failed to fetch site properties (${response.status})`);
  }
  const data = (await response.json()) as SiteProperties | null;
  if (!data || typeof data !== 'object') {
    return null;
  }
  return data;
};
