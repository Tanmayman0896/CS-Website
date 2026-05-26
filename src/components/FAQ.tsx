"use client";
import { useState } from "react";

const faqs = [
  {
    question: "Who are we and what is our mission?",
    answer:
      "We are a vibrant community of tech enthusiasts united by a common goal – to foster a dynamic coding environment through an exciting array of tech and semi-tech events. Our mission is to inspire innovation, collaboration, and continuous learning!",
  },
  {
    question: "How can I join IEEE CS?",
    answer:
      "Membership in IEEE CS is open to everyone. We conduct a yearly membership drive, providing an opportunity for all interested individuals to join our community.",
  },
  {
    question: "Are there any prerequisites for joining the club?",
    answer:
      "Absolutely! All you need is a genuine passion for technology and a determination to learn and grow together. We thrive on encouraging individuals and fostering a community of like-minded enthusiasts.",
  },
  {
    question: "What benefits do members receive?",
    answer:
      "As a member, you'll experience personal and professional growth. Your soft skills will flourish, your personality will expand, and you'll explore new horizons through a diverse range of free events tailored for our members. Membership isn't just about learning to code; it's about building a well-rounded skill set that extends beyond the digital workspace.",
  },
  {
    question: "What tech-related workshops or events have we conducted?",
    answer:
      "Our repertoire of tech-related workshops and events is extensive. To delve into the details, head over to our dedicated events section.",
  },
  {
    question: "Why us?",
    answer:
      "We're the world's largest technical society, offering exclusive internship opportunities and abundant tech resources online. Hosting the majority of tech events, we provide diverse skill development and networking opportunities. As a member, enjoy free access to a range of events. You can indulge in coding challenges within active groups, benefit from IEEE seniors' success stories, and explore research paper publications. Our family culture encourages collaboration, supported by dedicated seniors, allowing you to build valuable industry connections. Join us for a dynamic and supportive tech community.",
  },
];

function AccordionItem({
  faq,
  isOpen,
  onClick,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        borderRadius: 18,
        background: isOpen ? "#ffffff" : "#f5f5f3",
        border: isOpen ? "1px solid #e8e8e6" : "1px solid transparent",
        boxShadow: isOpen
          ? "0 4px 32px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)"
          : "none",
        transition:
          "box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 20px",
        }}
      >
        <span
          style={{
            fontSize: 15,
            fontWeight: isOpen ? 600 : 500,
            color: isOpen ? "#0f0f0f" : "#6b6b6b",
            lineHeight: 1.4,
            transition: "color 0.2s ease",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {faq.question}
        </span>

        <div
          style={{
            marginLeft: 16,
            flexShrink: 0,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: isOpen ? "#0f0f0f" : "#e4e4e1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition:
              "transform 0.3s cubic-bezier(0.4,0,0.2,1), background 0.2s ease",
            willChange: "transform",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 1v10M1 6h10"
              stroke={isOpen ? "#fff" : "#888"}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Answer */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.28s cubic-bezier(0.4,0,0.2,1)",
          willChange: "grid-template-rows",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(-6px)",
              transition: "opacity 0.22s ease, transform 0.22s ease",
              willChange: "opacity, transform",
            }}
          >
            <p
              style={{
                margin: 0,
                padding: "0 20px 18px",
                fontSize: 14,
                color: "#71717a",
                lineHeight: 1.75,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }

        .faq-section {
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 96px 80px;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }

        .faq-inner {
          width: 100%;
          max-width: 1100px;
          display: flex;
          gap: 96px;
          align-items: flex-start;
        }

        .faq-left {
          flex-shrink: 0;
          width: 220px;
          position: sticky;
          top: 112px;
        }

        .faq-heading {
          font-family: 'Playfair Display', serif;
          font-size: 84px;
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0;
        }

        .faq-divider {
          margin-top: 32px;
          width: 32px;
          height: 3px;
          border-radius: 999px;
          background: #ffffff;
        }

        .faq-subtitle {
          margin-top: 20px;
          font-size: 14px;
          color: #a1a1aa;
          line-height: 1.65;
        }

        .faq-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .faq-section {
            padding: 60px 20px;
            min-height: unset;
            align-items: flex-start;
          }

          .faq-inner {
            flex-direction: column;
            gap: 36px;
          }

          .faq-left {
            width: 100%;
            position: static;
          }

          .faq-heading {
            font-size: 56px;
            line-height: 1;
          }

          .faq-divider {
            margin-top: 20px;
          }

          .faq-subtitle {
            margin-top: 14px;
            font-size: 13px;
          }

          .faq-right {
            width: 100%;
            gap: 8px;
          }
        }

        @media (max-width: 480px) {
          .faq-section {
            padding: 48px 16px;
          }

          .faq-heading {
            font-size: 44px;
          }
        }
      `}</style>

      <section className="faq-section">
        <div className="faq-inner">
          {/* Left — heading */}
          <div className="faq-left">
            <h2 className="faq-heading">FAQs</h2>
            <div className="faq-divider" />
            <p className="faq-subtitle">
              Everything you need to know about IEEE Computer Society.
            </p>
          </div>

          {/* Right — accordion */}
          <div className="faq-right">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}