import { Bed, Bath, Maximize, MapPin, Heart } from 'lucide-react';
import { Property } from '../types/property';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const formatPrice = (price: number, type: 'sale' | 'rent') => {
    if (type === 'rent') {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
  };

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer" onClick={handleCardClick}>
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant={property.type === 'sale' ? 'default' : 'secondary'}>
            For {property.type === 'sale' ? 'Sale' : 'Rent'}
          </Badge>
          {property.featured && (
            <Badge className="bg-yellow-500">Featured</Badge>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            className={`size-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
      </div>

      <CardContent className="p-6">
        <div className="mb-2">
          <span className="text-2xl text-blue-600">
            {formatPrice(property.price, property.type)}
          </span>
        </div>
        
        <h3 className="text-xl mb-2">{property.title}</h3>
        
        <div className="flex items-center gap-1 text-gray-600 mb-4">
          <MapPin className="size-4" />
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-1">
            <Bed className="size-4" />
            <span className="text-sm">{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="size-4" />
            <span className="text-sm">{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="size-4" />
            <span className="text-sm">{property.area} sqft</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-6">
        <Button className="w-full" onClick={handleCardClick}>View Details</Button>
      </CardFooter>
    </Card>
  );
}
