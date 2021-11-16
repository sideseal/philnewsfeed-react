import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// import HomeNavigation from './components/Navigation/HomeNavigation';
const Home = React.lazy(() => import("./routes/Home"));
const ArticleDetail = React.lazy(() => import("./components/Article/ArticleDetail"));
const Login = React.lazy(() => import("./routes/Login"));
const Logout = React.lazy(() => import("./routes/Logout"));
const Registration = React.lazy(() => import("./routes/Registration"));


// const HIDE_ASIDE_MENU = ["/login", "/register"];
// const aside = HIDE_ASIDE_MENU.includes(window.location.pathname) ? null : <HomeNavigation />;

function App(){
  return (
    <BrowserRouter>
      {/* <header>
        {aside}
      </header> */}
      <Switch>
        <Suspense fallback={<div>Please wait...</div>}>
          <Route path="/" exact={true} component={Home} />
          <Route path="/article/:id" component={ArticleDetail} />
          <Route path="/register" component={Registration} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Redirect path="*" to="/" />
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
}

export default App;