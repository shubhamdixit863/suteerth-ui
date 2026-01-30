import { Home, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Home className="size-8 text-blue-600" />
            <span className="text-xl">RealEstate</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/buy" className="text-gray-700 hover:text-blue-600 transition-colors">
              Buy
            </Link>
            <Link to="/rent" className="text-gray-700 hover:text-blue-600 transition-colors">
              Rent
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost">Sign In</Button>
            <Button>Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link to="/buy" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Buy
              </Link>
              <Link to="/rent" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Rent
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="ghost" className="w-full">Sign In</Button>
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
