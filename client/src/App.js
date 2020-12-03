import React from 'react'
import { Switch, Route } from "react-router-dom";
import Signin from "./components/signin/signin.component";
import Signup from "./components/signup/signupComponent"
import Alert from "./components/Alert/Alert";
import Account from "./components/Activate/Account"
import setAuthToken from "./utils/setAuthToken";

if(cookie.get("token"))setAuthToken(cookie.get("token"))


const App = () => {
      return (
            <div>
                  <Alert></Alert>
                  <Switch>
                        <Route exact path="/accounts/login" component={Signin} />
                        <Route exact path="/accounts/register" component={Signup} />
                        <Route exact path="/users/confirm/:id" component={Account} />
                  </Switch>
            </div>
      )
}

export default App
