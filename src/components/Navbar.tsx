import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      if (isMobileMenuOpen && window.scrollY > 50) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMobileMenuOpen && 
        !target.closest('.mobile-menu-container') && 
        !target.closest('.mobile-menu-toggle')
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (id: string) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleNavClick = (section: string) => {
    setIsMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/"); 
      setTimeout(() => scrollToSection(section), 300);
    } else {
      scrollToSection(section);
    }
  };

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'py-3 bg-white/100 dark:bg-black shadow-sm' : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
  <Link to="/" className="flex items-center">
    <img 
      src="/uploads/transparent_backgroud_black_logo.png" 
      alt="XELIS Logo" 
      className="h-8 dark:hidden"  // This will hide the default logo in dark mode
    />
    <img 
      src="/uploads/transparent_background_green_logo.png" 
      alt="XELIS Logo (Dark Mode)"
      className="h-8 hidden dark:block"  // This will show the inverted logo in dark mode
    />
  </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <button onClick={() => handleNavClick('about')} className="link-hover font-medium dark:text-white">About</button>
          <Link to="/ecosystem" className="link-hover font-medium dark:text-white">Ecosystem</Link>
          <Link to="/blog" className="link-hover font-medium dark:text-white">News</Link>
          <Link to="/roadmap" className="link-hover font-medium dark:text-white">Roadmap</Link>
          <Link to="/exchanges" className="link-hover font-medium dark:text-white">Exchanges</Link>
          <Link to="/resources" className="link-hover font-medium dark:text-white">Resources</Link>
          <Link to="/tokenomics" className="link-hover font-medium dark:text-white">Tokenomics</Link>
          <a href="https://docs.xelis.io" target="_blank" rel="noopener noreferrer" className="link-hover font-medium dark:text-white">Docs</a>
          <a href="https://explorer.xelis.io" target="_blank" rel="noopener noreferrer" className="link-hover font-medium dark:text-white">Explorer</a>
          <a href="https://stats.xelis.io" target="_blank" rel="noopener noreferrer" className="link-hover font-medium dark:text-white">Stats</a>
          <a href="https://github.com/xelis-project" target="_blank" rel="noopener noreferrer" className="link-hover font-medium dark:text-white">GitHub</a>
          <Link to="/resources" className="button-primary">Get a Wallet</Link>
          <ThemeToggle /> {/* Added ThemeToggle here for Desktop */}
        </div>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-700 dark:text-white" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700 dark:text-white" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={cn(
        "md:hidden fixed inset-0 z-40 bg-white dark:bg-[#000000] transition-all duration-300 ease-in-out mobile-menu-container", 
        isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )}>
        <div className="container mx-auto px-4 flex flex-col space-y-3 text-center dark:text-white overflow-y-auto max-h-[80vh] pt-10">
          <button onClick={() => handleNavClick('about')} className="text-base py-2">About</button>
          <Link to="/ecosystem" className="text-base py-2" onClick={() => setIsMobileMenuOpen(false)}>Ecosystem</Link>
          <Link to="/blog" className="text-base py-2" onClick={() => setIsMobileMenuOpen(false)}>News</Link>
          <Link to="/roadmap" className="text-base py-2" onClick={() => setIsMobileMenuOpen(false)}>Roadmap</Link>
          <Link to="/exchanges" className="text-base py-2" onClick={() => setIsMobileMenuOpen(false)}>Exchanges</Link>
          <Link to="/resources" className="text-base py-2" onClick={() => setIsMobileMenuOpen(false)}>Resources</Link>
          <Link to="/tokenomics" className="text-base py-2" onClick={() => setIsMobileMenuOpen(false)}>Tokenomics</Link>
          <a href="https://docs.xelis.io" target="_blank" rel="noopener noreferrer" className="text-base py-2" onClick={() => setIsMobileMenuOpen(false)}>Docs</a>
          <a href="https://explorer.xelis.io" target="_blank" rel="noopener noreferrer" className="text-base py-2" onClick={() => setIsMobileMenuOpen(false)}>Explorer</a>
          <a href="https://stats.xelis.io" target="_blank" rel="noopener noreferrer" className="text-base py-2" onClick={() => setIsMobileMenuOpen(false)}>Stats</a>
          <a href="https://github.com/xelis-project" target="_blank" rel="noopener noreferrer" className="text-base py-2" onClick={() => setIsMobileMenuOpen(false)}>GitHub</a>
          <Link to="/resources" className="button-primary mx-auto mt-2" onClick={() => setIsMobileMenuOpen(false)}>Get A Wallet</Link>
          <div className="mx-auto mt-4"> {/* Added ThemeToggle here for Mobile */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
