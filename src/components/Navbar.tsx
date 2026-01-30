import { Home, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SiteProperties } from '../lib/siteProperties';

type NavbarProps = {
  site?: SiteProperties | null;
};

export function Navbar({ site }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logo = site?.logo?.trim();

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            {logo ? (
              <img src={logo} alt="Site logo" className="h-8 w-auto" />
            ) : (
              <Home className="size-8 text-blue-600" />
            )}
            {!logo && <span className="text-xl">RealEstate</span>}
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
