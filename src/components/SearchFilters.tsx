import { useState } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface SearchFiltersProps {
  onFilter: (filters: {
    type: 'all' | 'sale' | 'rent';
    category: string;
    minPrice: number;
    maxPrice: number;
    bedrooms: number;
  }) => void;
  hideTypeFilter?: boolean;
  rentalMode?: boolean;
}

export function SearchFilters({ onFilter, hideTypeFilter, rentalMode }: SearchFiltersProps) {
  const [type, setType] = useState<'all' | 'sale' | 'rent'>('all');
  const [category, setCategory] = useState('all');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(rentalMode ? 10000 : 10000000);
  const [bedrooms, setBedrooms] = useState(0);

  const handleFilter = () => {
    onFilter({ type, category, minPrice, maxPrice, bedrooms });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-2xl mb-6">Search Filters</h3>
      
      <div className={`grid grid-cols-1 md:grid-cols-2 ${hideTypeFilter ? 'lg:grid-cols-4' : 'lg:grid-cols-5'} gap-4`}>
        {!hideTypeFilter && (
          <div className="space-y-2">
            <Label>Listing Type</Label>
            <Select value={type} onValueChange={(value: 'all' | 'sale' | 'rent') => setType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label>Property Type</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Min Price{rentalMode ? ' (monthly)' : ''}</Label>
          <Input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label>Max Price{rentalMode ? ' (monthly)' : ''}</Label>
          <Input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            placeholder={rentalMode ? '10000' : '10000000'}
          />
        </div>

        <div className="space-y-2">
          <Label>Bedrooms</Label>
          <Select value={bedrooms.toString()} onValueChange={(value) => setBedrooms(Number(value))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6">
        <Button onClick={handleFilter} className="w-full md:w-auto">
          Apply Filters
        </Button>
      </div>
    </div>
  );
}