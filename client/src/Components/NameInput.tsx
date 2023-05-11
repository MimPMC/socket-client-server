import { TextInput, TextInputProps, createStyles } from "@mantine/core";
import { TbCat } from "react-icons/tb";

export const useStyles = createStyles((theme) => ({
  input: {
    transition: "all 0.3s ease",

    [theme.fn.smallerThan("sm")]: {
      width: "70%",
    },
  },
}));

export function NameInput(props: TextInputProps) {
  const { classes } = useStyles();

  return (
    <TextInput
      icon={<TbCat size="1.4rem" />}
      radius="xl"
      w={"20rem"}
      size="md"
      placeholder="Enter Name"
      className={classes.input}
      {...props}
    />
  );
}
