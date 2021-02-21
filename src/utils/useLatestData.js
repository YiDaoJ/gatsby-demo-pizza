import { useEffect, useState } from 'react';

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
        query: `
        query {
          StoreSettings(id:"downtown") {
            name
            slicemaster {
              name
            }
            hotSlices {
              name
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
      });
  }, []);
  return {
    hotSlices,
    sliceMasters,
  };
}
