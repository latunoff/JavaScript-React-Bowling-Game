import React, { PropTypes } from 'react';
import Header from './common/Header';

function App({ children }) {
  return (
    <div className="container">
      <Header />
      {children}
    </div>
  );
}

export default App;
