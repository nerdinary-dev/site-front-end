import React, { useEffect, useState } from "react";
import loader_gif from "../assets/loader.gif";
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
import { useNavigate } from "react-router-dom";

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
  if (email === "test" && password === "1234") {
    return true;
  }
  return false;
};

export const LogIn = ({ onLogin }: { onLogin: () => void }) => {
  const { theme, classes } = useStyles();
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (showLoader) {
      const timeoutId = setTimeout(() => setShowLoader(false), 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [showLoader]);

  const delay = (ms: number | undefined) => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const handleSubmit = async () => {
    if (login(email, password)) {
      onLogin();
      console.log("Succeed");
      setShowLoader(true);
      await delay(3000);
      navigate("/");
    } else {
      // Invalid login, show error message or handle accordingly
      console.log("Invalid credentials");
    }
  };

  return (
    <>
      {showLoader && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(5px)",
            zIndex: 10,
          }}
        >
          <img
            src={loader_gif}
            alt="Loading..."
            style={{ transform: "scale(0.2)" }}
          />
        </div>
      )}
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title
            order={2}
            className={classes.title}
            ta="center"
            mt="md"
            mb={50}
          >
            Welcome back to
            <Image
              style={{
                filter:
                  theme.colorScheme === "dark" ? "invert(1)" : "invert(0)",
              }}
              src={Logo}
            />
          </Title>

          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            mt="md"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button fullWidth mt="xl" size="md" onClick={handleSubmit}>
            Login
          </Button>

          <Text ta="center" mt="md">
            Don&apos;t have an account?{" "}
            <Anchor<"a"> href="/signup" weight={700}>
              Register
            </Anchor>
          </Text>
        </Paper>
      </div>
    </>
  );
};
