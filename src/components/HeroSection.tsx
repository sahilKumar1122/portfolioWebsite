import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Set initial states
    gsap.set([headlineRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 50,
      filter: "blur(10px)"
    });

    gsap.set(splineRef.current, {
      opacity: 0,
      x: 100
    });

    // Animate elements
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out"
    }, "-=0.8")
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .to(splineRef.current, {
      opacity: 1,
      x: 0,
      duration: 1.5,
      ease: "power2.out"
    }, "-=1");

    // Floating background orbs
    gsap.to(".glow-orb-1", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    gsap.to(".glow-orb-2", {
      y: 20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1
    });

    gsap.to(".glow-orb-3", {
      x: 15,
      y: -15,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 2
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleCtaClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCtaHover = (isHovering: boolean) => {
    gsap.to(ctaRef.current, {
      scale: isHovering ? 1.05 : 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
    >
      {/* Background Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>

      {/* Floating Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="glow-orb-1 absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-primary rounded-full opacity-20 blur-xl"></div>
        <div className="glow-orb-2 absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-accent rounded-full opacity-15 blur-2xl"></div>
        <div className="glow-orb-3 absolute top-1/2 left-1/3 w-24 h-24 bg-accent rounded-full opacity-25 blur-lg"></div>
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 
              ref={headlineRef}
              className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-6 leading-tight tracking-wide"
            >
              Hi, I'm{' '}
              <span className="text-gradient-primary">SAHIL</span>
              <br />
              <span className="text-gradient-accent font-exo font-medium tracking-wider">Web Developer</span>
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-lg md:text-xl font-exo text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Crafting digital experiences that inspire and engage through 
              innovative design and cutting-edge technology.
            </p>
            
            <button
              ref={ctaRef}
              onClick={handleCtaClick}
              onMouseEnter={() => handleCtaHover(true)}
              onMouseLeave={() => handleCtaHover(false)}
              className="px-8 py-4 bg-gradient-primary text-primary-foreground text-lg font-orbitron font-semibold rounded-full glow-primary transition-all duration-300 hover:glow-accent tracking-wide uppercase"
            >
              Hire Me
            </button>
          </div>

          {/* Spline 3D Model */}
          <div 
            ref={splineRef}
            className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden glass"
          >
            <iframe 
              src='https://my.spline.design/nexbotrobotcharacterconcept-tpBujmDbHS9U82QUxyq2PpFH/' 
              frameBorder='0' 
              width='100%' 
              height='100%'
              className="rounded-2xl"
              title="3D Robot Character"
            />
            
            {/* Background Text Overlay to hide Spline text */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top overlay to hide background text */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/80 to-transparent"></div>
              <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-background/80 to-transparent"></div>
              <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-background/80 to-transparent"></div>
              
              {/* Glow effects */}
              <div className="absolute top-4 left-4 w-20 h-20 bg-primary rounded-full opacity-30 blur-xl"></div>
              <div className="absolute bottom-4 right-4 w-16 h-16 bg-accent rounded-full opacity-25 blur-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;