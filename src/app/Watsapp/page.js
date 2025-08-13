import Image from "next/image"
import Link from "next/link"
export default function Watsapp(){
    return (
        
        <Link href="https://api.whatsapp.com/send?phone=7871997663"><div className="round-watsapp"><Image src="./whatsapp-social-media-svgrepo-com.svg" className="watsapp" height={22} width={22} alt="watsapp"/></div></Link>
    )
}