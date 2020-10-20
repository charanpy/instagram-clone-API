import React from 'react'
import { Switch, Route } from "react-router-dom";
import Signin from "./components/signin/signin.component"
const App = () => {
      return (
            <div>

                  <Switch>
                        <Route exact path="/login" component={Signin} />
                  </Switch>
            </div>
      )
}

export default App
