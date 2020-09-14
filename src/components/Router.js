import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import { StorePicker } from "./Storepicker";
import App from "./App";
import NotFound from "./NotFound";
const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={StorePicker} />
        <Route path="/store/:storeId" component={App} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};
export default Router;
