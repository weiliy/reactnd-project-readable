import React from 'react';
import Categories from './Categories';

function App (props) {
  const { categories } = props;

  return (
    <div>
      <Categories />
    </div>
  );
}

export default App;
