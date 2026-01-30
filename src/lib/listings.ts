import { ListingDetail, Property } from '../types/property';
import { API_BASE_URL } from './api';
const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80';

interface Listing extends Record<string, unknown> {
  id: string;
}

export interface ListingsQuery {
  page?: number;
  perPage?: number;
  q?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: 'buy' | 'rent';
}

const getString = (value: unknown, fallback: string) =>
  typeof value === 'string' && value.trim().length > 0 ? value : fallback;

const getNumber = (value: unknown, fallback: number) => {
  if (typeof value === 'number' && !Number.isNaN(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }
  return fallback;
};

const normalizeType = (value: unknown): Property['type'] => {
  const normalized = getString(value, '').toLowerCase();
  return normalized === 'rent' ? 'rent' : 'sale';
};

const normalizeCategory = (value: unknown): Property['category'] => {
  const normalized = getString(value, '').toLowerCase();
  if (normalized === 'apartment' || normalized === 'condo' || normalized === 'villa') {
    return normalized;
  }
  return 'house';
};

const parseStringArray = (value: unknown): string[] => {
  const normalizeString = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) {
      return [];
    }
    if (trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed
            .map((item) => getString(item, ''))
            .filter((item) => item.length > 0);
        }
      } catch (error) {
        // fall through to comma parsing
      }
    }
    return trimmed
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  if (Array.isArray(value)) {
    const normalized: string[] = [];
    value.forEach((item) => {
      if (typeof item === 'string') {
        normalized.push(...normalizeString(item));
        return;
      }
      const stringValue = getString(item, '');
      if (stringValue) {
        normalized.push(stringValue);
      }
    });
    return normalized;
  }
  if (typeof value === 'string') {
    return normalizeString(value);
  }
  return [];
};

const getLocationLabel = (listing: Listing) => {
  const address = getString(listing.address, '');
  const city = getString(listing.city, '');
  const state = getString(listing.state, '');
  const parts = [address, city, state].filter((part) => part.length > 0);
  if (parts.length > 0) {
    return parts.join(', ');
  }
  return getString(listing.location, 'Location unavailable');
};

const normalizeListing = (listing: Listing): Property => {
  const image =
    getString(listing.image, '') ||
    getString(listing.image_url, '') ||
    (Array.isArray(listing.images) ? getString(listing.images[0], '') : '') ||
    DEFAULT_IMAGE;

  return {
    id: listing.id,
    title: getString(listing.title, getString(listing.name, 'Untitled Listing')),
    price: getNumber(listing.price, 0),
    location: getLocationLabel(listing),
    bedrooms: getNumber(listing.bedrooms, 0),
    bathrooms: getNumber(listing.bathrooms, 0),
    area: getNumber(listing.sqft ?? listing.area, 0),
    image,
    type: normalizeType(listing.type ?? listing.listing_type),
    category: normalizeCategory(listing.category ?? listing.property_type),
    featured: Boolean(listing.featured),
    description: getString(listing.description, getString(listing.summary, ''))
  };
};

const normalizeListingDetail = (listing: Listing): ListingDetail => {
  const base = normalizeListing(listing);
  const images = parseStringArray(listing.images);
  const resolvedImages = images.length > 0 ? images : [base.image];

  return {
    ...base,
    address: getString(listing.address, ''),
    city: getString(listing.city, ''),
    state: getString(listing.state, ''),
    mapUrl: getString(listing.location, ''),
    parking: getNumber(listing.parking, 0),
    features: parseStringArray(listing.features),
    amenities: parseStringArray(listing.amenities),
    images: resolvedImages,
    status: getString(listing.status, ''),
    createdAt: getString(listing.created_at, ''),
    updatedAt: getString(listing.updated_at, '')
  };
};

const buildQuery = (params: ListingsQuery) => {
  const query = new URLSearchParams();
  if (params.page) query.set('page', String(params.page));
  if (params.perPage) query.set('per_page', String(params.perPage));
  if (params.q) query.set('q', params.q);
  if (params.city) query.set('city', params.city);
  if (params.minPrice !== undefined) query.set('min_price', String(params.minPrice));
  if (params.maxPrice !== undefined) query.set('max_price', String(params.maxPrice));
  if (params.type) query.set('type', params.type);
  return query.toString();
};

export const fetchListings = async (params: ListingsQuery = {}): Promise<Property[]> => {
  const query = buildQuery(params);
  const url = `${API_BASE_URL}/listings${query ? `?${query}` : ''}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch listings (${response.status})`);
  }

  const data = (await response.json()) as unknown;
  if (!Array.isArray(data)) {
    return [];
  }
  return data.map((listing) => normalizeListing(listing as Listing));
};

export const fetchListing = async (id: string): Promise<ListingDetail> => {
  const response = await fetch(`${API_BASE_URL}/listings/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch listing (${response.status})`);
  }
  const data = (await response.json()) as Listing;
  return normalizeListingDetail(data);
};

export const createEnquiry = async (payload: {
  listingId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      listing_id: payload.listingId,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      message: payload.message
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to submit enquiry (${response.status})`);
  }

  return (await response.json()) as unknown;
};
