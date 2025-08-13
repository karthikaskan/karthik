import "./globals.css";
import Header from "./Header/page";
import Footer from "./Footer/page";
import Watsapp from "./Watsapp/page";
import Image from "next/image";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>
        <Header/>
                {children}
        <Footer/>
        <Watsapp/>
         
      </body>
    </html>
  );
}
