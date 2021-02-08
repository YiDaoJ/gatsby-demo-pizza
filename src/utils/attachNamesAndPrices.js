import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

export const attachNamesAndPrices = (order, pizzas) =>
  order.map((item) => {
    const selectedPizza = pizzas.find((pizza) => pizza.id === item.id);
    return {
      ...item,
      name: selectedPizza.name,
      thumbnail: selectedPizza.image.asset.fluid.src,
      price: formatMoney(calculatePizzaPrice(selectedPizza.price, item.size)),
    };
  });
