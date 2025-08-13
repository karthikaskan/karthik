import Link from "next/link";
import Image from "next/image";

export default function PricingBanner({data}) {
  return (
    <section className="pricing-banner">
      <div className="pricing-banner-content">
        <h2>{data.pricing_title}</h2>
        <p>
       {data.pricing_content}
        </p>
        <div>
                    <Link href="#" className="banner-btn">
          {data.pricing_cta}<Image src="/right-arrow-svgrepo-com.svg" alt="price" width={20} height={15}/>
        </Link>
        </div>

      </div>
    </section>
  );
}

