"use client";
import React from 'react';
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';

export interface TeamCardProps {
  image: string;
  name: string;
  role: string;
  socials?: {
    linkedin?: string;
    instagram?: string;
    github?: string;
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
  return (
    <div className={`group relative overflow-hidden rounded-2xl cursor-pointer ${className}`}>

      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark gradient overlay — always present, intensifies on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Info box — fades + slides up on hover */}
      <div
        className="
          absolute left-1/2 bottom-3
          -translate-x-1/2
          translate-y-4 opacity-0
          group-hover:translate-y-0 group-hover:opacity-100
          transition-all duration-300 ease-out
          w-[90%]
        "
      >
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
          </div>
        </div>
      </div>

    </div>
  );
};

export default TeamCard;
