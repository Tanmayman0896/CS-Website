"use client";

interface Exhibition {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  isFree: boolean;
  tag: string;
}

const EXHIBITIONS: Exhibition[] = [
  {
    id: 1,
    title: "Fragments of Light: Impressionist Masters",
    description:
      "A sweeping survey of works from Monet, Renoir, and Pissarro that redefines how we experience the play of natural light.",
    date: "MAR 01 – MAY 18, 2025",
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&auto=format&fit=crop",
    isFree: true,
    tag: "EXHIBITION",
  },
  {
    id: 2,
    title: "Architecture of Dreams: Brutalist Visions",
    description:
      "Concrete poetry in three dimensions — explore monumental structures that challenged the very notion of shelter and society.",
    date: "FEB 14 – APR 27, 2025",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&auto=format&fit=crop",
    isFree: true,
    tag: "EXHIBITION",
  },
  {
    id: 3,
    title: "Colour Fields: Abstract Expressionism",
    description:
      "Rothko, de Kooning, and Pollock in dialogue — a meditation on emotion, scale, and the raw language of paint.",
    date: "JAN 09 – MAR 30, 2025",
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&auto=format&fit=crop",
    isFree: false,
    tag: "EXHIBITION",
  },
];

function TornEdge() {
  return (
    <div className="absolute top-0 left-0 w-full pointer-events-none z-0 overflow-hidden">
      <img
        src="/images/events/tear.svg"
        alt="tear"
        className="w-full -translate-y-1/2 opacity-90"
      />
    </div>
  );
}

interface EventCardProps {
  exhibition: Exhibition;
}

function EventCard({ exhibition }: EventCardProps) {
  return (
    <article className="relative bg-[#121212] overflow-hidden w-full max-w-xs flex flex-col rounded-[3px] min-h-[calc(100%+3px)]">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={exhibition.image}
          alt={exhibition.title}
          className="w-full h-full object-cover"
        />

        {/* Tag */}
        <span className="absolute top-0 right-0 bg-[#9AC53F] text-black text-[11px] font-semibold tracking-widest px-3 py-1 uppercase">
          {exhibition.tag}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-6 pt-6">
        {/* Date */}
        <p className="text-[#9AC53F] text-xs font-semibold tracking-[0.18em] uppercase mb-2">
          {exhibition.date}
        </p>

        {/* Title */}
        <h3 className="text-white text-2xl font-semibold leading-tight mb-2">
          {exhibition.title}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 text-[15px] leading-relaxed mb-12 line-clamp-3">
          {exhibition.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 pb-6">
        <span
          className={`text-lg font-bold uppercase tracking-wide ${
            exhibition.isFree ? "text-[#9AC53F]" : "text-zinc-500"
          }`}
        >
          {exhibition.isFree ? "FREE" : "TICKETED"}
        </span>

        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="text-white text-sm font-medium border-b border-[#9AC53F] pb-1 flex items-center gap-2"
        >
          Learn more →
        </a>
      </div>
    </article>
  );
}

export default function PastExhibitions() {
  const filtered = EXHIBITIONS;

  return (
    <section className="relative bg-black min-h-screen font-sans overflow-hidden">

      <div className="relative z-10 m-10 max-w-7xl justify-items-center mx-auto px-6 pt-4 pb-24 flex flex-col items-center gap-[25px]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-20 w-full">
          <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            View past
            <br />
            <span className="italic text-zinc-400">exhibitions</span>
          </h2>

          <a
            href="/events/calendar"
            onClick={(e) => e.preventDefault()}
            className="text-sm text-zinc-500 tracking-widest uppercase flex items-center gap-2"
          >
            View calendar
          </a>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-items-center w-full mx-auto mt-[50px]">
            {filtered.map((ex) => (
              <EventCard key={ex.id} exhibition={ex} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-zinc-600 text-lg italic">No exhibitions found.</p>
          </div>
        )}
      </div>

      <style>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}