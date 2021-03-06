import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      <p>you have {order.length} items in your order.</p>
      {order.map((singleOrder, index) => {
        const pizza = pizzas.find((item) => item.id === singleOrder.id);
        return (
          <MenuItemStyles key={singleOrder.id}>
            <Img fluid={pizza.image.asset.fluid} />
            <h2>{pizza.name}</h2>
            <p>
              {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
              <button
                type="button"
                className="remove"
                onClick={() => removeFromOrder(index)}
                title={`Remove ${singleOrder.size} ${pizza.name} from Order`}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
