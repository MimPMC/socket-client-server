import {
  Button,
  createStyles,
  Flex,
  getStylesRef,
  Navbar,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useName } from "../context/NameContext";
import { useSocket } from "../context/SocketContext";
import RoomListButton from "./RoomListButton";

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
      position: "absolute",
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
    padding: `${theme.spacing.md} ${theme.spacing.md}`,
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

  joinButton: {
    borderRadius: "50px",
    height: "70px",
    width: "80px",
    padding: "1px",
    border: "none",
    backgroundColor: "#53fff5",
    marginLeft: "5px",
    transition: "background-color 0.3s ease-out, color 0.3s ease-out",
    color: "black",
    "&:hover": {
      backgroundColor: "#4dd8cf",
    },
  },

  imgWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    zIndex: 1,
    top: 640,
    left: 180,
    width: "4rem",
    [theme.fn.largerThan("md")]: {},
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

  button1: {
    background: "#54FFF5",
    color: "black",
    fontSize: "1.3rem",
    transition: "all 0.3s ease",
    cursor: "pointer",
    borderRadius: "1rem",

    "&:hover": {
      background: "#4dd8cf",
    },

    "&:active": {
      transform: "scale(0.95)",
    },
  },
}));

export function NavbarSimple() {
  const { classes } = useStyles();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [inputRoom, setInputRoom] = useState("");
  const navigate = useNavigate();
  const { joinRoom, roomList } = useSocket();

  const { name } = useName();

  const JoinRoomContainer = {
    display: "flex",
  };

  const CreateNewRoomForm = {
    alignItems: "center",
  };

  const InputBox = {
    marginRight: "5px",
    border: "none",
    height: "70px",
    borderRadius: "50px",
    padding: "20px",
    backgroundColor: "#ffd540",
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRoom) {
      joinRoom(inputRoom, name);
      navigate("/homepage");
      setInputRoom("");
      e.currentTarget.reset();
    }
  };

  return (
    <div>
      {!isDesktop && (
        <Navbar
          className={classes.wrapper}
          height={700}
          width={{ sm: 300 }}
          p="md"
          zIndex={2000}
        >
          <Navbar.Section className={classes.linksContainer} grow>
            <Flex direction="column" gap="sm" mt="1rem">
              {roomList.map((room, index) => (
                <RoomListButton
                  key={index}
                  room={room}
                  onClick={() => joinRoom(room.name, name)}
                />
              ))}
            </Flex>
          </Navbar.Section>

          <Navbar.Section className={classes.footer}>
            <div style={JoinRoomContainer} className={classes.footer}></div>
            <form style={CreateNewRoomForm} onSubmit={handleSubmit}>
              <input
                style={InputBox}
                name="Room"
                placeholder="Enter room name"
                type="text"
                value={inputRoom}
                onChange={(e) => setInputRoom(e.target.value)}
              />
              <Button className={classes.joinButton} type="submit">
                Join
              </Button>
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
            <Navbar.Section className={classes.linksContainer} grow>
              <Flex direction="column" gap="sm" mt="1rem">
                {roomList.map((room, index) => (
                  <RoomListButton
                    key={index}
                    room={room}
                    onClick={() => joinRoom(room.name, name)}
                  />
                ))}
              </Flex>
            </Navbar.Section>
          </div>
          <div style={JoinRoomContainer} className={classes.footer}>
            <div className={classes.imgWrapper}></div>
            <div>
              <form style={CreateNewRoomForm} onSubmit={handleSubmit}>
                <input
                  style={InputBox}
                  name="Room"
                  placeholder="Enter room name"
                  type="text"
                  value={inputRoom}
                  onChange={(e) => setInputRoom(e.target.value)}
                />
                <Button className={classes.joinButton} type="submit">
                  Join
                </Button>
              </form>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
