"use client";


import { useEffect, useRef, useState } from "react";
import {
  Linkedin,
  Instagram,
  Github,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Heart,
  LucideIcon,
} from "lucide-react";

type LinkItem = {
  name: string;
  href: string;
};

type SocialItem = {
  name: string;
  href: string;
  icon: LucideIcon;
};

const quickLinks: LinkItem[] = [
  { name: "About Us", href: "#about" },
  { name: "Events", href: "#events" },
  { name: "Our Team", href: "#team" },
  { name: "FAQ", href: "#faq" },
];

const resources: LinkItem[] = [
  { name: "IEEE Global", href: "https://www.ieee.org" },
  { name: "Computer Society", href: "https://www.computer.org" },
  { name: "IEEE MUJ", href: "https://ieeemuj.com" },
  { name: "MUJ Official", href: "https://jaipur.manipal.edu" },
];

const socials: SocialItem[] = [
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/ieee-cs-muj" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/ieee_csmuj" },
  { name: "GitHub", icon: Github, href: "https://github.com/IEEECSMUJ" },
  { name: "WhatsApp", icon: MessageCircle, href: "#" },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");

  const fullText = "© 2024 IEEE CS MUJ. All systems operational.";

  /* ================= Intersection Observer ================= */

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  /* ================= Typing Effect ================= */

  useEffect(() => {
    if (!isVisible) return;

    let index = 0;

    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;

      if (index > fullText.length) clearInterval(timer);
    }, 50);

    return () => clearInterval(timer);
  }, [isVisible]);

  /* ================= Smooth Scroll ================= */

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) return;

    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  /* ================= Render ================= */

  return (
    <footer
      id="join"
      ref={sectionRef}
      className="relative pt-24 pb-8 overflow-hidden"
    >
      {/* top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* BRAND */}
          <div className={`reveal ${isVisible ? "active" : ""}`}>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/ieee-cs-logo.png"
                alt="IEEE CS"
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="font-orbitron font-bold text-lg">IEEE CS</h3>
                <p className="font-mono text-xs text-gray-500">MUJ Chapter</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-6">
              Advancing technology for humanity through innovation,
              education, and collaboration.
            </p>

            <div className="flex gap-3">
              {socials.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="p-2 border border-orange-500/30 rounded hover:bg-orange-500 hover:text-black transition"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <FooterColumn
            title="Quick Links"
            links={quickLinks}
            onClick={handleLinkClick}
          />

          {/* RESOURCES */}
          <FooterColumn title="Resources" links={resources} external />

          {/* CONTACT */}
          <ContactColumn />

        </div>

        {/* TERMINAL BAR */}
        <div className="border-t border-orange-500/20 pt-8">
          <div className="glass rounded-lg p-4 font-mono text-sm flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-orange-500">$</span>
              <span>{typedText}</span>
              <span className="animate-pulse text-orange-500">_</span>
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-xs">
              Made with <Heart className="w-3 h-3 fill-red-500 text-red-500" /> by IEEE CS MUJ Team
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ================= Sub Components ================= */

function FooterColumn({
  title,
  links,
  onClick,
  external,
}: {
  title: string;
  links: LinkItem[];
  onClick?: any;
  external?: boolean;
}) {
  return (
    <div>
      <h4 className="font-orbitron font-bold text-white mb-6">
        &gt; {title}
      </h4>

      <ul className="space-y-3">
        {links.map(({ name, href }) => (
          <li key={name}>
            <a
              href={href}
              onClick={(e) => onClick?.(e, href)}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="text-gray-400 hover:text-orange-500 text-sm flex items-center gap-2"
            >
              <span className="w-1 h-1 bg-orange-500/50 rounded-full" />
              {name}
              {external && <ExternalLink className="w-3 h-3" />}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactColumn() {
  return (
    <div>
      <h4 className="font-orbitron font-bold text-white mb-6">
        &gt; Contact
      </h4>

      <ul className="space-y-4 text-sm text-gray-400">
        <li className="flex gap-3">
          <MapPin className="w-4 h-4 text-orange-500 mt-1" />
          Manipal University Jaipur, Rajasthan
        </li>

        <li className="flex gap-3">
          <Mail className="w-4 h-4 text-orange-500" />
          contact@ieeecsmuj.com
        </li>

        <li className="flex gap-3">
          <Phone className="w-4 h-4 text-orange-500" />
          +91 98713 40076
        </li>
      </ul>
    </div>
  );
}
