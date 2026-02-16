"use client";

import { useEffect, useRef, useState } from 'react';
import { 
  Linkedin, 
  Instagram, 
  Github, 
  MessageCircle,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  Heart
} from 'lucide-react';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Events', href: '#events' },
    { name: 'Our Team', href: '#team' },
    { name: 'FAQ', href: '#faq' },
  ];

  const resources = [
    { name: 'IEEE Global', href: 'https://www.ieee.org' },
    { name: 'Computer Society', href: 'https://www.computer.org' },
    { name: 'IEEE MUJ', href: 'https://ieeemuj.com' },
    { name: 'MUJ Official', href: 'https://jaipur.manipal.edu' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/ieee-cs-muj' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/ieee_csmuj' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/IEEECSMUJ' },
    { name: 'WhatsApp', icon: MessageCircle, href: '#' },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative pt-16 pb-8 overflow-hidden bg-black z-50"
      id="join"
    >
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
      
      <div className="max-w-7xl ml-auto mr-8 px-6 sm:px-8 lg:px-12 w-full flex flex-col items-end">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-24 justify-start max-w-6xl w-full">
          {/* IEEE CS Brand Section */}
          <div className={`reveal text-left pt-16 ${isVisible ? 'active' : ''}`}>
            <div className="mb-8">
              <img src="/ieee-cs-logo.png" alt="IEEE CS Logo" className="w-full h-auto object-contain" />
            </div>
            <p className="text-gray-400 text-base leading-relaxed mb-10 max-w-sm">
              Advancing technology for humanity through innovation, education, and collaboration.
            </p>
            <div className="flex gap-4 justify-start">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-orange-500/30 rounded-lg hover:bg-orange-500 hover:border-orange-500 hover:text-black transition-all duration-300"
                  aria-label={link.name}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div
            className={`reveal text-left pt-16 ${isVisible ? 'active' : ''}`}
            style={{ transitionDelay: '0.1s' }}
          >
            <h4 className="font-orbitron font-bold text-white text-xl mb-10 flex items-center justify-start gap-3">
              <span className="text-orange-500">&gt;</span> Quick Links
            </h4>
            <ul className="space-y-6 flex flex-col items-start">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-base flex items-center gap-3 group py-1"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-500/50 rounded-full group-hover:bg-orange-500 transition-colors"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div
            className={`reveal text-left pt-16 ${isVisible ? 'active' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <h4 className="font-orbitron font-bold text-white text-xl mb-10 flex items-center justify-start gap-3">
              <span className="text-orange-500">&gt;</span> Resources
            </h4>
            <ul className="space-y-6 flex flex-col items-start">
              {resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-base flex items-center gap-3 group py-1"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-500/50 rounded-full group-hover:bg-orange-500 transition-colors"></span>
                    {link.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div
            className={`reveal text-left pt-16 ${isVisible ? 'active' : ''}`}
            style={{ transitionDelay: '0.3s' }}
          >
            <h4 className="font-orbitron font-bold text-white text-xl mb-10 flex items-center justify-start gap-3">
              <span className="text-orange-500">&gt;</span> Contact
            </h4>
            <ul className="space-y-8 flex flex-col items-start">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-base leading-relaxed">
                  Manipal University Jaipur,<br />
                  Dehmi Kalan, Jaipur-Ajmer Expressway,<br />
                  Rajasthan 303007
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a
                  href="mailto:contact@ieeecsmuj.com"
                  className="text-gray-400 hover:text-orange-500 transition-colors text-base"
                >
                  contact@ieeecsmuj.com
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a
                  href="tel:+919871340076"
                  className="text-gray-400 hover:text-orange-500 transition-colors text-base"
                >
                  +91 98713 40076
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Terminal Section */}
        <div
          className={`reveal border-t border-orange-500/20 pt-12 max-w-6xl w-full ${isVisible ? 'active' : ''}`}
          style={{ transitionDelay: '0.4s' }}
        >
          <div className="glass rounded-2xl p-8 md:p-10 font-mono text-base">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-left">
              <div className="flex items-center justify-start gap-3 text-gray-400">
                <span className="text-orange-500 text-lg">$</span>
                <span>© 2024 IEEE CS MUJ. All systems operational.</span>
                <span className="animate-pulse text-orange-500">_</span>
              </div>
              <div className="flex items-center justify-start gap-3 text-gray-500">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                <span>by IEEE CS MUJ Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden pointer-events-none opacity-[0.05] z-0">
        <div className="font-orbitron text-[20vw] font-bold text-gray-500 whitespace-nowrap">
          IEEE CS
        </div>
      </div>

      <style jsx>{`
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }
        
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
        
        .glass {
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(249, 115, 22, 0.2);
        }
      `}</style>
    </footer>
  );
}