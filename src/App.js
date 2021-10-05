import React, { Suspense } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';


const Home = React.lazy(() => import("./routes/Home"));
const Detail = React.lazy(() => import("./routes/Detail"));
const Login = React.lazy(() => import("./routes/Login"));
const Registration = React.lazy(() => import("./routes/Registration"));
const Navigation = React.lazy(() => import('./components/Navigation/Navigation'));



function App(){
  return (
    <BrowserRouter>
      <Suspense fallback={<div>...Loading</div>}>
        <Navigation />
        <Route path="/" exact={true} component={Home} />
        <Route path="/article/:id" component={Detail} />
        <Route path="/register" component={Registration} />
        <Route path="/login" component={Login} />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;