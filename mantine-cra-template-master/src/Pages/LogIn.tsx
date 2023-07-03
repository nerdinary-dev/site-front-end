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
  em,
} from "@mantine/core";
import Logo from "../assets/Logo.svg";
import { redirect } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    minHeight: rem(900),
    height: "100vh",
    backgroundSize: "cover",
    overflowX: "hidden",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
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

const login = (email: string, password: string) => {
  if (email == 'test' && password == '1234') {
    return true
  }
  return false
};

export function LogIn() {
  const { theme, classes } = useStyles();

  const handleSubmit = () => {
    
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to
          <Image
            style={{
              filter: theme.colorScheme === "dark" ? "invert(1)" : "invert(0)",
            }}
            src={Logo}
          />
        </Title>

        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
          mt="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
        />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button fullWidth mt="xl" size="md" onClick={handleSubmit}>
          Login
        </Button>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor<"a">
            href="/signup"
            weight={700}
            // onClick={(event) => event.preventDefault()}
          >
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
