// Import React, MantineUI and other dependencies
import React, { useEffect, useState } from "react";
import loader_gif from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Title,
  Text,
  Rating,
  Badge,
  Image,
  Button,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { IconStar } from "@tabler/icons-react";

import phone from "../assets/phone.webp";
import ps4 from "../assets/ps4.webp";
import casque from "../assets/casque.webp";
import { useLocalStorage } from "@mantine/hooks";
// import faker from "faker";

// const createItem = () => {
//   return {
//     id: faker.datatype.uuid(),
//     name: faker.commerce.productName(),
//     image: faker.image.technics(),
//     price: faker.commerce.price(),
//     stock: faker.datatype.number(10),
//     rating: faker.datatype.number(5),
//     reviews: faker.datatype.number(100),
//     description: faker.commerce.productDescription(),
//   };
// };

const createItem = (id: number) => {
  switch (id) {
    case 1:
      return {
        id: "1",
        name: "Iphone 12",
        image: phone,
        price: 476.27,
        stock: 100,
        rating: 3.8,
        reviews: 8,
        description:
          "Toutes nos consoles de jeux sont entièrement nettoyées. La boîte d'origine n'est pas incluse, mais sera très bien emballée par nos soins. Expédition sous 2 jours ouvrable. Inclus avec une manette officielle, le câble HDMI, le câble d'alimentation ainsi que le câble de charge de la manette.",
      };
    case 2:
      return {
        id: "2",
        name: "PlayStation 4",
        image: ps4,
        price: 499.9,
        stock: 5,
        rating: 4,
        reviews: 7890,
        description:
          "Tous les produits vendus sur Back Market proviennent de reconditionneurs experts et vérifiés, qui s'engagent à tester chaque appareil selon notre charte qualité. Chaque produit est 100% fonctionnel, parfaitement nettoyé et garanti.",
      };
    case 3:
      return {
        id: "3",
        name: "Casque sans fils Beats",
        image: casque,
        price: 160.49,
        stock: 378,
        rating: 2,
        reviews: 1,
        description:
          "Toutes nos consoles de jeux sont entièrement nettoyées. La boîte d'origine n'est pas incluse, mais sera très bien emballée par nos soins. Expédition sous 2 jours ouvrable. Inclus avec une manette officielle, le câble HDMI, le câble d'alimentation ainsi que le câble de charge de la manette.",
      };
    default:
      break;
  }
  return {
    id: "9",
    name: "Test Item",
    image: ps4,
    price: 999,
    stock: 999,
    rating: 5,
    reviews: 999,
    description: "test item",
  };
};

const createItems = () => {
  const items = [];

  items.push(createItem(1));
  items.push(createItem(2));
  items.push(createItem(3));

  return items;
};

// Create an array of 10 items
const items = createItems();

interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

const ItemPage = () => {
  const { name, id } = useParams();
  const theme = useMantineTheme()
  

  const item = items.find((item) => item.id === id);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useLocalStorage<Boolean>({
    key: "isLoggedIn"
  });

  const [cart, setCart] = useLocalStorage<Item[]>({
    key: "cart",
    defaultValue: [],
  });

  const notifyError = () =>
    toast.error("You must have an account to add item to your cart", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme.colorScheme === "dark" ? "dark" : "light",
    });

    const notifyOk = () =>
    toast.success("⭐ Item add !", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme.colorScheme === "dark" ? "dark" : "light",
    });

  const addToCart = (item: Item) => {
    // Check if the item already exists in the cart
    const existingItem = cart.find(
      (cartItem) => (cartItem as Item).id === item.id
    );

    if (existingItem) {
      // Update the quantity of the existing item
      setCart(
        (cart as Item[]).map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...(cartItem as unknown as Item),
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        )
      );
    } else {
      // Add the new item with quantity of 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  useEffect(() => {
    if (showLoader) {
      const timeoutId = setTimeout(() => setShowLoader(false), 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [showLoader]);

  const delay = (ms: number | undefined) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Render a not found state if no item is found
  if (!item) {
    return (
      <Text align="center" color="red">
        Item not found
      </Text>
    );
  }

  const handleAddCart = async () => {
    if (isLoggedIn) {
      setShowLoader(true);
      addToCart({
        id: item.id,
        name: item.name,
        description: 'As new',
        price: item.price,
        quantity: 1,
        image: item.image,
      });
      await delay(3000);
      notifyOk();
      navigate("/cart");
    } else {
      notifyError();
    }
  };

  // Render the item details
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
      <Container size="md">
        <Title order={1}>{item.name}</Title>
        <Image src={item.image} alt={item.name} width={400} height={300} />
        <Text size="lg" weight={700}>
          Price: {item.price} €
        </Text>
        <Badge color={item.stock > 0 ? "teal" : "red"}>
          {item.stock > 0 ? "In Stock" : "Out of Stock"}
        </Badge>
        <Rating
          value={item.rating}
          fullSymbol={(value) => (
            <div>
              <IconStar />
            </div>
          )}
        />
        <Text size="sm" color="gray">
          {item.reviews} reviews
        </Text>
        <Text>{item.description}</Text>
        <Button
          variant="light"
          color="blue"
          radius="xl"
          onClick={handleAddCart}
        >
          Add to Cart
        </Button>
      </Container>
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

export default ItemPage;
