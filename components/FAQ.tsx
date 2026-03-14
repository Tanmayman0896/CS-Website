import { useState } from "react";

const faqs = [
  {
    question: "Who are we and what is our mission?",
    answer: "We are a vibrant community of tech enthusiasts united by a common goal – to foster a dynamic coding environment through an exciting array of tech and semi-tech events. Our mission is to inspire innovation, collaboration, and continuous learning!",
  },
  {
    question: "How can I join IEEE CS??",
    answer: "Membership in IEEE CS is open to everyone. We conduct a yearly membership drive, providing an opportunity for all interested individuals to join our community.",
  },
  {
    question: "Are there any prerequisites for joining the club?",
    answer: "Absolutely! All you need is a genuine passion for technology and a determination to learn and grow together. We thrive on encouraging individuals and fostering a community of like-minded enthusiasts.",
  },
  {
    question: "What benefits do members receive?",
    answer: "As a member, you'll experience personal and professional growth. Your soft skills will flourish, your personality will expand, and you'll explore new horizons through a diverse range of free events tailored for our members. Membership isn't just about learning to code; it's about building a well-rounded skill set that extends beyond the digital workspace.",
  },
  {
    question: "What tech-related workshops or events have we conducted for our members?",
    answer: "Our repertoire of tech-related workshops and events is extensive. To delve into the details, head over to our dedicated events section.",
  },
  {
    question: "Why us? ",
    answer: "We're the world's largest technical society, offering exclusive internship opportunities and abundant tech resources online. Hosting the majority of tech events, we provide diverse skill development and networking opportunities. As a member, enjoy free access to a range of events. You can indulge in coding challenges within active groups, benefit from IEEE seniors' success stories, and explore research paper publications. Our family culture encourages collaboration, supported by dedicated seniors, allowing you to build valuable industry connections. Join us for a dynamic and supportive tech community.",
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
        transition: "box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 28px",
      }}>
        <span style={{
          fontSize: 15,
          fontWeight: isOpen ? 600 : 500,
          color: isOpen ? "#0f0f0f" : "#6b6b6b",
          lineHeight: 1.4,
          transition: "color 0.2s ease",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {faq.question}
        </span>

        <div style={{
          marginLeft: 20,
          flexShrink: 0,
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: isOpen ? "#0f0f0f" : "#e4e4e1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), background 0.2s ease",
          willChange: "transform",
        }}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke={isOpen ? "#fff" : "#888"} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Answer — GPU-only transform, zero reflow */}
      <div style={{
        display: "grid",
        gridTemplateRows: isOpen ? "1fr" : "0fr",
        transition: "grid-template-rows 0.28s cubic-bezier(0.4,0,0.2,1)",
        willChange: "grid-template-rows",
      }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(-6px)",
            transition: "opacity 0.22s ease, transform 0.22s ease",
            willChange: "opacity, transform",
          }}>
            <p style={{
              margin: 0,
              padding: "0 28px 20px",
              fontSize: 14,
              color: "#71717a",
              lineHeight: 1.75,
              fontFamily: "'DM Sans', sans-serif",
            }}>
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
      `}</style>

      <section style={{
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "96px 80px",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{ width: "100%", maxWidth: 1100, display: "flex", gap: 96, alignItems: "flex-start" }}>

          {/* Left */}
          <div style={{ flexShrink: 0, width: 220, position: "sticky", top: 112 }}>

            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 84, fontWeight: 900,
              lineHeight: 0.9, letterSpacing: "-0.03em",
              color: "#ffffff", margin: 0,
            }}>
              FAQs
            </h2>
            <div style={{ marginTop: 32, width: 32, height: 3, borderRadius: 999, background: "#ffffff" }} />
            <p style={{ marginTop: 20, fontSize: 14, color: "#a1a1aa", lineHeight: 1.65 }}>
              Everything you need to know about IEEE Computer Society.
            </p>
          </div>

          {/* Right */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
            <p style={{ marginTop: 16, fontSize: 13, color: "#a1a1aa", paddingLeft: 4 }}>

            </p>
          </div>
        </div>
      </section>
    </>
  );
}