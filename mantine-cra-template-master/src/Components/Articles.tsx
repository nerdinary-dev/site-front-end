import { useState, useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  createStyles,
  Paper,
  Text,
  Title,
  Button,
  useMantineTheme,
  rem,
  Anchor,
} from "@mantine/core";
import phone from "../assets/phone.webp";
import ps4 from "../assets/ps4.webp";
import casque from "../assets/casque.webp";
import loader_gif from "../assets/loader.gif";
import { Link, Navigate, redirect } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    "&:hover": {
      transform: "scale(1.02)",
      transition: "0.2s"
    },
    "&:active": {
      transform: "scale(0.98)",
      transition: "0.2s"
    },
    height: rem(300),
    display: "flex",
    background: theme.white,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    cursor: "pointer",
    transition: "0.2s"
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 500,
    color: theme.black,
    lineHeight: 1.2,
    fontSize: rem(15),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.black,
    opacity: 0.7,
    fontWeight: 700,
  },

  description: {
    color: theme.white,
    opacity: 0.5,
    fontSize: 20,
    fontWeight: 500,
  },

  price: {
    color: theme.black,
    opacity: 0.7,
    fontWeight: 700,
  },

  image: {
    height: rem(140),
  },

  content: {
    background: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 10,
  },

  carouselContainer: {
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: 50,
      zIndex: 1,
      background: "linear-gradient(to right, #1a1b1e, transparent)",
      WebkitMaskImage: "linear-gradient(to right, #1a1b1e, transparent)",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      width: 50,
      zIndex: 1,
      background: "linear-gradient(to left, black, transparent)",
      WebkitMaskImage: "linear-gradient(to left, black, transparent)",
    },
  },
}));

interface CardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: string;
}

function Card({
  id,
  image,
  title,
  description,
  price,
  onClick,
}: CardProps & { onClick: () => void }) {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      className={classes.card}
      onClick={onClick}
    >
      <img className={classes.image} src={image} alt={title} />
      <div>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
        <Text className={classes.category} size="xs">
          {description}
        </Text>
        <Text className={classes.category} size="xs" mt={10}>
          À Partir de
        </Text>
        <Text className={classes.price} size="md">
          {price}
        </Text>
      </div>
    </Paper>
  );
}

const data = [
  {
    id: "1234ab",
    image: phone,
    title: "Iphone 12",
    description: "128 Go - Noir - Débloqué",
    price: "476,27€",
  },
  {
    id: "123AZEze",
    image: ps4,
    title: "PlayStation 4",
    description: "500Go",
    price: "187,00€",
  },
  {
    id: "AC24DZfz",
    image: casque,
    title: "Casque sans fil Beats",
    description: "Noir",
    price: "160,49€",
  },
  {
    id: "1234ab",
    image: phone,
    title: "Iphone 12",
    description: "128 Go - Noir - Débloqué",
    price: "476,27€",
  },
  {
    id: "123AZEze",
    image: ps4,
    title: "PlayStation 4",
    description: "500Go",
    price: "187,00€",
  },
  {
    id: "AC24DZfz",
    image: casque,
    title: "Casque sans fil Beats",
    description: "Noir",
    price: "160,49€",
  },
];

export const ArticleCarousel = ({
  title,
  description = "",
}: {
  title: string;
  description?: string;
}) => {
  const [showLoader, setShowLoader] = useState(false);
  const { classes } = useStyles();

  useEffect(() => {
    if (showLoader) {
      const timeoutId = setTimeout(() => setShowLoader(false), 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [showLoader]);

  const MantineTheme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${MantineTheme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.id}>
      <Anchor href={"/" + item.title.replaceAll(" ", "-") + "/" + item.id}>
      <Card
        {...item}
        onClick={() => {
          setShowLoader(true);
          // redirect(`/${item.title}/${item.id}`);
        }}
      />
      </Anchor>
    </Carousel.Slide>
  ));

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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Title mt={100} mb={40}>
          {title} &nbsp;{" "}
          <span className={classes.description}>{description}</span>
        </Title>
        <Carousel
          slideSize="25%"
          breakpoints={[{ maxWidth: "sm", slideSize: "25%" }]}
          slideGap="md"
          align="start"
          slidesToScroll={mobile ? 2 : 4}
        >
          {slides}
        </Carousel>
      </div>
    </>
  );
};
