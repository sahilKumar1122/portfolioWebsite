import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, GithubLogo, LinkedinLogo, EnvelopeSimple } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer fade up animation
      gsap.fromTo(footerRef.current?.children || [],
        { opacity: 0, y: 60, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%"
          }
        }
      );

      // Floating particles animation
      gsap.to(".footer-particle", {
        y: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: {
          each: 0.8,
          repeat: -1
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSocialHover = (element: HTMLElement, isHovering: boolean) => {
    gsap.to(element, {
      scale: isHovering ? 1.2 : 1,
      rotate: isHovering ? 10 : 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-16 overflow-hidden bg-gradient-to-t from-background to-card/50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 w-32 h-32 bg-gradient-primary rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-gradient-accent rounded-full opacity-8 blur-3xl"></div>
        
        {/* Floating Particles */}
        <div className="footer-particle absolute top-20 left-1/4 w-2 h-2 bg-primary rounded-full opacity-40"></div>
        <div className="footer-particle absolute top-32 right-1/3 w-1 h-1 bg-accent rounded-full opacity-60"></div>
        <div className="footer-particle absolute bottom-20 left-1/2 w-3 h-3 bg-secondary rounded-full opacity-30"></div>
        <div className="footer-particle absolute top-40 right-1/4 w-1 h-1 bg-primary rounded-full opacity-50"></div>
      </div>

      <div 
        ref={footerRef}
        className="container mx-auto px-6 relative z-10"
      >
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-orbitron font-bold text-gradient-primary mb-4 tracking-wider">
              SAHIL
            </h3>
            <p className="font-exo text-muted-foreground leading-relaxed">
              Passionate web developer crafting digital experiences 
              that inspire and engage through innovative design.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-orbitron font-semibold text-foreground mb-4 tracking-wide">
              QUICK LINKS
            </h4>
            <div className="space-y-2">
              {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item.toLowerCase())}
                  className="block w-full font-exo text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Social & Contact */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-orbitron font-semibold text-foreground mb-4 tracking-wide">
              CONNECT WITH ME
            </h4>
            
            <div className="flex justify-center md:justify-end space-x-4 mb-4">
              <button
                onClick={() => window.open('https://github.com', '_blank')}
                onMouseEnter={(e) => handleSocialHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleSocialHover(e.currentTarget, false)}
                className="p-3 glass rounded-full hover:glow-primary transition-all duration-300"
              >
                <GithubLogo size={20} weight="bold" />
              </button>
              
              <button
                onClick={() => window.open('https://linkedin.com', '_blank')}
                onMouseEnter={(e) => handleSocialHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleSocialHover(e.currentTarget, false)}
                className="p-3 glass rounded-full hover:glow-primary transition-all duration-300"
              >
                <LinkedinLogo size={20} weight="bold" />
              </button>
              
              <button
                onClick={() => window.open('mailto:sahil@example.com', '_blank')}
                onMouseEnter={(e) => handleSocialHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleSocialHover(e.currentTarget, false)}
                className="p-3 glass rounded-full hover:glow-primary transition-all duration-300"
              >
                <EnvelopeSimple size={20} weight="bold" />
              </button>
            </div>
            
            <p className="text-sm font-exo text-muted-foreground">
              sahil@example.com
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1 mb-4 md:mb-0">
            <span className="font-exo">Made with</span>
            <Heart size={16} weight="fill" className="text-red-500 animate-pulse" />
            <span className="font-exo">by Sahil</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="font-exo">© 2024 Sahil. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;