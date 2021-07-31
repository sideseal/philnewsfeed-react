import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import About from "./routes/About";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

function App(){
  return (
    <BrowserRouter>
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/article/:id" component={Detail} />
    </BrowserRouter>
  );
}

export default App;