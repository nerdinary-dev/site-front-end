// Import React, MantineUI and other dependencies
import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Title,
  Text,
  Rating,
  Badge,
  Image,
  Button,
} from "@mantine/core";
import { IconStar } from "@tabler/icons-react";
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

const createItem = () => {
    return {
      id: "1234",
      name: "Test item",
      image: "C:\Users\esteban.louerat\Documents\Dev\IPI\site-front-end\mantine-cra-template-master\src\assets\casque.webp",
      price: 39,
      stock: 100,
      rating: 3.8,
      reviews: 10,
      description: "fake description lorem ipsum",
    };
  };

const createItems = (count: number) => {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(createItem());
  }
  return items;
};

// Create an array of 10 items
const items = createItems(10);

const ItemPage = () => {
  const { name, id } = useParams();

  const item = items.find((item) => item.name === name && item.id === id);

  // Render a not found state if no item is found
  if (!item) {
    return (
      <Text align="center" color="red">
        Item not found
      </Text>
    );
  }

  // Render the item details
  return (
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
            <Text size="xs">{value} out of 5 stars</Text>
          </div>
        )}
      />
      <Text size="sm" color="gray">
        {item.reviews} reviews
      </Text>
      <Text>{item.description}</Text>
      <Button variant="light" color="blue" radius="xl">
        Add to Cart
      </Button>
    </Container>
  );
};

export default ItemPage;
