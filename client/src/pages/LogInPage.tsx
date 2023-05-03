import { Box, Container, Flex, Image, Title, createStyles } from "@mantine/core";
import { NameInput } from "../Components/NameInput";
import { StartButton } from "../Components/StartButton";

const useStyles = createStyles((theme) => ({
    test: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: `${theme.spacing.md} ${theme.spacing.md}`,
  
      [theme.fn.smallerThan('sm')]: {
        flexDirection: 'column',
      },
    },
  
    links: {
      [theme.fn.smallerThan('sm')]: {
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.sm,
      },
    },
    container: {
        display: "flex",    
        fontFamily: "'Gaegu', cursive",
        flexDirection: "column",
        alignContent: "center",
        justifyContent:"center",
        [theme.fn.smallerThan('sm')]: {
            justifyContent:"center",


          },

    },
    text: {
        fontFamily: "'Gaegu', cursive",

    }
  }));
  
  

export function LogInPage() {
    const { classes } = useStyles();

    return(
        <Box w={"100%"} bg={"#FD7E14"} h={"100svh"}>
            <Container size="xl" px={0} bg={"#ffcfa7"} h={"100svh"} className={classes.container}>
                <Flex direction="column" align={"center"} mb={10}>
                    <Image maw={240} mx="auto" radius="100%" src="./src/assets/cat.jpg" alt="Random image" />
                    <Title order={1} className={classes.text} weight={700} size={"3rem"}>Cat Chat</Title>
                </Flex>
                <Flex direction="column" align={"center"} gap={20} >
                  <NameInput></NameInput>
                  <StartButton></StartButton>
                    
                </Flex>
            
            </Container>

        </Box>
        
    )
}

