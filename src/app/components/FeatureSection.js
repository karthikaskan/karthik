import Image from "next/image";
import Link from "next/link";

export default function FeatureSection({data}) {
      const cleanContent = data.heavy_lifting_content
    .replace(/<[^>]+>/g, '') // remove all HTML tags
    .replace(/\r\n|\n|\t/g, ' ') // remove \r\n, newlines, tabs
    .trim();
    const firstSentence = cleanContent.split('. ')[0] + '.'; // first sentence 
    const secondSentence = cleanContent.split('. ')[1] + '.'; // second sentence
      const listItems = data.heavy_lifting_content.match(/<li>(.*?)<\/li>/g); // filter li content
  const cleanedListItems = listItems
    ? listItems.map(item => item.replace(/<\/?li>/g, ''))
    : [];


  return (
    <section className="feature-section">
      <div className="container-feature">
        {/* Left Content */}
        <div className="feature-text">
          <h2>{data.heavy_lifting_title}</h2>
          <p>{firstSentence}</p>  
          <p> {secondSentence}</p> 
<ul>
            {cleanedListItems.map((item, index) => (
              <li key={index} className="feature-3line">{item}</li>
            ))}              </ul>

            
            <Link href="/"><button className="feature-btn">{data.heavy_lifting_cta}</button></Link>



        </div>

        {/* Right Image */}
        <div className="feature-right-image">
          <Image
            src="/feature.svg" 
            alt="Boomimart Cloud ERP"
            className="feature-image"
            width={100}
            height={100}
          />
        </div>
      </div>
    </section>
  );
}
