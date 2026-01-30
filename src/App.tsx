import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BuyPage } from './pages/BuyPage';
import { RentPage } from './pages/RentPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { Toaster } from './components/ui/sonner';
import { fetchSiteProperties, SiteProperties } from './lib/siteProperties';

export default function App() {
  const [siteProperties, setSiteProperties] = useState<SiteProperties | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadSiteProperties = async () => {
      try {
        const data = await fetchSiteProperties();
        if (isMounted) {
          setSiteProperties(data);
        }
      } catch (error) {
        if (isMounted) {
          setSiteProperties(null);
        }
      }
    };

    loadSiteProperties();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar site={siteProperties} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/rent" element={<RentPage />} />
          <Route path="/about" element={<AboutPage site={siteProperties} />} />
          <Route path="/contact" element={<ContactPage site={siteProperties} />} />
          <Route path="/property/:id" element={<PropertyDetailPage />} />
        </Routes>
        <Footer site={siteProperties} />
        <Toaster />
      </div>
    </Router>
  );
}
