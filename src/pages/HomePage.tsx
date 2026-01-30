import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { FeaturedProperties } from '../components/FeaturedProperties';
import { Button } from '../components/ui/button';
import { Home, DollarSign, TrendingUp, Users } from 'lucide-react';
import { Property } from '../types/property';
import { fetchListings } from '../lib/listings';

export function HomePage() {
  const navigate = useNavigate();
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadListings = async () => {
      try {
        setIsLoading(true);
        const listings = await fetchListings({ page: 1, perPage: 12 });
        const featured = listings.filter((listing) => listing.featured);
        const fallback = featured.length > 0 ? featured : listings.slice(0, 3);
        if (isMounted) {
          setFeaturedProperties(fallback);
          setLoadError(null);
        }
      } catch (error) {
        if (isMounted) {
          setFeaturedProperties([]);
          setLoadError('Unable to load listings right now.');
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

  return (
    <main>
      <Hero />
      {isLoading && (
        <div className="container mx-auto px-4 py-12 text-center text-gray-600">
          Loading featured listings...
        </div>
      )}
      {!isLoading && loadError && (
        <div className="container mx-auto px-4 py-12 text-center text-red-600">
          {loadError}
        </div>
      )}
      {!isLoading && !loadError && <FeaturedProperties properties={featuredProperties} />}
      
      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Home className="size-8 text-blue-600" />
              </div>
              <div className="text-4xl mb-2">5,000+</div>
              <p className="text-gray-600">Properties Listed</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <DollarSign className="size-8 text-green-600" />
              </div>
              <div className="text-4xl mb-2">$2B+</div>
              <p className="text-gray-600">Worth of Sales</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Users className="size-8 text-purple-600" />
              </div>
              <div className="text-4xl mb-2">10,000+</div>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <TrendingUp className="size-8 text-orange-600" />
              </div>
              <div className="text-4xl mb-2">98%</div>
              <p className="text-gray-600">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl mb-6">Ready to Find Your Dream Home?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse thousands of properties or list your own. Our team is here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/buy')}
            >
              Browse Properties
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive real estate services to meet all your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-2xl mb-3">Buy a Home</h3>
              <p className="text-gray-600 mb-4">
                Find your perfect home from our extensive collection of properties across the country.
              </p>
              <Button variant="link" className="p-0" onClick={() => navigate('/buy')}>
                Learn More →
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🔑</div>
              <h3 className="text-2xl mb-3">Rent a Property</h3>
              <p className="text-gray-600 mb-4">
                Discover rental properties that fit your lifestyle and budget perfectly.
              </p>
              <Button variant="link" className="p-0" onClick={() => navigate('/rent')}>
                Learn More →
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
