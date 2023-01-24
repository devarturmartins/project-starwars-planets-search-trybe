import React from 'react';
import './App.css';
import AppProvider from './context/AppProvider';
import Filter from './components/Filter';
import Home from './components/Home';

function App() {
  return (
    <AppProvider>
      <Filter />
      <Home />
    </AppProvider>
  );
}

export default App;
