import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      gsap.fromTo(".mobile-menu", 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    } else {
      gsap.to(".mobile-menu", {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'glass backdrop-blur-md' : ''
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-orbitron font-bold text-gradient-primary cursor-pointer tracking-wider"
               onClick={() => handleNavClick('hero')}>
            SAHIL
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item.toLowerCase())}
                className="relative font-exo text-foreground/80 hover:text-foreground transition-colors duration-300 group tracking-wide"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            
            <button 
              onClick={() => handleNavClick('contact')}
              className="px-6 py-2 bg-gradient-primary text-primary-foreground font-orbitron font-medium rounded-full hover:scale-105 transition-transform duration-300 glow-primary uppercase tracking-wide"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
            onClick={toggleMenu}
          >
            <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}></span>
            <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}></span>
            <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu md:hidden absolute top-full left-0 right-0 glass backdrop-blur-md border-t border-border/50">
            <div className="container mx-auto px-6 py-6 space-y-4">
              {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item.toLowerCase())}
                  className="block w-full text-left text-foreground/80 hover:text-foreground transition-colors duration-300 py-2"
                >
                  {item}
                </button>
              ))}
              
              <button 
                onClick={() => handleNavClick('contact')}
                className="w-full mt-4 px-6 py-3 bg-gradient-primary text-primary-foreground rounded-full hover:scale-105 transition-transform duration-300"
              >
                Hire Me
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;