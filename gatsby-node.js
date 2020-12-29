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
  // 3. loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // page url
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
    console.log('create a page for: ', pizza.name);
  });
};

export const createPages = async (params) => {
  // create pages dynamically
  // 1. pizzas
  await turnPizzasIntoPages(params);
  // 2. Toppings
  // 3. Slicemasters
  console.log(`_____________ create pages`);
};
