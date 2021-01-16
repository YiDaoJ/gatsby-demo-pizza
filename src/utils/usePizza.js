import { useState } from 'react';

export default function usePizza({ pizzas, inputs }) {
  // 1. create some states to hold the order
  const [order, setOrder] = useState([]);
  // 2. make a funtion to add pizza to order
  const addToOrder = (orderedPizza) => {
    setOrder([...order, orderedPizza]);
  };
  // 3. make a funtion to remove pizza from order
  const removeFromOrder = (index) => {
    // console.log('___ index', [
    //   ...order.slice(0, index),
    //   ...order.slice(index + 1),
    // ]);
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  };
  // 4. send this data to a serverless funtion when they check out
  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
