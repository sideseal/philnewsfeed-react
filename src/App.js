import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import About from "./routes/About";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Login from "./routes/Login";
import Registration from "./routes/Registration";
import Navigation from './components/Navigation';

function App(){
  return (
    <BrowserRouter>
      <Navigation />
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/article/:id" component={Detail} />
      <Route path="/register" component={Registration} />
      <Route path="/login" component={Login} />
    </BrowserRouter>
  );
}

export default App;