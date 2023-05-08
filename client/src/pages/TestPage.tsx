import { Box, createStyles } from "@mantine/core";
import Chat from "../Chat";
import { HeaderSimple } from "../Components/Header";
import { MyFooter } from "../Components/MyFooter";


const useStyles = createStyles((theme) => ({
    box: {
        position: "relative",
    },
})  )

export function TestPage() {
    const {classes} = useStyles()

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
    
    return(
        <div>
            <HeaderSimple></HeaderSimple>
            
            <Box w={"100%"} h={"80rem"} bg={"blue"} >
            <Chat></Chat>
            </Box>
            <MyFooter data={footerLinks}></MyFooter>
           
        </div>
    )
}