import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImage from '../assets/profile-image.jpg';
import { 
  Code, 
  Palette, 
  DeviceMobile, 
  Globe, 
  Database, 
  GitBranch,
  Cpu,
  Stack
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { icon: Code, name: 'HTML/CSS', color: '#E34F26' },
    { icon: Code, name: 'JavaScript', color: '#F7DF1E' },
    { icon: Stack, name: 'React', color: '#61DAFB' },
    { icon: Stack, name: 'Next.js', color: '#000000' },
    { icon: Globe, name: 'Angular', color: '#DD0031' },
    { icon: Database, name: 'Node.js', color: '#339933' },
    { icon: Cpu, name: 'Docker', color: '#2496ED' },
    { icon: GitBranch, name: 'Git/GitHub', color: '#F05032' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in
      gsap.fromTo(sectionRef.current,
        { opacity: 0, filter: "blur(10px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%"
          }
        }
      );

      // Image animation
      gsap.fromTo(imageRef.current,
        { opacity: 0, x: -100, rotateY: 45 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%"
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%"
          }
        }
      );

      // Skills staggered animation
      gsap.fromTo(skillsRef.current?.children || [],
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleImageHover = (isHovering: boolean) => {
    gsap.to(imageRef.current, {
      scale: isHovering ? 1.05 : 1,
      rotateY: isHovering ? 5 : 0,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleSkillHover = (element: HTMLElement, isHovering: boolean) => {
    gsap.to(element, {
      scale: isHovering ? 1.1 : 1,
      y: isHovering ? -5 : 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-primary rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-accent rounded-full opacity-15 blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-start">
            <div 
              ref={imageRef}
              className="relative group cursor-pointer"
              onMouseEnter={() => handleImageHover(true)}
              onMouseLeave={() => handleImageHover(false)}
            >
              <div className="w-80 h-80 rounded-full overflow-hidden glass p-2 glow-primary">
                <img 
                  src={profileImage} 
                  alt="Sahil - Web Developer" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              
              {/* Floating glow orbs around image */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-accent rounded-full opacity-70 animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-secondary rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold mb-6 tracking-wide">
              About <span className="text-gradient-primary">Me</span>
            </h2>
            
            <p className="text-lg font-exo text-muted-foreground mb-8 leading-relaxed">
              I'm a passionate web developer with expertise in modern technologies 
              and a keen eye for design. I specialize in creating immersive digital 
              experiences that blend functionality with aesthetic appeal.
            </p>
            
            <p className="text-lg font-exo text-muted-foreground mb-12 leading-relaxed">
              With years of experience in full-stack development, I bring ideas to life 
              through clean code, innovative solutions, and cutting-edge technologies.
            </p>

            {/* Skills Grid */}
            <div>
              <h3 className="text-xl font-orbitron font-semibold mb-6 text-gradient-accent tracking-wide">
                TECHNOLOGIES & TOOLS
              </h3>
              
              <div 
                ref={skillsRef}
                className="grid grid-cols-4 gap-4"
              >
                {skills.map((skill, index) => {
                  const IconComponent = skill.icon;
                  return (
                    <div
                      key={index}
                      className="group flex flex-col items-center p-4 glass rounded-xl hover:glow-primary transition-all duration-300 cursor-pointer"
                      onMouseEnter={(e) => handleSkillHover(e.currentTarget, true)}
                      onMouseLeave={(e) => handleSkillHover(e.currentTarget, false)}
                    >
                      <IconComponent 
                        size={32} 
                        weight="light"
                        className="mb-2 text-foreground group-hover:text-primary transition-colors duration-300"
                      />
                      <span className="text-xs font-exo text-muted-foreground group-hover:text-foreground transition-colors duration-300 text-center tracking-wide">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;