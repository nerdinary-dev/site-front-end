import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Group,
  Text,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocalStorage } from "@mantine/hooks";

interface ProfileProps {
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
}

const useStyles = createStyles((theme) => ({}));

const validateEmail = (email: string) => {
  const regex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
}

export const Profile = ({ name, email, bio, avatarUrl }: ProfileProps) => {
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage<Boolean>({
        key: "isLoggedIn",
        defaultValue: false,
      });
  const { classes, theme } = useStyles();
  const [modify, setModify] = useState(false);
  const [description, setDescription] = useState(bio);
  const [_email, setEmail] = useState(email);

  const notifyError = () =>
    toast.error("Invalid Email", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme.colorScheme === "dark" ? "dark" : "light",
    });

  return (
    <>
      {modify ? (
        <div>
          <Card shadow="sm" padding="lg">
            <Avatar
              src={avatarUrl}
              alt={name}
              size={120}
              style={{ marginBottom: 20 }}
            />
            <Title order={2}>{name}</Title>
            <TextInput
              style={{ marginTop: 20 }}
              label="Email"
              placeholder="Ton email"
              size="md"
              mt="md"
              value={_email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            ></TextInput>
            <TextInput
              style={{ marginTop: 20 }}
              label="Bio"
              placeholder="Décris toi en quelque mot"
              size="md"
              mt="md"
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
            ></TextInput>
          </Card>
          <Button
            variant="filled"
            color="teal"
            m={20}
            onClick={() => {
                if (!validateEmail(_email)) {
                    notifyError();
                } else {
                    setModify(false);
                }
            }}
          >
            Save
          </Button>
        </div>
      ) : (
        <div>
          <Card shadow="sm" padding="lg">
            <Avatar
              src={avatarUrl}
              alt={name}
              size={120}
              style={{ marginBottom: 20 }}
            />
            <Title order={2}>{name}</Title>
            <Text size="sm" color="white">
              {_email}
            </Text>
            <Text style={{ marginTop: 20 }}>{description}</Text>
          </Card>
          <Group>
            <Button
                variant="filled"
                color="blue"
                m={20}
                onClick={() => {
                    setModify(true);
                }}
            >
                Edit
            </Button>
            <Button
                variant="filled"
                color="red"
                m={20}
                onClick={() => {
                    setIsLoggedIn(false)
                }}
            >
                Disconnect
            </Button>
          </Group>
        </div>
      )}
      <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={theme.colorScheme === "dark" ? "dark" : "light"}
          />
    </>
  );
};
