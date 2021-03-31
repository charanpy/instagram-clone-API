import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Spinner from '../components/shared/Spinner/SpinnerOverlay';
import ErrorBoundary from '../components/error-boundary/Error-boundary';

const Home = lazy(() => import('../Pages/Home/Home.container'));
const Auth = lazy(() => import('../Pages/Auth/Auth.container'));
const Chat = lazy(() => import('../Pages/Chat/Chat.container'));
const Message = lazy(() => import('../Pages/Messages/Messages.container'));

const AppRoute = () => (
  <Switch>
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <PrivateRoute exact path='/' component={Home} routeName='home' />
        <Route exact path='/auth' component={Auth} />
        <Route exact path='/direct/message' component={Chat} />
        <Route exact path='/message/:id' component={Message} />
      </Suspense>
    </ErrorBoundary>
  </Switch>
);

export default AppRoute;
