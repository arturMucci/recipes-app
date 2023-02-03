import React from 'react';
import { createMemoryHistory } from 'history';
import { Router, BrowserRouter, Switch, Route } from 'react-router-dom';
import { render } from '@testing-library/react';

function withRouter(component, history) {
  return (
    <Router history={ history }>
      {component}
    </Router>
  );
}

export function renderWithRouter(
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}

export function renderWithRouterAndRoutes(component) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/meals" component={ component } />
        <Route path="/drinks" component={ component } />
      </Switch>
    </BrowserRouter>
  );
}
