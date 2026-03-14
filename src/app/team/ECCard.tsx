"use client";
import React, { useState } from 'react';
import { TeamMember } from '@/src/data/teamData';

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

export default function ECCard({ member }: { member: TeamMember }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ position:'relative', width:'100%', maxWidth:'220px', height:'auto', aspectRatio:'220 / 290', overflow:'hidden', flexShrink:0, boxShadow: hovered ? '0 24px 48px rgba(0,0,0,0.7)' : '0 8px 24px rgba(0,0,0,0.5)', cursor:'pointer', transition:'box-shadow 0.4s ease' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={member.image} alt={member.name}
        style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', filter: hovered ? 'grayscale(0)' : 'grayscale(1)', transition:'filter 0.5s ease, transform 0.5s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        loading="lazy"
      />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)' }} />
      {/* Social icons */}
      <div style={{ position:'absolute', top:'12px', right:'12px', display:'flex', flexDirection:'column', gap:'8px', opacity: hovered ? 1 : 0, transform: hovered ? 'translateX(0)' : 'translateX(12px)', transition:'opacity 0.3s ease, transform 0.3s ease' }}>
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ width:'34px', height:'34px', borderRadius:'50%', background:'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', border:'1px solid rgba(255,255,255,0.2)', textDecoration:'none' }}>
            <LinkedInIcon />
          </a>
        )}
        {member.instagram && (
          <a href={member.instagram} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ width:'34px', height:'34px', borderRadius:'50%', background:'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', border:'1px solid rgba(255,255,255,0.2)', textDecoration:'none' }}>
            <InstagramIcon />
          </a>
        )}
        {member.github && (
          <a href={member.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ width:'34px', height:'34px', borderRadius:'50%', background:'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', border:'1px solid rgba(255,255,255,0.2)', textDecoration:'none' }}>
            <GithubIcon />
          </a>
        )}
      </div>
      <div style={{ position:'absolute', bottom:'16px', left:'16px', right:'16px' }}>
        <p style={{ margin:0, fontWeight:700, fontSize:'1rem', color:'#fff', lineHeight:1.2 }}>{member.name}</p>
        <p style={{ margin:'4px 0 0', fontWeight:400, fontSize:'0.78rem', color:'rgba(255,255,255,0.6)' }}>{member.role}</p>
      </div>
    </div>
  )
}
