"use client";
import Image from "next/image";
import Link from "next/link";
import { getSiteData } from "../lib/api";
import { useState ,useEffect} from "react";

export default function Header() {
  //api call 
  const data = getSiteData();
  const logoUrl =
    data?.yoast_head_json?.schema?.["@graph"]?.find( // logo call
      (item) => item["@type"] === "Organization" && item.logo
    )?.logo?.url ||
    "https://boomimart.com/wp-content/uploads/2023/05/boomimartlogo-1.svg";

  const [menuOpen, setMenuOpen] = useState(false); // menu open call 



 
  const [closeOffer, setCloseOffer] = useState(true); // X close btn
  // header box shadow 
    const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {closeOffer ? (
        <div className="header-top">
          <p>Refer a fellow business and get a flat 10% discount</p>
          <Image
            src="/icons8-close-button-32-_1_.webp"
            width={20}
            alt="close icon"
            height={20}
            onClick={() => setCloseOffer(false)}
            className="close-icon"
          /> 
        </div>
      ) : null}
      <header className={`header-container ${isScrolled ? "scrolled" : ""}`}>
        <div>
          <nav className="nav-flex">
            <div className="left-header">
              <Link href="/">
                <Image
                  src={logoUrl}
                  className="sitelogo"
                  alt="logo"
                  width={250}
                  height={110}
                />
              </Link>
            </div>
            <div className="navlink-flex">
              <Link href="./pricing" className="nav-link nav-hide">
                Pricing
              </Link>
              <Link href="./e-commerce-resources" className="nav-link nav-hide">
                E-Commerce Resources
              </Link>
              <Link href="./request-a-demo" className="nav-link ">
                <button className="req-btn">Request a demo</button>
              </Link>

              {/* Hamburger / Close Icon */}
              <div
                className={`menu-icon ${menuOpen ? "open" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <div></div>
                <div></div>
                <div></div>
                <span className="open-close">
                  {menuOpen ? "Close" : "Menu"}
                </span>
              </div>
            </div>
            {/* Menu Content */}
            {menuOpen && (
              <nav className="menu-content">
                <ul>
                  <li>
                    {" "}
                    <Link href="./pricing" className="mobile-link">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link href="./e-commerce-resources" className="mobile-link">
                      E-Commerce Resources
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
