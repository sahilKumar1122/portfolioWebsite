import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, GitBranch } from 'phosphor-react';

// Import project images
import project1 from '../assets/project-1.jpg';
import project2 from '../assets/project-2.jpg';
import project3 from '../assets/project-3.jpg';
import project4 from '../assets/project-4.jpg';
import project5 from '../assets/project-5.jpg';
import project6 from '../assets/project-6.jpg';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      image: project1,
      title: 'Futuristic Dashboard',
      description: 'Modern analytics dashboard with real-time data visualization and interactive charts.',
      tech: ['React', 'TypeScript', 'D3.js', 'Node.js'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      image: project2,
      title: 'Mobile App Interface',
      description: 'Sleek mobile application with intuitive UI/UX and smooth animations.',
      tech: ['React Native', 'Expo', 'TypeScript', 'Firebase'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      image: project3,
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration and admin panel.',
      tech: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 4,
      image: project4,
      title: 'Gaming Dashboard',
      description: 'Interactive gaming platform with leaderboards and real-time statistics.',
      tech: ['React', 'Socket.io', 'Express', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 5,
      image: project5,
      title: 'Trading Platform',
      description: 'Financial trading interface with live market data and portfolio management.',
      tech: ['Vue.js', 'WebSocket', 'Chart.js', 'Python'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 6,
      image: project6,
      title: 'AI Analytics Dashboard',
      description: 'Machine learning powered analytics with predictive insights and automation.',
      tech: ['React', 'TensorFlow', 'Python', 'FastAPI'],
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%"
          }
        }
      );

      // Projects staggered animation
      gsap.fromTo(projectsRef.current?.children || [],
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleProjectHover = (element: HTMLElement, isHovering: boolean) => {
    const image = element.querySelector('.project-image');
    const overlay = element.querySelector('.project-overlay');
    
    gsap.to(element, {
      y: isHovering ? -10 : 0,
      scale: isHovering ? 1.02 : 1,
      duration: 0.4,
      ease: "power2.out"
    });

    gsap.to(image, {
      scale: isHovering ? 1.1 : 1,
      duration: 0.6,
      ease: "power2.out"
    });

    gsap.to(overlay, {
      opacity: isHovering ? 1 : 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-20 w-60 h-60 bg-gradient-accent rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-gradient-primary rounded-full opacity-8 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold mb-6 tracking-wide"
          >
            Featured <span className="text-gradient-primary">Projects</span>
          </h2>
          <p className="text-lg font-exo text-muted-foreground max-w-2xl mx-auto">
            Explore some of my latest work showcasing modern web technologies 
            and innovative design solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div 
          ref={projectsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative glass rounded-2xl overflow-hidden hover:glow-primary transition-all duration-500 cursor-pointer"
              onMouseEnter={(e) => handleProjectHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleProjectHover(e.currentTarget, false)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="project-image w-full h-full object-cover transition-transform duration-600"
                />
                
                {/* Overlay with actions */}
                <div className="project-overlay absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 flex items-center justify-center space-x-4">
                  <button 
                    onClick={() => window.open(project.liveUrl, '_blank')}
                    className="p-3 bg-gradient-primary text-primary-foreground rounded-full hover:scale-110 transition-transform duration-300"
                  >
                    <Eye size={20} weight="bold" />
                  </button>
                  <button 
                    onClick={() => window.open(project.githubUrl, '_blank')}
                    className="p-3 bg-gradient-accent text-accent-foreground rounded-full hover:scale-110 transition-transform duration-300"
                  >
                    <GitBranch size={20} weight="bold" />
                  </button>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-orbitron font-bold mb-2 text-gradient-accent tracking-wide">
                  {project.title}
                </h3>
                
                <p className="font-exo text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-xs font-exo bg-muted/50 text-muted-foreground rounded-full border border-border/50 tracking-wide"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-2 right-2 w-12 h-12 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-2 left-2 w-8 h-8 bg-accent/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-accent text-accent-foreground font-orbitron font-medium rounded-full hover:scale-105 transition-transform duration-300 glow-accent uppercase tracking-wide">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;