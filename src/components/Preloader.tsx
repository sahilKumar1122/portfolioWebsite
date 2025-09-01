import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate progress bar from 0 to 100
    tl.to({}, {
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        const progressValue = Math.round(this.progress() * 100);
        setProgress(progressValue);
        
        // Update progress bar width
        gsap.set(".progress-fill", {
          width: `${progressValue}%`
        });
      }
    })
    .to(".preloader-content", {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: "power2.inOut"
    })
    .to(".preloader", {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="preloader fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="preloader-content text-center">
        {/* Animated Logo/Name */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-orbitron font-bold text-gradient-primary mb-2 tracking-wider">
            SAHIL
          </h1>
          <p className="text-lg font-exo text-muted-foreground tracking-[0.3em] uppercase">
            WEB DEVELOPER
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Loading</span>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          <div className="progress-container relative h-1 bg-muted rounded-full overflow-hidden">
            <div className="progress-fill absolute left-0 top-0 h-full bg-gradient-primary rounded-full transition-all duration-100 ease-out" 
                 style={{ width: '0%' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-gradient-x"></div>
            </div>
          </div>
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full opacity-60"></div>
          <div className="floating-delayed absolute top-3/4 right-1/4 w-3 h-3 bg-accent rounded-full opacity-40"></div>
          <div className="floating absolute bottom-1/4 left-1/3 w-1 h-1 bg-secondary rounded-full opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;