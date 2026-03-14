"use client";

import React from "react";
import styled from "styled-components";

interface NewsletterEdition {
  title: string;
  image: string;
  link: string;
  rotation: number;
}

const Card = () => {
  const editions: NewsletterEdition[] = [
    {
      title: "December Edition",
      image: "https://images.unsplash.com/photo-1611376023193-87eae2b0ba79?w=400&h=500&fit=crop",
      link: "https://example.com/december",
      rotation: -15,
    },
    {
      title: "January Edition",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=500&fit=crop",
      link: "https://example.com/january",
      rotation: 5,
    },
    {
      title: "February Edition",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=500&fit=crop",
      link: "https://example.com/february",
      rotation: 25,
    },
  ];

  return (
    <StyledWrapper>
      <div className="container">
        {editions.map((edition, index) => (
          <a
            key={index}
            href={edition.link}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-link"
          >
            <div
              data-text={edition.title}
              style={{ ["--r" as any]: edition.rotation }}
              className="glass"
            >
              <img
                src={edition.image}
                alt={edition.title}
                className="glass-image"
              />
            </div>
          </a>
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  .container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .glass-link {
    text-decoration: none;
    cursor: pointer;
  }

  .container .glass {
    position: relative;
    width: 280px;
    height: 400px;
    background: linear-gradient(#fff2, transparent);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 25px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
    border-radius: 10px;
    margin: 0 -80px;
    backdrop-filter: blur(10px);
    transform: rotate(calc(var(--r) * 1deg));
    overflow: hidden;
  }

  .container:hover .glass {
    transform: rotate(0deg);
    margin: 0 14px;
  }

  .glass-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .container .glass::before {
    content: attr(data-text);
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 52px;
    background: rgba(255, 255, 255, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 14px;
    letter-spacing: 0.05em;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    z-index: 10;
    backdrop-filter: blur(5px);
  }
`;

export default Card;