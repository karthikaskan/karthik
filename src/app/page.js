import { getSiteData } from "./lib/api";
import HeroSection from "./components/HeroSection";
import MainSection from "./components/MainSection";
import FeatureSection from "./components/FeatureSection";
import FastResults from "./components/FastResults";
import ImageSlider from "./components/ImageSlider";
import EmpowerSection from "./components/EmpowerSection";
import MakeSureSection from "./components/MakeSureSection";
import StartSrction from "./components/StartSection";
import PricingBanner from "./components/PricingBanner";
import Testimonial from "./components/Testimonial";
import ScrollImageContent from "./components/ScrollImageContent";
import BlogSection from "./components/BlogSection";









export default async function HomePage() {
  const data = await getSiteData();  //  API function

  if (!data) return <p>Failed to load content.</p>;

  return (
<>
<MainSection data={data}/>
<ScrollImageContent data={data}/>
<ImageSlider data={data}/>
<FeatureSection data={data}/>

<FastResults data={data}/>

          <EmpowerSection data={data}/>
<MakeSureSection data={data}/>
<StartSrction data={data}/>





<PricingBanner data={data}/>
<Testimonial data={data}/>

<BlogSection data={data}/>
<HeroSection data={data}/>






</>
  );
}
