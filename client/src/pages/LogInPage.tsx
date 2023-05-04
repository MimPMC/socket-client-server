import { Box, Container, createStyles, Flex, Image, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { NameInput } from "../components/NameInput";
import { StartButton } from "../components/StartButton";
import { useUsername } from "../context/UsernameContext";

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
        position: "absolute",
        bottom: "0",
        left:"50%",
        transform: "translate(-50%)",
        zIndex: 100,
        width: "40vh",
        height: "20vh",
        borderRadius: "40rem 40rem 0 0",
        backgroundColor: "purple",
        [theme.fn.smallerThan('sm')]: {
            width: "30vh",
            height: "15vh",

    
    
          },
    },
    
  }));







  
  

export function LogInPage() {
    const { classes } = useStyles();
    const { username, setUsername } = useUsername();

      const navigate = useNavigate();

      function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        navigate("/homepage");
      }

    return(
        <Box w={"100%"} bg={"#FD7E14"} h={"100svh"}>
            <Container size="xl" px={0} h={"100svh"} className={classes.container}>
                <Flex direction="column" align={"center"} mb={10}>
                    <Image maw={240} mx="auto" radius="100%" src="./src/assets/cat.jpg" alt="Random image" />
                    <Title order={1} className={classes.text} weight={700} size={"3rem"}>Cat Chat</Title>
                </Flex>
                <Flex direction="column" align={"center"} gap={20} >
                    <form onSubmit={handleFormSubmit}>
                  <NameInput
                  value={username}
                  onChange={(e) => setUsername(e.currentTarget.value)}
                  ></NameInput>
                  <StartButton></StartButton>   
                  </form>       
                </Flex>
            </Container>
            
        </Box>
        
    )
}

/* <Box className={classes.circle} bg={"#ffd0a9"}></Box>*/