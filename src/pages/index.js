import React from 'react';
import ItemGrid from '../components/ItemGrid';
import { LoadingGrid } from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

export default function HomePage() {
  const { sliceMasters, hotSlices } = useLatestData();

  console.log({ sliceMasters, hotSlices });

  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <HomePageGrid>
        <CurrentlySlicing sliceMasters={sliceMasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  );
}

function CurrentlySlicing({ sliceMasters }) {
  console.log('slicemaster: ', sliceMasters);
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemasters On</span>
      </h2>
      <p>Standy by</p>
      {!sliceMasters && <LoadingGrid count={4} />}
      {sliceMasters && !sliceMasters?.length && <p>Nothing in the case!</p>}
      {sliceMasters?.length && <ItemGrid items={sliceMasters} />}
    </div>
  );
}

const HotSlices = ({ hotSlices }) => {
  console.log('hotslices: ', hotSlices);
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Hot Slices</span>
      </h2>
      <p>Come on</p>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>Nothing in the case!</p>}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
};
