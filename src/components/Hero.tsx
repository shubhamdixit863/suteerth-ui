import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    const params = trimmed ? `?q=${encodeURIComponent(trimmed)}` : '';
    navigate(`/buy${params}`);
  };

  return (
    <div className="relative h-[600px] flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/70 z-10" />
      <ImageWithFallback
        src="luxury real estate"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="relative z-20 container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-6xl mb-6">
          Find Your Dream Home
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Discover the perfect property from our extensive collection of homes, apartments, and commercial spaces
        </p>
        
        <form
          className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl p-6"
          onSubmit={handleSearch}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Enter location, property type, or keyword..."
              className="flex-1"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Button size="lg" className="md:w-auto" type="submit">
              <Search className="size-5 mr-2" />
              Search Properties
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
