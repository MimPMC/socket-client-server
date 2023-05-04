import { Button, createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  button1: {
    background: "#54FFF5",
    color: "black",
    fontSize: "1.3rem",
    transition: "all 0.3s ease",
    cursor: "pointer",

    "&:hover": {
      background: "#4dd8cf",
    },

    "&:active": {
      transform: "scale(0.95)",
    },

    [theme.fn.smallerThan('sm')]: {
      width: "70%",
    },
  },
}));

export function StartButton() {
  const { classes } = useStyles();

  return (
    <Button type="submit" radius="xl" size="md" w={"20rem"} className={classes.button1}>
      Start Chatting!
    </Button>
  );
}