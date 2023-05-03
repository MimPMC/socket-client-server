import { Box, Container, Flex, Image, Title, createStyles } from "@mantine/core";
import { NameInput } from "../Components/NameInput";
import { StartButton } from "../Components/StartButton";
import { Left } from "react-bootstrap/lib/Media";

const useStyles = createStyles((theme) => ({


    container: {
        display: "flex",    
        fontFamily: "'Gaegu', cursive",
        flexDirection: "column",
        alignContent: "center",
        justifyContent:"center",
        position: "relative",
        [theme.fn.smallerThan('sm')]: {
            justifyContent:"center",


          },
       


    },
    text: {
        fontFamily: "'Gaegu', cursive",

    },

    circle: {
        backgroundImage: "url(./src/assets/123.png)",
        backgroundRepeat: "no-repeat", // prevent background image from repeating
        backgroundSize: "cover", //
        zIndex: 100,
        position: "relative",
        display:"flex",
        flexDirection:"column",
        justifyContent: "flex-end",
        alignContent: "flex-end",
        width: "22vh",
        height: "13vh",
        maxWidth:"350px",
        transition: "all 0.3s ease",
        color: "transparent",
        
        "&:hover": {
            //background: "#fff4b6",
            width: "100vw",
            height: "50vh",
            color: "black",
            
          },
        [theme.fn.smallerThan('sm')]: {
            width: "28vh",
            height: "25vh",
            color: "black",
          },
    },
    hey: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
        
    },
    gaegu: {
        fontFamily: "'Gaegu', cursive", 
        textAlign:"center",
        marginBottom:"5.5vh",
        fontSize: "2rem",
        [theme.fn.smallerThan('md')]: {
            marginBottom:"0vh",
            fontSize: "1.3rem",
            
            }
        


    }
    
  }));
  
  

export function LogInPage() {
    const { classes } = useStyles();

    return(
        <Box w={"100%"} bg={"#FD7E14"} h={"100svh"} className={classes.hey}>
            <Box></Box>
            <Container size="xl" px={0} h={"100svh"} className={classes.container}>
                <Flex direction="column" align={"center"} mb={10}>
                    <Image maw={240} mx="auto" radius="100%" src="./src/assets/cat.jpg" alt="Random image" />
                    <Title order={1} className={classes.text} weight={700} size={"3rem"}>Cat Chat</Title>
                </Flex>
                <Flex mb={10} direction="column" align={"center"} gap={20} >
                  <NameInput></NameInput>
                  <StartButton></StartButton>          
                </Flex>
            </Container>
            <Box className={classes.circle}>
                
            </Box>
            
        </Box>
        
    )
}

/*<Title className={classes.gaegu} order={1} align="center"> ©2023  Feline Corporations</Title> */