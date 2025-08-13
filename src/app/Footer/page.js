import Image from "next/image";
import Link from "next/link";
import { getSiteData } from "../lib/api";

export default function Footer() {
        const data = getSiteData();
      const logoUrl = data?.yoast_head_json?.schema?.["@graph"]?.find(
    item => item["@type"] === "Organization" && item.logo
  )?.logo?.url || "https://boomimart.com/wp-content/uploads/2023/05/boomimartlogo-1.svg";
  return (
    <footer className="footer">
      <div className="footer-container">        
        {/* Left Section - Logo and Address */}
        <div className="footer-section footer-left">
          <div className="footer-logo-div"><Image src={logoUrl} alt="Boomimart Logo" width={250} height={60} className="footer-logo"/></div>
          <h3>BHOOLGAM SOLUTIONS PRIVATE LIMITED</h3>
          <p>
            R. S. No. 348/8A1 East Coast Road, By pass, Kottakuppam,
            Tamil Nadu 605104.
          </p>
        </div>
        {/* Middle Section - About Links */}
        <div className="footer-section footer-middle">
          <h4>About Boomimart</h4>
          <ul>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/e-commerce-resources">E-Commerce Resources</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy">Privacy Statement</Link></li>
            <li><Link href="/terms">Terms and Conditions</Link></li>
            <li><Link href="/refund">Refund Policy</Link></li>
          </ul>
        </div>

        {/* Right Section - Contact Info */}
        <div className="footer-section footer-right">
          <h4>Want to know more or do you have a question?</h4>
          <Link href="/book-a-demo" className="footer-link">Book a demo</Link>
          <p className="timing">Or you can reach out to us on workdays from 9am till 5pm.</p>
          <p className="footer-location">India</p>
       <div className="contact-no">
  <p><Image src="./pngwing.com-2-1.svg" width={30} height={18} alt="email"/> info@boomimart.com </p>
  <p><Image src="./phone-call.svg" width={30} height={20} alt="phone"/> +91 7871997663</p>
</div>

          <div className="footer-social">
            <Link href="https://www.facebook.com/boomimart" target="_blank" rel="noreferrer">
              <Image src="./facebook-svgrepo-com.svg" alt="Facebook" width={30} height={30} />
            </Link>
            <Link href="https://www.instagram.com/boomimart/" target="_blank" rel="noreferrer">
              <Image src="./instagram-svgrepo-com.svg" alt="Instagram" width={30} height={30} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="footer-bottom">
        <p>© 2025 Boomimart</p>
      </div>
    </footer>
  );
}
