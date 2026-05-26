"use client";
import Link from "next/link";
import { eventsData, type EventItem } from "@/data/eventsData";

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
  exhibition: EventItem;
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
        <span 
        style={{padding: "5px"}}
        className="absolute top-0 right-0 bg-[#9AC53F] text-black text-[11px] rounded-bl-[7px] font-semibold tracking-widest uppercase">
          {exhibition.tag}
        </span>
      </div>

      {/* Content */}
      <div 
      style={{padding: "15px 15px 0px 15px"}}
      className="flex flex-col flex-1 px-6 pt-6">
        {/* Date */}
        <p className="text-[#F4A119] text-xs font-semibold tracking-[0.18em] uppercase mb-2">
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
      <div 
      style={{padding: "0px 15px 15px 15px"}}
      className="flex items-center justify-between px-6 pb-6">


        <Link
          href={`/events/${exhibition.id}`}
          className="text-white text-sm font-medium border-b border-[#F4A119] pb-1 flex items-center gap-2"
        >
          Learn more →
        </Link>
      </div>
    </article>
  );
}

export default function PastExhibitions() {
  const filtered = eventsData;

  return (
    <section className="relative bg-black min-h-screen font-sans overflow-hidden">

      <div className="relative z-10 m-16 md:m-24 max-w-7xl justify-items-center mx-auto px-8 pt-8 pb-32 flex flex-col items-center gap-[40px]">
        {/* Header */}

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white leading-tight tracking-tight text-center w-full mb-8"
          style={{ textShadow: '0 0 30px rgba(244,161,25,0.2)' }}
        >
          Events
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-24 w-full border-b border-zinc-800 pb-8">

          <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight uppercase tracking-tight">
            Past Events
          </h2>

          <Link
            href="/events/calendar"
            className="text-sm text-[#F4A119] tracking-widest uppercase flex items-center gap-3 font-bold hover:gap-5 transition-all"
          >
            View calendar <span className="text-lg">→</span>
          </Link>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center w-full max-w-5xl mx-auto mt-[50px]">
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