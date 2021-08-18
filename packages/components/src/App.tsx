import React from 'react';

import {Core} from './components/core';

import './App.scss';

function App() {
  return (
    <div className="App">
     <Core
        DirectlineConfig={{
            secret: "TwbA_KoJmQU.3-BAeeMaH_O2FvFnZ6Ez2Phc6VilHNoRvGslZ3mXmiU"
        }}
     />
    </div>
  );
}

export default App;
