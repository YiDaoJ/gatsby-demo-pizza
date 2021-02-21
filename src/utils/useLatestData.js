import { useEffect, useState } from 'react';

const gql = String.raw;
const deets = gql`
  name
  _id
  image {
    asset {
      url
      metadata {
        lqip
      }
    }
  }
`;

export default function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slice masters
  const [sliceMasters, setSliceMasters] = useState();

  // Use a side effect to fetch the data from the graphql endpoint
  useEffect(() => {
    // when the component loads / mounts, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // check error

        // set the data to  states
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSliceMasters(res.data.StoreSettings.slicemaster);
      })
      .catch((err) => {
        console.log('!!!!!!!!!!');
        console.log(err);
      });
  }, []);
  return {
    hotSlices,
    sliceMasters,
  };
}
