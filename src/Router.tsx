import React from 'react'
import { Route, Switch } from 'react-router-dom'

import App from './App'

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/:name" component={App} />
    </Switch>
  )
}