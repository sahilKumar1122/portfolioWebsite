import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PaperPlaneTilt, GithubLogo, LinkedinLogo, EnvelopeSimple } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      // Form elements animation
      gsap.fromTo(formRef.current?.children || [],
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%"
          }
        }
      );

      // Floating particles
      gsap.to(".contact-particle", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.5
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleInputFocus = (element: HTMLElement) => {
    gsap.to(element, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleInputBlur = (element: HTMLElement) => {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);

    // Success animation
    gsap.to(".submit-btn", {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });
  };

  const handleSocialHover = (element: HTMLElement, isHovering: boolean) => {
    gsap.to(element, {
      scale: isHovering ? 1.1 : 1,
      rotate: isHovering ? 5 : 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-primary rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-gradient-accent rounded-full opacity-8 blur-3xl"></div>
        
        {/* Floating Particles */}
        <div className="contact-particle absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full opacity-60"></div>
        <div className="contact-particle absolute top-3/4 right-1/3 w-3 h-3 bg-accent rounded-full opacity-40"></div>
        <div className="contact-particle absolute bottom-1/3 left-1/2 w-1 h-1 bg-secondary rounded-full opacity-50"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 
              ref={titleRef}
              className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold mb-6 tracking-wide"
            >
              Let's <span className="text-gradient-primary">Connect</span>
            </h2>
            <p className="text-lg font-exo text-muted-foreground max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your next project 
              and create something amazing together.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form 
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name Input */}
                <div className="form-group">
                  <label htmlFor="name" className="block text-sm font-orbitron font-medium text-foreground mb-2 tracking-wide">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={(e) => handleInputFocus(e.currentTarget)}
                    onBlur={(e) => handleInputBlur(e.currentTarget)}
                    required
                    className="w-full px-4 py-3 glass rounded-xl border border-border/50 focus:border-primary focus:glow-primary transition-all duration-300 bg-transparent font-exo text-foreground placeholder-muted-foreground focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email Input */}
                <div className="form-group">
                  <label htmlFor="email" className="block text-sm font-orbitron font-medium text-foreground mb-2 tracking-wide">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={(e) => handleInputFocus(e.currentTarget)}
                    onBlur={(e) => handleInputBlur(e.currentTarget)}
                    required
                    className="w-full px-4 py-3 glass rounded-xl border border-border/50 focus:border-primary focus:glow-primary transition-all duration-300 bg-transparent font-exo text-foreground placeholder-muted-foreground focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Message Input */}
                <div className="form-group">
                  <label htmlFor="message" className="block text-sm font-orbitron font-medium text-foreground mb-2 tracking-wide">
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={(e) => handleInputFocus(e.currentTarget)}
                    onBlur={(e) => handleInputBlur(e.currentTarget)}
                    required
                    rows={6}
                    className="w-full px-4 py-3 glass rounded-xl border border-border/50 focus:border-primary focus:glow-primary transition-all duration-300 bg-transparent font-exo text-foreground placeholder-muted-foreground focus:outline-none resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn w-full px-6 py-4 bg-gradient-primary text-primary-foreground font-orbitron font-semibold rounded-xl hover:scale-105 transition-all duration-300 glow-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 uppercase tracking-wide"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <PaperPlaneTilt size={20} weight="bold" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info & Social */}
            <div className="space-y-8">
              {/* Contact Info */}
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-orbitron font-bold mb-4 text-gradient-accent tracking-wide">
                  GET IN TOUCH
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <EnvelopeSimple size={20} className="text-primary" />
                    <span className="font-exo text-muted-foreground">sahil@example.com</span>
                  </div>
                  
                  <p className="text-sm font-exo text-muted-foreground">
                    I'm always open to discussing new opportunities, 
                    creative ideas, or potential collaborations.
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-orbitron font-bold mb-4 text-gradient-accent tracking-wide">
                  FOLLOW ME
                </h3>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => window.open('https://github.com', '_blank')}
                    onMouseEnter={(e) => handleSocialHover(e.currentTarget, true)}
                    onMouseLeave={(e) => handleSocialHover(e.currentTarget, false)}
                    className="p-3 glass rounded-full hover:glow-primary transition-all duration-300"
                  >
                    <GithubLogo size={24} weight="bold" />
                  </button>
                  
                  <button
                    onClick={() => window.open('https://linkedin.com', '_blank')}
                    onMouseEnter={(e) => handleSocialHover(e.currentTarget, true)}
                    onMouseLeave={(e) => handleSocialHover(e.currentTarget, false)}
                    className="p-3 glass rounded-full hover:glow-primary transition-all duration-300"
                  >
                    <LinkedinLogo size={24} weight="bold" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;