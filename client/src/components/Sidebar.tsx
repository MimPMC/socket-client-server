import { createStyles, getStylesRef, Navbar } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clippy from "../assets/clippy.png";
import { useName } from "../context/NameContext";
import { useSocket } from '../context/SocketContext';

const useStyles = createStyles((theme) => ({
  button: {
    margin: theme.spacing.sm,
    textTransform: "uppercase",
  },

  wrapper: {
    backgroundColor: theme.colors.orange[5],
    [theme.fn.largerThan("md")]: {
      position: "fixed",
      top: 70,
      left: 0,
      height: "calc(100% - 70px)",
      width: "40vh",
    },
  },

  linksContainer: {
    flexGrow: 1,
    [theme.fn.largerThan("md")]: {
      height: "calc(100% - 120px)",
      overflowY: "auto",
    },
  },

  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing.xl,
    marginTop: theme.spacing.md,
    [theme.fn.largerThan("md")]: {
      position: "absolute", // Change the position to absolute
      bottom: theme.spacing.md, // Add bottom value to position the button
      width: "100%", // Set width to 100% for centering the content
    },
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.cyan[3],
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.lg} ${theme.spacing.lg}`,
    borderRadius: theme.radius.xl,
    fontWeight: 500,
    textTransform: "uppercase",
    margin: theme.spacing.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.cyan[2],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  link2: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.yellow[5],
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.xl,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.yellow[4],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  image: {
    position: "absolute",
    zIndex: 1,
    top: 640,
    left: 180,
    width: "4rem",
    height: "3rem",
    [theme.fn.largerThan("md")]: {
      position: "absolute",
      top: "-1rem",
      left: "7rem",
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },
}));



export function NavbarSimple() {
  const { classes } = useStyles();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [room, setRoom] = useState("");
  const { joinRoom } = useSocket();
  const navigate = useNavigate();
  //const rooms: string[] = [];

  const { name } = useName();
 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (room) {
      joinRoom(room, name);
      navigate("/homepage");
      setRoom("");
      e.currentTarget.reset();
    }
  };


  

 


  return (
    <>
      {!isDesktop && (
        <Navbar
          className={classes.wrapper}
          height={700}
          width={{ sm: 300 }}
          p="md"
        >
          <Navbar.Section className={classes.linksContainer} grow>
            {'links'}
          </Navbar.Section>
          <Navbar.Section className={classes.footer}>
              <img src={clippy} alt="Clip" className={classes.image} />
              <form onSubmit={handleSubmit}>
                <input
                  name="Room"
                  placeholder="Create new room"
                  type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                />
                <button type="submit">join</button>
              </form>
          </Navbar.Section>
        </Navbar>
      )}
      {isDesktop && (
        <aside className={classes.wrapper}>
          <div
            className={classes.linksContainer}
            style={{ height: "700px", padding: "1rem" }}
          >
            {'links'}
          </div>
          <div className={classes.footer}>
              <img src={clippy} alt="Clip" className={classes.image} />
              <form onSubmit={handleSubmit}>
                <input
                  name="Room"
                  placeholder="Create new room"
                  type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                />
                <button type="submit">join</button>
              </form>
              
          </div>
        </aside>
      )}
    </>
  );
}
