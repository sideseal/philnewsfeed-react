import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import HomeNavigation from './components/Navigation/HomeNavigation';


// const Home = React.lazy(() => import("./routes/Home"));
import Home from "./routes/Home";
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
        <Route exact path={["/", "/:page"]} component={Home} />
        <Suspense fallback="Please wait...">
          <Route exact path="/setting/login" component={Login} />
          <Route path="/setting/login/register" component={Registration} />
          <Route path="/:page/article/:id" component={ArticleDetail} />
          <Route path="/setting/logout" component={Logout} />
          {/* <Route path="/" exact={true} render={() => (<Redirect to="/1" />)} /> */}
          {/* <Redirect path="*" to="/" /> */}
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
}

export default App;