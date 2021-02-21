import React from 'react';
import useLatestData from '../utils/useLatestData';

export default function HomePage() {
  const { sliceMasters, hotSlices } = useLatestData();

  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <div>
        <CurrentlySlicing slicemasters={sliceMasters} />
        <HotSlices hotSlices={hotSlices} />
      </div>
    </div>
  );
}

const CurrentlySlicing = () => (
  <div>
    <p>CurrentlySlicing</p>
  </div>
);

const HotSlices = () => (
  <div>
    <p>HotSlices</p>
  </div>
);
