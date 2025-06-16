import { Link } from "react-router-dom";
import { 
  FaCompass,
  FaBook,
  FaBalanceScale,
  FaTwitter,
  FaGithub,
  FaWhatsapp,
  FaEnvelope
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-primary-darker text-text-light border-t border-gray-700 mt-20">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Brand Section */}
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-xl font-bold">
                learn.<span className="text-accent">mtandaocentre</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              your online learning partner
            </p>
            
            <div className="flex space-x-3 pt-1">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/yournumber"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@mtandaocentre.com"
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label="Email"
              >
                <FaEnvelope className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore Section */}
          <div>
            <h4 className="font-bold text-base mb-3 flex items-center">
              <FaCompass className="mr-2 text-accent text-sm" />
              Explore
            </h4>
            <div className="space-y-1.5 text-gray-400 text-sm">
              <div>
                <Link 
                  to="/" 
                  className="hover:text-accent transition-colors block py-0.5"
                >
                  Home
                </Link>
              </div>
              <div>
                <Link 
                  to="/courses" 
                  className="hover:text-accent transition-colors block py-0.5"
                >
                  Courses
                </Link>
              </div>
              <div>
                <Link 
                  to="/analytics" 
                  className="hover:text-accent transition-colors block py-0.5"
                >
                  Analytics
                </Link>
              </div>
            </div>
          </div>

          {/* Resources Section */}
          <div>
            <h4 className="font-bold text-base mb-3 flex items-center">
              <FaBook className="mr-2 text-accent text-sm" />
              Resources
            </h4>
            <div className="space-y-1.5 text-gray-400 text-sm">
              <div>
                <Link 
                  to="/blog" 
                  className="hover:text-accent transition-colors block py-0.5"
                >
                  Learning Blog
                </Link>
              </div>
              <div>
                <Link 
                  to="/faq" 
                  className="hover:text-accent transition-colors block py-0.5"
                >
                  FAQ
                </Link>
              </div>
              <div>
                <a
                  href="https://wa.me/yourgroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors block py-0.5"
                >
                  Student Community
                </a>
              </div>
            </div>
          </div>

          {/* Legal Section */}
          <div>
            <h4 className="font-bold text-base mb-3 flex items-center">
              <FaBalanceScale className="mr-2 text-accent text-sm" />
              Legal
            </h4>
            <div className="space-y-1.5 text-gray-400 text-sm">
              <div>
                <Link 
                  to="/privacy" 
                  className="hover:text-accent transition-colors block py-0.5"
                >
                  Privacy Policy
                </Link>
              </div>
              <div>
                <Link 
                  to="/terms" 
                  className="hover:text-accent transition-colors block py-0.5"
                >
                  Terms of Service
                </Link>
              </div>
              <div>
                <Link 
                  to="/contact" 
                  className="hover:text-accent transition-colors block py-0.5"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-4 pb-2 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs mb-2 md:mb-0">
            &copy; {currentYear} learn.mtandaocentre. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link to="/sitemap" className="text-gray-500 hover:text-accent text-xs transition-colors">
              Sitemap
            </Link>
            <Link to="/accessibility" className="text-gray-500 hover:text-accent text-xs transition-colors">
              Accessibility
            </Link>
            <Link to="/feedback" className="text-gray-500 hover:text-accent text-xs transition-colors">
              Feedback
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;