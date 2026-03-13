"use client";

import dynamic from "next/dynamic";
import FadishBlackBackground from "@/components/FadishBlackBackground";
import SmoothScrollProvider from "@/src/components/common/SmoothScrollProvider";
import ChairpersonSection from "@/src/components/about/ChairpersonSection";
import styles from "./about.module.css";

const LogoScrollWrapper = dynamic(
  () => import("@/src/components/common/LogoScrollWrapper"),
  { ssr: false }
);

export default function AboutPage() {
  return (
    <SmoothScrollProvider>
      <div className="fixed inset-0 -z-10">
        <FadishBlackBackground />
      </div>

      <div id="about-page-wrapper" className="relative w-full z-[1]">
        <div id="about-scroll-canvas" className={styles.scrollCanvas}>
          <div className={styles.stickyHero}>
            <h1
              className={`font-bold tracking-tighter leading-none uppercase text-white ${styles.heroTitle}`}
            >
              About Us
            </h1>
          </div>
        </div>
      </div>

      <section
        id="about-content-section"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          minHeight: "100vh",
        }}
        className={`relative ${styles.contentSection}`}
      >
        <div className="absolute inset-0 -z-10">
          <FadishBlackBackground />
        </div>

        <div className={styles.navContainer}>
          <div className="text-white ml-auto max-w-[55%]">
            <h2
              className={`font-semibold tracking-tight leading-snug uppercase mb-8 ${styles.whoWeAreTitle}`}
            >
              IEEE Computer Society
            </h2>

            <p className={`leading-relaxed mb-6 text-white/75 ${styles.bodyText}`}>
              “Serving computing at its best with inclusion and diversity” is the prime motto of the IEEE Computer Society. This society was created keeping in mind IEEE’s continued commitment to providing options at best. The IEEE Computer Society is driven by the central goals of equity, diversity, inclusion, and yearn to serve computing at its perfection.
            </p>

            <p className={`leading-relaxed mb-6 text-white/75 ${styles.bodyText}`}>
              With an intent to expand the IEEE’s reach and learnings, this society was started a year back in early 2020. Since then, society has tried every possible course of action by conducting diverse events such as webinars, competitions, workshops, and mentorship programs to set a goal for the young achievers. The members of IEEE CS have been skilled and earned minimal expertise in roughly all possible sub-sections of CS via our accelerator program. The senior student mentors steer them on each stage they take and deliver them with the professional material for further reference.
            </p>

            <p className={`leading-relaxed text-white/75 ${styles.bodyText}`}>
              We aim to proactively support diversity and inclusion by being the premier source for information, inspiration, and collaboration in computer science and engineering. Connecting members on campus, this IEEE Computer Society empowers the students who wish to advance in technology by delivering tools at all stages of their professional careers.
              “Computer science is the operating system for all innovations.” At IEEE CS, we look at it similarly, trying to make a better world by working as a team.
            </p>
          </div>
        </div>
      </section>
<br />
      <ChairpersonSection />

      <LogoScrollWrapper />
    </SmoothScrollProvider>
  );
}
