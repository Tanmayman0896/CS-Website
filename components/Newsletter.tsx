"use client";

import React from "react";
import styled from "styled-components";

const Card = () => {
  return (
    <StyledWrapper>
      <div className="container">

        <div
          data-text="Github"
          style={{ ["--r" as any]: -15 }}
          className="glass"
        >
          <svg viewBox="0 0 496 512" height="1em">
            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6z" />
          </svg>
        </div>

        <div
          data-text="Code"
          style={{ ["--r" as any]: 5 }}
          className="glass"
        >
          <svg viewBox="0 0 640 512" height="1em">
            <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6" />
          </svg>
        </div>

        <div
          data-text="Earn"
          style={{ ["--r" as any]: 25 }}
          className="glass"
        >
          <svg viewBox="0 0 576 512" height="1em">
            <path d="M64 64C28.7 64 0 92.7 0 128V384" />
          </svg>
        </div>

      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container .glass {
    position: relative;
    width: 180px;
    height: 200px;
    background: linear-gradient(#fff2, transparent);
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 25px 25px rgba(0,0,0,0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
    border-radius: 10px;
    margin: 0 -45px;
    backdrop-filter: blur(10px);
    transform: rotate(calc(var(--r) * 1deg));
  }

  .container:hover .glass {
    transform: rotate(0deg);
    margin: 0 10px;
  }

  .container .glass::before {
    content: attr(data-text);
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    background: rgba(255,255,255,0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }

  .container .glass svg {
    font-size: 2.5em;
    fill: white;
  }
`;

export default Card;