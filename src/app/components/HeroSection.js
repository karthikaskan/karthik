import Image from "next/image";
import Link from "next/link";



export default function HeroSection({data}) {
  return (
    <section className="hero">
      <div className="overlay">
        <div className="content">
          <h2>{data.footer_banner_title}</h2>
        </div>
        <div className="buttons">
           <Link href={data.cta_button_link.url}><button className="primary-btn">{data.footer_banner_content}<Image src="/right-arrow-svgrepo-com.svg" width={20} height={20} className="right-arrow" alt="arrow"/></button></Link>
           <Link href={data.cta_button_link.url}><button className="secondary-btn">{data.cta_button_text}</button></Link>
          </div>
      </div> 
    </section>
  );
}

