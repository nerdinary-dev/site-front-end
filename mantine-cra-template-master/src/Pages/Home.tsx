import { Group, Stack } from "@mantine/core";
import { HeaderMegaMenu } from "../Components/Header";
import { CardsCarousel } from "../Components/Carousel";
import { FooterLinks } from "../Components/Footer";
import { ArticleCarousel } from "../Components/Articles";

const data = [
  {
    title: "About",
    links: [
      {
        label: "Features",
        link: "#",
      },
      {
        label: "Pricing",
        link: "#",
      },
      {
        label: "Support",
        link: "#",
      },
      {
        label: "Forums",
        link: "#",
      },
    ],
  },
  {
    title: "Project",
    links: [
      {
        label: "Contribute",
        link: "#",
      },
      {
        label: "Media assets",
        link: "#",
      },
      {
        label: "Changelog",
        link: "#",
      },
      {
        label: "Releases",
        link: "#",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        label: "Join Discord",
        link: "#",
      },
      {
        label: "Follow on Twitter",
        link: "#",
      },
      {
        label: "Email newsletter",
        link: "#",
      },
      {
        label: "GitHub discussions",
        link: "#",
      },
    ],
  },
];


export default function Home() {
  return (
    <Stack>
      <HeaderMegaMenu />
      <CardsCarousel />
      <Group position="center">
        <ArticleCarousel
          title="Meilleures Ventes"
          description="Ça part comme des p'tits pains"
        />
        <ArticleCarousel
          title="Articles Populaire"
          description="Les articles les plus fashion"
        />
        <ArticleCarousel
          title="Recommandation"
          description="Des articles rien que pour toi bebou"
        />
      </Group>
      <FooterLinks data={data} />
    </Stack>
  );
}
