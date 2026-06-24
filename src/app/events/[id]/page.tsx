import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getEventById } from "@/lib/getEvents";

interface EventPageProps {
  params: {
    id: string;
  };
}

export default async function EventDetail({ params }: EventPageProps) {
  const { id } = await params as { id: string };
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#F4A119] selection:text-black">
      {/* Hero Section */}
      <div className="relative w-full h-[65vh] md:h-[75vh] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 z-10">
          <div
            className="h-full flex flex-col justify-end"
            style={{
              paddingLeft: "clamp(1.5rem, 6vw, 7rem)",
              paddingRight: "clamp(1.5rem, 6vw, 7rem)",
              paddingBottom: "clamp(3rem, 6vh, 5rem)",
            }}
          >
            {/* Tag button — larger, more prominent */}
            <span
              className="inline-block w-fit rounded-sm shadow-2xl font-extrabold uppercase tracking-widest text-black bg-[#F4A119]"
              style={{ padding: "0.6rem 1.5rem", fontSize: "0.85rem", marginBottom: "1.25rem" }}
            >
              {event.tag}
            </span>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.95] mb-6 text-white drop-shadow-2xl">
              {event.title}
            </h1>

            <p className="text-lg md:text-xl text-zinc-300 max-w-3xl font-light leading-relaxed opacity-90">
              {event.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-black">
        <div
          style={{
            paddingLeft: "clamp(1.5rem, 6vw, 7rem)",
            paddingRight: "clamp(1.5rem, 6vw, 7rem)",
            paddingTop: "4rem",
            paddingBottom: "7rem",
          }}
        >
          {/* Main Content */}
          <div className="w-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-6 text-white uppercase tracking-tighter">
              <span className="w-14 h-[3px] bg-[#F4A119] block flex-shrink-0"></span>
              About the Event
            </h2>

            <div className="prose prose-invert max-w-none text-zinc-400 leading-relaxed font-light mb-20">
              <p className="text-lg md:text-xl leading-relaxed">
                {event.description || "More details coming soon."}
              </p>
            </div>

            <div className="mt-24">
              <Link
                href="/events"
                className="group inline-flex items-center gap-5 text-sm font-bold tracking-[0.2em] uppercase text-zinc-500 hover:text-[#F4A119] transition-all duration-500"
              >
                <span className="w-12 h-[1px] bg-zinc-700 group-hover:bg-[#F4A119] group-hover:w-20 transition-all duration-500 block"></span>
                Back to All Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}