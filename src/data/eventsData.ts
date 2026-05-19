export interface EventItem {
  id: number;
  title: string;
  description: string;
  image: string;
  completed: boolean;
  venue: string;
  date: string;
  registerUrl: string;
  tag: string;
}

export const eventsData: EventItem[] = [
// https://images.prismic.io/ieeemuj/abnnvbbci2UF6J9H_Venom.png?auto=format,compress

 {
  id: 28,
  title: "Genify",
  description: "Burnout is a fast paced MotoGP-themed datathon where every second counts,each dataset was a curve and only the sharpest minds make it to the finish line",
  image: "https://images.prismic.io/ieeemuj/abnoP7bci2UF6J9U_GENIFY.png?auto=format,compress",
  completed: true,
  venue: "Online",
  date: "June 14, 2025 | 10:00hr - 22:00hr",
  registerUrl: "",
  tag: "Workshop"
  },

  {
  id: 1,
  title: "Burnout",
  description: "Burnout is a fast paced MotoGP-themed datathon where every second counts,each dataset was a curve and only the sharpest minds make it to the finish line",
  image: "https://images.prismic.io/ieeemuj/aExUQ7NJEFaPX9Bv_burnout.jpg",
  completed: true,
  venue: "Online",
  date: "June 14, 2025 | 10:00hr - 22:00hr",
  registerUrl: "https://unstop.com/hackathons/burnout-motogp-datathon-manipal-university-mu-jaipur-1499433",
  tag: "Datathon"
  },
  {
  id: 2,
  title: "HackerzStreet 3.0",
  description: "Hackerzstreet 3.0 is a 24-hour high octane hackathon where caffeine meets code, chaos sparks creativity and only the sharpest minds survive",
  image: "https://images.prismic.io/ieeemuj/aEBmR7h8WN-LVmiy_HSPoster%5B1%5D.png",
  completed: true,
  venue: "AB1",
  date: "Unknown | Unknown",
  registerUrl: "",
  tag: "Hackathon"
  },
  {
  id: 3,
  title: "Mockup 4.0",
  description: "Mockup 4.0 was a 24-hour designathon where aspiring designers and startup enthusiasts transformed raw ideas into innovative digital experiences",
  image: "https://images.prismic.io/ieeemuj/aEBmILh8WN-LVmia_MOCKUP%5B1%5D.png",
  completed: true,
  venue: "Online",
  date: "Unknown | Unknown",
  registerUrl: "",
  tag: "Designathon"
  },
  {
  id: 4,
  title: "T-Minus",
  description: "T-Minus was a ticking warzone of tech, wit, nerve, and focus where teams raced against time to crack codes, dodge lasers,and conquer high-tech challenges.",
  image: "https://images.prismic.io/ieeemuj/aEBl9rh8WN-LVmh8_T-MINUS%5B1%5D.png",
  completed: true,
  venue: "AB1",
  date: "Unknown | Unknown",
  registerUrl: "",
  tag: "Competition"
  },
  {
  id: 5,
  title: "Snatch",
  description: "Snatch was a high intensity coding gauntlet where teams battled in a problem-solving crusade of wits and synergy",
  image: "https://images.prismic.io/ieeemuj/aEBlzbh8WN-LVmhm_CTFsnatch%5B1%5D.png",
  completed: true,
  venue: "AB1",
  date: "Unknown | Unknown",
  registerUrl: "",
  tag: "Coding"
  },
  {
  id: 6,
  title: "FTF 8.0",
  description: "MUJ alumnus Vaibhav Barodawala from Nvidia articulated valuable insights on mastering core CS fundamentals and strategic utilization of modern tech stacks.",
  image: "https://images.prismic.io/ieeemuj/aEBlO7h8WN-LVmfc_FTF-GREEN%5B1%5D.png",
  completed: true,
  venue: "Online",
  date: "Unknown | Unknown",
  registerUrl: "",
  tag: "Seminar"
  },
  {
  id: 7,
  title: "Git it Done",
  description: "A hands-on workshop and unlock the full power of GitHub- from mastering version control to nailing that GSoC 🎖",
  image: "https://images.prismic.io/ieeemuj/Z0iy5JbqstJ974Kh_GITITDONEPOSTER.png",
  completed: true,
  venue: "AB1",
  date: "Unknown | Unknown",
  registerUrl: "",
  tag: "Workshop"
  },
  {
  id: 8,
  title: "Breaking Bug",
  description: "An exciting challenge where even the tiniest bugs can be game changers, and hold up! Is that an secret trove of easter bugs? 🐞",
  image: "https://images.prismic.io/ieeemuj/ZqYJpR5LeNNTxizl_WhatsAppImage2024-07-27at19.22.16_b55b37b0.jpg",
  completed: true,
  venue: "Online",
  date: "Unknown | Unknown",
  registerUrl: "https://forms.gle/8ro7gESQssspxN2T8",
  tag: "Competition"
  },
  {
  id: 9,
  title: "F1nalyze",
  description: "Gear up for a high-speed, data-driven adventure at the ultimate 24 hour datathon, F1nalyze! 🏎",
  image: "https://images.prismic.io/ieeemuj/ZnVFFZm069VX18ao_WhatsAppImage2024-06-20at14.37.44_b7e57d81.jpg",
  completed: true,
  venue: "Online",
  date: "Unknown | Unknown",
  registerUrl: "https://forms.gle/XeLsi8wWwVxKL3Q48",
  tag: "Datathon"
  },
  {
  id: 10,
  title: "Weakest Link",
  description: "Answer trivia, strategize with your team, but beware: one wrong move could spell doom. 🪄",
  image: "https://images.prismic.io/ieeemuj/ZhabUDjCgu4jzuoM_weakest_link_poster.png",
  completed: true,
  venue: "AB1",
  date: "Unknown | Unknown",
  registerUrl: "",
  tag: "Quiz"
  },
  {
  id: 11,
  title: "HackerzStreet 2.0",
  description: "Gear up for an adrenaline-fueled 24-hour coding marathon at Hackerzstreet 2.0, the ultimate tech showdown.🔥",
  image: "https://images.prismic.io/ieeemuj/Zg0-j8t2UUcvBWwc_for-print-low-res.png",
  completed: true,
  venue: "AB1",
  date: "Unknown | Unknown",
  registerUrl: "",
  tag: "Hackathon"
  },
  {
  id: 12,
  title: "En-Code",
  description: "IEEE CS MUJ X Oneiros presents <en-Code>, a coding battle with a 10K prize pool! 🚀 Sharpen your algorithms and conquer for a chance to win big! 💸",
  image: "https://images.prismic.io/ieeemuj/049efa5c-d213-4904-9da9-2b476fad8dbe_ENCODE+final.png",
  completed: true,
  venue: "AB1",
  date: "Unknown | Unknown",
  registerUrl: "",
  tag: "Coding"
  },
  {
  id: 13,
  title: "Epiphany 2.0",
  description: "Unleash creativity! 💡🧠 Join on 10-11 Feb at 307, AB-1, 10 am. Exciting chance to win Rs. 10K.",
  image: "https://images.prismic.io/ieeemuj/31c144b8-a992-482d-aa53-26bbe9249d36_WhatsApp+Image+2024-02-06+at+18.29.19.jpeg",
  completed: true,
  venue: "AB1",
  date: "Feb 10-11 | 10:00hr",
  registerUrl: "",
  tag: "Ideathon"
  },
  {
  id: 14,
  title: "Epiphany",
  description: "24-hour ideathon at MUJ, presenting business models to judges like Ram Sharma and Aman Virmani.",
  image: "https://images.prismic.io/ieeemuj/9cd945b3-8d63-4cf2-a637-3aa74ac644c5_ephiphany.png",
  completed: true,
  venue: "AB1",
  date: "Unknown | Unknown",
  registerUrl: "",
  tag: "Ideathon"
  },
  {
  id: 15,
  title: "Battleship",
  description: "IEEE CS at MUJ presents Battleship: A coding game day fostering technical culture and problem-solving.",
  image: "https://images.prismic.io/ieeemuj/092ac40d-c57a-42a5-b263-c56bb574151f_battleship.jpeg",
  completed: true,
  venue: "AB1",
  date: "Unknown | Unknown",
  registerUrl: "",
  tag: "Coding"
  },
  {
  id: 16,
  title: "Vikrant",
  description: "IEEE CS MUJ's Vikrant seminar with Retd. Navy Captain Abhijit Dey discussing military tech.",
  image: "https://images.prismic.io/ieeemuj/13c980fe-2aaa-45b4-9b13-2777f6a8a2e8_vikrant.jpeg",
  completed: true,
  venue: "AB1",
  date: "Sep 10, 2022 | Unknown",
  registerUrl: "",
  tag: "Seminar"
  },
  {
  id: 17,
  title: "MockUp 2.0",
  description: "24-hr UI/UX event for MUJ and IEEE showcasing design talent and innovation.",
  image: "https://images.prismic.io/ieeemuj/5dee8c24-dbf6-4a22-9dc7-4981f8bf3e08_mockup2.0.jpeg",
  completed: true,
  venue: "AB1",
  date: "Unknown | Unknown",
  registerUrl: "",
  tag: "Designathon"
  },
  {
  id: 18,
  title: "Hackerzstreet 1.0",
  description: "IEEE CS MUJ's first Hackathon: A 24-hour online challenge fostering creativity and programming skills.",
  image: "https://images.prismic.io/ieeemuj/6301f722-c9a8-43f8-8eb3-2e6b97e7eabb_hackerzstreet.jpeg",
  completed: true,
  venue: "Online",
  date: "July 9-10, 2022 | 24 Hours",
  registerUrl: "",
  tag: "Hackathon"
  },
  {
  id: 19,
  title: "Foster the Future 6.0",
  description: "Fostering the Future alumni talk discussing Data Science and industry work culture.",
  image: "https://images.prismic.io/ieeemuj/c151e769-0dee-45c6-8663-58b017f44921_fof6.jpeg",
  completed: true,
  venue: "Online",
  date: "Unknown | Unknown",
  registerUrl: "",
  tag: "Seminar"
  },
  {
  id: 20,
  title: "Eth-Real",
  description: "IEEE CS event exploring Web3 technologies with speakers from Threeway.studio.",
  image: "https://images.prismic.io/ieeemuj/22838764-8e99-42bb-8528-5f9d5032b52d_ethreal.jpeg",
  completed: true,
  venue: "AB1",
  date: "Unknown | Unknown",
  registerUrl: "",
  tag: "Seminar"
  },
  {
  id: 21,
  title: "Fostering the Future 5.0",
  description: "Career insights from MUJ alum working at Goldman Sachs.",
  image: "https://images.prismic.io/ieeemuj/0a22c43f-1a57-47ea-a038-91f9f3eac445_fof5.jpeg",
  completed: true,
  venue: "AB1",
  date: "Unknown | Unknown",
  registerUrl: "",
  tag: "Seminar"
  },
  {
  id: 22,
  title: "Mltiverse",
  description: "36-hour Kaggle challenge showcasing machine learning skills.",
  image: "https://images.prismic.io/ieeemuj/c37f960f-1973-49a3-b210-515f0e59c5b5_MLtiVerse+Poster.png",
  completed: true,
  venue: "Online",
  date: "Unknown | Unknown",
  registerUrl: "",
  tag: "Machine Learning"
  },
  {
  id: 23,
  title: "Fostering the Future 7.0",
  description: "Annual IEEE CS MUJ talk guiding students through internships and career paths.",
  image: "https://images.prismic.io/ieeemuj/6c7c6fda-0534-4d82-8b89-7d7750303b6b_Poster+FTF.png",
  completed: true,
  venue: "AB1",
  date: "Unknown | Unknown",
  registerUrl: "",
  tag: "Seminar"
  },
  {
  id: 24,
  title: "Blog Buster",
  description: "Timed contest where participants create technical blogs in core domains.",
  image: "https://images.prismic.io/ieeemuj/2d2b1eb0-9dc3-4f15-9e89-c2ea47b3c820_IMG-20230711-WA0112.jpg",
  completed: true,
  venue: "AB1",
  date: "Unknown | Unknown",
  registerUrl: "",
  tag: "Competition"
  },
  {
  id: 25,
  title: "Know Your Domain",
  description: "5-day event exploring UI/UX, Web Dev, Data Science and AI/ML.",
  image: "https://images.prismic.io/ieeemuj/3c67358b-6121-47db-a431-409fbc818b2d_KYD+POSTER.png",
  completed: true,
  venue: "AB1",
  date: "Unknown | Unknown",
  registerUrl: "",
  tag: "Workshop"
  },
  {
  id: 26,
  title: "Epitech",
  description: "Talk exploring entrepreneurship and business transformation.",
  image: "https://images.prismic.io/ieeemuj/e2715c33-9ce1-40ee-9543-079c597d0414_epitech-poster.png",
  completed: true,
  venue: "AB1",
  date: "Unknown | Unknown",
  registerUrl: "",
  tag: "Seminar"
  },
  {
  id: 27,
  title: "MockUp 3.0",
  description: "24-hour nationwide UI/UX design challenge offering cash prizes.",
  image: "https://images.prismic.io/ieeemuj/302689aa-c11e-4797-8fb7-54521454c68d_MOCKUP-3.0-FINAL-POSTER.png",
  completed: true,
  venue: "AB1",
  date: "Unknown | Unknown",
  registerUrl: "",
  tag: "Designathon"
  }
];