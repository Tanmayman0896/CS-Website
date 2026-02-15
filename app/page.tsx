import Footer from "@/src/components/common/Footer";
import {Skiper19} from "@/src/components/ui/stroke"
import ImageHover from "@/src/components/common/ImageHover";
import Navbar from "@/src/components/common/Navbar";
import HorizontalGallery from "@/src/components/gallery/HorizontalGallery";
import TargetCursor from "@/src/components/common/TargetCursor";

export default function Home() {
  return (
    <>

    <TargetCursor 
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
  hoverDuration={0.2}
/>
    <div><Navbar/></div>
    <div>
      <Skiper19 />
      <ImageHover/>
      <HorizontalGallery/>
      <Footer/>
    </div>
    
    
      
    </>
  );
}