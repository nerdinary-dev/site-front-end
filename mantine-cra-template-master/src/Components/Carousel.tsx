import { useState, useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  createStyles,
  Paper,
  useMantineTheme,
  rem,
} from "@mantine/core";
import loader_gif from "../assets/loader.gif"
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(450),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },

  content: {
    background: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 10,
  },
}));

interface CardProps {
  image: string;
  link: string;
}

function Card({
  image,
  link,
  onClick,
}: CardProps & { onClick: () => void }) {
  const { classes } = useStyles();

  return (
    <Link to={link}>
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        sx={{ backgroundImage: `url(${image})` }}
        className={classes.card}
      >
      </Paper>
    </Link>
  );
}

const data = [
  {
    image: "https://www.backmarket.fr/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D2048/https://images.ctfassets.net/mmeshd7gafk1/2zDX3LIJ5ICVAnPFN83k1M/909df69bd57376d907c1ba0e102f1057/FR_Refurbished_VS_Used_HP_Desktop_V3.jpeg",
    link: "test",
  },
  {
    image: "https://static.fnac-static.com/fr-FR/fch/01/img/764f790b-c193-4667-b302-aae196c32e99.jpeg",
    link: "promo",
  },
];

export function CardsCarousel() {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (showLoader) {
      const timeoutId = setTimeout(() => setShowLoader(false), 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [showLoader]);

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.link}>
      <Card {...item} onClick={() => setShowLoader(true)} />
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
          <img src={loader_gif} alt="Loading..." style={{transform: "scale(0.2)"}} />
        </div>
      )}
      <Carousel
        withIndicators
        loop
        slideSize="100%"
        breakpoints={[{ maxWidth: "sm", slideSize: "100%" }]}
        slideGap="xl"
        align="start"
        slidesToScroll={mobile ? 1 : 1}
      >
        {slides}
      </Carousel>
    </>
  );
}
