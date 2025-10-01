"use client";

import React from 'react';
import Landing from './landing/page'
import Simulation from './simulation/page';
import Maps from './maps/page';
import Breakdown from './breakdown/page';
import Ending from './endings/page';
import Help from './help/page';
import MapsWrapper from './maps/maps-wrapper';``

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <Landing />
      <Simulation />
      <Maps />
      <Breakdown />
      <MapsWrapper />
        <Ending type="good" onReturnChoice={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
      <Help />
    </div>
  );
};

export default Home;