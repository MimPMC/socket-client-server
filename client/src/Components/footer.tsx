import { ActionIcon, Container, Group, Image, Text, Title, createStyles, rem } from '@mantine/core';
import { TbBrandInstagram, TbBrandPinterest, TbBrandTumblr } from "react-icons/tb";

const useStyles = createStyles((theme) => ({
  footer: {
    position:"fixed",
    fontFamily:"Gaegu",
    marginTop: rem(0),
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.orange[9] : theme.colors.orange[7],
    
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.orange[9] : theme.colors.orange[9]
    }`,
  },

  logo: {
    maxWidth: rem(200),

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  description: {
    marginTop: rem(5),
    fontFamily:"Gaegu",

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
      textAlign: 'center',
    },
  },

  inner: {
    fontFamily:"Gaegu",
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  groups: {
    paddingTop: "1rem",
    fontFamily:"Gaegu",
    display: 'flex',
    flexWrap: 'wrap',

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: "column",
      alignItems:"center",
      textAlign: "center"
    },
  },

  wrapper: {
    width: rem(160),
  },

  link: {
    fontFamily:"Gaegu",
    display: 'block',
    color: theme.colorScheme === 'dark' ? theme.colors.cyan[9] : theme.colors.cyan[9],
    fontSize: theme.fontSizes.lg,
    paddingTop: rem(2),
    paddingBottom: rem(2),

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  title: {
    fontSize: "1.5rem",
    fontWeight: 700,
    fontFamily:"Gaegu",
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.cyan[9],
  },
  bigTitle: {
    fontSize: "2.8rem",
    fontWeight: 800,
    fontFamily:"Gaegu",
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.cyan[9],
  },

  afterFooter: {
    fontFamily:"Gaegu",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.cyan[9]
    }`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  social: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
    },
  },
  reg: {
    fontFamily:"Gaegu",
    
  },
  image: {
    
    [theme.fn.smallerThan('sm')]: {
        marginTop: theme.spacing.xl,
      },
    
  },
}));

interface FooterLinksProps {
  data: {
    title: string;
    links: { label: string; link: string }[];
  }[];
}

export function Footer({ data }: FooterLinksProps) {
  const { classes } = useStyles();

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Title className={classes.bigTitle} order={1}>Cat Chat!</Title>
          <Text size="xl" color="white" className={classes.description}>
            Let them hear your meow!
          </Text>
        </div>
        <div className={classes.groups}>{groups}
        <Image className={classes.image} maw={240} mx="auto" radius="md" src="./src/assets/footer.png" alt="Random image" /></div>
        
      </Container>
      <Container className={classes.afterFooter}>
        <Text className={classes.reg} color="cyan.9" size="lg">
          © 2023 Feline Capital Enterprises.
        </Text>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon size="lg">
            <TbBrandInstagram size="1.5rem" color="white" />
          </ActionIcon>
          <ActionIcon size="lg">
            <TbBrandTumblr size="1.5rem" color="white" />
          </ActionIcon>
          <ActionIcon size="lg">
            <TbBrandPinterest size="1.5rem" color="white" />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}