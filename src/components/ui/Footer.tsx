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
import styles from './Footer.module.css';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once revealed keep it visible
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
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

  const colStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const linkStyle: React.CSSProperties = {
    color: '#9ca3af',
    textDecoration: 'none',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    transition: 'color 0.3s',
    lineHeight: 1,
  };

  const dotStyle: React.CSSProperties = {
    width: '6px',
    height: '6px',
    backgroundColor: 'rgba(249,115,22,0.5)',
    borderRadius: '50%',
    flexShrink: 0,
    display: 'inline-block',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: '1.50rem',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    color: '#fff',
    fontWeight: 'bold',
  };

  // Staggered reveal classes
  const revealClass = (delay?: string) =>
    `${styles.reveal}${isVisible ? ' ' + styles.active : ''}`;

  const revealStyle = (delay: string): React.CSSProperties => ({
    transitionDelay: isVisible ? delay : '0s',
  });

  const cardClass = `${styles.cardReveal}${isVisible ? ' ' + styles.visible : ''}`;

  return (
    /* Outer wrapper — provides spacing and a reference for IntersectionObserver */
    <div
      ref={wrapperRef}
      className={styles.footerWrapper}
      id="join"
    >
      {/* ── Ambient glow layer ── */}
      <div className={styles.glow} aria-hidden="true" />

      {/* ── Paper card that slides up on scroll ── */}
      <div className={cardClass}>
        <div className={styles.footerCard}>
          {/* Gradient top rule */}
          <div className={styles.topRule} />

          {/* Inner container */}
          <div className={styles.container}>

            {/* Responsive 4→2→1 column grid */}
            <div className={styles.grid}>

              {/* ── Col 1: Brand ── */}
              <div
                className={revealClass()}
                style={{ ...colStyle, ...revealStyle('0s') }}
              >
                <div style={{ marginBottom: '1.25rem', width: '9rem' }}>
                  <img
                    src="/ieee-cs-logo.png"
                    alt="IEEE CS Logo"
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                  />
                </div>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: '1.65', marginBottom: '1.75rem' }}>
                  Advancing technology for humanity through innovation, education, and collaboration.
                </p>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      className="hover:bg-orange-500 hover:border-orange-500 hover:text-black transition-all duration-300"
                      style={{
                        width: '2.25rem',
                        height: '2.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(249,115,22,0.3)',
                        borderRadius: '0.5rem',
                        color: '#9ca3af',
                        textDecoration: 'none',
                        flexShrink: 0,
                      }}
                    >
                      <link.icon style={{ width: '1.1rem', height: '1.1rem' }} />
                    </a>
                  ))}
                </div>
              </div>

              {/* ── Col 2: Quick Links ── */}
              <div
                className={revealClass()}
                style={{ ...colStyle, ...revealStyle('0.1s') }}
              >
                <h4 className="font-orbitron" style={headingStyle}>
                  <span style={{ color: '#f97316' }}>&gt;</span> Quick Links
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="hover:text-orange-500" style={linkStyle}>
                        <span style={dotStyle} />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Col 3: Resources ── */}
              <div
                className={revealClass()}
                style={{ ...colStyle, ...revealStyle('0.2s') }}
              >
                <h4 className="font-orbitron" style={headingStyle}>
                  <span style={{ color: '#f97316' }}>&gt;</span> Resources
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {resources.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-orange-500 group"
                        style={linkStyle}
                      >
                        <span style={dotStyle} />
                        {link.name}
                        <ExternalLink
                          style={{ width: '0.7rem', height: '0.7rem', opacity: 0, marginLeft: 'auto' }}
                          className="group-hover:opacity-100 transition-opacity"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Col 4: Contact ── */}
              <div
                className={revealClass()}
                style={{ ...colStyle, ...revealStyle('0.3s') }}
              >
                <h4 className="font-orbitron" style={headingStyle}>
                  <span style={{ color: '#f97316' }}>&gt;</span> Contact
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <MapPin style={{ width: '0.95rem', height: '0.95rem', color: '#f97316', marginTop: '0.15rem', flexShrink: 0 }} />
                    <span style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: '1.6' }}>
                      Manipal University Jaipur,<br />
                      Dehmi Kalan, Jaipur-Ajmer Expressway,<br />
                      Rajasthan 303007
                    </span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Mail style={{ width: '0.95rem', height: '0.95rem', color: '#f97316', flexShrink: 0 }} />
                    <a
                      href="mailto:contact@ieeecsmuj.com"
                      className="hover:text-orange-500 transition-colors"
                      style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem', wordBreak: 'break-all' }}
                    >
                      contact@ieeecsmuj.com
                    </a>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Phone style={{ width: '0.95rem', height: '0.95rem', color: '#f97316', flexShrink: 0 }} />
                    <a
                      href="tel:+919871340076"
                      className="hover:text-orange-500 transition-colors"
                      style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem' }}
                    >
                      +91 98713 40076
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* ── Terminal bottom bar ── */}
            <div
              className={revealClass()}
              style={revealStyle('0.4s')}
            >
              <div className={styles.bottomBar}>
                <div className={styles.terminal}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.20rem', color: '#9ca3af' }}>
                    <span style={{ color: '#f97316', fontWeight: 'bold', fontSize: '1rem' }}>$</span>
                    <span>© 2024 IEEE CS MUJ. All systems operational.</span>
                    <span className="animate-pulse" style={{ color: '#f97316' }}>_</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.20rem', color: '#6b7280' }}>
                    <span>Made with</span>
                    <Heart style={{ width: '0.9rem', height: '0.9rem', color: '#ef4444', fill: '#ef4444' }} />
                    <span>by IEEE CS MUJ Team</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Background watermark */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              opacity: 0.04,
              zIndex: 0,
              overflow: 'hidden',
              width: '100%',
              textAlign: 'center',
              userSelect: 'none',
            }}
          >
            <span
              className="font-orbitron"
              style={{ fontSize: '22vw', fontWeight: 'bold', color: '#9ca3af', whiteSpace: 'nowrap' }}
            >
              IEEE CS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}