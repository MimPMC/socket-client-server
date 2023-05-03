import {
  Burger,
  Center,
  Container,
  createStyles,
  Drawer,
  Group,
  Header,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavbarSimple } from './Sidebar';


const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },
}));

export function HeaderSimple() {
  const [openedDrawer, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes } = useStyles();

  const StyledHeader = {
    backgroundColor: "#FD7E14",
  };

  const HeaderTitle = {
    fontSize: "25px",
  };

  const data = [
    { link: '', label: 'Room 1', },
    { link: '', label: 'Room 2',  },
    { link: '', label: 'Room 3',  },
    { link: '', label: 'Room 4',  },
  
  ];

  return (
    <Header sx={StyledHeader} height={70} mb={120}>
      <Container className={classes.header}>
        <Center sx={HeaderTitle} maw={400} h={100} mx="auto">
          Cat Chat
        </Center>
        <Group spacing={5}></Group>

        <Burger
          opened={openedDrawer}
          onClick={toggleDrawer}
          className={classes.burger}
          size="sm"
        />
        <Drawer opened={openedDrawer} onClose={closeDrawer}>
        <NavbarSimple data={data} />
        </Drawer>
      </Container>
    </Header>
  );
}
