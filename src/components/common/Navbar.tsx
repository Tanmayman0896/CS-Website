"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TopographicBackground from "@/components/LineBackground";
import { AnimatePresence, motion } from "framer-motion";
import { X, Menu } from "lucide-react";
import style from "./Navbar.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

const NAV_IMAGES = [
  "/images/team/photo1.svg",
  "/images/team/pic2.svg",
  "/images/team/pic3.svg",
  "/images/team/pic4.svg",
];

const ScribbleIcon = () => (
  <svg
    viewBox="0 0 200 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={style.scribble}
  >
    <path
      d="M2 10C20 2 40 18 60 10C80 2 100 18 120 10C140 2 160 18 180 10C190 6 198 10 198 10"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function NorrisText({
  text,
  cascadeIndex,
}: {
  text: string;
  cascadeIndex: number;
}) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timerIn = setTimeout(() => setAnimate(true), 150);
    const timerOut = setTimeout(() => setAnimate(false), 1650);

    return () => {
      clearTimeout(timerIn);
      clearTimeout(timerOut);
    };
  }, []);

  return (
    <span className={`${style.norrisWrapper} ${animate ? style.animate : ""}`}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={style.norrisChar}
          data-char={char === " " ? "\u00A0" : char}
          style={
            {
              "--char-index": index,
              "--line-index": cascadeIndex,
            } as React.CSSProperties
          }
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function Navbar() {
  const [cursorActive, setCursorActive] = useState(false);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setMenuOpen(false);
    window.location.reload();
  }, [pathname]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Event", href: "/events" },
    { name: "Blog", href: "https://medium.com/@ieeecs" },
    { name: "Gallery", href: "/gallery" },
  ];

  return (
    <>
      

      <header
        className={`${style.header} ${scrolled ? style.scrolled : ""}`}
        onMouseEnter={() => setCursorActive(true)}
        onMouseLeave={() => setCursorActive(false)}
      >
        <div className={style.headerContainer}>
          <div className={style.logo} onClick={() => router.push("/")}>
            <Image
              src="/logos/ieee-cs-logo.png"
              alt="IEEE CS MUJ Logo"
              width={240}
              height={60}
              className={style.logoImage}
              priority
            />
          </div>

          <button
            className={style.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={style.overlay}
          >
            <div className={style.overlayBg}>
              <TopographicBackground
                lineColor="rgba(180, 140, 60, 0.15)"
                backgroundColor="#1a1d17"
                lineCount={15}
                animated={true}
              />
            </div>

            <div className={style.overlayContent}>
              <div className={style.gridSection}>
                <div className={style.photoGrid}>
                  {NAV_IMAGES.map((src, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.1, duration: 0.6 }}
                      className={style.photoContainer}
                    >
                      <Image
                        src={src}
                        alt={`Menu Visual ${idx + 1}`}
                        fill
                        className={style.photo}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className={style.linksSection}>
                <nav className={style.navLinks}>
                  {navItems.map((item, idx) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                      className={style.linkWrapper}
                    >
                      <Link
                        href={item.href}
                        className={`${style.navLink} ${pathname === item.href ? style.activeLink : ""
                          }`}
                        onClick={() => setMenuOpen(false)}
                      >
                        <NorrisText text={item.name} cascadeIndex={idx} />
                        {pathname === item.href && <ScribbleIcon />}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}