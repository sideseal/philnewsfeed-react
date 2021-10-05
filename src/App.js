import React, { Suspense } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
const Home = React.lazy(() => import("./routes/Home"));
const Detail = React.lazy(() => import("./routes/Detail"));
const Login = React.lazy(() => import("./routes/Login"));
const Logout = React.lazy(() => import("./routes/Logout"));
const Registration = React.lazy(() => import("./routes/Registration"));


function App(){
  return (
    <BrowserRouter>
      <Suspense fallback={<div>...Loading</div>}>
        <Route path="/" exact={true} component={Home} />
        <Route path="/article/:id" component={Detail} />
        <Route path="/register" component={Registration} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;