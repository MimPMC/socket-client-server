import {
  Burger,
  Center,
  Container,
  createStyles,
  Drawer,
  Group,
  Header,
  Title,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { NavLink } from "react-router-dom";
import { NavbarSimple } from "./Sidebar";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  burger: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
  styledHeader: {
    backgroundColor: theme.colors.orange[5],
    position: "fixed",
    border: "1px solid #ff912b",
  },
  linkGroup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
  },
  fontGae: {
    fontFamily: "'Gaegu', cursive",
    fontWeight: 700,
    color: "black",
  },
}));

export function HeaderSimple() {
  const [openedDrawer, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes } = useStyles();

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      <Header className={classes.styledHeader} height={70} mb={0}>
        <Container className={classes.header}>
          <Center maw={400} h={70} mx="auto">
            <NavLink to="/" className={classes.linkGroup}>
              <img
                src="/src/assets/chatcat.jpeg"
                alt="Random image"
                height="50px"
                style={{ borderRadius: "50%", marginRight: "10px" }}
              />
              <Title size={38} className={classes.fontGae}>
                Cat Chat
              </Title>
            </NavLink>
          </Center>
          <Group spacing={5}></Group>

          <Burger
            opened={openedDrawer}
            onClick={toggleDrawer}
            className={classes.burger}
            size="md"
          />
          <Drawer opened={openedDrawer} onClose={closeDrawer}>
            {!isDesktop && <NavbarSimple />}
          </Drawer>
        </Container>
      </Header>
      {isDesktop && <NavbarSimple />}
    </>
  );
}
