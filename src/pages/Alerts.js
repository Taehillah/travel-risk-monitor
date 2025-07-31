import React from 'react';
import AlertsWidget from '../components/AlertsWidget';
import Navigation from '../components/Navigation';

export default function Alerts() {
  return (
    <>
    <Navigation />
    <div className="container py-4">
      <AlertsWidget />
    </div>
    </>
  );
}