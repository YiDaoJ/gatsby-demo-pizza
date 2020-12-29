import { resolve } from 'path';

const turnPizzasIntoPages = async ({ graphql, actions }) => {
  // 1. get a template for this page
  const pizzaTemplate = resolve(`./src/templates/Pizza.js`);
  // 2. query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  console.log(data);
  // 3. loop over each pizza and create a page for that pizza
};

export const createPages = async (params) => {
  // create pages dynamically
  // 1. pizzas
  await turnPizzasIntoPages(params);
  // 2. Toppings
  // 3. Slicemasters
  console.log(`_____________ create pages`);
};
