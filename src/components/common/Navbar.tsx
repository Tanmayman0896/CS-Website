"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    { name: "About", href: "/" },
    { name: "Team", href: "/what" },
    { name: "Events", href: "/idk" },

    { name: "Blog", href: "/de" },
    { name: "Contact", href: "/hbdewl" }

    { name: "Blog THAT", href: "/what" },
    { name: "Contact", href: "/about" }

  ];

  return (
    <nav className={`navbar ${scrolled ? "fixed" : ""}`}>
      <div className="nav-container">
        
        <div className="logo">
          ieee<br/>
          computer society<span> muj</span>
        </div>

       
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

       
        <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
          {navItems.map(item => (
            <li
              key={item.href}
              className={pathname === item.href ? "active" : ""}
            >
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}