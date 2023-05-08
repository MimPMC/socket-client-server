
import Chat from "../Chat";
import { HeaderSimple } from "../Components/Header";
import { Footer } from "../Components/footer";

const footerLinks = [
  {
    title: "About",
    links: [
      { label: "Paw-sibilities", link: "/link1" },
      { label: "Purr-ivacy Paw-licy", link: "/link2" },
      { label: "About Our Nine Lives", link: "/link3" },
      { label: "Veterinary", link: "/link3" },
      { label: "Terms of Purr-vice", link: "/link3" },
    ],
  },
]


export function HomePage() {
    
    return(
        <div>      
          <HeaderSimple />
          <Chat/>
          <Footer data = {footerLinks}></Footer>
        </div>
    )
}