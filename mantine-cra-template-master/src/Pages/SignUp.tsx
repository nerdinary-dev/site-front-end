import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Image,
  Anchor,
  rem,
} from "@mantine/core";
import Logo from "../assets/Logo.svg";
import bg from "../assets/OIG.png"
import { PasswordStrength } from "../Components/PasswordStrength";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "row-reverse",
    height: "100vh",
    minHeight: rem(900),
    backgroundSize: "cover",
    overflowX: "hidden",
    backgroundImage: `url(${bg})`,
  },

  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: rem(900),
    maxWidth: rem(450),
    paddingTop: rem(80),

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export function SignUp() {
  const { theme, classes } = useStyles();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome to 
          <Image
            style={{
              filter: theme.colorScheme === "dark" ? "invert(1)" : "invert(0)",
            }}
            src={Logo}
          />
        </Title>

        <TextInput
          label="Name"
          placeholder="Your name"
          size="md"
          mt="md"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />

        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
          mt="md"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />

        <PasswordStrength />

        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button fullWidth mt="xl" size="md">
          Login
        </Button>

        <Text ta="center" mt="md">
          Already have an account?{" "}
          <Anchor<"a">
            href="/login"
            weight={700}
            // onClick={(event) => event.preventDefault()}
          >
            Log In
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
