import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

export default function calculateOrderTotal(order, pizzas) {
  // order.map(singleOrder => {
  //   const pizza = pizzas.find(item => item.id === singleOrder.id)

  // })

  // loop over each item in the order
  // calc the total for that pizza
  // add that total to the running total
  const total = order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find((item) => item.id === singleOrder.id);
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);

  return formatMoney(total);
}
