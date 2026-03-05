
import TeamCard from '@/src/components/common/TeamCard';
import LightRays from '@/components/LightRays';
import DotGrid from '@/components/DotGrid';

export default function TeamPage() {
  const executiveMembers = [
    {
      name: "Member One",
      role: "President",
      image: "https://images.pexels.com/photos/34408249/pexels-photo-34408249.jpeg"
    },
    {
      name: "Member Two",
      role: "Vice President",
      image: "https://images.pexels.com/photos/34408249/pexels-photo-34408249.jpeg"
    },
    {
      name: "Member Three",
      role: "Secretary",
      image: "https://images.pexels.com/photos/34408249/pexels-photo-34408249.jpeg"
    }
  ];

  return (
    <>
   

    
      <DotGrid />
     <div className="absolute inset-0 z-10 pointer-events-none">
      
  <LightRays
     raysOrigin="top-center"
     raysColor="#ffb43f"
     raysSpeed={1.5}
     lightSpread={1}
     rayLength={3}
      followMouse={true}
      mouseInfluence={0.3}
      noiseAmount={0.1}
      distortion={0}
      className="custom-rays"
      pulsating={false}
      fadeDistance={1.7}
      saturation={1}
    />

      </div>
      {/* Spacer for navbar separation */}
      <div className="relative z-10 h-30"></div>
      
      <div className="relative z-10 pb-20">
        <div className="text-3xl md:text-6xl font-bold text-center text- h-50" style={{ color: '#FFA300' }}>
          <p>Meet Our Team</p>
          </div>

          {/* Executive Committee Section */}
          <div className="w-full flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12" style={{ color: '#FFA300' }}>
              Executive Committee
            </h2>
            <div className="border-b border-white-600 w-3/4"></div>
            
            {/* Spacer between line and cards */}
            <div className="h-20"></div>

            {/* Team Cards Grid */}
            <div className="flex justify-center items-center w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {executiveMembers.map((member, index) => (
                  <TeamCard
                    key={index}
                    image={member.image}
                    name={member.name}
                    role={member.role}
                    className="w-[320px] h-[450px]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
