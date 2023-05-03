import {
  Burger,
  Container,
  createStyles,
  Drawer,
  Group,
  Header,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

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

  return (
    <Header sx={StyledHeader} height={60} mb={120}>
      <Container className={classes.header}>
        <Title>Chat Cat</Title>
        <Group spacing={5}></Group>

        <Burger
          opened={openedDrawer}
          onClick={toggleDrawer}
          className={classes.burger}
          size="sm"
        />
        <Drawer opened={openedDrawer} onClose={closeDrawer}>
          {/* Drawer content */}
          <div>hej hej hej drawer</div>
        </Drawer>
      </Container>
    </Header>
  );
}
