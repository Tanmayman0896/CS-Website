"use client";

import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
const TeamCard = dynamic(() => import('@/src/app/team/TeamCard'), { ssr: false });
import DecryptedText from "@/components/DecryptedText";

import { useSpring } from "framer-motion";



const ScrollControlled = ({
  children,
  className,
  direction = "left",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right";
}) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x =
    direction === "left"
      ? useTransform(scrollYProgress, [0.7, 1], [-300, 0])
      : useTransform(scrollYProgress, [0.7, 1], [300, 0]);
  const smoothX = useSpring(x, {
    stiffness: 90,
    damping: 25,
  });
  return (
    <motion.div ref={ref} className={className} style={{ x }}>
      {children}
    </motion.div>
  );
};

const Skiper19 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  return (
    <section
      ref={ref}
      className="mx-auto flex h-[350vh] w-screen flex-col items-center overflow-hidden px-4 text-white"
    >
      <div className="mt-42 relative flex w-fit flex-col items-center justify-center gap-5 text-center">
        <LinePath
          className="absolute  top-75 z-0 -translate-x-37.5"
          scrollYProgress={scrollYProgress}
        />
      </div>

      <ScrollControlled direction="left" className="rounded-4xl font-jakarta-sans w-[50vw] -translate-x-[15vw] translate-y-[100vh] ">
        <img src="/logos/ieee-cs-logo.png" alt="IEEE Logo" />
      </ScrollControlled>

      <ScrollControlled direction="right" className="rounded-4xl font-jakarta-sans w-[50vw] translate-x-[15vw] translate-y-[118vh] ">
        <DecryptedText
          text="IEEE Computer Society"
          speed={100}
          maxIterations={15}
          className="text-[#efbf43] font-bold text-[40px] "
          encryptedClassName="text-[#efbf43] font-bold text-[40px] "
          animateOn='both'
        />
        <p>
          “Serving computing at its best with inclusion and diversity” is the prime motto of the IEEE Computer Society. This society was created keeping in mind IEEE’s continued commitment to providing options at best. The IEEE Computer Society is driven by the central goals of equity, diversity, inclusion, and yearn to serve computing at its perfection.
          <br /><br />
          With an intent to expand the IEEE’s reach and learnings, this society was started a year back in early 2020. Since then, society has tried every possible course of action by conducting diverse events such as webinars, competitions, workshops, and mentorship programs to set a goal for the young achievers. The members of IEEE CS have been skilled and earned minimal expertise in roughly all possible sub-sections of CS via our accelerator program. The senior student mentors steer them on each stage they take and deliver them with the professional material for further reference.
          <br /><br />
          We aim to proactively support diversity and inclusion by being the premier source for information, inspiration, and collaboration in computer science and engineering. Connecting members on campus, this IEEE Computer Society empowers the students who wish to advance in technology by delivering tools at all stages of their professional careers.
          <br /><br />
          “Computer science is the operating system for all innovations.” At IEEE CS, we look at it similarly, trying to make a better world by working as a team.
        </p>
      </ScrollControlled>

      <ScrollControlled direction="left" className="rounded-4xl font-jakarta-sans w-[40vw] -translate-x-[5vw] translate-y-[140vh] ">
        <DecryptedText
          text="Words by the Chairperson"
          speed={100}
          maxIterations={15}
          className="text-[#efbf43] font-bold text-[40px] "
          encryptedClassName="text-[#efbf43] font-bold text-[40px] "
          animateOn='both'
        />
        <p>
          <br />
          “Serving computing at its best with inclusion and diversity” is the prime motto of the IEEE Computer Society. This society was created keeping in mind IEEE’s continued commitment to providing options at best. The IEEE Computer Society is driven by the central goals of equity, diversity, inclusion, and yearn to serve computing at its perfection.
          <br /><br />
          With an intent to expand the IEEE’s reach and learnings, this society was started a year back in early 2020. Since then, society has tried every possible course of action by conducting diverse events such as webinars, competitions, workshops, and mentorship programs to set a goal for the young achievers. The members of IEEE CS have been skilled and earned minimal expertise in roughly all possible sub-sections of CS via our accelerator program. The senior student mentors steer them on each stage they take and deliver them with the professional material for further reference.
          <br /><br />
          We aim to proactively support diversity and inclusion by being the premier source for information, inspiration, and collaboration in computer science and engineering. Connecting members on campus, this IEEE Computer Society empowers the students who wish to advance in technology by delivering tools at all stages of their professional careers.
          <br /><br />
          “Computer science is the operating system for all innovations.” At IEEE CS, we look at it similarly, trying to make a better world by working as a team.
          <br /><br />
          - Charirperson, IEEE CS MUJ
        </p>
      </ScrollControlled>
      <ScrollControlled direction="left" className="rounded-4xl font-jakarta-sans w-[40vw] -translate-x-[25vw] translate-y-[85vh] ">
        <TeamCard
          key="0"
          image="https://images.pexels.com/photos/34408249/pexels-photo-34408249.jpeg"
          name="Name"
          role="Chairperson, IEEE CS MUJ"
          className="w-[320px] h-[450px] absolute"
        />
      </ScrollControlled>

    </section>
  );
};

export { Skiper19 };

const LinePath = ({
  className,
  scrollYProgress,
}: {
  className: string;
  scrollYProgress: any;
}) => {
  const pathLength = useTransform(scrollYProgress, [0, 1], [0.37, 1]);

  return (
    <svg
      width="1278"
      height="2319"
      viewBox="0 0 1278 2319"
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        d="M537.5 150.744C540.5 144 539.5 146.5 543 138.5C567.167 69 617.4 -61.5565 637 -54.7565C661.5 -46.2565 589 59.7436 599.5 150.744C602.5 122.41 588.1 65.5435 506.5 64.7435C495 63.9102 472.2 66.1435 473 81.7435C473.8 97.3435 501 99.9103 514.5 99.2436C551.833 96.2436 633.7 85.1435 662.5 64.7435C698.5 39.2435 723 3.7435 712 -4.2565C701 -12.2565 662 34.2436 656.5 89.7436C661 80.0769 672.6 61.5435 683 64.7435C699 67.7435 683 125.744 664.5 120.244C658 115.91 658.2 99.5435 711 68.7435C715.333 66.4102 724.2 61.1435 725 58.7435C718.667 68.2435 707.9 87.7436 715.5 89.7436C725 92.2436 741 62.2435 734.5 52.2435C727 43.7435 710.5 62.7435 712 66.2435C710.667 72.5768 718.5 81.9435 760.5 68.7435C761.167 66.2435 764.1 59.4435 770.5 52.2435C763 63.5768 751 87.6436 763 93.2436C768.167 96.0769 782.7 91.8435 799.5 52.2435C794.5 64.0768 787.5 87.8436 799.5 88.2435C811.5 88.6435 820.167 72.7435 823 64.7435C831.667 35.9102 852.5 -23.5565 866.5 -30.7565C863.167 -28.5899 855 -20.0565 849 -3.25648C837.167 -2.25648 811 1.2435 801 7.2435C801.5 7.74349 899.5 -18.2565 958.5 1.74348C949.167 -2.75651 914.5 -10.0565 850.5 -3.25648C832 36.4102 801.5 116.644 827.5 120.244C842.3 122.244 865 84.0768 874.5 64.7435C878.167 39.0768 887.7 -16.7566 896.5 -34.7565C880.5 28.0768 855.4 153.544 883 152.744C915.5 141.244 999.5 -50.7565 986 -51.7565C968.5 -53.0528 922.5 115.244 958.5 134.244C969.5 140.049 992.025 99.9435 1006 74.7435C1003.17 80.5769 999.2 96.4436 1006 113.244C1014.5 134.244 984 155.244 974 134.244C980.667 144.077 1001.2 153.644 1030 113.244C1037.34 105.077 1064.13 88.4435 1112.52 87.2435C1126 86.9091 1129 74.7435 1106.9 74.9531L1057.79 75.2328C1055.54 74.2074 1052.4 71.3735 1057.79 68.2414C1062.65 68.6143 1071.99 67.1228 1070.42 58.1738C1056.94 57.3349 1030 50.1198 1030 27.971C1030 0.285154 1057.79 -5.86733 1067.05 -5.86733V2.24284C1061.06 3.73434 1049.53 10.6325 1051.33 26.2932C1053.58 45.8691 1063.12 50.9029 1082.2 50.3436C1101.29 49.7843 1113.36 47.8267 1112.52 26.2932C1111.68 4.75971 1100.73 2.24284 1093.71 2.24284V45.5894C1090.16 46.8945 1080.52 48.7216 1070.42 45.5894V-9.22334C1070.51 -12.3928 1067.95 -18.2281 1056.94 -16.2146C1054.98 -17.0536 1052.23 -19.6263 1056.94 -23.2059C1060.97 -23.1127 1073.28 -24.4923 1090.34 -30.7565C1091.47 -30.8498 1093.71 -30.3651 1093.71 -27.6804C1093.71 -24.9957 1093.53 -12.3927 1093.43 -6.42672C1109.99 -5.02844 1118.69 0.285015 1118.69 0.285015C1124.4 2.61548 1135.42 11.0799 1133.85 26.2932C1134.13 36.0811 1126.49 56.0486 1093.71 57.6146C1091.93 61.623 1092.14 69.416 1107.18 68.5211L1115.5 67.827C1141.62 67.6325 1183 78.7435 1183 113.244C1155.41 153.975 1107 93.2436 1063.5 145.244C1010.5 199.243 1070.38 245.921 1127 284.744C1149 299.828 1196.06 310.744 1223.18 262.881C1278.5 165.244 1148.76 133.339 1077.79 175.371C1018.61 210.418 1003.8 282.001 1001.3 360.009C995.087 553.767 1170 700.244 918.5 887.244C814.5 940.243 808.1 937.058 620.5 919.362C460.921 891.473 291.754 853.316 182.036 1000.54C40.8171 1190.03 -5.9837 1453.73 179.435 1558.85C294.486 1624.08 441.212 1621.56 590.5 1603.24C606.5 1601.28 622.2 1584.44 631 1553.24C622.833 1574.08 610.8 1614.04 638 1587.24C640.833 1584.24 647.3 1578.24 650.5 1578.24C659 1580.24 674.5 1563.74 669 1558.24C661.5 1554.24 636.5 1578.74 652.5 1596.74C659.5 1602.74 669.5 1592.24 674.5 1584.74C675.5 1583.74 682.793 1579.18 687.5 1578.24C692.5 1577.24 710 1565.74 702.5 1558.24C692 1551.24 683.536 1574.74 682 1581.24C679.833 1590.41 681.3 1606.74 696.5 1594.74C702.5 1590.01 712 1579.24 717.5 1579.24C730 1577.24 743.8 1566.44 737 1559.24C729.5 1554.74 719.167 1572.91 717.5 1581.24C715.833 1589.58 716.4 1605.24 732 1593.24C736.5 1590.41 745.5 1579.24 753.5 1567.74C760.5 1553.74 776 1538.74 781 1556.74C782 1564.24 777.5 1569.24 773.5 1573.24C777.333 1569.41 782.5 1564.74 780 1555.74C774.644 1536.46 753.5 1560.74 751.5 1576.24C749.5 1591.74 749.5 1611.24 768.5 1598.74C771.167 1597.24 780.3 1590.54 795.5 1575.74L797 1574.24C797 1567.24 796 1553.24 815.5 1542.24C825.9 1538.24 829.667 1546.41 829.5 1550.74C828.5 1562.74 824.833 1564.41 823.5 1565.24C823.5 1565.24 828.5 1564.04 828.5 1551.24C828.667 1546.91 826.5 1538.64 816.5 1542.24C804 1546.74 795 1563.74 798 1573.24C801 1582.74 821 1579.74 826 1597.24C826 1619.24 807 1649.24 787.5 1648.24C781.5 1647.94 777.7 1640.74 808.5 1610.74C818.667 1601.24 842.9 1580.14 858.5 1571.74C864 1567.73 886.7 1559.92 933.5 1560.74C1093.35 1556.88 1460.82 1610.69 1492 1806C1559.72 2583.06 385.5 2115.24 367.5 2551.74C359.129 2754.74 158.4 2912.34 -280 2776.74"
        stroke="orange"
        strokeWidth="8"
        style={{
          pathLength,
          strokeDashoffset: useTransform(pathLength, (value) => 2 - value),
        }}
      />
    </svg>
  );
};
