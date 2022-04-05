import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./headernav/header";
import NavigationContainer from "./headernav/navigation-container";
import Home from "./pages/home";
import Catalog from "./pages/catalog";
import Contact from "./pages/contact";
import NoMatch from "./pages/no-match";

class Layout extends Component {
  render() {
    return (
      <div className="layout">
        <Router>
          <div>
            <Header />
            <NavigationContainer />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/catalog" component={Catalog} />
              <Route path="/contact" component={Contact} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default Layout;
