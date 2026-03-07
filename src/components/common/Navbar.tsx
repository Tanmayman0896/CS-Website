"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DecryptedText from "@/components/DecryptedText";
import TopographicBackground from "@/components/LandoBackground";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import style from "./Navbar.module.css";

function NorrisText({ text, cascadeIndex }: { text: string; cascadeIndex: number }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger the scrolling animation
    const timerIn = setTimeout(() => setAnimate(true), 150);
    // Let the animation fade/revert after 1.5 seconds as requested
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
          style={{
            "--char-index": index,
            "--line-index": cascadeIndex,
          } as React.CSSProperties}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "about" },
    { name: "Team", href: "/team" },
    { name: "Events", href: "/events" },
    { name: "Blogs", href: "https://medium.com/@ieeecs" },
    { name: "Gallery", href: "/gallery" },


  ];

  return (
    <>
      <nav className={`${style.navbar} ${scrolled ? style.fixed : ""}`}>
        <div className={style["nav-container"]}>
          <div className={style.logo}>
            ieee
            <br />
            computer society<span> muj</span>
          </div>

          <div
            className={`${style.hamburger} ${menuOpen ? style.open : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <ul className={style["nav-menu"]}>
            {navItems.map((item) => (
              <li
                key={item.href}
                className={pathname === item.href ? style.active : ""}
              >
                <Link href={item.href}>
                  <DecryptedText
                    text={item.name}
                    speed={70}
                    maxIterations={9}
                    className={style["nav-text"]}
                    encryptedClassName={style["nav-encrypted"]}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={style["mobile-overlay"]}
          >
            {/* Topographic Background */}
            <div className={style["mobile-bg"]}>
              <TopographicBackground
                lineColor="rgba(180, 140, 60, 0.4)"
                backgroundColor="#050505"
                lineCount={12}
                animated={true}
              />
            </div>

            {/* Close Button */}
            <button
              className={style["close-btn"]}
              onClick={() => setMenuOpen(false)}
            >
              <X size={24} color="#000" strokeWidth={3} />
            </button>

            {/* Links */}
            <div className={style["mobile-links"]}>
              {navItems.map((item, i) => {
                return (
                <div
                  key={item.href}
                  className={style["mobile-link-wrapper"]}
                >
                  <Link
                    href={item.href}
                    className={`${style["mobile-link"]} ${
                      pathname === item.href ? style["mobile-active"] : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <NorrisText text={item.name.toUpperCase()} cascadeIndex={i} />
                  </Link>
                </div>
              )})}
            </div>

            {/* Bottom Footer Text */}
            <div className={style["mobile-footer"]}>
              IEEE CS MUJ
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}