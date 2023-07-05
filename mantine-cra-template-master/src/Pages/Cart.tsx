import React, { useState } from "react";
import { useMediaQuery, useLocalStorage } from "@mantine/hooks";
import {
  Container,
  Grid,
  Col,
  Title,
  Text,
  Button,
  Badge,
  Image,
  Divider,
} from "@mantine/core";

interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

// A component to render each item in the cart
const CartItem = ({
  item,
  addToCart,
  removeFromCart,
}: {
  item: Item;
  addToCart: (item: Item) => void;
  removeFromCart: (item: Item) => void;
}) => {
  return (
    <Grid gutter="md" align="center">
      <Col span={3}>
        <Image
          src={item.image}
          alt={item.name}
          width={100}
          height={100}
          fit="cover"
        />
      </Col>
      <Col span={5}>
        <Text weight={700}>{item.name}</Text>
        <Text color="gray">{item.description}</Text>
      </Col>
      <Col span={2}>
        <Text weight={700}>${item.price}</Text>
      </Col>
      <Col span={2}>
        <Badge color="blue" variant="outline">
          {item.quantity}
        </Badge>
      </Col>
      <Col span={2}>
        <Button
          variant="outline"
          color="red"
          onClick={() => removeFromCart(item)}
        >
          -
        </Button>
        <Button variant="outline" color="green" onClick={() => addToCart(item)}>
          +
        </Button>
      </Col>
    </Grid>
  );
};

// A component to render the cart page
const CartPage = () => {
  // Use media query hook to get the screen size
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Use local storage hook to store the cart data
const [cart, setCart] = useLocalStorage<Item[]>({
  key: 'cart',
  defaultValue: [],
});


  // A function to add items to the cart
  const addToCart = (item: Item) => {
    // Check if the item already exists in the cart
    const existingItem = cart.find((cartItem) => (cartItem as Item).id === item.id);

    if (existingItem) {
      // Update the quantity of the existing item
      setCart(
        (cart as Item[]).map((cartItem) =>
          cartItem.id === item.id
            ? { ...((cartItem as unknown) as Item), quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // Add the new item with quantity of 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // A function to remove items from the cart
  const removeFromCart = (item: Item) => {
    // Check if the item quantity is more than one
    if (item.quantity > 1) {
      // Decrease the quantity of the item
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } else {
      // Remove the item from the cart
      setCart(cart.filter((cartItem) => cartItem.id !== item.id));
    }
  };

  // A function to clear all items from the cart
  const clearCart = () => {
    setCart([]);
  };

  // A function to calculate the total price of the items in the cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Define a sample item to add
const testItem: Item = {
  id: 'test',
  name: 'Test Item',
  description: 'This is a test item',
  price: 9.99,
  quantity: 1,
  image: 'https://via.placeholder.com/100',
};

// Define a function to handle the button click
const handleTestButtonClick = () => {
  // Call the addToCart function with the test item
  addToCart(testItem);
};

  return (
    <Container size={isMobile ? "sm" : "md"}>
      <Title order={1} align="center">
        Your Cart
      </Title>
      {cart.length > 0 ? (
        <>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          ))}
          <Divider m="lg" />
          <Grid gutter="md" justify="space-between">
            <Col span={6}>
              <Text size="lg" weight={700}>
                Total: ${getTotalPrice()}
              </Text>
            </Col>
            <Col
              span={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button variant="outline" color="red" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button variant="light" color="blue">
                Checkout
              </Button>
            </Col>
          </Grid>
        </>
      ) : (
        <Text align="center" color="gray">
          Your cart is empty
        </Text>
      )}
      <Button variant="outline" color="teal" onClick={handleTestButtonClick}>
    Add Test Item
  </Button>
    </Container>
  );
};

export default CartPage;
