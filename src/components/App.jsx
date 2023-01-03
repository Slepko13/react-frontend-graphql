import React from 'react';

import './App.scss';
import bottle from '../images/bottle.jpg';

const App = () => {
  return (
    <>
      <div className="App">
        <h1>Hello React</h1>
      </div>
      <main>
        <section className="hero"></section>
        <img src={bottle} alt="bottle" />
      </main>
    </>
  );
};

export default App;
