
import { Route, Switch } from 'react-router-dom'

import App from './App'

export default function Router() {
  return (
    <Switch>
      <Route path="/:name" component={App} />
      <Route exact path="/*" component={App} />

    </Switch>
  )
}