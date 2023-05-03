import {
  Burger,
  Container,
  createStyles,
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
  const [opened, { toggle }] = useDisclosure(false);
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
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
      </Container>
    </Header>
  );
}
