import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Spinner from '../components/shared/Spinner/SpinnerOverlay';
import ErrorBoundary from '../components/error-boundary/Error-boundary';

const Home = lazy(() => import('../Pages/Home/Home'));
const Auth = lazy(() => import('../Pages/Auth/Auth.container'));

const AppRoute = () => (
  <Switch>
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <PrivateRoute exact path='/' component={Home} />
        <Route exact path='/auth' component={Auth} />
      </Suspense>
    </ErrorBoundary>
  </Switch>
);

export default AppRoute;
