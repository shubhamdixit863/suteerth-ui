import { Home, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Home className="size-8 text-blue-500" />
              <span className="text-xl text-white">RealEstate</span>
            </div>
            <p className="text-sm mb-4">
              Your trusted partner in finding the perfect property. We make buying and renting easy.
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Facebook className="size-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Twitter className="size-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Instagram className="size-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Linkedin className="size-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">Properties</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">Agents</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">Buy Property</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">Rent Property</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">Property Management</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">Market Analysis</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm">
              <li>123 Real Estate Ave</li>
              <li>New York, NY 10001</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@realestate.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 RealEstate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
