import { createStyles, getStylesRef } from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Server } from "socket.io";
import { io } from "socket.io-client";
import clippy from '../assets/clippy.png';

const useStyles = createStyles((theme) => ({
  button: {
    margin: theme.spacing.sm,
    textTransform: "uppercase",
  },

  wrapper: {
    backgroundColor: theme.colors.orange[5],
    [theme.fn.largerThan('md')]: {
      position: 'fixed',
      top: 70,
      left: 0,
      height: 'calc(100% - 70px)',
      width: '40vh',
    },
  },

  linksContainer: {
    flexGrow: 1,
    [theme.fn.largerThan('md')]: {
      height: 'calc(100% - 120px)',
      overflowY: 'auto',
    },
  },

  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing.xl,
    marginTop: theme.spacing.md,
    [theme.fn.largerThan('md')]: {
      position: "absolute", // Change the position to absolute
      bottom: theme.spacing.md, // Add bottom value to position the button
      width: '100%', // Set width to 100% for centering the content
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
    width: '4rem',
    height: '3rem',
    [theme.fn.largerThan('md')]: {
      position: 'absolute',
      top: '-1rem',
      left: '7rem', 
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

interface DataItem {
  link: string;
  label: string;
}

interface NavBarProps {
  data: DataItem[];
}

export function NavbarSimple({ data }: NavBarProps) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const [rooms, setRooms] = useState<string[]>([]);

  useEffect(() => {
    const socket = io();
    socket.on('connect', () => {
      const roomsFound = getRooms();
      setRooms(roomsFound);
    });
    socket.on('rooms', (rooms: string[]) => {
      setRooms(rooms);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const getRooms = () => {
    const io = new Server();
    const { rooms } = io.sockets.adapter;
    const roomsFound: string[] = [];
    for (const [name, setOfSocketIds] of rooms) {
      if (!setOfSocketIds.has(name)) {
        roomsFound.push(name);
      }
    }
    return roomsFound;
  };
  const links = data.map((item: DataItem) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <span>{item.label}</span>
    </a>
  ));

  return (
    <>
      {!isDesktop && (
        <div>
          <h2>Rooms</h2>
          <ul>
            {rooms.map((room) => (
              <li key={room}>
                <Link to={`/rooms/${room}`}>{room}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isDesktop && (
        <aside className={classes.wrapper}>
          <div
            className={classes.linksContainer}
            style={{ height: "700px", padding: "1rem" }}
          >
            {links}
          </div>
          <div className={classes.footer}>
            <a
              href="#"
              className={classes.link2}
              onClick={(event) => event.preventDefault()}
            >
              <img src={clippy} alt="Clip" className={classes.image} />
              <span className={classes.button}>Create New Room</span>
            </a>
          </div>
        </aside>
      )}
    </>
  );
      }