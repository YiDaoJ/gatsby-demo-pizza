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
    // console.log('create a page for: ', pizza.name);
  });
};

const turnToppingIntoPages = async ({ graphql, actions }) => {
  // 1. Get the template
  const toppingTemplate = resolve(`./src/pages/pizzas.js`);
  // 2. query all the toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
    }
  `);
  // 3. createPage for that topping
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      // page url
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
  // 4. Pass topping data to pizza.js
};

export const createPages = async (params) => {
  // create pages dynamically
  // 1. pizzas
  // 2. Toppings
  // wait for all promises to be resolved before finishing this function
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingIntoPages(params),
  ]);

  // 3. Slicemasters
  console.log(`_____________ create pages`);
};
