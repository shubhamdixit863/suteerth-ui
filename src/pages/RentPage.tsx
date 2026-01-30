import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchFilters } from '../components/SearchFilters';
import { PropertyGrid } from '../components/PropertyGrid';
import { Property } from '../types/property';
import { fetchListings } from '../lib/listings';

export function RentPage() {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const searchQuery = useMemo(() => {
    const query = searchParams.get('q');
    return query ? query.trim().toLowerCase() : '';
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;

    const loadListings = async () => {
      try {
        setIsLoading(true);
        const listings = await fetchListings({ page: 1, perPage: 50, type: 'rent' });
        const propertiesForRent = listings.filter((listing) => listing.type === 'rent');
        const initialResults = searchQuery
          ? propertiesForRent.filter((listing) => {
              const haystack = `${listing.title} ${listing.location} ${listing.category} ${listing.type}`.toLowerCase();
              return haystack.includes(searchQuery);
            })
          : propertiesForRent;
        if (isMounted) {
          setAllProperties(propertiesForRent);
          setFilteredProperties(initialResults);
          setLoadError(null);
        }
      } catch (error) {
        if (isMounted) {
          setAllProperties([]);
          setFilteredProperties([]);
          setLoadError('Unable to load properties right now.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadListings();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFilter = (filters: {
    type: 'all' | 'sale' | 'rent';
    category: string;
    minPrice: number;
    maxPrice: number;
    bedrooms: number;
  }) => {
    let filtered = allProperties;

    if (filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    if (filters.bedrooms > 0) {
      filtered = filtered.filter(p => p.bedrooms >= filters.bedrooms);
    }

    filtered = filtered.filter(p => {
      return p.price >= filters.minPrice && p.price <= filters.maxPrice;
    });

    if (searchQuery) {
      filtered = filtered.filter((property) => {
        const haystack = `${property.title} ${property.location} ${property.category} ${property.type}`.toLowerCase();
        return haystack.includes(searchQuery);
      });
    }

    setFilteredProperties(filtered);
  };

  return (
    <main className="flex-1">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl mb-4">Properties for Rent</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Find the perfect rental property that fits your lifestyle and budget
          </p>
        </div>
      </div>

      {/* Filters and Grid */}
      <div className="container mx-auto px-4 py-12">
        <SearchFilters onFilter={handleFilter} hideTypeFilter rentalMode />
        {isLoading && (
          <div className="py-16 text-center text-gray-600">Loading properties...</div>
        )}
        {!isLoading && loadError && (
          <div className="py-16 text-center text-red-600">{loadError}</div>
        )}
        {!isLoading && !loadError && (
          <PropertyGrid properties={filteredProperties} />
        )}
      </div>

      {/* Info Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl mb-4">Rental Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div>
                <div className="text-4xl mb-2">🏡</div>
                <h3 className="text-xl mb-2">Flexible Terms</h3>
                <p className="text-gray-600">Choose lease periods that work for you</p>
              </div>
              <div>
                <div className="text-4xl mb-2">💰</div>
                <h3 className="text-xl mb-2">No Large Investment</h3>
                <p className="text-gray-600">Move in without hefty down payments</p>
              </div>
              <div>
                <div className="text-4xl mb-2">🔧</div>
                <h3 className="text-xl mb-2">Maintenance Included</h3>
                <p className="text-gray-600">Most repairs covered by the landlord</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
