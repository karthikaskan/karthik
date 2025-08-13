import Link from "next/link"
export default function MainSection({data}) {
    return(
     <section className="hero-banner">
      <div className="container-main">
        <h1 className="hero-title">
          {data.banner_title}
        </h1>
        <p className="hero-subtitle">
       {data.banner_title_para}
        </p>
        <Link href="/">
          <button className="hero-btn">
            {data.banner_cta}
          </button>
        </Link>
      </div>     
    </section>
    )
}