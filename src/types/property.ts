export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  type: 'sale' | 'rent';
  category: 'house' | 'apartment' | 'condo' | 'villa';
  featured?: boolean;
  description?: string;
}

export interface ListingDetail extends Property {
  address?: string;
  city?: string;
  state?: string;
  mapUrl?: string;
  parking?: number;
  features: string[];
  amenities: string[];
  images: string[];
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}
