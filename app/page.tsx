
import {Skiper19} from "@/src/components/ui/stroke"
import ImageHover from "@/src/components/common/ImageHover";
import Navbar from "@/src/components/common/Navbar";
import Newfooter from "@/src/components/ui/Newfooter"
import CardStack from "@/src/components/common/CardStack";



export default function Home() {
  return (
    <>
    <div><Navbar/></div>
    <div><Skiper19 />
    <CardStack/>
    <ImageHover/>
    <Newfooter/>
    </div>
    </>
  );
}
