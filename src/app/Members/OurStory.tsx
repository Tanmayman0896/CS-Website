'use client'
import TeamCard from '@/src/components/common/TeamCard'
import React from 'react'

// Paper texture as inline SVG data URI
const PAPER_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='500' height='500' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`

const teamMembers = [
  {
    image: 'https://ui-avatars.com/api/?name=Arya+Sharma&background=1a1a2e&color=57ede0&size=400&bold=true',
    name: 'Arya Sharma',
    role: 'President',
    socials: { linkedin: '#', instagram: '#', github: '#' },
  },
  {
    image: 'https://ui-avatars.com/api/?name=Rohan+Verma&background=1a1a2e&color=57ede0&size=400&bold=true',
    name: 'Rohan Verma',
    role: 'Vice President',
    socials: { linkedin: '#', instagram: '#', github: '#' },
  },
  {
    image: 'https://ui-avatars.com/api/?name=Priya+Nair&background=1a1a2e&color=57ede0&size=400&bold=true',
    name: 'Priya Nair',
    role: 'Secretary',
    socials: { linkedin: '#', instagram: '#' },
  },
  {
    image: 'https://ui-avatars.com/api/?name=Kabir+Singh&background=1a1a2e&color=57ede0&size=400&bold=true',
    name: 'Kabir Singh',
    role: 'Treasurer',
    socials: { linkedin: '#', instagram: '#' },
  },
  {
    image: 'https://ui-avatars.com/api/?name=Meera+Joshi&background=1a1a2e&color=57ede0&size=400&bold=true',
    name: 'Meera Joshi',
    role: 'Tech Lead',
    socials: { linkedin: '#', instagram: '#' },
  },
  {
    image: 'https://ui-avatars.com/api/?name=Aditya+Rao&background=1a1a2e&color=57ede0&size=400&bold=true',
    name: 'Aditya Rao',
    role: 'Design Lead',
    socials: { linkedin: '#', instagram: '#', github: '#' },
  },
  {
    image: 'https://ui-avatars.com/api/?name=Sneha+Patel&background=1a1a2e&color=57ede0&size=400&bold=true',
    name: 'Sneha Patel',
    role: 'Events Head',
    socials: { linkedin: '#', instagram: '#' },
  },
]


export default function OurStory() {
  return (
    <div
      className="relative w-screen min-h-screen overflow-y-auto text-white"
      style={{ background: 'black' }}
    >
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: PAPER_BG,
          backgroundRepeat: 'repeat',
          backgroundSize: '300px 300px',
        }}
      />

      {/* ── DESKTOP layout ── */}
      <div className="hidden lg:flex relative z-10 flex-col items-center text-center px-[6vw] pt-[10vh] pb-[6vh]">
        <h1
          style={{
            fontSize: 'clamp(6vh, 10vh, 12vh)',
            lineHeight: '1.0',
            color: '#ffffff',
            letterSpacing: '0.05em',
          }}
        >
          <br />
          <br />
          Executive Committee
          <br />
          <br />
          <br />
        </h1>

        {/* Team Cards — just 2 side by side */}
        <div className="mt-8 flex gap-4 justify-center">
          {teamMembers.slice(0, 2).map((member) => (
            <TeamCard
              key={member.name}
              image={member.image}
              name={member.name}
              role={member.role}
              socials={member.socials}
              className="h-[220px] w-[200px]"
            />
          ))}
        </div>
      </div>

      {/* ── MOBILE layout ── */}
      <div className="flex lg:hidden relative z-10 flex-col items-center text-center px-6 pt-16 pb-12 gap-6">
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            lineHeight: '1.1',
            color: '#ffffff',
            letterSpacing: '0.05em',
          }}
        >
          Executive Committee
        </h1>

        <div className="w-full flex flex-col gap-6">
          {teamMembers.map((member) => (
            <TeamCard
              key={member.name}
              image={member.image}
              name={member.name}
              role={member.role}
              socials={member.socials}
              className="h-[280px]"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

