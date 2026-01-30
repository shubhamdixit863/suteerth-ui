import { useParams, Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { ListingDetail, Property } from '../types/property';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Separator } from '../components/ui/separator';
import { 
  Bed, 
  Bath, 
  Maximize, 
  MapPin, 
  Heart, 
  Share2, 
  Calendar, 
  CheckCircle, 
  Home, 
  Car, 
  Trees, 
  Wind, 
  Wifi, 
  Dumbbell, 
  ChevronLeft,
  ChevronRight,
  Calculator,
  MapPinned
} from 'lucide-react';
import { toast } from 'sonner';
import { formatPrice } from '../lib/format';
import { createEnquiry, fetchListing, fetchListings } from '../lib/listings';

const DEFAULT_DETAIL_IMAGE =
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80';
const getPropertyDetails = (property: ListingDetail): ListingDetail => {
  const images =
    property.images && property.images.length > 0
      ? property.images
      : [property.image || DEFAULT_DETAIL_IMAGE];

  return {
    ...property,
    images,
    features: property.features ?? [],
    amenities: property.amenities ?? []
  };
};

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<ListingDetail | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const propertyDetail = useMemo(
    () => (property ? getPropertyDetails(property) : null),
    [property]
  );

  useEffect(() => {
    let isMounted = true;

    const loadListing = async () => {
      if (!id) {
        setLoadError('Property not found.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const listing = await fetchListing(id);
        if (isMounted) {
          setProperty(listing);
          setLoadError(null);
        }
      } catch (error) {
        if (isMounted) {
          setProperty(null);
          setLoadError('Property not found.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadListing();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (!property) return;

    let isMounted = true;
    const loadSimilar = async () => {
      try {
        const listings = await fetchListings({ page: 1, perPage: 12 });
        if (!isMounted) return;
        const similar = listings
          .filter(
            (listing) =>
              listing.id !== property.id &&
              listing.type === property.type &&
              listing.category === property.category
          )
          .slice(0, 3);
        setSimilarProperties(similar);
      } catch (error) {
        if (isMounted) {
          setSimilarProperties([]);
        }
      }
    };

    loadSimilar();

    return () => {
      isMounted = false;
    };
  }, [property]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [property?.id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-gray-600">
        Loading property...
      </div>
    );
  }

  if (!property || !propertyDetail) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl mb-4">{loadError ?? 'Property Not Found'}</h1>
        <Link to="/buy">
          <Button>Back to Listings</Button>
        </Link>
      </div>
    );
  }
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === propertyDetail.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? propertyDetail.images.length - 1 : prev - 1
    );
  };

  const calculateMortgage = () => {
    const principal = parseFloat(loanAmount) || property.price;
    const rate = parseFloat(interestRate) / 100 / 12;
    const payments = parseFloat(loanTerm) * 12;
    
    const monthlyPayment = principal * (rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1);
    
    return monthlyPayment.toFixed(2);
  };

  const handleScheduleViewing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Viewing request submitted! We\'ll contact you shortly.');
  };

  const handleContactAgent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await createEnquiry({
        listingId: property.id,
        name: enquiryForm.name,
        email: enquiryForm.email,
        phone: enquiryForm.phone,
        message: enquiryForm.message
      });
      setEnquiryForm({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      toast.success('Enquiry sent! We will contact you soon.');
    } catch (error) {
      toast.error('Unable to send your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEnquiryChange = (field: keyof typeof enquiryForm, value: string) => {
    setEnquiryForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link to={property.type === 'sale' ? '/buy' : '/rent'} className="hover:text-blue-600">
              {property.type === 'sale' ? 'Buy' : 'Rent'}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{property.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-[500px] rounded-lg overflow-hidden mb-4">
            <ImageWithFallback
              src={propertyDetail.images[currentImageIndex]}
              alt={`${property.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition"
            >
              <ChevronRight className="size-6" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {propertyDetail.images.length}
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            {propertyDetail.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-24 rounded-lg overflow-hidden ${
                  currentImageIndex === index ? 'ring-4 ring-blue-600' : ''
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${property.title} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex gap-2 mb-3">
                      <Badge variant={property.type === 'sale' ? 'default' : 'secondary'}>
                        For {property.type === 'sale' ? 'Sale' : 'Rent'}
                      </Badge>
                      {property.featured && (
                        <Badge className="bg-yellow-500">Featured</Badge>
                      )}
                      <Badge variant="outline">{property.category}</Badge>
                    </div>
                    <h1 className="text-3xl mb-2">{property.title}</h1>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="size-5" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart className={`size-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        toast.success('Link copied to clipboard!');
                      }}
                    >
                      <Share2 className="size-5" />
                    </Button>
                  </div>
                </div>

                <div className="text-3xl text-blue-600 mb-6">
                  {formatPrice(property.price, property.type)}
                </div>

                <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Bed className="size-6 mx-auto mb-2 text-gray-600" />
                    <div className="text-sm text-gray-600">Bedrooms</div>
                    <div>{property.bedrooms}</div>
                  </div>
                  <div className="text-center">
                    <Bath className="size-6 mx-auto mb-2 text-gray-600" />
                    <div className="text-sm text-gray-600">Bathrooms</div>
                    <div>{property.bathrooms}</div>
                  </div>
                  <div className="text-center">
                    <Maximize className="size-6 mx-auto mb-2 text-gray-600" />
                    <div className="text-sm text-gray-600">Area</div>
                    <div>{property.area} sqft</div>
                  </div>
                  <div className="text-center">
                    <Car className="size-6 mx-auto mb-2 text-gray-600" />
                    <div className="text-sm text-gray-600">Parking</div>
                    <div>{propertyDetail.parking ?? 0} Cars</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Section */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="description">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="mt-6 space-y-4">
                    <div>
                      <h3 className="text-xl mb-3">About this property</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {propertyDetail.description || 'No description available yet.'}
                      </p>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Status</div>
                        <div>{propertyDetail.status || 'Available'}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Square Feet</div>
                        <div>{property.area.toLocaleString()} sqft</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Parking</div>
                        <div>{propertyDetail.parking ?? 0} spaces</div>
                      </div>
                      {propertyDetail.updatedAt && (
                        <div>
                          <div className="text-sm text-gray-600">Last Updated</div>
                          <div>{new Date(propertyDetail.updatedAt).toLocaleDateString()}</div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="features" className="mt-6">
                    <h3 className="text-xl mb-4">Property Features</h3>
                    {propertyDetail.features.length === 0 ? (
                      <p className="text-gray-600">No features listed yet.</p>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {propertyDetail.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="size-5 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="amenities" className="mt-6">
                    <h3 className="text-xl mb-4">Amenities</h3>
                    {propertyDetail.amenities.length === 0 ? (
                      <p className="text-gray-600">No amenities listed yet.</p>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        {propertyDetail.amenities.map((amenity, index) => {
                          const getIcon = () => {
                            if (amenity.includes('Pool')) return <Home className="size-5" />;
                            if (amenity.includes('Fitness')) return <Dumbbell className="size-5" />;
                            if (amenity.includes('Parking')) return <Car className="size-5" />;
                            if (amenity.includes('Garden') || amenity.includes('Yard')) return <Trees className="size-5" />;
                            if (amenity.includes('Air') || amenity.includes('Conditioning')) return <Wind className="size-5" />;
                            if (amenity.includes('Internet')) return <Wifi className="size-5" />;
                            return <CheckCircle className="size-5" />;
                          };

                          return (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <div className="text-blue-600">{getIcon()}</div>
                              <span className="text-gray-700">{amenity}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="location" className="mt-6 space-y-6">
                    <div>
                      <h3 className="text-xl mb-4 flex items-center gap-2">
                        <MapPinned className="size-5" />
                        Location
                      </h3>
                      <div className="space-y-3 text-gray-600">
                        <div>
                          <div className="text-sm text-gray-500">Address</div>
                          <div className="text-gray-800">
                            {[propertyDetail.address, propertyDetail.city, propertyDetail.state]
                              .filter((part) => part && part.length > 0)
                              .join(', ') || property.location}
                          </div>
                        </div>
                        {propertyDetail.mapUrl && (
                          <Button variant="outline" asChild>
                            <a
                              href={propertyDetail.mapUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Open in Google Maps
                            </a>
                          </Button>
                        )}
                      </div>
                      <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center text-gray-500 mb-4">
                        Map View Placeholder
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Similar Properties */}
            {similarProperties.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Similar Properties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {similarProperties.map((prop) => (
                      <Link
                        key={prop.id}
                        to={`/property/${prop.id}`}
                        className="group"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                          <div className="h-40 overflow-hidden">
                            <ImageWithFallback
                              src={prop.image}
                              alt={prop.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition"
                            />
                          </div>
                          <div className="p-3">
                            <div className="text-blue-600 mb-1">
                              {formatPrice(prop.price, prop.type)}
                            </div>
                            <div className="text-sm mb-1">{prop.title}</div>
                            <div className="text-xs text-gray-600 flex items-center gap-1">
                              <MapPin className="size-3" />
                              {prop.location}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enquiry */}
            <Card>
              <CardHeader>
                <CardTitle>Send an Enquiry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Tell us about your interest and we will get back to you quickly.
                </p>

                <form onSubmit={handleContactAgent} className="space-y-3">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={enquiryForm.name}
                      onChange={(e) => handleEnquiryChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      value={enquiryForm.email}
                      onChange={(e) => handleEnquiryChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Your phone"
                      value={enquiryForm.phone}
                      onChange={(e) => handleEnquiryChange('phone', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="I'm interested in this property..."
                      value={enquiryForm.message}
                      onChange={(e) => handleEnquiryChange('message', e.target.value)}
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Schedule Viewing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="size-5" />
                  Schedule a Viewing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleScheduleViewing} className="space-y-3">
                  <div>
                    <Label htmlFor="viewing-date">Preferred Date</Label>
                    <Input id="viewing-date" type="date" required />
                  </div>
                  <div>
                    <Label htmlFor="viewing-time">Preferred Time</Label>
                    <Input id="viewing-time" type="time" required />
                  </div>
                  <Button type="submit" className="w-full" variant="outline">
                    <Calendar className="size-4 mr-2" />
                    Request Viewing
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Mortgage Calculator */}
            {property.type === 'sale' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="size-5" />
                    Mortgage Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="loan-amount">Loan Amount</Label>
                    <Input
                      id="loan-amount"
                      type="number"
                      placeholder={property.price.toString()}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                    <Input
                      id="interest-rate"
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="loan-term">Loan Term (years)</Label>
                    <Input
                      id="loan-term"
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                    />
                  </div>
                  <Separator />
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Estimated Monthly Payment</div>
                    <div className="text-2xl text-blue-600">${calculateMortgage()}</div>
                    <div className="text-xs text-gray-500 mt-2">
                      * This is an estimate. Actual payment may vary.
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
