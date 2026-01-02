import { Link } from "react-router-dom";
import { Heart, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const shopLinks = [
    { name: "Headphones", href: "/shop" },
    { name: "Earbuds", href: "/shop" },
    { name: "Speakers", href: "/shop" },
    { name: "Gaming", href: "/shop" },
  ];

  const supportLinks = [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "#" },
    { name: "Shipping", href: "#" },
    { name: "Returns", href: "#" },
  ];

  return (
    <footer className="footer py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="text-2xl font-bold text-primary mb-4 inline-block">ESHOP</Link>
            <p className="text-background/70 mb-4">Your one-stop shop for premium audio equipment.</p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-background mb-4">Shop</h3>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.name}><Link to={link.href} className="footer-link">{link.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-background mb-4">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}><Link to={link.href} className="footer-link">{link.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-background mb-4">Contact</h3>
            <div className="space-y-2 text-background/70 text-sm">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> San Francisco, CA</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +1 (800) 123-4567</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> support@eshop.com</p>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10 pt-8 text-center">
          <p className="text-background/50 text-sm flex items-center justify-center gap-1">
            © {new Date().getFullYear()} ESHOP. Made with <Heart className="h-4 w-4 text-primary fill-primary" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
