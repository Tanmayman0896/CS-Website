"use client";
import React from 'react';
import { FaLinkedin, FaInstagram, FaGithub, FaTwitter } from 'react-icons/fa';

export interface TeamCardProps {
  image: string;
  name: string;
  role: string;
  socials?: {
    linkedin?: string;
    instagram?: string;
    github?: string;
    twitter?: string;
  };
  className?: string;
}

const TeamCard: React.FC<TeamCardProps> = ({
  image,
  name,
  role,
  socials = {},
  className = ""
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl cursor-pointer ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* Image */}
      <img
        src={image}
        alt={name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: hovered ? 'grayscale(0)' : 'grayscale(1)',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'filter 0.5s ease, transform 0.5s ease',
          display: 'block',
        }}
      />

      {/* Dark gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }} />

      {/* Info box */}
      <div style={{
        position: 'absolute',
        left: '50%',
        bottom: '12px',
        transform: hovered ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(16px)',
        opacity: hovered ? 1 : 0,
        transition: 'all 0.3s ease-out',
        width: '90%',
      }}>
        <div
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-between"
          style={{ padding: '8px 12px' }}
        >
          {/* Name + Role */}
          <div className="min-w-0 pr-2">
            <h3 className="text-sm font-semibold text-gray-900 truncate leading-tight">
              {name}
            </h3>
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {role}
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#57ede0] hover:scale-110 transition-all duration-200"
              >
                <FaLinkedin className="text-gray-800 text-xs" />
              </a>
            )}
            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#57ede0] hover:scale-110 transition-all duration-200"
              >
                <FaInstagram className="text-gray-800 text-xs" />
              </a>
            )}
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#57ede0] hover:scale-110 transition-all duration-200"
              >
                <FaGithub className="text-gray-800 text-xs" />
              </a>
            )}
            {socials.twitter && (
              <a
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#57ede0] hover:scale-110 transition-all duration-200"
              >
                <FaTwitter className="text-gray-800 text-xs" />
              </a>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default TeamCard;
