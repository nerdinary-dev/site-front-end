import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  TextInput,
  TextInputProps,
  ActionIcon,
  Image,
  useMantineTheme,
  useMantineColorScheme,
  Autocomplete,
} from "@mantine/core";

import Logo from "../assets/Logo.svg";
import { useDisclosure } from "@mantine/hooks";
import { useLocalStorage } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
  IconSearch,
  IconArrowRight,
  IconArrowLeft,
  IconSun,
  IconMoonStars,
  IconBasket,
  IconUser
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },
  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  icon: {
    cursor: "pointer",
    transition: ".2s ease-in-out",
    borderRadius: "50%",

    ...theme.fn.hover({
        boxShadow: "rgba(200, 200, 200, 0.25) 0px 0px 30px",
        scale: "1.2",
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    // paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan(978)]: {
      display: "none",
    },
  },

  hiddenMobileLogin: {
    [theme.fn.smallerThan(380)]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan(978)]: {
      display: "none",
    },
  },
}));

const inputData = [
  "React",
  "Angular",
  "Vue",
  "Next.js",
  "Riot.js",
  "Svelte",
  "Blitz.js",
];

const gaming_data = [
  {
    title: "Consoles",
  },
  {
    title: "Games",
  },
  {
    title: "Accessories",
  },
  {
    title: "Merchandise",
  },
  {
    title: "Streaming",
  },
  {
    title: "Gift Cards",
  },
]

const nerd_data = [
  {
    title: "Comics",
  },
  {
    title: "Manga",
  },
  {
    title: "Anime",
  },
  {
    title: "Cosplay",
  },
  {
    title: "Movies",
  },
  {
    title: "Books",
  },
]

const techno_data = [
  {
    title: "Computers",
  },
  {
    title: "Smartphones",
  },
  {
    title: "Gadgets",
  },
  {
    title: "Software",
  },
  {
    title: "Hardware",
  },
  {
    title: "VR/AR",
  },
]

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

interface HeaderMegaMenuProps {
  isLoggedIn: boolean;
  onLogin: () => void;
}
// { isLoggedIn, onLogin }: HeaderMegaMenuProps
export function HeaderMegaMenu()  {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage<Boolean>({
    key: "isLoggedIn"
  });

  const navigate = useNavigate();
  console.log("$ log: ", isLoggedIn)
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const [gameLinksOpened, { toggle: toggleGameLinks }] = useDisclosure(false);
  const [nerdLinksOpened, { toggle: toggleNerdLinks }] = useDisclosure(false);
  const [technoLinksOpened, { toggle: toggleTechnoLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  console.log(isLoggedIn)

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon
            size={rem(22)}
            color={
              theme.colorScheme === "dark" ? "green" : theme.fn.primaryColor()
            }
          />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  const gameLinks = gaming_data.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  const nerdLinks = nerd_data.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  const technoLinks = techno_data.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box>
      <Header height={80} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <a href="/">
            <Image
              style={{
                filter:
                  theme.colorScheme === "dark" ? "invert(1)" : "invert(0)",
              }}
              width={200}
              src={Logo}
            />
          </a>
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Gaming
                    </Box>
                    <IconChevronDown
                      size={16}
                      color={
                        theme.colorScheme === "dark"
                          ? "green"
                          : theme.fn.primaryColor()
                      }
                    />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                <Group position="apart" px="md">
                  <Text fw={500}>Gaming</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider
                  my="sm"
                  mx="-md"
                  color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
                />

                <SimpleGrid cols={2} spacing={0}>
                  {gameLinks}
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Nerd Culture
                    </Box>
                    <IconChevronDown
                      size={16}
                      color={
                        theme.colorScheme === "dark"
                          ? "green"
                          : theme.fn.primaryColor()
                      }
                    />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                <Group position="apart" px="md">
                  <Text fw={500}>Nerd Culture</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider
                  my="sm"
                  mx="-md"
                  color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
                />

                <SimpleGrid cols={2} spacing={0}>
                  {nerdLinks}
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Technologie
                    </Box>
                    <IconChevronDown
                      size={16}
                      color={
                        theme.colorScheme === "dark"
                          ? "green"
                          : theme.fn.primaryColor()
                      }
                    />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                <Group position="apart" px="md">
                  <Text fw={500}>Technologie</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider
                  my="sm"
                  mx="-md"
                  color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
                />

                <SimpleGrid cols={2} spacing={0}>
                  {technoLinks}
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>
            <a href="#" className={classes.link}>
              About Us
            </a>
            <a href="#" className={classes.link}>
              Sell Items
            </a>
          </Group>

          {isLoggedIn === false && (
            <Group className={classes.hiddenMobile}>
              {/* <Button component={Link} to="/login" variant="default">
                Log in
              </Button> */}
              <Button
              component={Link}
              to="/login"
                // onClick={() => {
                //   setIsLoggedIn(true)
                // }}
                variant="default"
              >
                Log in
              </Button>
              <Button
                component={Link}
                to="/signup"
                color={
                  theme.colorScheme === "dark"
                    ? "green"
                    : theme.fn.primaryColor()
                }
              >
                Sign up
              </Button>
            </Group>
          )}
          {isLoggedIn === true && (
            <Group className={classes.hiddenMobile}>
              <Group p="md">
                <Anchor href="/cart">
                  <IconBasket
                    size={rem(32)}
                    className={classes.icon}
                    color={
                      theme.colorScheme === "dark"
                        ? "white"
                        : theme.fn.primaryColor()
                    }
                  />
                </Anchor>
                <Anchor href="/profile">
                  <IconUser
                    size={rem(32)}
                    className={classes.icon}
                    color={
                      theme.colorScheme === "dark"
                        ? "white"
                        : theme.fn.primaryColor()
                    }
                  />
                </Anchor>
              </Group>
            </Group>
          )}
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />
          <UnstyledButton className={classes.link} onClick={toggleGameLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Gaming
              </Box>
              <IconChevronDown
                size={16}
                color={
                  theme.colorScheme === "dark"
                    ? "green"
                    : theme.fn.primaryColor()
                }
              />
            </Center>
          </UnstyledButton>
          <Collapse in={gameLinksOpened}>{gameLinks}</Collapse>

          <UnstyledButton className={classes.link} onClick={toggleNerdLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Nerd Culture
              </Box>
              <IconChevronDown
                size={16}
                color={
                  theme.colorScheme === "dark"
                    ? "green"
                    : theme.fn.primaryColor()
                }
              />
            </Center>
          </UnstyledButton>
          <Collapse in={nerdLinksOpened}>{nerdLinks}</Collapse>

          <UnstyledButton className={classes.link} onClick={toggleTechnoLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Technologie
              </Box>
              <IconChevronDown
                size={16}
                color={
                  theme.colorScheme === "dark"
                    ? "green"
                    : theme.fn.primaryColor()
                }
              />
            </Center>
          </UnstyledButton>
          <Collapse in={technoLinksOpened}>{technoLinks}</Collapse>
          
          <a href="#" className={classes.link}>
            About Us
          </a>
          <a href="#" className={classes.link}>
            Sell Items
          </a>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />
          <Autocomplete
            className={classes.search}
            m={25}
            placeholder="Search"
            radius="xl"
            icon={<IconSearch size="1rem" stroke={1.5} />}
            rightSection={
              <ActionIcon
                size={32}
                radius="xl"
                color={
                  theme.colorScheme === "dark"
                    ? "green"
                    : theme.fn.primaryColor()
                }
                variant="filled"
              >
                {theme.dir === "ltr" ? (
                  <IconArrowRight size="1.1rem" stroke={1.5} />
                ) : (
                  <IconArrowLeft size="1.1rem" stroke={1.5} />
                )}
              </ActionIcon>
            }
            data={inputData}
          />

          <Group position="center" grow pb="xl" px="md">
            <Button component={Link} to="/login" variant="default">
              Log in
            </Button>
            <Button
              component={Link}
              to="/signup"
              color={
                theme.colorScheme === "dark" ? "green" : theme.fn.primaryColor()
              }
            >
              Sign up
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
      <Autocomplete
        className={classes.search}
        m={25}
        placeholder="Search"
        radius="xl"
        icon={<IconSearch size="1rem" stroke={1.5} />}
        rightSection={
          <ActionIcon
            size={32}
            radius="xl"
            color={
              theme.colorScheme === "dark" ? "green" : theme.fn.primaryColor()
            }
            variant="filled"
          >
            {theme.dir === "ltr" ? (
              <IconArrowRight size="1.1rem" stroke={1.5} />
            ) : (
              <IconArrowLeft size="1.1rem" stroke={1.5} />
            )}
          </ActionIcon>
        }
        data={inputData}
      />
    </Box>
  );
}
