import React from 'react';
import Navigation from '../components/Navigation';
import DestinationsWidget from '../components/DestinationsWidget';

export default function Destinations() {
  return (<>
  <Navigation />
    <div className="container py-4">
      <DestinationsWidget />
    </div>
  </>
    
  );
}