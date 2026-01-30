import { Home, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { SiteProperties } from '../lib/siteProperties';

type FooterProps = {
  site?: SiteProperties | null;
};

export function Footer({ site }: FooterProps) {
  const logo = site?.logo?.trim();
  const aboutText = site?.about_us?.trim() ||
    'Your trusted partner in finding the perfect property. We make buying and renting easy.';
  const aboutSummary = aboutText.length > 140 ? `${aboutText.slice(0, 140)}…` : aboutText;
  const address = site?.address?.trim() || '123 Real Estate Ave, New York, NY 10001';
  const contact = site?.contact?.trim() || '(555) 123-4567';
  const socialLinks = [
    { label: 'Facebook', href: site?.facebook, icon: Facebook },
    { label: 'Twitter', href: site?.twitter, icon: Twitter },
    { label: 'Instagram', href: site?.instagram, icon: Instagram },
    { label: 'LinkedIn', href: site?.linkedin, icon: Linkedin }
  ].filter((link) => Boolean(link.href));
  const footerStyle = site?.footer_image
    ? { backgroundImage: `linear-gradient(180deg, rgba(17,24,39,0.95), rgba(17,24,39,0.95)), url(${site.footer_image})` }
    : undefined;
  const footerClassName = `text-gray-300 mt-auto ${site?.footer_image ? 'bg-cover bg-center' : 'bg-gray-900'}`;

  return (
    <footer className={footerClassName} style={footerStyle}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              {logo ? (
                <img src={logo} alt="Site logo" className="h-8 w-auto" />
              ) : (
                <Home className="size-8 text-blue-500" />
              )}
              {!logo && <span className="text-xl text-white">RealEstate</span>}
            </div>
            <p className="text-sm mb-4">{aboutSummary}</p>
            {socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-blue-500 transition-colors"
                    >
                      <span className="sr-only">{link.label}</span>
                      <Icon className="size-5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h4 className="text-white mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm">
              <li>{address}</li>
              <li>Phone: {contact}</li>
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
